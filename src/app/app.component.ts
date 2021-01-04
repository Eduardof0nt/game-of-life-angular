import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'The Game Of Life';
  size = 50;
  states: Array<any>;
  running = false;
  speed = 5;
  minimumSpeed = 0;
  maximumSpeed = 10;
  constructor() {
    this.states = [];
    for (let i = 0; i < this.size; i++) {
      var row = [];
      for (let j = 0; j < this.size; j++) {
        row.push({ state: 0, i: i, j: j });
      }
      this.states.push(row);
    }
  }

  uploadFile() {
    var inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'json';
    inputFile.style.zIndex = '-1';
    inputFile.onchange = () => {
      this.fileSelected(inputFile.files);
    };
    inputFile.click();
  }

  changeState(i: number, j: number) {
    if (!this.running) {
      this.states[i][j].state = Math.abs(this.states[i][j].state - 1);
    }
  }

  runStop() {
    this.running = !this.running;
    this.run();
  }

  run() {
    if (this.running) {
      setTimeout(() => {
        this.calculateNextState();
        this.run();
      }, 500 / this.speed);
    }
  }

  calculateNextState() {
    var cellsCopy = [];
    for (let i = 0; i < 50; i++) {
      let row = [];
      for (let j = 0; j < 50; j++) {
        var aliveNeighbors = 0;
        for (let m = -1; m < 2; m++) {
          for (let n = -1; n < 2; n++) {
            try {
              if (this.states[i + m][j + n].state == 1 && (m != 0 || n != 0)) {
                aliveNeighbors = aliveNeighbors + 1;
              }
            } catch (err) {}
          }
        }
        if (this.states[i][j].state == 1) {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            row.push({
              state: 0,
              i: i,
              j: j,
            });
          } else {
            row.push({
              state: 1,
              i: i,
              j: j,
            });
          }
        } else {
          if (aliveNeighbors == 3) {
            row.push({
              state: 1,
              i: i,
              j: j,
            });
          } else {
            row.push({
              state: 0,
              i: i,
              j: j,
            });
          }
        }
      }
      cellsCopy.push(row);
    }
    this.states = cellsCopy;
  }

  onSliderChange(selectedValues: number[]) {
    this.speed = selectedValues[0];
  }

  clear() {
    this.states = [];
    for (let i = 0; i < this.size; i++) {
      var row = [];
      for (let j = 0; j < this.size; j++) {
        row.push({ state: 0, i: i, j: j });
      }
      this.states.push(row);
    }
  }

  save() {
    var jsonArray = [];
    for (let i = 0; i < 50; i++) {
      let row = [];
      for (let j = 0; j < 50; j++) {
        row.push(String(this.states[i][j].state));
      }
      jsonArray.push(row);
    }
    var blob: any = new Blob([JSON.stringify(jsonArray)], {
      type: 'octet/stream',
    });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'GOL.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  fileSelected(files: any) {
    let reader = new FileReader();
    let file = files[0];
    reader.readAsText(file);
    var aux_this = this;
    reader.onload = () => {
      var jsonArray = JSON.parse(<string>reader.result);
      aux_this.states = [];
      for (let i = 0; i < 50; i++) {
        let row = [];
        for (let j = 0; j < 50; j++) {
          row.push({
            state: parseInt(jsonArray[i][j]),
            i: i,
            j: j,
          });
        }
        aux_this.states.push(row);
      }
    };
  }
}
