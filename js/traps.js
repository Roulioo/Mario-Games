function traps_create() {
    // Création des plateformes

    trapsGroup = game.add.physicsGroup();

    let x = 0;
    let y = 520;
    let width = 111;

    const TRAP_POSITIONS = [
        [x, y, width]
    ]

    for (let i = 0; i < 20; i++) {
        let [x, y, width] = TRAP_POSITIONS[i];
        TRAP_POSITIONS.push([TRAP_POSITIONS[i][0] + 120, y, width]);
        let s = new Phaser.TileSprite(game, x, 545, width, 111, 'spikes');

        trapsGroup.add(s);
    }

    trapsGroup.forEach(item => {
        item.body.immovable = true;
        item.body.allowGravity = false;
    });
    // --------------------
}