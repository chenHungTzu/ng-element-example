import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ng-notebook',
  templateUrl: './ng-notebook.component.html',
  styleUrls: ['./ng-notebook.component.scss']
})
export class NgNotebookComponent implements OnInit {

  public notePayload: notePayload = new notePayload();
  private _notecollection = [];
  private _displaycontent = true;


  @Input('displaycontent')
  get displaycontent(): boolean {
    console.log(`[get] ${this._displaycontent}`)
    return this._displaycontent;
  }
  set displaycontent(value: boolean) {

    this._displaycontent = "" + value === "true";
    console.log(`[set] ${this._displaycontent}`)
  }


  @Output() onnotechange = new EventEmitter<notePayload>();

  @Input() name: string = "";

  @Input('notecollection')
  get notecollection(): Array<notePayload> {
    console.log(`[get] ${this._notecollection}`)
    return this._notecollection;
  }
  set notecollection(value: Array<notePayload>) {

    console.log(value)
    try {
      this._notecollection = JSON.parse(`${value.toString()}`);
    } catch (error) {
      console.log(error);
      this._notecollection = [];
    }

    console.log(`[set] ${this._notecollection}`)
  }

  constructor() { }

  ngOnInit() {

  }

  btnSend() {
    this.notePayload.name = this.name;
    this.notePayload.time = new Date().toDateString();
    this.onnotechange.emit(this.notePayload);
  }

}


export class notePayload {

  constructor() {

  }

  name: string;
  content: string;
  time: string
}