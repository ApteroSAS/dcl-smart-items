export default {
    sounds: {
        charlie: new AudioClip('sounds/charlie.mp3')
    },
    models: {
        standard: {
            baseScene: new GLTFShape('models/standard/baseScene.glb')
        },
        robots: {
            charlie: 'models/robots/charlie.glb'

        }
    },
    textures: {
        blank: new Texture('images/ui/blank.png'),
        buttonE: new Texture('images/ui/buttonE.png'),
        buttonF: new Texture('images/ui/buttonF.png'),
        leftClickIcon: new Texture('images/ui/leftClickIcon.png'),
        textPanel: new Texture('images/ui/textPanel.png')
    }
}
