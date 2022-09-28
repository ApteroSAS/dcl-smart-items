import { NPC, NPCDelay } from '@dcl/npc-scene-utils'
import { Dialog } from '@dcl/npc-scene-utils'
import { movePlayerTo } from '@decentraland/RestrictedActions'

export type Props = {
    target?:Entity
}

export default class Bot18 implements IScript<Props> {
    npc:NPC

    init() { }

    spawn(host: Entity, props: Props, channel: IChannel) {
        const {target} = props;


        const dialog: Dialog[] = [
            {
                text: "Hey, I'm Charlie - The body guard. Are you over 18 years old ?",
                isQuestion: true,
                offsetY: 20,
                buttons: [
                    { label: 'YES', goToDialog: 2 },
                    { label: 'NO', goToDialog: 1 }
                ]
            },
            {
                text: "Come back when you grow up.",
                isEndOfDialog: true,
                triggeredByNext: () => {
                    this.npc.playAnimation('hello', true, 2)
                }
            },
            {
                text: 'Good, You can enter. Have a nice day. ',
                isEndOfDialog: true,
                triggeredByNext: () => {
                    movePlayerTo(target.getComponent(Transform).position)
                    this.npc.playAnimation('hello', true, 2)
                }
            },
        ]

        this.npc = new NPC(
            {
                position: new Vector3(0, 0, 0),
                rotation: Quaternion.Euler(0, 0, 0)
            },
            'models/avatar_npc_V2.glb',
            () => {
                // animations
                this.npc.playAnimation('salut_formel', true, 2)
                const dummyent = new Entity()
                dummyent.addComponent(
                    new NPCDelay(2, () => {
                        this.npc.playAnimation('speaking')
                    })
                )
                engine.addEntity(dummyent)
                // sound
                this.npc.addComponentOrReplace(new AudioSource(new AudioClip('sounds/Hi.mp3')))
                this.npc.getComponent(AudioSource).playOnce()
                // dialog UI
                this.npc.talk(dialog)
            },
            {
                idleAnim:"idle",
                portrait: {
                    path: 'images/portraits/charlie-avatar.png',
                    height: 256,
                    width: 256,
                    section: {
                        sourceHeight: 512,
                        sourceWidth: 512
                    },
                },
                onWalkAway: () => {
                    this.npc.playAnimation('hello', true, 2)
                }
            }
        )
        this.npc.setParent(host)
    }
} 