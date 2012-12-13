var Gpio = require('onoff').Gpio,
    sdi = new Gpio(22, 'out'),
    cki = new Gpio(18, 'out');

sdi.unexport();
cki.unexport();