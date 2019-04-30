import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NgNotebookComponent } from './ng-notebook/ng-notebook.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    NgNotebookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  entryComponents :[
    NgNotebookComponent
  ]
  
})
export class AppModule { 

  constructor(private injector : Injector){
    const comppnent = createCustomElement(NgNotebookComponent, { injector });
    customElements.define('ng-notebook', comppnent); 
  }

  

}
