import { Component, OnInit } from '@angular/core';
import { VisualizerService } from '../../services/visualizer/visualizer.service';

import * as p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

import 'hammerjs';


@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  private p5sketch;

  constructor(
    private visualizerService: VisualizerService
  ) { }


  ngOnInit() {
    this.createCanvas();
  }



  private createCanvas() {
    this.p5sketch = new p5(this.sketch);
  }

  sketch = (p: any) => {
    let song;
    let amp;
    let fft;

    let playButton;
    let stopButton;
    let slider;
    let w;

    let angle = 0;

    function toggle() {
      if ( song.isPlaying() ) {
        song.pause();
        playButton.html('Play');
      } else {
        song.play();
        playButton.html('Pause');
      }
    }


    function stop() {
      if ( song.isPlaying() || song.isPaused() ) {
        song.stop();
        playButton.html('Play');
      }
    }


    p.preload = () => {
      // song = p.loadSound('../../assets/song-example.mp3');
      song = p.loadSound(this.visualizerService.getMusicFile());
    };


    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight - 100);
      p.colorMode(p.HSB);
      p.angleMode(p.DEGREES);

      // amp
      amp = new p5.Amplitude();

      // buttons
      playButton = p.createButton('Play');
      stopButton = p.createButton('Stop');

      playButton.mousePressed(toggle);
      stopButton.mousePressed(stop);


      // slider
      slider = p.createSlider(1, song.duration(), 1);
      slider.style('width', '100%');

      setInterval(() => {
        slider.value(song.currentTime());
      }, 1000);

      // slider.mouseReleased(() => {
      //   song.stop();
      //   song.jump(slider.value());
      // });


      fft = new p5.FFT(0.9, 64);
      w = p.windowWidth / 64;
    };


    p.draw = () => {

      p.background(0);

      const vol = amp.getLevel();
      const diameter = p.map(vol, 0, 0.3, 10, 200);
      p.fill(vol * 1000, vol * 1000, vol * 1000);
      p.ellipse(p.width - 100, 100, diameter, diameter);



      // const waveforms = fft.waveform();
      //
      // for (let f = 0; f < waveforms.length; f++) {
      //   const rgb = wavelengthToRGB(waveforms[f], 0.8);
      //
      //   p.background(rgb[0], rgb[1], rgb[2]);
      // }


      const spectrum = fft.analyze();
      p.noStroke();

      for (let i = 0; i < spectrum.length; i++) {
        const barAmp = spectrum[i];
        const y = p.map(barAmp, 0, 256, p.height - 10, 0);
        p.fill(i, barAmp, barAmp);
        p.rect(i * w, y, w - 2, p.height - y);
      }

      const waveforms = fft.waveform();
      for (let i = 0; i < waveforms.length; i++) {
        const x = p.map(i, 0, waveforms.length, 0, p.width);
        const y = p.map( waveforms[i], -1, 1, 0, p.height);

        const colorX = p.map(i, 0, 256, 0, p.width);
        const colorY = p.map(waveforms[i], 0, 256, 0, p.height);

        p.translate(y, x);
        // p.rotate(angle);

        p.fill(i, colorX, colorY * 1000);
        p.circle(p.width / 2, 100, 20);
      }

      angle = angle + 5;
    };


    function wavelengthToRGB(waveform, gamma) {
      let R = 0;
      let G = 0;
      let B = 0;

      let attenuation;

      if (waveform >= 380 && waveform <= 440) {
        attenuation = 0.3 + 0.7 * (waveform - 380) / (440 - 380);
        R = Math.pow(((0 - waveform - 440) / (440 - 380)) * attenuation, gamma);
        G = 0.0;
        B = Math.pow(1.0 * attenuation, gamma);

      } else if (waveform >= 440 && waveform <= 490) {
        R = 0.0;
        G = Math.pow((waveform - 440) / (490 - 440), gamma);
        B = 1.0;

      } else if (waveform >= 490 && waveform <= 510) {
        R = 0.0;
        G = 1.0;
        B = Math.pow((0 - (waveform - 510) / (510 - 490)), gamma);

      } else if (waveform >= 510 && waveform <= 580) {
        R = Math.pow(((waveform - 510) / (580 - 510)), gamma);
        G = 1.0;
        B = 0.0;

      } else if (waveform >= 580 && waveform <= 645) {
        R = 1.0;
        G = Math.pow((0 - (waveform - 645) / (645 - 580)), gamma);
        B = 0.0;

      } else if (waveform >= 645 && waveform <= 750) {
        attenuation = 0.3 + 0.7 * (750 - waveform) / (750 - 645);
        R = Math.pow((1.0 * attenuation), gamma);
        G = 0.0;
        B = 0.0;

      } else {
        R = 0.0;
        G = 0.0;
        B = 0.0;
      }

      R = R * 255;
      G = G * 255;
      B = B * 255;

      return [R, G , B];
    }
  }

}
