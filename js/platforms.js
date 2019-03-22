// -- Fonction pour la création de nos briques 
function platforms_create() {

    // -- Ajouts d'un objet de type physicsGroup sur nos platforms(briques)
    platformsGroup = game.add.physicsGroup();

    // -- Tableau des positions de nos briques
    const PLATFORM_POSITIONS = [

        [0, 450, 24],
        [25, 450, 24],

        [50, 450, 24],
        [75, 450, 24],

        [100, 450, 24],
        [125, 450, 24],

        [145, 450, 24],
        //[175, 450, 24],

        [210, 450, 24],
        [225, 450, 24],

        [250, 450, 24],
        [275, 450, 24],

        [300, 450, 24],
        [325, 450, 24],

        //[350, 450, 24],
        //[375, 450, 24],

        [400, 450, 24],
        [425, 450, 24],

        [450, 450, 24],
        [475, 450, 24],

        [500, 450, 24],
        [515, 450, 24],

        [540, 400, 24],
        [565, 400, 24],

        [680, 350, 24],
        [705, 350, 24],

        //[550, 450, 24],
        [585, 450, 24],

        [600, 450, 24],
        [625, 450, 24],

        [650, 450, 24],
        [675, 450, 24],

        [700, 450, 24],
        [725, 450, 24],

        [750, 450, 24],
        [775, 450, 24],

        [790, 450, 24],
        //[825, 450, 24],

        [810, 390, 24],
        [835, 390, 24],

        [850, 450, 24],
        [875, 450, 24],

        [900, 450, 24],
        [925, 450, 24],

        [950, 450, 24],
        [975, 450, 24],

        [1000, 450, 24],

        [1020, 450, 24],
        [1045, 450, 24],

        [1124, 425, 24],
        [1149, 425, 24],

        [1230, 380, 24],
        [1255, 380, 24],

        [1330, 320, 24],
        [1355, 320, 24],
        
        [1235, 260, 24],
        [1210, 260, 24],

        [1365, 235, 24],
        [1390, 235, 24],

        [1470, 200, 24],
        [1495, 200, 24],

        [1560, 280, 24],
        [1585, 280, 24],

        [1660, 400, 24],
        [1685, 400, 24],

        [1760, 490, 24],
        [1785, 490, 24],

        [1860, 410, 24],
        [1885, 410, 24],

        [1960, 450, 24],
        [1985, 450, 24],

        [2100, 480, 24],
        [2125, 480, 24],

        [2200, 480, 24],
        [2225, 480, 24],

        [2300, 480, 24],
        [2325, 480, 24],

        [2400, 480, 24],
        [2425, 480, 24],

        [2500, 480, 24],
        [2525, 480, 24],

        [2625, 430, 24],
        [2650, 430, 24],

        [2750, 400, 24],

        [2850, 400, 24],

        [2950, 400, 24],

        [3050, 390, 24],

        [3140, 395, 24],

        [3225, 420, 24],
        [3200, 440, 24],
        [3175, 460, 24],
        [3150, 480, 24],
        [3125, 500, 24],

        [3100, 425, 24],

        [3100, 520, 24],
        
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