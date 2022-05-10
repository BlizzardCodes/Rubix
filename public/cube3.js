/*
Easy Parts
- Keyboard input. (If i press f, then the cube would rotate the front side clockwise)
- Rotation around the center of the cube, not the corner.
- Make floating arrow to define with side is up.
- Tracking which colored cube is in which physical location.


Hard Parts
- Rotate a face with animations.
- Update the data model.

Parts We May Not Get To
- Autosolving cube.
- Randomizing cube.
*/

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

    this.third.camera.lookAt(2, 2, 2);

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    let sideColors = getSideColors();

    const CUBE_SIZE = 3;
    let cubeCount = 0;
    for (let i = 0; i < CUBE_SIZE; i++) {
      for (let j = 0; j < CUBE_SIZE; j++) {
        for (let k = 0; k < CUBE_SIZE; k++) {
          const cube = new THREE.Mesh(geometry, sideColors[cubeCount]);
          cube.position.set(i - 1.5, j - 1.5, k - 1.5);
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
