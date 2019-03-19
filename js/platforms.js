function platforms_create() {
    // Création des plateformes

    platformsGroup = game.add.physicsGroup();

    const PLATFORM_POSITIONS = [
        [20, 450, 24],
        [45, 450, 24],
        [100, 450, 24],
        [124, 400, 24],
        [180, 400, 24],
        [300, 400, 24],
        [360, 400, 24],
        [478, 400, 24],
        [500, 400, 24],
        [560, 400, 24],
        [600, 400, 24],
        [850, 250, 24],
        // ... 465
    ];

    for (let i = 0; i < PLATFORM_POSITIONS.length; i++) {
        let [x, y, width] = PLATFORM_POSITIONS[i];
        let s = new Phaser.TileSprite(game, x, y, width, 24, 'brique');
        platformsGroup.add(s);
    }

    platformsGroup.forEach(item => {
        item.body.immovable = true;
        item.body.allowGravity = false;
    });
    // --------------------
}