import { Spawner } from '../node_modules/decentraland-builder-scripts/spawner'
import Bot18, { Props } from './item'

const entity = new Entity()
entity.addComponent(new BoxShape())
entity.addComponent(new Transform({position:new Vector3(4,0,5)}))
engine.addEntity(entity)


const bot18 = new Bot18()
const spawner = new Spawner<Props>(bot18)

spawner.spawn(
    'bot18',
    new Transform({
        position: new Vector3(4, 0, 8)
    }),
    {
        target:entity
    }
)
