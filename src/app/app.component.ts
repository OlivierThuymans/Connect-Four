import { Component } from '@angular/core';
import { TokenData } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  ligns = new Array(6);
  columns = new Array(7);

  addedTokens: TokenData[] = [];
  //addedYellowTokens: TokenData[] = [];

  selectedToken: string = '';
  x!: number;
  y!: number;

  column(value: number) {
    this.y = value + 1;
  }

  lign(value: number) {
    this.x = value + 1;
  }

  tokenSelection(color: string) {
    this.selectedToken = color;
  }

  circleColor(y: number, x: number) {
    //console.log(y + 1, x + 1)
    let color: string;
    let currentCircle = this.addedTokens.find(item => item.y === y && item.x === x)
    !currentCircle ? color = 'e' : currentCircle.color === 'red' ? color = 'red' : currentCircle.color === 'yellow' ? color = 'yellow' : null;
    return color;
  }

  circleData(color: string, y: number, x: number) {

    this.selectedToken !== '' ? console.log(color, y, x) : null;

    //const fieldName = `added${color.charAt(0).toUpperCase() + color.slice(1)}Tokens`;

    if(this.selectedToken !== '') {
      this.addedTokens.push({
        color: color,
        y: y,
        x: x
      })
    }
    
  }

  

}
