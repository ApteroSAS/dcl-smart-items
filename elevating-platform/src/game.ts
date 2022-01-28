import { Spawner } from '../node_modules/decentraland-builder-scripts/spawner'
import Platform, { Props } from './item'

const platform = new Platform()
const spawner = new Spawner<Props>(platform)

spawner.spawn('platform', new Transform({ position: new Vector3(8, 0, 8) }), {
    "speed":5,
    "levels":"5 10",
    "duration":1000,
    "autoStart":true,
    "onReachEnd":[{ entityName: 'platform', actionId: 'goToStart', values: {} }],
    "onReachStart":[{ entityName: 'platform', actionId: 'goToEnd', values: {} }],
    "onReachLevel":[{ entityName: 'platform', actionId: 'goToNext', values: {} }],
})
