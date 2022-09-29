import { Spawner } from '../node_modules/decentraland-builder-scripts/spawner'
import Bot18, { Props } from './item'

const target = new Entity()
target.addComponent(new BoxShape())
target.addComponent(new Transform({position:new Vector3(7,0,5)}))
engine.addEntity(target)

const entity = new Entity()
entity.addComponent(new PlaneShape())
entity.addComponent(new Transform({
    position:new Vector3(7,0,6),
    rotation:new Vector3(90,0,0),
    scale:new Vector3(10,5,1)
}))
engine.addEntity(entity)



const bot18 = new Bot18()
const spawner = new Spawner<Props>(bot18)

spawner.spawn(
    'bot18',
    new Transform({
        position: new Vector3(7, 0, 8)
    }),
    {
        target:target
    }
)
