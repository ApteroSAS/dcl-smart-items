import { NPC, NPCDelay } from '@dcl/npc-scene-utils'
import resources from './resources'
import { Dialog } from '@dcl/npc-scene-utils'

export type Props = {
    target?:Entity
}

export default class Bot18 implements IScript<Props> {
    npc:NPC

    init({ inventory }) {
    }

    spawn(host, props, channel) {
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
                    this.npc.playAnimation('Goodbye', true, 2)
                }
            },
            {
                text: 'Good, You can enter. Have a nice day. ',
                isEndOfDialog: true,
                triggeredByNext: () => {
                    this.npc.playAnimation('Goodbye', true, 2)
                }
            },
        ]

        this.npc = new NPC(
            {
                position: new Vector3(0, 1.6, 0),
                rotation: Quaternion.Euler(0, 180, 0)
            },
            resources.models.robots.charlie,
            () => {
                // animations
                this.npc.playAnimation('Hello', true, 2)
                const dummyent = new Entity()
                dummyent.addComponent(
                    new NPCDelay(2, () => {
                        this.npc.playAnimation('Talk')
                    })
                )
                engine.addEntity(dummyent)
                // sound
                this.npc.addComponentOrReplace(new AudioSource(resources.sounds.charlie))
                this.npc.getComponent(AudioSource).playOnce()
                // dialog UI
                this.npc.talk(dialog)
            },
            {
                faceUser: true,
                portrait: {
                    path: 'images/portraits/charlie.png',
                    height: 256,
                    width: 256,
                    section: {
                        sourceHeight: 512,
                        sourceWidth: 512
                    }
                },
                onWalkAway: () => {
                    this.npc.playAnimation('Goodbye', true, 2)
                }
            }
        )
        this.npc.setParent(host)


        const ringShape = resources.models.robots.rings
        const charlieRings = new Entity()
        charlieRings.addComponent(ringShape)
        charlieRings.addComponent(
            new Transform({
                position: new Vector3(0, -0.55, -0.2)
            })
        )
        charlieRings.setParent(this.npc)

    }
}