export interface AudioServiceInterface {
  load: (id: string) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  clear: () => void;
  onTimeUpdate: (callback: (currentTime: number) => void) => void;
  duration: number;
  currentTime: number;
  goToTime: (timeInSeconds: number) => void;
  isPlaying(): boolean;
  removeTimeUpdateListener: () => void;
}
