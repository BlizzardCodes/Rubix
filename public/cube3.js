const { enable3d, Scene3D, Canvas, THREE } = ENABLE3D;
class MainScene extends Scene3D {
  constructor() {
    super({ key: "MainScene" });
  }

  init() {
    this.accessThirdDimension({ gravity: { x: 0, y: -20, z: 0 } });
    this.third.renderer.outputEncoding = THREE.LinearEncoding;

    this.selected = null;
    this.mousePosition = new THREE.Vector3();
    this.blockOffset = new THREE.Vector3();
    this.prev == { x: 0, y: 0 };
  }

  async create() {
    const texture = new THREE.TextureLoader().load("textures/checkerd.png");

    // immediately use the texture for material creation
    const imageMaterial = new THREE.MeshBasicMaterial({ map: texture });
    // this.third.warpSpeed('-orbitControls')

    const { lights } = await this.third.warpSpeed("-orbitControls");

    const { hemisphereLight, ambientLight, directionalLight } = lights;
    //console.log(hemisphereLight.intensity, ambientLight.intensity, directionalLight.intensity)

    const intensity = 0.4;
    hemisphereLight.intensity = intensity;
    ambientLight.intensity = intensity;
    directionalLight.intensity = intensity;
    this.third.camera.position.set(-8, 8, 8);
    this.third.camera.lookAt(0, 2, 0);

    //@todo do not use abrevations
    var tbrd = new THREE.BoxGeometry(1, 2, 1); //topBottomRight
    var tbcd = new THREE.BoxGeometry(1, 2, 1);
    var tbl = new THREE.BoxGeometry(1, 2, 1);
    var tcr = new THREE.BoxGeometry(1, 2, 1);
    var tcc = new THREE.BoxGeometry(1, 2, 1);
    var tcl = new THREE.BoxGeometry(1, 2, 1);
    var ttr = new THREE.BoxGeometry(1, 2, 1);
    var ttc = new THREE.BoxGeometry(1, 2, 1);
    var ttl = new THREE.BoxGeometry(1, 2, 1);
    var cbr = new THREE.BoxGeometry(1, 2, 1);
    var cbc = new THREE.BoxGeometry(1, 2, 1);
    var cbl = new THREE.BoxGeometry(1, 2, 1);
    var ccr = new THREE.BoxGeometry(1, 2, 1);
    var ccc = new THREE.BoxGeometry(1, 2, 1);
    var ccl = new THREE.BoxGeometry(1, 2, 1);
    var ctr = new THREE.BoxGeometry(1, 2, 1);
    var ctc = new THREE.BoxGeometry(1, 2, 1);
    var ctl = new THREE.BoxGeometry(1, 2, 1);
    var bbr = new THREE.BoxGeometry(1, 2, 1);
    var bbc = new THREE.BoxGeometry(1, 2, 1);
    var bbl = new THREE.BoxGeometry(1, 2, 1);
    var bcr = new THREE.BoxGeometry(1, 2, 1);
    var bcc = new THREE.BoxGeometry(1, 2, 1);
    var bcl = new THREE.BoxGeometry(1, 2, 1);
    var btr = new THREE.BoxGeometry(1, 2, 1);
    var btc = new THREE.BoxGeometry(1, 2, 1);
    var btl = new THREE.BoxGeometry(1, 2, 1);

    var tbrm = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var tbcm = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var tbl = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var tcr = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var tcc = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var tcl = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var ttr = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var ttl = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var ttc = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var ttr = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var ttc = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var ttl = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var ttc = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];
    var ttr = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];

    var mesh = new THREE.Mesh(tbrd, tbrm);
    //scene.add(mesh);
    this.third.add.existing(mesh); //magic line
  }
}

const config = {
  type: Phaser.WEBGL,
  transparent: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth * Math.max(1, window.devicePixelRatio / 2),
    height: window.innerHeight * Math.max(1, window.devicePixelRatio / 2),
  },
  scene: [MainScene],
  ...Canvas(),
};

window.addEventListener("load", () => {
  enable3d(() => new Phaser.Game(config)).withPhysics("/lib/ammo/kripken");
});
