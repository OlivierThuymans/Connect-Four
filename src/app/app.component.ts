import { Component } from '@angular/core';
import { TokenData } from './interfaces';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  ligns = new Array(6);
  columns = new Array(7);

  addedTokens: TokenData[] = [];
  addedRedTokens: TokenData[] = [];
  addedYellowTokens: TokenData[] = [];

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
    let currentCircle = this.addedTokens.find(item => item.y === y + 1 && item.x === x + 1)
    !currentCircle ? color = 'e' : currentCircle.color === 'red' ? color = 'red' : currentCircle.color === 'yellow' ? color = 'yellow' : null;
    return color;
  }


  findX(col: number) {
    let number: number = 6;
    
    for(let i = 1; i <= 6; i++) {
      let targetX = i;
      let targetY = col;
      let found = this.addedTokens.find(item => item.y === targetY && item.x === targetX)
    
      if (found) {
        number = found.x - 1;
        break;
      }
    }
    return number;
  }


  hasWon: boolean;

  checkWinningLigns(column: number, coloredArray: TokenData[]) {
    let sortedArray = coloredArray.sort(function(a, b) {
      return a.y - b.y;
    })

    let wonArray = [];

    sortedArray.map((item, index) => {
      if(index < sortedArray.length - 1) {
        if(item.y + 1 === sortedArray[index + 1].y && item.x === sortedArray[index + 1].x) {
          wonArray.length === 0 ? wonArray.push('x', 'x') : wonArray.push('x');
          this.hasWon = wonArray.length >= 4;
        }
        if(item.y + 1 !== sortedArray[index + 1].y) {
          wonArray = [];
        }
        console.log(wonArray)
        
      }
    })

    

  }
 
  circleData(color: string, y: number, x: number) {

    const fieldName = `added${color.charAt(0).toUpperCase() + color.slice(1)}Tokens`;

    let col = y + 1;
    let lign = x + 1;

    //console.log(col, lign)
    
    this.findX(col);

    let entryDoesNotExist = this.addedTokens.find(item => item.color === color && item.y === col && item.x === this.findX(col));

    if(this.selectedToken !== '' && !entryDoesNotExist) {
      this.addedTokens.push({
        color: color,
        y: col,
        x: this.findX(col)
      })

      this.addedRedTokens = this.addedTokens.filter(item => item.color === 'red');
      this.addedYellowTokens = this.addedTokens.filter(item => item.color === 'yellow');

      for(let i = 1; i <= 7; i++) {
        this.checkWinningLigns(i, this.addedRedTokens);
      }
      

      console.log(this.addedRedTokens)
    }


  }

  

}
