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
    // Softer ambient western-inspired background music
    const music = {
      play: () => {
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        osc1.type = 'triangle';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(220, audioContext.currentTime); // A3
        osc2.frequency.setValueAtTime(164.81, audioContext.currentTime); // E3

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioContext.destination);

        gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);

        const notes = [220, 246.94, 261.63, 293.66]; // A3, B3, C4, D4
        let noteIndex = 0;

        const intervalId = window.setInterval(() => {
          noteIndex = (noteIndex + 1) % notes.length;
          osc1.frequency.setValueAtTime(notes[noteIndex], audioContext.currentTime);
          osc2.frequency.setValueAtTime(notes[(noteIndex + 2) % notes.length] * 0.5, audioContext.currentTime);
        }, 900);

        osc1.start();
        osc2.start();

        return {
          stop: () => {
            osc1.stop();
            osc2.stop();
            window.clearInterval(intervalId);
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
