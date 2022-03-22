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
    const texture = new THREE.TextureLoader().load(
      "textures/land_ocean_ice_cloud_2048.jpg"
    );

    // immediately use the texture for material creation
    const material = new THREE.MeshBasicMaterial({ map: texture });
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

    const blocks = [];

    const red = this.third.add.material({
      lambert: { color: 0xff0000 },
    });
    const green = this.third.add.material({
      lambert: { color: 0x00ff00 },
    });
    const blue = this.third.add.material({
      lambert: { color: 0x0000ff },
    });
    const purple = this.third.add.material({
      lambert: { color: 0x7f00ff },
    });
    const orange = this.third.add.material({
      lambert: { color: 0xffa500 },
    });

    const colors = [red, green, blue, purple, orange];
    const CUBE_SIZE = 3;
    const addTower = () => {
      for (let i = 0; i < CUBE_SIZE; i++) {
        for (let j = 0; j < CUBE_SIZE; j++) {
          for (let k = 0; k < CUBE_SIZE; k++) {
            //console.log(i, j, k);
            blocks.push(
              this.third.physics.add.box(
                { x: i, y: j, z: k, width: 1, height: 1 },
                { custom: colors[i % colors.length] }
              )
            );
          }
        }
      }
      blocks.forEach((block) => {
        block.body.setFriction(0.8);
      });
    };
    addTower();

    const raycaster = new THREE.Raycaster();

    this.input.on("pointerdown", () => {
      const { x, y } = this.getPointer();

      raycaster.setFromCamera({ x, y }, this.third.camera);

      const intersection = raycaster.intersectObjects(blocks);

      if (intersection.length > 0) {
        const block = intersection[0].object;
        this.selected = block;
        this.selected?.body.setCollisionFlags(2);

        this.mousePosition.copy(intersection[0].point);
        this.blockOffset.subVectors(this.selected.position, this.mousePosition);
      }

      this.prev = { x, y };
    });

    this.input.on("pointerup", () => {
      this.selected?.body.setCollisionFlags(0);
      this.selected = null;
    });
  }

  getPointer() {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const pointer = this.input.activePointer;
    const x = (pointer.x / this.cameras.main.width) * 2 - 1;
    const y = -(pointer.y / this.cameras.main.height) * 2 + 1;
    return { x, y };
  }

  update() {
    if (this.selected?.body.getCollisionFlags() === 2) {
      const { x, y } = this.getPointer();

      const speed = 5;
      const movementX = (x - this.prev.x) * speed;
      const movementZ = (y - this.prev.y) * -speed;

      // since the scene has a rotation of -Math.PI / 4,
      // we adjust the movement by -Math.PI / 4
      const v3 = new THREE.Vector3(movementX, 0, movementZ);
      v3.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 4);

      this.selected.position.x += v3.x;
      this.selected.position.y += v3.y;
      this.selected.position.z += v3.z;

      this.selected.body.needUpdate = true;

      this.prev = { x, y };
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
