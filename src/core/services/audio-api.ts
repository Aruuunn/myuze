import { AudioServiceInterface } from '../interfaces';

export class AudioAPI implements AudioServiceInterface {
  private audioEl: HTMLAudioElement;

  private interval = 0;

  constructor() {
    this.audioEl = document.createElement('audio');
  }

  get duration(): number {
    return this.audioEl.duration;
  }

  get currentTime(): number {
    return this.audioEl.currentTime;
  }

  isPlaying(): boolean {
    return !this.audioEl.paused && !this.audioEl.ended;
  }

  clear(): void {
    clearInterval(this.interval);
    this.audioEl.src = '';
  }

  async load(dataURL: string): Promise<void> {
    this.audioEl.src = dataURL;
    return new Promise<void>((res) => {
      this.audioEl.oncanplay = () => res();
    });
  }

  onLoad(callback: () => void): void {
    this.audioEl.addEventListener('canplay', () => callback());
  }

  async pause(): Promise<void> {
    this.audioEl.pause();
  }

  async play(): Promise<void> {
    await this.audioEl.play();
  }

  onTimeUpdate(callback: (currentTime: number) => void): void {
    this.interval = window.setInterval(() => {
      if (this.audioEl.paused || this.audioEl.ended) {
        return;
      }
      callback(this.audioEl.currentTime);
    }, 100);
  }

  removeTimeUpdateListener(): void {
    clearInterval(this.interval);
  }

  goToTime(timeInSeconds: number): void {
    this.audioEl.currentTime = timeInSeconds;
  }

  onPlay(callback: () => void): void {
    this.audioEl.addEventListener('play', () => callback());
  }

  onPause(callback: () => void): void {
    this.audioEl.addEventListener('pause', () => callback());
  }

  onDurationChange(callback: () => void): void {
    this.audioEl.addEventListener('durationchange', () => callback());
  }
}
