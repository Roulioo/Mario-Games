// -- Création du jeu avec phaser v2.6.2
let game = new Phaser.Game(960, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

// -- Fonction preload du jeu :
function preload() {
    // -- Chargement de nos images utilisées dans le jeux
    game.load.spritesheet('mario', 'assets/img/mario_final.png', 40, 40);
    game.load.image('background', 'assets/img/background.jpg');
    game.load.image('peach', 'assets/img/peach.png');
    game.load.image('brique', 'assets/img/brique.png');
    game.load.image('spikes', 'assets/img/spikes.png');
    // -- Chargement de nos son utilisé dans le jeux 
    game.load.audio('musique_fond', 'assets/sounds/musique_fond.mp3');
    game.load.audio('saut', 'assets/sounds/saut.mp3');
    game.load.audio('fall', 'assets/sounds/fall.mp3');
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
let vieText;
let vie = 5;

//Fonction permettant la création du jeu :
function create() {

    // -- On démarre le system Physics.ARCADE
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // -- Dimension du monde
    game.world.setBounds(0, 0, 3250, 600);

    // -- Affichage de notre background
    background = game.add.tileSprite(0, 0, 3250, 600, 'background');

    // -- On définit la gravity en y 
    game.physics.arcade.gravity.y = 300;

    // -- Appelle de nos fonctions :
    player_create();
    peach_create();
    platforms_create();
    traps_create();

    // -- Rentrer en collision avec les limites du monde comme s'il s'aggissait d'éléments rigides
    player.body.collideWorldBounds = true;
    // -- Immobilité du joueur 
    peach.body.immovable = false;
    // -- Gravité lors de la descente 
    peach.body.allowGravity = true;

    // -- Utiliser pour gérer les touches du clavier 
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // -- Ajout de notre son au jeux
    music = game.add.audio('musique_fond');
    saut = game.add.audio('saut');
    fall = game.add.audio('fall');

    // -- Play de la music
    music.play();

    //Vie :
    vieText = game.add.text(5, 5, 'Lives : ' + vie, { font: '18px Arial', fill: '#ffffff' });
    vieText.x = 25;
    vieText.y = 25;
    vieText.fixedToCamera = true;

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

    //console.log(vie);
    game.physics.arcade.collide(player, trapsGroup, (player, platform) => {
        console.log(vie);
        let minus_vie = vie - 1
        vieText.setText('Lives : ' + (minus_vie));
        fall.play();
        //console.log("Life :", minus_vie);
        //player = game.add.sprite(32, 320, 'dude');
        player.kill();
        //peach.kill();
        facing = 'right';
        player_create();
        vie = minus_vie;
    });

    if(jumpButton.isDown){
        saut.play();
    }

    game.physics.arcade.collide(player, peach, (player, platform) => {
        window.location = "victoire.html"; // -- on appelle notre page victoire 
    });

    // -- collision player sur peach 
    game.physics.arcade.collide(player, peach);

    // -- déplacement de la caméra en fonction du joueur
    game.camera.follow(player);

    //ground.position.x = game.camera.position.x;

    // -- on appelle notre fonction update du player
    player_update();

    // -- Gérer la vie = 0 pour le game over 

    if (vie <= 0) {
        window.location = "game_over.html"; // -- on appelle notre page game over
    }

    minus = false;

}

// -- Fonction du rendu de jeu :
function render() {

    //game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    //game.debug.body(ground);
    //game.debug.body(peach);
    //game.debug.body(brique);
    //game.debug.bodyInfo(player, 16, 24);
    //game.debug.soundInfo(music, 20, 32);

}