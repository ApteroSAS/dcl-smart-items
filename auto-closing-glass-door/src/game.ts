import { Spawner } from '../node_modules/decentraland-builder-scripts/spawner'
import Door, { Props } from './item'

const door = new Door()
const spawner = new Spawner<Props>(door)

spawner.spawn(
'door',
new Transform({
  position: new Vector3(4, 0, 8)
}),
{
  onClick: [
    {
      actionId: 'toggle',
      entityName: 'door',
      values: {}
    }
  ],
  openDuration:3000,
  position: "0 0 0"
}
)
