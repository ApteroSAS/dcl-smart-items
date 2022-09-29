import { Spawner } from '../node_modules/decentraland-builder-scripts/spawner'
import Platform, { Props } from './item'

const platform = new Platform()
const spawner = new Spawner<Props>(platform)

spawner.spawn('platform', new Transform({ position: new Vector3(4, 0, 8) }), {
    duration: 2000,
    speed: 5,
    levels:"0 5 10"
})
