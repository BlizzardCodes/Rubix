const { enable3d, Scene3D, Canvas, THREE } = ENABLE3D;

class MainScene extends Scene3D {
  constructor() {
    super({ key: "MainScene" });
  }

  init() {
    this.accessThirdDimension();
    this.third.renderer.outputEncoding = THREE.LinearEncoding;

    this.selected = null;
    this.mousePosition = new THREE.Vector3();
    this.blockOffset = new THREE.Vector3();
    this.prev == { x: 0, y: 0 };
  }

  async create() {
    // this.third.warpSpeed('-orbitControls')

    const { lights } = await this.third.warpSpeed("-ground");

    const { hemisphereLight, ambientLight, directionalLight } = lights;
    //console.log(hemisphereLight.intensity, ambientLight.intensity, directionalLight.intensity)

    const intensity = 0.2;
    hemisphereLight.intensity = intensity;
    ambientLight.intensity = intensity;
    directionalLight.intensity = intensity;
    
    const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffcccc });
    const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const orangeMaterial = new THREE.MeshBasicMaterial({ color: 0xfa5000 });
    const yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xfff000 });
    const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const sideColors = [
      [
        blackMaterial,
        blueMaterial,
        blackMaterial,
        yellowMaterial,
        blackMaterial,
        orangeMaterial,
      ],
      [
        blackMaterial,
        blueMaterial,
        blackMaterial,
        yellowMaterial,
        blackMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blueMaterial,
        blackMaterial,
        yellowMaterial,
        redMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blueMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        orangeMaterial,
      ],
      [
        blackMaterial,
        blueMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blueMaterial,
        blackMaterial,
        blackMaterial,
        redMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blueMaterial,
        whiteMaterial,
        blackMaterial,
        blackMaterial,
        orangeMaterial,
      ],
      [
        blackMaterial,
        blueMaterial,
        whiteMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blueMaterial,
        whiteMaterial,
        blackMaterial,
        redMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blackMaterial,
        blackMaterial,
        yellowMaterial,
        blackMaterial,
        orangeMaterial,
      ],
      [
        blackMaterial,
        blackMaterial,
        blackMaterial,
        yellowMaterial,
        blackMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blackMaterial,
        blackMaterial,
        yellowMaterial,
        redMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        orangeMaterial,
      ],
      [
        blackMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        redMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blackMaterial,
        whiteMaterial,
        blackMaterial,
        blackMaterial,
        orangeMaterial,
      ],
      [
        blackMaterial,
        blackMaterial,
        whiteMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
      ],
      [
        blackMaterial,
        blackMaterial,
        whiteMaterial,
        blackMaterial,
        redMaterial,
        blackMaterial,
      ],
      [
        greenMaterial,
        blackMaterial,
        blackMaterial,
        yellowMaterial,
        blackMaterial,
        orangeMaterial,
      ],
      [
        greenMaterial,
        blackMaterial,
        blackMaterial,
        yellowMaterial,
        blackMaterial,
        orangeMaterial,
      ],
      [
        greenMaterial,
        blackMaterial,
        blackMaterial,
        yellowMaterial,
        redMaterial,
        blackMaterial,
      ],
      [
        greenMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        orangeMaterial,
      ],
      [
        greenMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
      ],
      [
        greenMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
        redMaterial,
        blackMaterial,
      ],
      [
        greenMaterial,
        blackMaterial,
        whiteMaterial,
        blackMaterial,
        blackMaterial,
        orangeMaterial,
      ],
      [
        greenMaterial,
        blackMaterial,
        whiteMaterial,
        blackMaterial,
        blackMaterial,
        blackMaterial,
      ],
      [
        greenMaterial,
        blackMaterial,
        whiteMaterial,
        blackMaterial,
        redMaterial,
        blackMaterial,
      ],
    ];
    const blocks = [];
    const CUBE_SIZE = 3;
    let cubeCount = 0;
    for (let i = 0; i < CUBE_SIZE; i++) {
      for (let j = 0.5; j < CUBE_SIZE; j++) {
        for (let k = 0; k < CUBE_SIZE; k++) {
          const cube = new THREE.Mesh(geometry, sideColors[cubeCount]);
          cube.position.set(i, j, k);
          this.third.add.existing(cube); //magic line
          cubeCount++;
        }
      }
    }
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
