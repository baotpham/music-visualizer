import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisualizerService {

  private musicFile: File;

  constructor() { }

  getMusicFile() {
    return this.musicFile;
  }

  setMusicFile(musicFile) {
    this.musicFile = musicFile;
  }


}
