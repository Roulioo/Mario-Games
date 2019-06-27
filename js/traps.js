function traps_create() {

    // -- Création des pièges
    trapsGroup = game.add.physicsGroup();

    // -- Position de notre first piège 
    let x = 0;
    let y = 520;
    let width = 111;

    // -- Constante qui stockera les positions de nos pièges 
    const TRAP_POSITIONS = [
        [x, y, width]
    ]

    // -- Boucle créations des trappes 
    for (let i = 0; i < 29; i++) {

        let [x, y, width] = TRAP_POSITIONS[i];

        // -- Ajouts des traps dans notre tableau
        TRAP_POSITIONS.push([TRAP_POSITIONS[i][0] + 120, y, width]);

        // -- Création d'un sprite phaser
        let sprites = new Phaser.TileSprite(game, x, 545, width, 111, 'spikes');

        // -- On ajoute nos sprites (traps) 
        trapsGroup.add(sprites);
    }

    // -- Function pour gérer la gravité et immobilité des pièges 
    trapsGroup.forEach(item => {

        // -- Permet qu'elle ne soit pas déplaçable lors d'un contact 
        item.body.immovable = true;

        // -- Aucune gravité donc immobile 
        item.body.allowGravity = false;

    });
    
}