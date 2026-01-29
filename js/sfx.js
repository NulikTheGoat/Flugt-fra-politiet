// Simple Web Audio SFX system

let audioCtx = null;
let masterGain = null;
let noiseBuffer = null;

// Engine sound state
let engineNodes = null;

// Drift sound state
let driftNodes = null;

// Police siren state (continuous looping siren)
let sirenNodes = null;
let sirenPhase = 0; // For alternating wail

function ensureAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return null;
        audioCtx = new AudioContext();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.25;
        masterGain.connect(audioCtx.destination);
    }
    // Always try to resume if suspended (browsers require user interaction)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
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

/**
 * Calculate volume based on distance (spatial audio)
 * @param {number} distance - Distance from listener
 * @param {number} maxDistance - Maximum audible distance (default 500)
 * @param {number} refDistance - Reference distance for full volume (default 50)
 * @returns {number} Volume multiplier (0.0 to 1.0)
 */
function getVolumeFromDistance(distance, maxDistance = 500, refDistance = 50) {
    if (distance <= refDistance) return 1.0;
    if (distance >= maxDistance) return 0.0;
    // Inverse distance falloff (realistic audio)
    return refDistance / distance;
}

/**
 * Updates the police siren based on closest police distance
 * @param {number} closestDistance - Distance to nearest police car
 * @param {number} policeCount - Number of active police (affects intensity)
 */
export function updatePoliceSiren(closestDistance, policeCount = 1) {
    const ctx = ensureAudio();
    if (!ctx) return;
    if (ctx.state === 'closed') return;

    // No police nearby = no siren
    if (closestDistance > 600 || policeCount === 0) {
        stopPoliceSiren();
        return;
    }

    // Initialize siren if not running
    if (!sirenNodes) {
        // Two oscillators for the classic "wail" effect
        const osc1 = ctx.createOscillator(); // Primary wail
        const osc2 = ctx.createOscillator(); // Secondary harmonic
        const lfo = ctx.createOscillator();  // Modulates pitch for wail
        const lfoGain = ctx.createGain();
        const mainGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sawtooth';
        osc2.type = 'square';
        lfo.type = 'triangle'; // Smooth up/down wail

        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        filter.Q.value = 3;

        // LFO modulates both oscillator frequencies for wail
        lfo.frequency.value = 0.8; // Slow wail cycle
        lfoGain.gain.value = 200;  // Pitch range of wail
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);
        lfoGain.connect(osc2.frequency);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(mainGain);
        mainGain.connect(masterGain);

        // Base frequencies (will be modulated by LFO)
        osc1.frequency.value = 700;
        osc2.frequency.value = 900;

        mainGain.gain.value = 0;

        osc1.start();
        osc2.start();
        lfo.start();

        sirenNodes = { osc1, osc2, lfo, lfoGain, filter, gain: mainGain };
    }

    const now = ctx.currentTime;
    
    // Calculate volume based on distance
    const baseVolume = getVolumeFromDistance(closestDistance, 600, 30);
    // More police = slightly more intense
    const intensityBonus = Math.min(0.1, (policeCount - 1) * 0.02);
    const targetVolume = Math.min(0.35, (baseVolume * 0.25) + intensityBonus);

    // Modulate LFO speed slightly based on urgency (closer = faster wail)
    const urgency = 1 - (closestDistance / 600);
    const lfoSpeed = 0.6 + (urgency * 0.6); // 0.6 Hz far, 1.2 Hz close
    
    sirenNodes.lfo.frequency.setTargetAtTime(lfoSpeed, now, 0.3);
    sirenNodes.gain.gain.setTargetAtTime(targetVolume, now, 0.1);
    
    // Doppler-like effect: shift base frequency when very close
    const dopplerShift = urgency * 50;
    sirenNodes.osc1.frequency.setTargetAtTime(700 + dopplerShift, now, 0.2);
    sirenNodes.osc2.frequency.setTargetAtTime(900 + dopplerShift, now, 0.2);
}

export function stopPoliceSiren() {
    if (sirenNodes && sirenNodes.gain) {
        const ctx = ensureAudio();
        if (ctx) {
            const now = ctx.currentTime;
            sirenNodes.gain.gain.setTargetAtTime(0, now, 0.3);
            // Don't stop oscillators, just mute - allows quick resume
            setTimeout(() => {
                if (sirenNodes) {
                    try {
                        sirenNodes.osc1.stop();
                        sirenNodes.osc2.stop();
                        sirenNodes.lfo.stop();
                    } catch(e) { /* already stopped */ }
                    sirenNodes = null;
                }
            }, 500);
        }
        sirenNodes = null;
    }
}

/**
 * Play a sound effect with distance-based volume (spatial audio)
 * @param {string} name - Sound effect name
 * @param {number} distance - Distance from player (0 = right next to player)
 * @param {number} [maxDistance=400] - Max audible distance
 */
export function playSfxAtDistance(name, distance, maxDistance = 400) {
    const volume = getVolumeFromDistance(distance, maxDistance, 30);
    if (volume < 0.05) return; // Too far to hear
    playSfxWithVolume(name, volume);
}

/**
 * Play SFX with custom volume multiplier
 */
function playSfxWithVolume(name, volumeMultiplier = 1.0) {
    const vol = Math.min(1.0, volumeMultiplier);
    
    switch (name) {
        case 'police_crash':
            playNoise({ duration: 0.4, volume: 0.35 * vol, filterFreq: 600 });
            playTone({ frequency: 80, bendTo: 40, duration: 0.3, type: 'sawtooth', volume: 0.2 * vol });
            break;
        case 'police_hit':
            playNoise({ duration: 0.2, volume: 0.25 * vol, filterFreq: 500 });
            playTone({ frequency: 120, bendTo: 60, duration: 0.15, type: 'square', volume: 0.15 * vol });
            break;
        case 'explosion':
            playNoise({ duration: 0.8, volume: 0.5 * vol, filterFreq: 400, sweepTo: 50 });
            playTone({ frequency: 60, bendTo: 20, duration: 0.6, type: 'sawtooth', volume: 0.4 * vol });
            break;
        default:
            playSfx(name);
    }
}


/**
 * Updates the continuous engine sound based on RPM (0.0 to 1.0)
 * @param {number} rpm - Normalized engine RPM (0.0 = idle, 1.0 = redline)
 */
export function setEngineRpm(rpm) {
    const ctx = ensureAudio();
    if (!ctx) return;
    // Don't block on suspended - ensureAudio tries to resume
    if (ctx.state === 'closed') return;

    try {
        // Initialize engine nodes if not already running
        if (!engineNodes) {
            const osc1 = ctx.createOscillator(); // Main throaty rumble (Sawtooth)
            const osc2 = ctx.createOscillator(); // Sub-bass (Sine)
            const lfo = ctx.createOscillator();  // Low Frequency Oscillator for texture
            const lfoGain = ctx.createGain();
            const mainGain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc1.type = 'sawtooth';
        osc2.type = 'sine';
        lfo.type = 'sine'; // Rumble modulation
        
        filter.type = 'lowpass';
        filter.Q.value = 2; // Resonance for character

        // Routing: LFO -> Osc1 Frequency (Vibrato/Rumble)
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);

        // Routing: Osc1 & Osc2 -> Filter -> Gain -> Master
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(mainGain);
        mainGain.connect(masterGain);

        osc1.start();
        osc2.start();
        lfo.start();

        engineNodes = { osc1, osc2, lfo, lfoGain, filter, gain: mainGain };
        
        // Fade in
        mainGain.gain.setValueAtTime(0, ctx.currentTime);
        mainGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.5);
    }

    const now = ctx.currentTime;
    // Clamping rpm
    rpm = Math.max(0, Math.min(1.2, rpm));

    // Calculate frequencies
    const baseFreq = 60 + (rpm * 400);   // 60Hz idle -> 460Hz max
    const subFreq = baseFreq * 0.5;      // Sub-octave
    const filterFreq = 300 + (rpm * 2000); // Filter opens up with speed
    
    // Calculate volume (louder at speed)
    const targetVol = 0.08 + (rpm * 0.12);

    // Calculate rumble (LFO)
    // Idle: Slow, heavy rumble. High speed: Fast, tighter vibration.
    const lfoFreq = 10 + (rpm * 40);
    const lfoDepth = 15 + (rpm * 10);

    // Apply updates smoothly
    engineNodes.osc1.frequency.setTargetAtTime(baseFreq, now, 0.1);
    engineNodes.osc2.frequency.setTargetAtTime(subFreq, now, 0.1);
    engineNodes.lfo.frequency.setTargetAtTime(lfoFreq, now, 0.1);
    engineNodes.lfoGain.gain.setTargetAtTime(lfoDepth, now, 0.1);
    engineNodes.filter.frequency.setTargetAtTime(filterFreq, now, 0.1);
    engineNodes.gain.gain.setTargetAtTime(targetVol, now, 0.1);
    } catch (e) {
        // Reset engine nodes if there's an error (e.g., nodes in bad state)
        engineNodes = null;
    }
}

export function stopEngineSound() {
    if (engineNodes && engineNodes.gain) {
        const ctx = ensureAudio();
        if (ctx) {
            const now = ctx.currentTime;
            engineNodes.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            engineNodes.osc1.stop(now + 0.5);
            engineNodes.osc2.stop(now + 0.5);
            engineNodes.lfo.stop(now + 0.5);
        }
        engineNodes = null;
    }
}

/**
 * Updates the continuous drift sound intensity (0.0 to 1.0)
 */
export function setDriftIntensity(intensity) {

    const ctx = ensureAudio();
    if (!ctx || !noiseBuffer) return;
    if (ctx.state === 'closed') return;

    if (intensity <= 0.05) {
        if (driftNodes) stopDriftSound();
        return;
    }

    if (!driftNodes) {
        const source = ctx.createBufferSource();
        source.buffer = noiseBuffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.value = 5; // Sharp resonance for "screech"

        const gain = ctx.createGain();
        gain.gain.value = 0;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        source.start();
        driftNodes = { source, filter, gain };
    }

    const now = ctx.currentTime;
    // Modulate filter frequency based on intensity to simulate changing tire friction
    // Higher intensity = higher pitch screech
    const targetFreq = 800 + (intensity * 1200); 
    driftNodes.filter.frequency.setTargetAtTime(targetFreq, now, 0.1);
    
    // Volume based on intensity
    driftNodes.gain.gain.setTargetAtTime(intensity * 0.3, now, 0.1);
}

export function stopDriftSound() {
    if (driftNodes) {
        const ctx = ensureAudio();
        if (ctx) {
            driftNodes.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
            driftNodes.source.stop(ctx.currentTime + 0.2);
        }
        driftNodes = null;
    }
}

/**
 * Updated Tone Player with more options
 */
function playTone({
    frequency = 440,
    duration = 0.2,
    type = 'sine',
    volume = 0.2,
    detune = 0,
    bendTo = null,
    attack = 0.01,
    release = 0.1
} = {}) {
    const ctx = ensureAudio();
    if (!ctx || ctx.state === 'closed') return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = frequency;
    if (detune) osc.detune.value = detune;

    const now = ctx.currentTime;
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(volume, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration + release);

    if (bendTo) {
        osc.frequency.exponentialRampToValueAtTime(bendTo, now + duration);
    }

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(now + duration + release + 0.1);
}

function playNoise({
    duration = 0.25,
    volume = 0.2,
    filterFreq = 800,
    filterType = 'lowpass',
    sweepTo = null
} = {}) {
    const ctx = ensureAudio();
    if (!ctx || ctx.state === 'closed' || !noiseBuffer) return;

    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;

    if (sweepTo) {
        filter.frequency.exponentialRampToValueAtTime(sweepTo, ctx.currentTime + duration);
    }

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

// Arpeggio helper for coins/powerups
function playArpeggio(notes, speed = 0.08, type='sine', vol=0.2) {
    notes.forEach((freq, i) => {
        setTimeout(() => {
            playTone({ frequency: freq, duration: 0.1, type: type, volume: vol });
        }, i * speed * 1000);
    });
}

export function playSfx(name) {
    switch (name) {
        case 'pickup': // Coin: bright, fast two-note climb
            playArpeggio([1200, 1800], 0.08, 'sine', 0.15);
            break;
            
        case 'health': // Repair: rising major triad
            playArpeggio([440, 554, 659], 0.1, 'triangle', 0.15); 
            break;
            
        case 'boost': // Speed boost: rising sawtooth
            playTone({ frequency: 200, bendTo: 800, duration: 0.4, type: 'sawtooth', volume: 0.2 });
            playNoise({ duration: 0.4, volume: 0.15, filterFreq: 500, sweepTo: 2000 });
            break;
            
        case 'ramp': // Jump: clean upward sweep
             playTone({ frequency: 300, bendTo: 600, duration: 0.3, type: 'square', volume: 0.15 });
            break;
            
        case 'damage': // Impact: low thud + crunch
            playNoise({ duration: 0.3, volume: 0.3, filterFreq: 800 });e
            playTone({ frequency: 100, bendTo: 50, duration: 0.2, type: 'sawtooth', volume: 0.25 });
            break;
            
        case 'crash': // Heavy destruction
            playNoise({ duration: 0.6, volume: 0.4, filterFreq: 1000, sweepTo: 100 });
            playTone({ frequency: 80, bendTo: 20, duration: 0.5, type: 'square', volume: 0.3 });
            break;
            
        case 'break': // Glass/Obstacle break
            playNoise({ duration: 0.15, volume: 0.25, filterFreq: 2000, filterType: 'highpass' });
            playTone({ frequency: 2000, duration: 0.05, type: 'square', volume: 0.1 });
            break;
            
        case 'nitro': // Continuous whoosh (simulated)
            playNoise({ duration: 1.0, volume: 0.2, filterFreq: 400, sweepTo: 3000 });
            playTone({ frequency: 300, bendTo: 1000, duration: 1.0, type: 'sawtooth', volume: 0.15 });
            break;
            
        case 'shield': // Shield activate
            playTone({ frequency: 400, bendTo: 400, duration: 0.5, type: 'sine', volume: 0.2 }); // base hum
            playTone({ frequency: 800, bendTo: 1200, duration: 0.4, type: 'sine', volume: 0.1 }); // shimmer
            break;
            
        case 'siren': // Police siren wail (one cycle)
            playTone({ frequency: 600, bendTo: 900, duration: 0.6, type: 'sawtooth', volume: 0.15 });
            break;

        default:
            playTone({ frequency: 440, duration: 0.12, type: 'sine', volume: 0.12 });
    }
}
