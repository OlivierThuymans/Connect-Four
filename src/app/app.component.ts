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


  hasWon: boolean = false;
  hasWonC: boolean = false;

  checkWinningCrosses(coloredArray: TokenData[], startTarget: TokenData) {
    let startY = startTarget?.y
    let startX = startTarget?.x
    let result: boolean;

    let found1 = coloredArray.find(item => {
      return item.y === startY + 1 && item.x === startX - 1;
    })
    
    if(found1) {
      startY += 1;
      startX -= 1;
      console.log('found1')
    }
    
    let found2 = coloredArray.find(item => {
      return item.y === startY + 1 && item.x === startX - 1;
    })
    
    if(found2) {
      startY += 1;
      startX -= 1;
      console.log('found2')
    }

    let found3 = coloredArray.find(item => {
      return item.y === startY + 1 && item.x === startX - 1;
    })
    
    if(found3) {
      startY += 1;
      startX -= 1;
      console.log('found2')
      result = true;
    }
    return result;
  }


  checkWinningLignsColumns(lignCol: number, coloredArray: TokenData[], isLign: boolean) {

    let xToY = isLign ? 'x' : 'y';
    let yToX = isLign ? 'y' : 'x';

    let sortedArrayFiltered = coloredArray.filter(item => item[xToY] === lignCol);
    let sortedArraySorted = sortedArrayFiltered.sort(function(a, b) {
      return a[yToX] - b[yToX];
    })

    let wonLign = [];
    let result;

    sortedArraySorted.map((item, index) => {
      if(index < sortedArraySorted.length - 1) {
        if(item[yToX] + 1 === sortedArraySorted[index + 1][yToX] && item[xToY] === sortedArraySorted[index + 1][xToY]) {
          wonLign.length === 0 ? wonLign.push('x', 'x') : wonLign.push('x');
        }
        if(item[yToX] + 1 !== sortedArraySorted[index + 1][yToX] && wonLign.length < 4) {
          wonLign = [];
        }
        result = wonLign.length >= 4
      }
    })
    return result;
  };
 
  winningLign = []
  winningColumn = []
  winningCrosses: boolean;

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

      // for(let i = 1; i <= 7; i++) {
      //  this.winningLign = this.checkWinningLignsColumns(i, this[fieldName], true)
      //  //console.log(this.winningLign)
      //  this.winningLign ? this.hasWon = true : false;
      // }

      // for(let i = 1; i <= 6; i++) {
      //   this.winningColumn = this.checkWinningLignsColumns(i, this[fieldName], false)
      //   //console.log(this.winningLign)
      //   this.winningColumn ? this.hasWon = true : false;
      //  }

       //////////////////////////////////////////////////

       for(let i = 0; i <= this[fieldName].length; i++) {
        // let result1 = this.checkWinningCrossesRight(i, 3, this[fieldName]);
        // let result2 = this.checkWinningCrossesRight(i, 4, this[fieldName]);
        // let result3 = this.checkWinningCrossesRight(i, 5, this[fieldName]);
        let result = this.checkWinningCrosses(this[fieldName], this[fieldName][i]);
        console.log(result)
        result ? this.hasWonC = true : false;
       }

       for(let i = 7; i >= 1; i--) {
        //let result5 = this.checkWinningCrossesRight(this[fieldName]);
        //console.log(result5)
        //result5 ? this.hasWonC = true : false;
       }
      

      console.log(this.addedRedTokens)
    }


  }

  

}
