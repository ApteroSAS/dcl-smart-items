import {movePlayerTo} from "@decentraland/RestrictedActions";
import { Dialog } from '@dcl/npc-scene-utils'
import { NPCDelay } from '@dcl/npc-scene-utils'
import { NPC } from '@dcl/npc-scene-utils'
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
                text: "Are you over 18 years old or of legal age to view alcoholic content in your country?",
                isQuestion: true,
                offsetY: 20,
                buttons: [
                    { label: 'YES', goToDialog: 2 },
                    { label: 'NO', goToDialog: 1 }
                ]
            },
            {
                text: "Unfortunately, you cannot enter. The site contains alcoholic content, inappropriate for your age.",
                isEndOfDialog: true,
                triggeredByNext: () => {
                    this.npc.playAnimation('hello', true, 2)
                }
            },
            {
                text: 'Good, You can enter. Enjoy your stay !',
                isEndOfDialog: true,
                triggeredByNext: () => {
                    movePlayerTo(target.getComponent(Transform).position)
                    this.npc.playAnimation('hello', true, 2)
                }
            }

        ]

        this.npc = new NPC(
            {
                position: new Vector3(0, 0, 0),
                rotation: Quaternion.Euler(0, 0, 0)
            },
            'src/smart-items/npc/models/avatar_npc_V2.glb',
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
                this.npc.addComponentOrReplace(new AudioSource(new AudioClip('src/smart-items/npc/sounds/Hi.mp3')))
                this.npc.getComponent(AudioSource).playOnce()
                // dialog UI
                this.npc.talk(dialog)
            },
            {
                idleAnim:"idle",
                faceUser:false,
                reactDistance:2,
                portrait: {
                    path: 'src/smart-items/npc/images/charlie-avatar.png',
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