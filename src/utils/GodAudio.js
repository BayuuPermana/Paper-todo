class GodAudio {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (Context) {
        this.ctx = new Context();
      }
    }
  }

  createNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = 2 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  playPencil() {
    this.init();
    if (!this.ctx) return;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2500;

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    gain.gain.setValueAtTime(0, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.15);
  }

  playRustle() {
    this.init();
    if (!this.ctx) return;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 0.5;

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    gain.gain.setValueAtTime(0, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.35);
  }

  playCrumple() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    for(let i=0; i<5; i++) {
      const burstTime = now + (i * 0.05);
      const buffer = this.createNoiseBuffer();
      if (!buffer) continue;
      
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, burstTime);
      gain.gain.linearRampToValueAtTime(0.2, burstTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, burstTime + 0.04);
      
      noise.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(burstTime);
      noise.stop(burstTime + 0.05);
    }
  }
}

export const audio = new GodAudio();
