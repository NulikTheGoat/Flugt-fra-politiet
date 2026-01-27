// Simple Web Audio SFX system

let audioCtx = null;
let masterGain = null;
let noiseBuffer = null;

function ensureAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return null;
        audioCtx = new AudioContext();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.25;
        masterGain.connect(audioCtx.destination);
    }
    if (!noiseBuffer && audioCtx) {
        const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.6;
        }
        noiseBuffer = buffer;
    }
    return audioCtx;
}

export function unlockAudio() {
    const ctx = ensureAudio();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
}

function playTone({
    frequency = 440,
    duration = 0.2,
    type = 'sine',
    volume = 0.2,
    detune = 0,
    bendTo = null
} = {}) {
    const ctx = ensureAudio();
    if (!ctx || ctx.state !== 'running') return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = frequency;
    if (detune) osc.detune.value = detune;

    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    if (bendTo) {
        osc.frequency.exponentialRampToValueAtTime(bendTo, ctx.currentTime + duration);
    }

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(ctx.currentTime + duration);
}

function playNoise({
    duration = 0.25,
    volume = 0.2,
    filterFreq = 800
} = {}) {
    const ctx = ensureAudio();
    if (!ctx || ctx.state !== 'running' || !noiseBuffer) return;

    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    source.start();
    source.stop(ctx.currentTime + duration);
}

export function playSfx(name) {
    switch (name) {
        case 'pickup':
            playTone({ frequency: 660, bendTo: 990, duration: 0.12, type: 'triangle', volume: 0.18 });
            break;
        case 'health':
            playTone({ frequency: 520, bendTo: 780, duration: 0.18, type: 'sine', volume: 0.2 });
            break;
        case 'boost':
            playTone({ frequency: 300, bendTo: 1200, duration: 0.25, type: 'sawtooth', volume: 0.2 });
            break;
        case 'ramp':
            playTone({ frequency: 420, bendTo: 900, duration: 0.2, type: 'square', volume: 0.2 });
            break;
        case 'damage':
            playNoise({ duration: 0.25, volume: 0.25, filterFreq: 500 });
            playTone({ frequency: 120, duration: 0.2, type: 'sawtooth', volume: 0.15 });
            break;
        case 'break':
            playNoise({ duration: 0.2, volume: 0.22, filterFreq: 1200 });
            playTone({ frequency: 180, duration: 0.12, type: 'square', volume: 0.12 });
            break;
        case 'nitro':
            playTone({ frequency: 260, bendTo: 1400, duration: 0.3, type: 'sawtooth', volume: 0.22 });
            break;
        case 'shield':
            playTone({ frequency: 500, bendTo: 700, duration: 0.2, type: 'triangle', volume: 0.18 });
            break;
        default:
            playTone({ frequency: 440, duration: 0.12, type: 'sine', volume: 0.12 });
    }
}