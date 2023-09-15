import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  ligns = new Array(6);
  columns = new Array(7);

  columnFunction(value: number) {
    console.log('column', value + 1)
  }

  lignFunction(value: number) {
    console.log('lign', value + 1)
  }

}
