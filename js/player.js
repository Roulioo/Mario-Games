// -- Constante pour la gérer la zone du jeux
const MOVE_AREA = (window.innerWidth / 4);

// -- Function création du joueur Mario
function player_create() {

    // -- Ajouts des sprites au jeux
    player = game.add.sprite(32, 0, 'mario');

    // -- Activation du stystème Physics.ARCADE sur le player et peach 
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.gravity.y = 1000; // -- gravité du jeux 
    player.scale.setTo(0.7, 0.7); // -- gérer la taille de mario

    // -- Gérer le positionnement de gauche
    player.animations.add('left', [1, 2, 3, 4, 5], 10, true);

    // Gérer le positionnement de droite 
    player.animations.add('right', [7, 8, 9, 10, 11], 10, true);
}

function peach_create(){

    // -- Ajout du sprite peach
    peach = game.add.sprite(3098, 485, 'peach');

    // -- Mode arcade physique
    game.physics.enable(peach, Phaser.Physics.ARCADE);

     // -- Taille de la princesse 
    peach.scale.setTo(0.1, 0.1);

}

// -- Function update du joueur 
function player_update()  {

    // -- Déplacement en continu de mario à 0
    player.body.velocity.x = 0;

    // -- Si Leap connecté on l'utilise sinon clavier 
    if (LEAP.connected == true){
        player_move_leap();
    }else{
        player_move();
    }
    
}

// -- Function déplacement du leap 
function player_move_leap() {

    // -- Déplacement droite du leap
    if (LEAP.position.x > game.camera.width * 0.5 + MOVE_AREA) {
        player.body.velocity.x = 150;
        player.animations.play('right');
        facing = 'right';
    } 
    
    // -- Déplacement gauche du leap
    else if (LEAP.position.x < game.camera.width * 0.5 - MOVE_AREA) {
        player.body.velocity.x = -150;
        player.animations.play('left');
        facing = 'left';
    } 
    
    // -- Aucun des deux, on stoppe l'animation
    else{
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

    // -- Si la main est fermé soit grab alors on saute 
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

    // -- Condition pour gérer le saut dans le cas du clavier
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down) && game.time.now > jumpTimer){
        player.body.velocity.y = -500;
        jumpTimer = game.time.now + 750;
        saut.play();
    }

}