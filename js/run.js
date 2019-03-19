// -- Création du jeu avec phaser v2.6.2
let game = new Phaser.Game(960, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

// -- Fonction preload du jeu :
function preload() {
    // -- Chargement de nos images utilisées dans le jeux
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('background', 'assets/background.jpg');
    game.load.image('peach', 'assets/peach.png');
    game.load.image('brique', 'assets/brique.png');
    game.load.image('spikes', 'assets/spikes.png');
    //game.load.image('ground', 'assets/background.jpg');
    // -- Chargement de nos son utilisé dans le jeux 
    game.load.audio('musique_fond', 'sounds/musique_fond.mp3');
}

// --Déclarations de nos variables :
let player;
let facing = 'right';
let jumpTimer = 0;
let cursors;
let jumpButton;
let background;
let platformsGroup;
let platformSprite;
let trapsGroup;
let peach; 
let brique; 
let spikes;
let music;
//let ground;

// -- Déclaration de variable timer 
let timerText;
let timer = 0;

//Fonction permettant la création du jeu :
function create() {

    // -- On démarre le system Physics.ARCADE
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // -- Dimension du monde
    game.world.setBounds(0, 0, 3000, 600);

    // -- Affichage de notre background
    background = game.add.tileSprite(0, 0, 3000, 600, 'background');

    // -- On définit la gravity en y 
    game.physics.arcade.gravity.y = 300;

    // -- Appelle de nos fonctions
    player_create();
    platforms_create();
    traps_create();

    //ground = game.add.tileSprite(0, 545, 1000, 55, 'ground');
    //brique = game.add.tileSprite(850, 250, 24, 24, 'brique');
    //spikes = game.add.tileSprite(850, 250, 120, 120, 'spikes');

    //game.physics.enable([ player, ground ], Phaser.Physics.ARCADE);
    //game.physics.enable([ peach, brique ], Phaser.Physics.ARCADE);

    //ground.body.collideWorldBounds = true;
    //ground.body.immovable = true;
    //ground.body.allowGravity = false;

    //brique.body.collideWorldBounds = true;
    //brique.body.immovable = true;
    //brique.body.allowGravity = false;
    //brique.scale.setTo(0.4, 0.4);

    // -- Rentrer en collision avec les limites du monde comme s'il s'aggissait d'éléments rigides
    player.body.collideWorldBounds = false; 
    // -- Immobilité du joueur 
    peach.body.immovable = false;
    // -- Gravité lors de la descente 
    peach.body.allowGravity = true;

    // -- Utiliser pour gérer les touches du clavier 
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // -- Timing
    timerText = game.add.text(5, 5, 'Temps: 0.0s', { font: '18px Arial', fill: '#ffff00' });
    // -- Gére l'incrémentation du timer 
    setInterval(() => timer += 100, 100);

    // -- Ajout de notre son au jeux
    music = game.add.audio('musique_fond');

    // -- Play de la music
    music.play();

}

/* Fonction uptade gére ici les collisions player / sol puis le déplacement de la caméra */

function update() {


    // -- Centrer le canvas 
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();

    //game.physics.arcade.collide(player, ground);

    // -- on gère les collisions sur les différents personnages et objet
    game.physics.arcade.collide(player, platformsGroup);
    game.physics.arcade.collide(peach, platformsGroup);
    game.physics.arcade.collide(peach, trapsGroup);
    game.physics.arcade.collide(player, trapsGroup, (player, platform) => {
        //player.kill();
        //alert("GAME OVER !");
        window.location = "gameover.html"; // -- on appelle notre page game over 
    });

    game.physics.arcade.collide(player, peach, (player, platform) => {
        //peach.kill();
        //alert("WELL DONE !");
        window.location = "victoire.html"; // -- on appelle notre page victoire 
    });

    // -- collision player sur peach 
    game.physics.arcade.collide(player, peach);

    // -- déplacement de la caméra en fonction du joueur
    game.camera.follow(player);

    //ground.position.x = game.camera.position.x;

    // -- on appelle notre fonction update du player
    player_update();

    // -- Affichage du temps 
    timerText.setText('Temps: ' + (timer / 1000).toFixed(1) + 's');

}

// -- Fonction du rendu de jeu :
function render () {

    //game.debug.text(game.time.physicsElapsed, 32, 32);
    //game.debug.body(player);
    //game.debug.body(ground);
    //game.debug.body(peach);
    //game.debug.body(brique);
    //game.debug.bodyInfo(player, 16, 24);
    game.debug.soundInfo(music, 20, 32);

}