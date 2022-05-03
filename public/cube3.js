const { enable3d, Scene3D, Canvas, THREE } = ENABLE3D;

let debugmesh = null;

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
    this.third.camera.position.set(-8, 8, 8); // controls the camera posistion
    this.third.camera.lookAt(0, 2, 0);
    // These things need to be in a array. Create an array, use the array name ".push" to add all these elements to the array.
    // Use "foreach" to cycle through all the arrays and pass them to the "magic line".
    //@todo do not use abrevations

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const sideColors = [
      [
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
      ],
      [
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
      ],
    ];
    const CUBE_SIZE = 3;
    let cubeCount = 0;
    for (let i = 0; i < CUBE_SIZE; i++) {
      for (let j = 0; j < CUBE_SIZE; j++) {
        for (let k = 0; k < CUBE_SIZE; k++) {
          
          const cube = new THREE.Mesh(geometry, sideColors[cubeCount]);
          cube.position.set(i, j, k);
          debugmesh = cube;

          this.third.add.existing(cube); //magic line
          cubeCount++;
        }
      }
    }
    // const cube = new THREE.Mesh(geometry, materials);
    // cube.position.x = -1;
    // cube.position.y = 1;

    // this.third.add.existing(cube); //magic line
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
