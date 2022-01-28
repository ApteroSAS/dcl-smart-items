import { Delay } from "./Timer/component/delay";
export type Direction = 'up' | 'down'

@Component('org.decentraland.VerticalPlatformSciFi')
export class Elevator {
    transition: number = -1
    delay: number = -1 // this is a delay to stop the animation, to prevent a flickr in the transition
    direction: Direction = 'up'
    nextLevelId: number = 0
    constructor(
        public channel: IChannel,
        public speed: number = 5,
        public _levels: Array<float>,
        public duration: number = 2000,
        public onReachStart?: Actions,
        public onReachEnd?: Actions,
        public onReachLevel?: Actions
    ) {}
}

const bottomPosition = new Vector3(0, 0, 0)

export class ElevatorSystem {
    group = engine.getComponentGroup(Elevator)
    update(dt: number) {
        for (const entity of this.group.entities) {
            const platform = entity.getComponent(Elevator)
            const transform = entity.getComponent(Transform)

            const topPosition = new Vector3(0, platform._levels[platform._levels.length -1], 0)
            const prevPosition = new Vector3(0,platform._levels[(platform.direction=== 'up')? platform.nextLevelId-1: platform.nextLevelId+1],0);
            const nextPosition = new Vector3(0,platform._levels[platform.nextLevelId],0);

            const IsRising = platform.direction === 'up'

            const start = prevPosition// !IsRising ? bottomPosition : topPosition
            const end = nextPosition // !IsRising ? topPosition : bottomPosition
            const speed = platform.speed / 20;

            const animator = entity.getComponent(Animator)
            const clip = animator.getClip('LightAction')
            if (platform.transition >= 0 && platform.transition < 1) {
                //if movement in progress
                platform.transition += dt * speed
                transform.position.copyFrom(
                    Vector3.Lerp(start, end, platform.transition)
                )

                //auto replay light animation
                if (!clip.playing) {
                    clip.stop()
                    clip.play()
                }
            }
            else if (platform.transition >= 1) {
                //if movement overshoot / is over
                platform.transition = -1
                platform.delay = 0
                transform.position.copyFrom(end)

                if (!IsRising && end == topPosition && platform.onReachEnd) {
                    platform.channel.sendActions(platform.onReachEnd)
                }
                else if (IsRising && end == bottomPosition && platform.onReachStart) {
                    platform.channel.sendActions(platform.onReachStart)
                }
                else if(platform.onReachLevel) {
                    platform.channel.sendActions(platform.onReachLevel)
                }
                // send actions
            }
            //fix flickr
            else if (platform.delay >= 0 && platform.delay < 1) {
                platform.delay += dt
            }
            else if (platform.delay >= 1) {
                platform.delay = -1
                clip.stop()
            }
        }
    }
}
