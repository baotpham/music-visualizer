import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { VisualizerComponent } from './pages/visualizer/visualizer.component';

// Plugins
import { FileDropModule } from 'ngx-file-drop';

// Services
import { VisualizerService } from './services/visualizer/visualizer.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisualizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileDropModule,
    FormsModule
  ],
  providers: [
    VisualizerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
