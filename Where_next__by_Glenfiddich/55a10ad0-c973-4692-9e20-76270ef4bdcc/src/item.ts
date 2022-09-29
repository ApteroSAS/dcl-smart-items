@Component("VerticalPlatform")
class VerticalPlatform {
    transition: number = -1
    delay: number = -1 // this is a delay to stop the animation, to prevent a flickr in the transition
    constructor(
        public channel: IChannel,
        public distance: number = 10,//Total traveled height
        public speed: number = 5,//expected speed during travel
        public levels:Array<float> = [0,5,10],//list of altitudes of levels
        public duration: number = 2000,//time spent on each levels
        public loopDuration:number = 0,//calculated total time spent during a loop (last step not included as it is redundant)
        public durations:Array<float>,//list of duration for each waiting and moving
    ) {}
}

class VerticalPlatformSystem {
        group = engine.getComponentGroup(VerticalPlatform)
        update(dt: number) {
            for (const entity of this.group.entities) {

                const platform = entity.getComponent(VerticalPlatform)
                const transform = entity.getComponent(Transform)
                const time = Date.now();
                const backAndForthDuration = platform.loopDuration*2;
                const sequenceClock = time % backAndForthDuration;//state based on loop position
                const isRising = sequenceClock<=platform.loopDuration;// true = yes
                //log(" ");
                //On cherche ou l'on en est dans la séquence
                let stepTime = 0, stepId = 0;
                do {
                    stepTime += platform.durations[stepId];
                    if(stepTime <= platform.loopDuration) stepId++;
                    else stepId--;

                    //log(stepId);
                    //log(stepTime, sequenceClock)
                }
                while(stepTime < sequenceClock)

                //pour indiquer la sequence actuel, il faut qu'on revienne sur le précédent stepId
                if(isRising) stepId--;
                else stepId++;

                const animator = entity.getComponent(Animator)
                const clip = animator.getClip('LightAction')
                let levelId;

                //log("stepID = " + stepId);

                if (stepId%2 == 1) {
                    //We only move on non-multiples of 2, and the uppward rounded division by 2 to give us the levelId
                    levelId = (stepId / 2) + 0.5;

                    const stepTimeStart = stepTime - platform.durations[stepId]
                    const stepTimeEnd = stepTime;

                    //With the current time value, we get a value between 0 and one presenting the progression of time between stepTimeStart and stepTimeEnd
                    const lerpValue = (sequenceClock - stepTimeStart)/(stepTimeEnd - stepTimeStart);

                    const stepPositionLow = new Vector3(0, platform.levels[levelId-1], 0)
                    const stepPositionHigh = new Vector3(0, platform.levels[levelId], 0)

                    const start = isRising ? stepPositionLow : stepPositionHigh
                    const end = isRising ? stepPositionHigh : stepPositionLow

                    //log(levelId,stepTimeStart, stepTimeEnd,lerpValue);
                    transform.position.copyFrom(
                        Vector3.Lerp(start, end, lerpValue)
                    )
                    if (!clip.playing) {
                        clip.stop()
                        clip.play()
                    }
                } else {
                    levelId = (stepId / 2);
                    const currentStep = new Vector3(0, platform.levels[levelId], 0)
                    platform.delay = 0
                    transform.position.copyFrom(currentStep)
                }

                if (platform.delay >= 0 && platform.delay < 1) {
                    platform.delay += dt
                } else if (platform.delay >= 1) {
                    platform.delay = -1
                    clip.stop()
                }
            }
        }
}

export type Props = {
    speed: number //between levels
    levels:string //list of level height
    duration:number //time spent for each levels
}

export default class Platform implements IScript<Props> {
    init() {
        engine.addSystem(new VerticalPlatformSystem())
    }

    spawn(host: Entity, props: Props, channel: IChannel) {
        const { speed,levels, duration} = props
        const platform = new Entity(host.name + '-platform')
        platform.setParent(host)
        //platform.addComponentOrReplace(new BoxShape())
        platform.addComponent(new Transform({ position: new Vector3(0, 0, 0),scale: new Vector3(1, 1, 1) }))
        platform.addComponent(new GLTFShape("55a10ad0-c973-4692-9e20-76270ef4bdcc/models/Ascenseur.glb"))

        const actualSpeed = speed/20 * 1000;
        const levelsArray = levels.split(" ").map(x => parseFloat(x));
        const distance = levelsArray[levelsArray.length-1] - levelsArray[0]; //total distance between top and bottom
        const timeSpentWaitingDuringOneLoop = (levelsArray.length-1 )* duration;
        const timeSpentMovingDuringOneLoop = distance * actualSpeed;
        let durations = [];
        for (let i = 0; i < levelsArray.length; i++) {
            if(i!=0){//If we moved from a previous level
                const dist = levelsArray[i] - levelsArray[i-1]
                durations.push(dist*actualSpeed);//we add the time spent moving
            }
            durations.push(duration)//We add the time for that level
        }
        platform.addComponent(
            new VerticalPlatform(channel, distance, speed,levelsArray,duration, timeSpentWaitingDuringOneLoop + timeSpentMovingDuringOneLoop,durations)
        )

        // add animation
        const animator = new Animator()
        const clip = new AnimationState('main', { looping: true })
        animator.addClip(clip)
        platform.addComponent(animator)
        clip.play()


    }
}
