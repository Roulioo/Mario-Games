const LEAP = {

    position: {
        x: 0,
        y: 0
    },

    connected: false,

}

const controller = new Leap.Controller();
controller.connect();

controller.on('deviceStreaming', function() {

    LEAP.connected = true;
    console.log('LEAP CONNECTED ✔❤', LEAP.connected);
});

controller.on('deviceDisconnected', function() {

    LEAP.connected = false;
    console.log('LEAP DISCONNECTED ❌💔', LEAP.disconnected);
});

controller.on('frame', function(frame) {
    LEAP.connected = true;
    
    let hand = frame.hands[0];
    if(!hand) return;
    // console.log(hand._rotation);

    const palm = get2dCoords(hand.stabilizedPalmPosition, frame);
    LEAP.position.x = palm.x;
    LEAP.position.y = palm.y;
    // LEAP.rotation = hand._rotation[1];
    LEAP.grab = hand.grabStrength === 1
})

/**
 * Transforme les coordonnées 3D récupérée par le Leap en coordonnées 2D pour un <canvas> web
 * @param {Array} leapPosition Tableau de coordonnées 3D [x, y, z]
 * @param {Object} frame Objet "frame" transmit par le Leap Motion
 * @param {HTMLCanvasElement} canvas Objet canvas sur lequel sont dessinés les éléments
 */
function get2dCoords(leapPosition, frame, canvas) {
    const interactionBox  = frame.interactionBox;
    const normalizedPoint = interactionBox.normalizePoint(leapPosition, true);

    return {
        x : normalizedPoint[0] * window.innerWidth,
        y : (1 - normalizedPoint[1]) * window.innerHeight,
    }
}