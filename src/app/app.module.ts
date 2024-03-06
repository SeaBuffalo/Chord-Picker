import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FretboardComponent } from './components/fretboard/fretboard.component';
import { NoteComponent } from './components/note/note.component';
import { ChordDisplayComponent } from './components/chord-display/chord-display.component';

@NgModule({
  declarations: [
    AppComponent,
    FretboardComponent,
    NoteComponent,
    ChordDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
