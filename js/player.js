// -- Constante pour la gérer la zone du jeux
const MOVE_AREA = (window.innerWidth / 4);

// -- Function création du joueur
function player_create() {

    // -- Ajouts des sprites au jeux
    player = game.add.sprite(32, 0, 'mario');

    // -- Activation du stystème Physics.ARCADE sur le player et peach 
    game.physics.enable(player, Phaser.Physics.ARCADE);

    // -- Collision / Gravité / Vélocité pour player / Taille 
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;
    player.body.maxVelocity.y = 500;
    player.scale.setTo(0.7, 0.7); // -- gérer la taille de mario

    // -- Permet de gérer les différents sprites de notre player 
    player.animations.add('left', [1, 2, 3, 4, 5], 10, true);
    //player.animations.add('turn', [5], 20, true);
    player.animations.add('right', [7, 8, 9, 10, 11], 10, true);
}

function peach_create(){

    peach = game.add.sprite(2098, 485, 'peach');
    game.physics.enable(peach, Phaser.Physics.ARCADE);

    // -- Collision / Gravité / Vélocité pour peach / Taille
    peach.body.collideWorldBounds = false;
    peach.body.gravity.y = 0; // 1000
    peach.body.maxVelocity.y = 0; // 500
    peach.scale.setTo(0.1, 0.1); // -- gérer la taille de la princesse 

}

// -- Function update du joueur 
/* Condition pour savoir si utiliser le LEAP ou alors les touches du clavier */
function player_update()  {

    player.body.velocity.x = 0;
    //console.log(LEAP.position.x)

    if (LEAP.connected == true){
        player_move_leap();

    }else{
        player_move();
    }
}

// -- Function déplacement du leap 
function player_move_leap() {

    // -- Déplacement du leap motion
    if (LEAP.position.x > game.camera.width * 0.5 + MOVE_AREA) {
        player.body.velocity.x = 150;
        player.animations.play('right');
        facing = 'right';
    } else if (LEAP.position.x < game.camera.width * 0.5 - MOVE_AREA) {
        player.body.velocity.x = -150;
        player.animations.play('left');
        facing = 'left';
    } else{
        if (facing != 'idle'){
            player.animations.stop();
        if (facing == 'left'){
            player.frame = 0;
        }else{
            player.frame = 5;
        }
            facing = 'idle';
        }
    }

    if (LEAP.grab && (player.body.onFloor() || player.body.touching.down) && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -500;
        jumpTimer = game.time.now + 750;
    }
}

// -- Function déplacement du joueur sans le Leap Motion
function player_move() {

    if (cursors.left.isDown){

        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();
            //player.frame = 5;

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 6;
            }

            facing = 'idle';
        }
    }

    // -- Condition pour gérer les sauts dans tous les cas
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down) && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -500;
        jumpTimer = game.time.now + 750;
    }

}