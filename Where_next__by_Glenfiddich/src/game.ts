import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import Script1 from "../901e4555-8743-49bb-854c-c8b354a3e3e1/src/item"
import Script2 from "../a747f104-5434-42a8-a543-8739c24cf253/src/item"
import Script3 from "../55a10ad0-c973-4692-9e20-76270ef4bdcc/src/item"

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const quater:Quaternion = new Quaternion();
    Quaternion.FromEulerAnglesRef(0, -90, 0,quater)
const transform = new Transform({
  position: new Vector3(16, 0, ),
  rotation: quater,
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

const entity = new Entity('entity')
engine.addEntity(entity)
entity.setParent(_scene)
const gltfShape = new GLTFShape("f2e78a49-b1b8-4643-97b4-237b15e4f8cb/tour_barman_sol.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
entity.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity.addComponentOrReplace(transform2)

const imagesCerf = new Entity('imagesCerf')
engine.addEntity(imagesCerf)
imagesCerf.setParent(_scene)
const transform3 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
imagesCerf.addComponentOrReplace(transform3)
const gltfShape2 = new GLTFShape("4a69bcb1-7e2a-4462-8bfd-2e50d1991b56/images_cerf.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
imagesCerf.addComponentOrReplace(gltfShape2)

const radio = new Entity('radio')
engine.addEntity(radio)
radio.setParent(_scene)
const transform4 = new Transform({
  position: new Vector3(2.5, 6.5, 11),
  rotation: new Quaternion(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(1.0000004768371582, 1, 1.0000004768371582)
})
radio.addComponentOrReplace(transform4)

const videoStream = new Entity('videoStream')
engine.addEntity(videoStream)
videoStream.setParent(_scene)
const transform5 = new Transform({
  position: new Vector3(0.5000000596046448, 1, 8),
  rotation: new Quaternion(1.539415254273621e-15, -0.7071067690849304, 8.429368847373553e-8, -0.7071068286895752),
  scale: new Vector3(3, 3, 3)
})
videoStream.addComponentOrReplace(transform5)

const tours = new Entity('tours')
engine.addEntity(tours)
tours.setParent(_scene)
const transform6 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
tours.addComponentOrReplace(transform6)
const gltfShape3 = new GLTFShape("04ec303f-a599-4f42-9daf-a54e1475220c/tours4.glb")
gltfShape3.withCollisions = true
gltfShape3.isPointerBlocker = true
gltfShape3.visible = true
tours.addComponentOrReplace(gltfShape3)

const tables = new Entity('tables')
engine.addEntity(tables)
tables.setParent(_scene)
const transform7 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
tables.addComponentOrReplace(transform7)
const gltfShape4 = new GLTFShape("04d37408-2b3a-4174-85ea-27108b01b9dd/TABLES.glb")
gltfShape4.withCollisions = true
gltfShape4.isPointerBlocker = true
gltfShape4.visible = true
tables.addComponentOrReplace(gltfShape4)

const bars = new Entity('bars')
engine.addEntity(bars)
bars.setParent(_scene)
const transform8 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bars.addComponentOrReplace(transform8)
const gltfShape5 = new GLTFShape("f6b66985-eb9d-40bf-b918-6e70e0e22ae4/Bars.glb")
gltfShape5.withCollisions = true
gltfShape5.isPointerBlocker = true
gltfShape5.visible = true
bars.addComponentOrReplace(gltfShape5)

const verre = new Entity('verre')
engine.addEntity(verre)
verre.setParent(_scene)
const transform9 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
verre.addComponentOrReplace(transform9)
const gltfShape6 = new GLTFShape("2a4a906c-7167-4d4d-925d-c12d6d46ce4d/verre.glb")
gltfShape6.withCollisions = true
gltfShape6.isPointerBlocker = true
gltfShape6.visible = true
verre.addComponentOrReplace(gltfShape6)

const canapes = new Entity('canapes')
engine.addEntity(canapes)
canapes.setParent(_scene)
const transform10 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
canapes.addComponentOrReplace(transform10)
const gltfShape7 = new GLTFShape("0def7fac-7825-457b-a060-d1321e5c4b8d/canape_vert.glb")
gltfShape7.withCollisions = true
gltfShape7.isPointerBlocker = true
gltfShape7.visible = true
canapes.addComponentOrReplace(gltfShape7)

const videoStream2 = new Entity('videoStream2')
engine.addEntity(videoStream2)
videoStream2.setParent(_scene)
const transform11 = new Transform({
  position: new Vector3(7, 7, 0.5),
  rotation: new Quaternion(2.1770622922413687e-15, 5.960464477539063e-8, -2.4641827444380534e-15, -1),
  scale: new Vector3(1.500000238418579, 1.5, 1.500000238418579)
})
videoStream2.addComponentOrReplace(transform11)

const videoStream3 = new Entity('videoStream3')
engine.addEntity(videoStream3)
videoStream3.setParent(_scene)
const transform12 = new Transform({
  position: new Vector3(0.49999988079071045, 11, 8),
  rotation: new Quaternion(-6.356408404321759e-15, 0.7071067690849304, -8.429368136830817e-8, 0.70710688829422),
  scale: new Vector3(1.5000009536743164, 1.5, 1.5000009536743164)
})
videoStream3.addComponentOrReplace(transform12)

const Elevator = new Entity('Elevator')
engine.addEntity(Elevator)
Elevator.setParent(_scene)
const transform13 = new Transform({
  position: new Vector3(14.5, 0, 13.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
Elevator.addComponent(transform13)

const videoStream4 = new Entity('videoStream4')
engine.addEntity(videoStream4)
videoStream4.setParent(_scene)
const transform14 = new Transform({
  position: new Vector3(13.5, 15, 11.5),
  rotation: new Quaternion(-1.6008176255321509e-16, 0.70710688829422, -8.429368847373553e-8, -0.7071067690849304),
  scale: new Vector3(1.5000064373016357, 1.5, 1.5000064373016357)
})
videoStream4.addComponentOrReplace(transform14)

const vdeco = new Entity('vdeco')
engine.addEntity(vdeco)
vdeco.setParent(_scene)
const transform15 = new Transform({
  position: new Vector3(8, 0, 7.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
vdeco.addComponentOrReplace(transform15)
const gltfShape8 = new GLTFShape("a42c7743-4273-4361-84a3-7e003384e932/V.glb")
gltfShape8.withCollisions = true
gltfShape8.isPointerBlocker = true
gltfShape8.visible = true
vdeco.addComponentOrReplace(gltfShape8)

const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }

const script1 = new Script1()
const script2 = new Script2()
const script3 = new Script3()
// @ts-ignore
script1.init(options)
// @ts-ignore
script2.init(options)
// @ts-ignore
script3.init(options)
script1.spawn(radio, {"startOn":true,"volume":0.1,"onClickText":"Radio On/Off","onClick":[{"entityName":"radio","actionId":"activate","values":{}}],"onActivate":[],"customStation":"https://files.aptero.co/api/public/dl/DkGedXSx?inline=true"}, createChannel(channelId, radio, channelBus))
script2.spawn(videoStream, {"startOn":false,"onClickText":"Play video","volume":1,"onClick":[{"entityName":"videoStream","actionId":"toggle","values":{}}],"customStation":"https://ipfs.io/ipfs/QmY77qmRkibpJw6Z9wEteAoS7RhxAgfjEiFbqZxUX1wwKf?filename=h264_540.mp4"}, createChannel(channelId, videoStream, channelBus))
script2.spawn(videoStream2, {"startOn":false,"onClickText":"Play video","volume":1,"onClick":[{"entityName":"videoStream2","actionId":"toggle","values":{}}],"customStation":"https://ipfs.io/ipfs/QmY77qmRkibpJw6Z9wEteAoS7RhxAgfjEiFbqZxUX1wwKf?filename=h264_540.mp4"}, createChannel(channelId, videoStream2, channelBus))
script2.spawn(videoStream3, {"startOn":false,"onClickText":"Play video","volume":1,"onClick":[{"entityName":"videoStream3","actionId":"toggle","values":{}}],"customStation":"https://ipfs.io/ipfs/QmY77qmRkibpJw6Z9wEteAoS7RhxAgfjEiFbqZxUX1wwKf?filename=h264_540.mp4"}, createChannel(channelId, videoStream3, channelBus))
//script3.spawn(Elevator, {"speed":3,"levels":"0 6 10 14 18","duration":2000}, createChannel(channelId, Elevator, channelBus))
script3.spawn(Elevator, {"speed":5,"levels":"0 6.02 9.96 14.07 18.8","duration":2000}, createChannel(channelId, Elevator, channelBus))
script2.spawn(videoStream4, {"startOn":false,"onClickText":"Play video","volume":1,"onClick":[{"entityName":"videoStream4","actionId":"toggle","values":{}}],"customStation":"https://ipfs.io/ipfs/QmY77qmRkibpJw6Z9wEteAoS7RhxAgfjEiFbqZxUX1wwKf?filename=h264_540.mp4"}, createChannel(channelId, videoStream4, channelBus))