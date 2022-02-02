import { ElevatorSystem, Elevator, Direction } from './elevator'
import {Delay} from "./Timer/component/delay";


export type Props = {
    speed?: number
    autoStart?: boolean
    levels?:string
    duration?: number
    onReachStart?: Actions
    onReachEnd?: Actions
    onReachLevel ?: Actions
}

export default class Platform implements IScript<Props> {
    init() {
        engine.addSystem(new ElevatorSystem())
    }

    changeDirection(entity: Entity, newDirection?: Direction, useTransition = true) {
        const platform = entity.getComponent(Elevator)
        const isRising = platform.direction === 'up'

        // compute new value, don't rerun if already moving in the right direction
        if (newDirection === 'down') {
            if (!isRising) return
            platform.nextLevelId = platform._levels.length - 2;
            platform.direction = 'down';
        } else if (newDirection === 'up') {
            if (isRising) return
            platform.nextLevelId =  1;
            platform.direction = 'up';
        }


        new Delay(platform.duration, ()=> {
            // start transition
            if (useTransition) {
                if (platform.transition === -1) {
                    //Restart motion
                    platform.transition = 0
                } else {
                    //start from in movement for networking user
                    platform.transition = 1 - platform.transition
                }
            } else {
                platform.transition = 1
            }
        })
    }

    moveToNext(entity: Entity,useTransition = true){
        const platform = entity.getComponent(Elevator)
        const isRising = platform.direction === 'up';
        const nextLevelId = platform.nextLevelId;

        if(isRising) {
            //If it goes up
            if(nextLevelId != platform._levels.length -1)
                //If we are not at the top
                platform.nextLevelId++;
            else {
                //If we are at the top
                //We go back down
                platform.nextLevelId = platform._levels.length - 2;
                platform.direction = 'down';
            }
        }
        else if (!isRising) {
            //if it goes down
            if(nextLevelId != 0)
                //if we are not at the bottom
                platform.nextLevelId--;
            else {
                //if we are at the bottom
                //we go back up
                platform.nextLevelId =  1;
                platform.direction = 'up';
            }
        }
        // start transition
        if (useTransition) {
            entity.addComponent(new Delay(platform.duration, ()=> {
                if (platform.transition === -1) {
                    //Restart motion
                    platform.transition = 0
                } else {
                    //start from in movement for networking user
                    platform.transition = 1 - platform.transition
                }
            }))
        } else {
            platform.transition = 1
        }

    }

    moveToSpecific(entity: Entity, nextLevel: number, newDirection?: Direction, useTransition = true){
        const platform = entity.getComponent(Elevator)
        const isRising = platform.direction === 'up'

        platform.direction = newDirection;
        platform.nextLevelId = nextLevel;

        // start transition
        if (useTransition) {
            if (platform.transition === -1) {
                //Restart motion
                platform.transition = 0
            } else {
                //start from in movement for networking user
                platform.transition = 1 - platform.transition
            }
        } else {
            platform.transition = 1
        }
    }

    spawn(host: Entity, props: Props, channel: IChannel) {
        const { speed, autoStart, levels, duration, onReachStart, onReachEnd, onReachLevel } = props
        //the levels are stored on a string, separated by space
        let levelsArray = levels.split(" ").map(x => parseFloat(x));
        //mentioning the level 0 in the string is not required
        if(levelsArray[0] != 0) levelsArray.unshift(0);

        //On spawn we setup the object properly
        const platform = new Entity(host.name + '-platform')
        platform.setParent(host)
        platform.addComponent(new Transform({ position: new Vector3(0, 0, 0) }))
        platform.addComponent(new GLTFShape('models/ascenseur_V3_Gspot.glb'))
        platform.addComponent(
            new Elevator(channel, speed, levelsArray, duration, onReachStart, onReachEnd,onReachLevel)
        )

        // add animation
        const animator = new Animator()
        const clip = new AnimationState('main', { looping: true })
        animator.addClip(clip)
        platform.addComponent(animator)
        clip.play()

        // handle actions
        channel.handleAction('goToEnd', () => this.changeDirection(platform, 'up'))
        channel.handleAction('goToStart', () => this.changeDirection(platform, 'down'))
        channel.handleAction('goToNext', ()=> this.moveToNext(platform))


        // sync initial direction
        channel.request<Direction>('direction', (direction) =>
            this.moveToSpecific(platform, platform.getComponent(Elevator).nextLevelId, direction, false)
        )
        channel.reply<Direction>(
            'direction',
            () => platform.getComponent(Elevator).direction
        )
        // sync initial level
        channel.request<number>('levelId', (level) =>
            this.moveToSpecific(platform, level, platform.getComponent(Elevator).direction, false)
        )
        channel.reply<number>(
            'levelId',
            () => platform.getComponent(Elevator).nextLevelId
        )

        // auto start platform
        if (autoStart !== false) {
            const goToNextAction: BaseAction<{}> = {
                entityName: host.name,
                actionId: 'goToNext',
                values: {}
            }
            channel.sendActions([goToNextAction])
        }
    }
}
