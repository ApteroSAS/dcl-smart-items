@Component('org.decentraland.VerticalPlatformSciFi')
export class VerticalPlatform {
  transition: number = -1
  delay: number = -1 // this is a delay to stop the animation, to prevent a flickr in the transition
  timeDelta: number = 0 // adjust for multiplayer
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


export class VerticalPlatformSystem {
  group = engine.getComponentGroup(VerticalPlatform)
  update(dt: number) {
    for (const entity of this.group.entities) {

      const platform = entity.getComponent(VerticalPlatform)
      const transform = entity.getComponent(Transform)
      const time = Date.now()+platform.timeDelta;
      const backAndForthDuration = platform.loopDuration*2;
      const sequenceClock = time % backAndForthDuration;//state based on loop position
      const isRising = sequenceClock<=platform.loopDuration;// true = yes

      //On cherche ou l'on en est dans la séquence
      let stepTime = 0, stepId = 0;
      do {
        stepTime += platform.durations[stepId];
        if(stepTime <= platform.loopDuration) stepId++;
        else stepId--;
      }
      while(stepTime < sequenceClock)

      //pour indiquer la sequence actuel, il faut qu'on revienne sur le précédent stepId
      if(isRising) stepId--;
      else stepId++;

      const stepStart = stepTime - platform.durations[stepId]
      const stepEnd = stepTime;


      const startPosition = new Vector3(0, 0, 0)
      const endPosition = new Vector3(0, platform.distance, 0)



      const start = !isRising ? startPosition : endPosition
      const end = !isRising ? endPosition : startPosition
      const speed = platform.speed / 20

      const animator = entity.getComponent(Animator)
      const clip = animator.getClip('LightAction')

      if (platform.transition >= 0 && platform.transition < 1) {
        platform.transition += dt * speed
        transform.position.copyFrom(
          Vector3.Lerp(start, end, platform.transition)
        )

        if (!clip.playing) {
          clip.stop()
          clip.play()
        }
      } else if (platform.transition >= 1) {
        platform.transition = -1
        platform.delay = 0
        transform.position.copyFrom(end)

      } else if (platform.delay >= 0 && platform.delay < 1) {
        platform.delay += dt
      } else if (platform.delay >= 1) {
        platform.delay = -1
        clip.stop()
      }
    }
  }
}
