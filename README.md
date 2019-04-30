# 建立 Angular Element

## 摘要
> * 瀏覽器支援
> * 開發限制
> * 建置步驟
> * Component撰寫
> * 外部引用

### 瀏覽器支援

|  瀏覽器    |    支援程度      |
| ---------- |:-------------: |
|  Chrome   |    支持 	     |
|  Opera    |    支持  		  |
|  Safari   |    支持 		  |
|  Edge     |    尚未支持      |
|  Firefox  |    ver.63+ 支持  |

### 開發限制
> `@angular/cli` 版本 `6+`

### 建置步驟
> 目的 ： 在空白 .html內建立一個浮動方框 , 可讓使用者能夠輸入資料 , 且可伸縮拖曳 , 展示結果如下

![demo](https://github.com/chenHungTzu/ng-element-example/blob/master/demo2.gif?raw=true)


1 建立一個空的angular專案

```
ng new 專案名稱
```

2 新增angular cli 模組 , 以進行component註冊

```
ng add @angular/elements
```

3 建立component

```
ng g component ng-notebook
```

4 下載UI相關套件

```
ng add @angular/cdk 			// 拖曳功能
ng add @angular/material		// UI框架
```

5.修改 `./src/app/app.module.ts`

```javascript

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
    NgNotebookComponent.
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,	 // angular cdk
    MatIconModule,   // metrial 樣式
    FormsModule,     // metrial 樣式
    MatButtonModule, // metrial 樣式
    MatInputModule   // metrial 樣式
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


```

這邊會發現 `bootstrap` 以及 `app.component.ts` 被移除了 , 原因是因為該專案只輸出功能compnent , 因此並不需要網頁進入點。

6 修改 `./tsconfig.json`

```javascript

{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "module": "es2015",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es2015",     // replace es5 to es2015
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ]
  }
}


```

7 修改 `./package.json`

```javascript
{
  "name": "ng-component-sample",
  "version": "0.0.0",
  "scripts": {
    ...
    "build": "ng build --prod --outputPath=dist/ng-notebook/ --output-hashing=none && cat dist/ng-notebook/{runtime,polyfills,scripts,main}.js > dist/ng-notebook.js",
    ...
  },
  "private": false,
  ...
```
這邊將 `runtime.js` ,`polyfills.js` , `scripts.js` , `main.js` 合併成單一檔案 `ng-notebook.js` 

> 目前建置步驟已經建立完畢了 , 可以專心進行component的開發


### Component撰寫

修改 `./src/app/ng-notebook/ng-notebnook.component.html`

```html

<div class="notebook" cdkDrag>
  <div class="notebook-top">
    <mat-icon class='zoom_in' (click)="displaycontent = !displaycontent ">{{displaycontent ? 'zoom_out' : 'zoom_in'}}
    </mat-icon>
    <mat-icon class="zoom_out_map" cdkDragHandle>zoom_out_map</mat-icon>
  </div>
  <div class="notebook-content" *ngIf="displaycontent">
    <div class="note-list" *ngIf="notecollection && notecollection.length > 0;else nodata">
      <div class='note-item' *ngFor="let note of notecollection">
        <div><strong>{{note.name}}</strong></div>
        <div><samp>{{note.content}}</samp></div>
        <div align="right"><small>{{note.time}}</small></div>
      </div>
    </div>
    <ng-template #nodata>尚無資料</ng-template>
    <div class="note-input">
      <mat-form-field class="txt-note">
        <textarea matInput [(ngModel)]="notePayload.content"></textarea>
      </mat-form-field>
      <div align="center">
        <input matInput [(ngModel)]="name" />
        <button mat-button class="btn-note" (click)="btnSend($event)">送出</button>
      </div>
    </div>
  </div>

</div>

```

修改 `./src/app/ng-notebook/ng-notebnook.component.scss`

```css

  .notebook {
    width: 400px;
    box-sizing: border-box;
    border: solid 1px #ccc;
    color: rgba(0, 0, 0, 0.87);
    background: #ffe4b3;
    border-radius: 4px;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
  
  .notebook:active {
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                0 8px 10px 1px rgba(0, 0, 0, 0.14),
                0 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
  
  .notebook-top {
    height: 24px;
    background-color: orange;
    width: 100%;
  }

  .notebook-content{
    height: 400px;
    max-height: 400px;
    overflow-y: scroll;
  }

  .material-icons {
    font-family: Material Icons;
    font-weight: normal;
    font-style: normal;
    font-size: 1.5rem;
}

.notebook-top .material-icons{  
    position: absolute;  
    cursor: pointer;
} 
.notebook-top{
  .zoom_in{
    left:  0;
    
  }
  .zoom_out_map{
    right: 0;
  }
}

.note-list{
 max-height: 300px;
 overflow-y: scroll;
 .note-item{
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  border-bottom-color: gray;
  border-bottom-style: dotted;
  border-bottom-width: 1px;


  samp{
   
    padding-left: 10px;
    font-size: 16px;
  }
  small{   
    color: gray;
    font-style: italic;

  }

}
}

.txt-note{
  background-color: #fff;
  width: 100%
}

.note-input{  
  position: absolute;
  width: 100%;
  bottom: 0;
}


```

修改 `./src/app/ng-notebook/ng-notebnook.component.ts`

```javascript

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
   
    return this._displaycontent;
  }
  set displaycontent(value: boolean) {

    this._displaycontent = "" + value === "true";
   
  }

  // @Output轉換為event , 透過外部做addEventListener訂閱
  @Output() onnotechange = new EventEmitter<notePayload>();

  // @Input將轉換成html attribute , 從外部傳入
  @Input() name: string = "";

  // @Input將轉換成html attribute , 從外部傳入
  // 陣列需要轉換為JSON STRING 
  @Input('notecollection')
  get notecollection(): Array<notePayload> {
   
    return this._notecollection;
  }
  set notecollection(value: Array<notePayload>) {

    try {
      this._notecollection = JSON.parse(`${value.toString()}`);
    } catch (error) {
      this._notecollection = [];
    }

  }

  constructor() { }

  ngOnInit() {

  }

  btnSend() {
    this.notePayload.name = this.name;
    this.notePayload.time = new Date().toDateString();
    
    // 觸發外部定義event listener handler
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

```

修改完畢後 , 執行指令 , 於`./dist`中可找到 `ng-notebook.js`
 
 ```
 npm run build
 ```

### 外部引用

建立 `index.html` , 且異動內容如下

```javascript

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

// ng-notebook 為angular 定義的selector 
// displaycontent , name , notecollection 為 @Input 定義之成員
<ng-notebook displaycontent="true" name="chen" notecollection="[]"></ng-notebook>

// 匯入建置結果檔
<script type="text/javascript" src="./ng-notebook.js"></script>


<script>
		  
        const element = document.querySelector('ng-notebook');
        
        // 當angular 內部按下按鈕後 , 將會觸發外部該handler
        element.addEventListener('onnotechange', (event) => {
           append(event.detail);
        }); 
		
		 // 更新element attribute 項目後 , UI將會即時更新
        function append(payload){
            let col = element.getAttribute("notecollection");
            let arr = JSON.parse(col);
            arr.push(payload);
            ele.setAttribute('notecollection',JSON.stringify(arr));
        }
</script>



```
 







