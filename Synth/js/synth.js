(function(global) {
    console.log('synth')
    var audioCtx = new AudioContext();

    var Synth = {};
    // sound output test
    Synth.Out = audioCtx.destination;
    // oscillator pool (since too many concurrent oscillators will blow up the browser)
    var OscillatorPlayer = function(concurrentOscillators) {
        var oscillatorPool = new Array(concurrentOscillators);
        for (var i= 0; i< concurrentOscillators; i++) {
            oscillatorPool[i] = {};
            oscillatorPool[i].oscillator = audioCtx.createOscillator();
            oscillatorPool[i].oscillator.connect(Synth.Out);
            oscillatorPool[i].busy = false;

        }
        this.oscillatorPool = oscillatorPool;
    }
    OscillatorPlayer.prototype.getOscillatorResource = function() {
        var oscillatorPool = this.oscillatorPool;
        for (var i= 0; i< oscillatorPool.length; i++) {
            if (!oscillatorPool[i].busy) {
                return oscillatorPool[i];
            }
        }
        return null;
    }
    OscillatorPlayer.prototype.start = function(oscillatorNote) {
        var oscillatorResource = this.getOscillatorResource();
        if (!oscillatorResource) {
            console.log('failed to play');
            return false;
        }
        oscillatorResource.busy = true;
        oscillatorNote.oscillatorResource = oscillatorResource;
        var oscillator = oscillatorResource.oscillator;
        oscillator.type = oscillatorNote.type;
        oscillator.frequency.value = oscillatorNote.frequency;
        oscillator.start();
    }
    OscillatorPlayer.prototype.stop = function(oscillatorNote) {
        var oscillatorResource = oscillatorNote.oscillatorResource;
        if (!oscillatorResource) {
            return;
        }
        oscillatorResource.oscillator.stop();
        oscillatorResource.busy = false;
    }
    OscillatorPlayer.prototype.reset = function() {
        this.oscillatorPool.forEach(function(oscillatorResource){
            if (oscillatorResource.busy) {
                oscillatorResource.oscillator.stop();
                oscillatorResource.busy = false;
            }
        });
    }
    OscillatorPlayer.prototype.log = function() {
        var oscillatorPool = this.oscillatorPool;
        for (var i= 0; i< oscillatorPool.length; i++) {
            console.log('oscillator: ' + i + ' busy: ' + oscillatorPool[i].busy)
        }
    }
    Synth.OscillatorPlayer = new OscillatorPlayer(5);
    // Base Oscillator Note
    var OscillatorNote = function(){};
    OscillatorNote.prototype.start = function() {
        Synth.OscillatorPlayer.start(this);
    }
    OscillatorNote.prototype.stop = function() {
        Synth.OscillatorPlayer.stop(this);
    }
    // sine wave oscillator

    var SineNote = function(frequency) {
        this.type = 'sine';
        if (frequency) {
            this.frequency = frequency;
        } else {
            this.frequency = 440;
        }
    }
    SineNote.prototype = Object.create(OscillatorNote.prototype);

    Synth.SineNote = SineNote;
    // hi cut - low cut - filter

    // envelopes attack decay sustain release



    global.Synth = Synth;
})(this);