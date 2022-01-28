import * as utils from "@dcl/ecs-scene-utils";

export type Props = {
    onClick?: Actions
    onOpen?: Actions
    onClose?: Actions
    onClickText?: string
}

export default class Button implements IScript<Props> {
    //openClip = new AudioClip('sounds/open.mp3')
    //closeClip = new AudioClip('sounds/close.mp3')

    active: Record<string, boolean> = {}

    init() {}

    toggle(entity: Entity, value: boolean) {
        if (this.active[entity.name] === value) return


        const animator = entity.getComponent(Animator)
        const openClip = animator.getClip('open')
        const closeClip = animator.getClip('close')
        openClip.stop()
        closeClip.stop()
        const clip = value ? openClip : closeClip

        if(value){
            entity.addComponent(new utils.Delay(1000,() => {
                this.toggle(entity, false)}
            ));
        }
        clip.play()

        this.active[entity.name] = value
    }

    spawn(host: Entity, props: Props, channel: IChannel) {
        const door = new Entity(host.name + '-button')
        door.setParent(host)

        const animator = new Animator()
        const closeClip = new AnimationState('close', { looping: false })
        const openClip = new AnimationState('open', { looping: false })
        animator.addClip(closeClip)
        animator.addClip(openClip)
        door.addComponent(animator)
        openClip.stop()

        door.addComponent(new GLTFShape('models/porte_GSpot_anim_test_3.glb'))

        door.addComponent(
            new OnPointerDown(
                () => {
                    channel.sendActions(props.onClick)
                },
                {
                    button: ActionButton.POINTER,
                    hoverText: props.onClickText,
                    distance: 6,
                }
            )
        )

        this.active[door.name] = false

        // handle actions
        channel.handleAction('open', ({ sender }) => {
            if (!this.active[door.name]) {


                this.toggle(door, true);


            }
            if (sender === channel.id) {
                channel.sendActions(props.onOpen)
            }
        })
        channel.handleAction('close', ({ sender }) => {
            if (this.active[door.name]) {
                this.toggle(door, false)
            }
            if (sender === channel.id) {
                channel.sendActions(props.onClose)
            }
        })
        channel.handleAction('toggle', ({ sender }) => {
            const newValue = !this.active[door.name]
            this.toggle(door, newValue)
            if (sender === channel.id) {
                channel.sendActions(newValue ? props.onOpen : props.onClose)
            }
        })

        // sync initial values
        channel.request<boolean>('isOpen', (isOpen) =>
            this.toggle(door, isOpen)
        )
        channel.reply<boolean>('isOpen', () => this.active[door.name])
    }
}