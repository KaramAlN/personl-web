// Web Audio API Synthesizer for futuristic sci-fi sound effects
// Bypasses external asset dependencies, zero latency, works across all browsers & mobile devices

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Check saved mute state if any
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('karam_portfolio_muted');
      this.isMuted = savedMute === 'true';
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Ignored until user interacts
      });
    }

    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('karam_portfolio_muted', String(this.isMuted));
    }
    if (!this.isMuted) {
      this.playBlip();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft sci-fi blip / button press
  public playClick(frequency: number = 880, type: OscillatorType = 'sine'): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.45, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Futuristic affirmative chirp (e.g. for opening modal, filter select)
  public playAffirmative(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc1.frequency.setValueAtTime(880, ctx.currentTime + 0.05); // A5

      osc2.frequency.setValueAtTime(1174.66, ctx.currentTime);
      osc2.frequency.setValueAtTime(1760, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.17);
      osc2.stop(ctx.currentTime + 0.17);
    } catch {}
  }

  // High-tech telemetry blip
  public playBlip(): void {
    this.playClick(1200, 'sine');
  }

  // Tech pulse / filter toggle
  public playPulse(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(659.25, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {}
  }

  // Success chime (transmission sent, copy action)
  public playSuccess(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.2);
      });
    } catch {}
  }

  // Close / cancel sound
  public playDismiss(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {}
  }
}

export const sound = new SoundEffectsManager();

/**
 * Global audio click dispatcher.
 * Automatically plays a high-tech sound effect on any clicked interactive element
 * (buttons, anchor tags, tabs, role cards).
 */
export function initGlobalButtonSound(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleGlobalClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    // Check if clicked element or its closest ancestor is an interactive button/link/input
    const interactive = target.closest(
      'button, a, input[type="submit"], input[type="button"], [role="button"], [role="tab"], summary'
    );

    if (interactive) {
      // Determine appropriate sound variant
      if (interactive.getAttribute('data-sound') === 'success') {
        sound.playSuccess();
      } else if (interactive.getAttribute('data-sound') === 'dismiss' || interactive.getAttribute('aria-label')?.toLowerCase().includes('close')) {
        sound.playDismiss();
      } else if (interactive.getAttribute('data-sound') === 'pulse') {
        sound.playPulse();
      } else {
        sound.playClick();
      }
    }
  };

  document.addEventListener('click', handleGlobalClick, { capture: true, passive: true });

  return () => {
    document.removeEventListener('click', handleGlobalClick, { capture: true });
  };
}
