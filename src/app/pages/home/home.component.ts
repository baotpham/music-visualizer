import { Component, OnInit } from '@angular/core';

import { UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {Router} from '@angular/router';

// Services
import { VisualizerService } from '../../services/visualizer/visualizer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  musicFile: File;

  constructor(
    private router: Router,
    private visualizerService: VisualizerService
  ) { }

  ngOnInit() {
  }


  dropped(event: UploadEvent) {
    if (event.files.length !== 1 ) {
      alert('Please only add one music file');
      return;
    }

    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log('File', droppedFile.relativePath, file);

          this.musicFile = file;
          return;

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
        alert('Please add a music file!');
      }
    }
  }


  goToVisualizer() {
    if ( this.musicFile === undefined ) {
      alert('Please select or drag a file');
    } else {
      this.visualizerService.setMusicFile(this.musicFile);
      this.router.navigate(['/visualizer']);
    }
  }
}
