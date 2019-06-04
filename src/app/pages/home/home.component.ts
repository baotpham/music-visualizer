import { Component, OnInit } from '@angular/core';

import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {Router} from '@angular/router';

// Services
import { VisualizerService } from '../../services/visualizer/visualizer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  files: UploadFile[] = [];

  constructor(
    private router: Router,
    private visualizerService: VisualizerService
  ) { }

  ngOnInit() {
  }


  dropped(event: UploadEvent) {
    this.files = event.files;

    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log('File', droppedFile.relativePath, file);

          /**
           * You could upload it like this:
           * const formData = new FormData()
           */
           // formData.append('logo', file, relativePath)

           // Headers
           // const headers = new HttpHeaders({
            // 'security-token': 'mytoken'
          // })

           // this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob'})
           // .subscribe(data => {
            // Sanitized logo returned from backend
          // })


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }


  fileOver(event) {
    console.log(event);
  }


  fileLeave(event) {
    console.log(event);
  }


  goToVisualizer() {
    this.router.navigate(['/visualizer']);
  }
}
