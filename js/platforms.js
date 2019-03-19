// -- Fonction pour la création de nos briques 
function platforms_create() {

    // -- Ajouts d'un objet de type physicsGroup sur nos platforms(briques)
    platformsGroup = game.add.physicsGroup();

    // -- Tableau des positions de nos briques
    const PLATFORM_POSITIONS = [
        [20, 450, 24],
        [45, 450, 24],
        [100, 450, 24],
        [124, 400, 24],
        [180, 400, 24],
        [300, 400, 24],
        [360, 400, 24],
        [478, 400, 24],
        [560, 400, 24],
        [600, 400, 24],
        [650, 400, 24],
        [700, 400, 24],
        [800, 400, 24],
        [900, 400, 24],
        [1000, 400, 24],
        [850, 250, 24],
        [950, 250, 24],
        // ... 465
    ];

    // -- Boucle pour l'affichage de nos briques 
    for (let i = 0; i < PLATFORM_POSITIONS.length; i++) {
        let [x, y, width] = PLATFORM_POSITIONS[i];
        let s = new Phaser.TileSprite(game, x, y, width, 24, 'brique');
        platformsGroup.add(s);
    }

    // -- Gérer la gavité et l'immobilité des éléments briques
    platformsGroup.forEach(item => {
        item.body.immovable = true;
        item.body.allowGravity = false;
    });

}