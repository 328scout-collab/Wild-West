import { Scene } from 'phaser';

export default class BootScene extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // Create placeholder audio using Web Audio API
    this.createPlaceholderAudio();
  }

  create() {
    this.scene.start('Menu');
  }

  private createPlaceholderAudio() {
    // Create simple sound effects using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Background music - simple western jazz loop
    this.createBackgroundMusic(audioContext);

    // Sound effects
    this.createSoundEffect('shoot', audioContext, 220, 0.1); // Pew sound
    this.createSoundEffect('enemyDeath', audioContext, 150, 0.3); // Death sound
    this.createSoundEffect('placeUnit', audioContext, 330, 0.2); // Placement sound
    this.createSoundEffect('explosion', audioContext, 80, 0.5); // Explosion sound
    this.createSoundEffect('beam', audioContext, 440, 0.4); // Beam sound

    // Store audio context in registry for use in other scenes
    this.game.registry.set('audioContext', audioContext);
  }

  private createBackgroundMusic(audioContext: AudioContext) {
    // Simple western jazz-inspired background music
    const music = {
      play: () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Western jazz melody notes (simplified)
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]; // C4 to B4
        let noteIndex = 0;

        oscillator.frequency.setValueAtTime(notes[noteIndex], audioContext.currentTime);
        oscillator.type = 'sawtooth';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

        const playNote = () => {
          if (noteIndex < notes.length) {
            oscillator.frequency.setValueAtTime(notes[noteIndex], audioContext.currentTime);
            noteIndex++;
            setTimeout(playNote, 300);
          } else {
            // Loop back
            noteIndex = 0;
            setTimeout(playNote, 1000);
          }
        };

        playNote();
        oscillator.start();

        return {
          stop: () => {
            oscillator.stop();
          }
        };
      }
    };

    this.game.registry.set('backgroundMusic', music);
  }

  private createSoundEffect(name: string, audioContext: AudioContext, frequency: number, duration: number) {
    const sound = {
      play: () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      }
    };

    this.game.registry.set(name, sound);
  }
}
