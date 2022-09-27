import { Spawner } from '../node_modules/decentraland-builder-scripts/spawner'
import Bot18, {Props} from './item'
import resources from './resources'

// Base scene
const baseScene = new Entity()
baseScene.addComponent(resources.models.standard.baseScene)
baseScene.addComponent(new Transform())
engine.addEntity(baseScene)


const bot18 = new Bot18();
const spawner = new Spawner<Props>(bot18)
spawner.spawn("bot18",
    new Transform({position:new Vector3(0,0,0)}),
    {
        "target": null
    })