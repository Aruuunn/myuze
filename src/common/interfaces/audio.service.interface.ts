export interface AudioServiceInterface {
  load: (id: string) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  clear: () => void;
  onTimeUpdate: (callback: (ev: Event) => void) => void;
  duration: number;
  currentTime: number;
  goToTime: (timeInSeconds: number) => void;
  isPlaying(): boolean;
}
