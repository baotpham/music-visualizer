import { Component, OnInit } from '@angular/core';
import { VisualizerService } from '../../services/visualizer/visualizer.service';


@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  constructor(
    private visualizerService: VisualizerService
  ) { }


  ngOnInit() {
    console.log('Visualizer', this.visualizerService.getMusicFile());
  }

}
