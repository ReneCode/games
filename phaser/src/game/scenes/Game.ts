import { Scene } from "phaser";

export class Game extends Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super("Game");
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("background", "bg.png");
    this.load.image("logo", "logo.png");
    this.load.image("ground", "ground.png");
    this.load.image("redbox", "redbox.png");
    this.load.image("ball", "ball.png");
  }

  create() {
    this.add.image(512, 384, "background");

    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    const stars = this.physics.add.group({
      key: "ball",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      // @ts-ignore
      child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.5));
      child.setBounceX(Phaser.Math.FloatBetween(0.2, 0.4));
    });

    stars.children.each((childA) => {
      stars.children.each((childB) => {
        if (childA !== childB) {
          this.physics.add.collider(childA, childB);
        }
      });
    });

    // const line = new Phaser.Geom.Line(100, 100, 600, 100);
    // Phaser.Actions.RandomLine(stars.children.getArray(), line);

    this.physics.add.collider(stars, platforms);

    this.player = this.physics.add.sprite(100, 450, "redbox");

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, stars);

    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  update(time: number, delta: number): void {
    this.events.on("newStars", () => {
      console.log("newStars event received");
    });

    if (this.cursors) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
      } else {
        this.player.setVelocityX(0);
      }

      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);

        this.events.emit("newStars", { x: 300, y: 400 });
      }
    }
  }
}
