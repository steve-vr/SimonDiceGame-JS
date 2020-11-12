
const lightblue = document.getElementById('lightblue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnStart = document.getElementById('btnStart')

class Game {
  constructor() {
    this.initialize();
    this.generateSequence();
    this.nextLevel();
  }

  initialize() {
    btnStart.classList.add('hide');
    this.level = 5;
    this.colors = {
      lightblue,
      violet,
      orange,
      green
    }
  }

  generateSequence() {
    this.sequence = new Array(10)
    .fill(0)
    .map(
      n => Math.floor(
        Math.random() * 4 
      )
    );
  }

  nextLevel() {
    this.sublevel = 0; 
    this.iluminateSequence();
    this.addEventsClick();
  }

  trasnformNumberInColor(number) {
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

  trasnformColorInNumber(color) {
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
      const color = this.trasnformNumberInColor(this.sequence[i]); 
      setTimeout(
        () => this.iluminateColor(color), 1000 * i
      );
    }
  }

  iluminateColor(color) {
    this.colors[color].classList.add('light');
    setTimeout(
      () => this.turnOffColor(color), 350
    );
  }

  turnOffColor(color) {
    this.colors[color].classList.remove('light');
  }

  addEventsClick() {
    for(const color in this.colors) {
      //this.colors[color].addEventListener('click', x => this.chooseColor(x)); 
      this.colors[color].addEventListener('click', this.chooseColor); 
    }
  }  

  chooseColor(ev) {
    const nameColor = ev.target.dataset.color;
    const numberColor = this.trasnformColorInNumber(nameColor)
    this.iluminateColor(nameColor)
  }

}

function startGame() {
  window.game = new Game();
}
