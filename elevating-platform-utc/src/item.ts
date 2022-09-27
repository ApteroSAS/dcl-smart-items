import { VerticalPlatformSystem, VerticalPlatform } from './platform'

export type Props = {
  speed?: number //between levels
  levels?:string //list of level height
  duration?:number //time spent for each levels
}

export default class Platform implements IScript<Props> {
  init() {
    engine.addSystem(new VerticalPlatformSystem())
  }

  spawn(host: Entity, props: Props, channel: IChannel) {
    const { speed,levels, duration} = props

    const actualSpeed =speed/20 * 1000;
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
    const platform = new Entity(host.name + '-platform')
    platform.setParent(host)
    platform.addComponent(new Transform({ position: new Vector3(0, 0, 0) }))
    platform.addComponent(new GLTFShape('models/Gspot_ascenseur_retextured.glb'))
    platform.addComponent(
      new VerticalPlatform(channel, distance, speed,levelsArray,duration, timeSpentWaitingDuringOneLoop + timeSpentMovingDuringOneLoop,durations)
    )

    // add animation
    const animator = new Animator()
    const clip = new AnimationState('main', { looping: true })
    animator.addClip(clip)
    platform.addComponent(animator)
    clip.play()

    // //sync initial values
    // channel.request<number>('yourtime', othersDate =>
    //     Elevator.timeDelta = othersDate - Date.now()
    // )
    //
    // channel.reply<number>(
    //   'yourtime',
    //   () => (Date.now()+Elevator.timeDelta)
    // )

  }
}
