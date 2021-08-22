import { MusicInfoOptions, MusicInfoResponse } from './MusicInfo';

export * from './MusicInfo';
export default class MusicInfo {
  static getMusicInfoAsync(fileUri: string, options?: MusicInfoOptions): Promise<?MusicInfoResponse>;
}
