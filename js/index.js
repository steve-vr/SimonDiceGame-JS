
const lightblue = document.getElementById('lightblue');
const violet = document.getElementById('violet');
const orange = document.getElementById('orange');
const green = document.getElementById('green');
const btnStart = document.getElementById('btnStart');
const LAST_LEVEL = 5;

class Game {
  constructor() {
    this.initialize();
    this.generateSequence();
    setTimeout(this.nextLevel, 500);
  }

  initialize() {
    this.nextLevel = this.nextLevel.bind(this);
    btnStart.classList.add('hide');
    this.level = 1;
    this.colors = {
      lightblue,
      violet,
      orange,
      green
    }
  }

  // toogleBtnStart() {
  //   (btnStart.classList.contains('hide')
  //   ? btnStart.classList.remove('hide') 
  //   :  btnStart.classList.contains('hide'))
  // }

  generateSequence() {
    this.sequence = new Array(LAST_LEVEL)
    .fill(0)
    .map(n => Math.floor(Math.random() * 4 ));
  }

  nextLevel() {
    this.sublevel = 0; 
    this.iluminateSequence();
    this.addEventsClick();
  }

  transformNumberInColor(number) {
    switch (number) {
      case 0:
        return 'lightblue'     
      case 1:
        return 'violet'      
      case 2:
        return 'orange'
      case 3:
        return 'green'
    }
  }

  transformColorInNumber(color) {
    switch (color) {
      case 'lightblue':
        return 0     
      case 'violet':
        return 1      
      case 'orange':
        return 2
      case 'green':
        return 3
    }
  }

  iluminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.transformNumberInColor(this.sequence[i]); 
      setTimeout(
        () => this.iluminateColor(color, i), 1000 * i
      );
    }
  }

  iluminateColor(color, i) {
    this.colors[color].classList.add('light');
    setTimeout(
      () => this.turnOffColor(color, i), 350
    );
  }

  turnOffColor(color) {
    this.colors[color].classList.remove('light');
  }

  addEventsClick() {
    for(const color in this.colors) {
      //this.colors[color].addEventListener('click', x => this.chooseColor(x)); 
      this.colors[color].addEventListener('click', this.chooseColor.bind(this)); 
    }
  }  

  deleteEventClick() {
    for(const color in this.colors) {
      this.colors[color].removeEventListener('click', this.chooseColor.bind(this)); 
    }
  }  

  chooseColor(ev) {
    const nameColor = ev.target.dataset.color;
    const numberColor = this.transformColorInNumber(nameColor);
    this.iluminateColor(nameColor);
    if(numberColor === this.sequence[this.sublevel]) {
      this.sublevel++
        if(this.sublevel === this.level) {
          this.level++
          this.deleteEventClick();
          if(this.level === (LAST_LEVEL + 1)) {
            this.winGame();
          } else {
            setTimeout(this.nextLevel, 1500);
          }
        }
    } else {
      //this.loseGame()

    }
  }
  // winGame() {
  //   swal("algo",'Ganaste!','success')
  //   .then(() => {
  //     this.initialize.bind(this); 
  //     //this.toogleBtnStart();
  //   });
  // }
  // loseGame() {
  //   swal("algo",'Mala suerte!','error')
  //   .then(() => { 
  //     this.deleteEventClick(); 
  //     this.initialize();
  //     this.toogleBtnStart();
  //   });
  // }
}

function startGame() {
  window.game = new Game();
}
 