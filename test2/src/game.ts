import { Spawner } from '../node_modules/decentraland-builder-scripts/spawner'
import DialogElement, { Props } from './item'

const dialogElement = new DialogElement()
const spawner = new Spawner<Props>(dialogElement)

spawner.spawn(
    'dialogElement',
    new Transform({
        position: new Vector3(4, 0, 8)
    }),
    {

    }
)

const entity = new Entity()
entity.addComponent(new BoxShape())
entity.addComponent(new Transform())
engine.addEntity(entity)