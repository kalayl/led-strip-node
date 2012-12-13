var sleep = require("sleep"),
    Gpio = require('onoff').Gpio,
    sdi = new Gpio(22, 'out'),
    cki = new Gpio(18, 'out')

// the LED RGB strip connects as follows:
//  If you have a 4-pin connection:
//  Blue = 5V
//  Red = SDI
//  Green = CKI
//  Black = GND

// for a gpio pinout
// see https://github.com/rakeshpai/pi-gpio


var stripColors = initStrip();
stripColors[0] = 0xFF0000;
stripColors[1] = 0x00FF00;
stripColors[2] = 0x0000FF;

postFrame();
sleep.sleep(2);
shutdown();

function sdiHi() {
    sdi.writeSync(1);
}

function sdiLo() {
    sdi.writeSync(0);
}

function clockHi() {
    cki.writeSync(1);
}

function clockLo () {
    cki.writeSync(0);
}

function postFrame() {
    console.log("postFrame");
    for (var i = 0; i < 1; i++) {
        var thisColor = stripColors[i];

        for (var colorBit = 23; colorBit != -1; colorBit--) {

            clockLo();

            var mask = 1 << colorBit;
            if (thisColor & mask) {
                sdiHi();
            } else {
                sdiLo();
            }

            clockHi();
        }
    }

    clockLo();
    sleep.usleep(500000);
}

function initStrip() {
    console.log("initStrip");
    var stripColors = [];
    for (var i = 0; i < 32; i++) {
        stripColors.push(0x000000);
    }
    return stripColors;
}

function shutdown () {
    console.log("shutdown");
    sdi.unexport();
    cki.unexport();
    process.exit(0);
}
