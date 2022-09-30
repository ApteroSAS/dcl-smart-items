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
                text: 'Good, You can enter.',
                triggeredByNext: () => {
                    movePlayerTo(target.getComponent(Transform).position)
                }
            },
            {
                text: 'Do you want to know more about this project ?',
                isQuestion: true,
                buttons: [
                    { label: 'YES', goToDialog: 4 },
                    { label: 'NO', goToDialog: 10 }
                ]
            },
            {
                text: 'Glenfiddich brand together with Daniel Rycharski created a report about the artist\'s life and work.',
                skipable:true
            },
            {
                text: 'His creativity is crossing borders by making art popular outside of urban areas.',
                skipable:true
            },
            {
                text: 'Collectively we are crossing another border by presenting this story of art and artist into the metaverse.',
                skipable:true
            },
            {
                text: 'This exclusive piece will be available for viewing only in Decentraland in the Glenfiddich area.',
                skipable:true
            },
            {
                text: 'Click on the screen to play the movie',
                skipable:true
            },
            {
                text: 'Enjoy your stay !',
                isEndOfDialog: true,
                triggeredByNext: () => {
                    this.npc.playAnimation('hello', true, 2)
                }
            }

        ]

        this.npc = new NPC(
            {
                position: new Vector3(0, 0, 0),
                rotation: Quaternion.Euler(0, 0, 0)
            },
            '15874290-2f97-4d32-af04-7bf5d6f7bb2d/models/avatar_npc_V2.glb',
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
                this.npc.addComponentOrReplace(new AudioSource(new AudioClip('15874290-2f97-4d32-af04-7bf5d6f7bb2d/sounds/Hi.mp3')))
                this.npc.getComponent(AudioSource).playOnce()
                // dialog UI
                this.npc.talk(dialog)
            },
            {
                idleAnim:"idle",
                faceUser:true,
                reactDistance:4,
                portrait: {
                    path: '15874290-2f97-4d32-af04-7bf5d6f7bb2d/images/portraits/charlie-avatar.png',
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