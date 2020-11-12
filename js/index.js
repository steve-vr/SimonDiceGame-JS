
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
    this.iluminateSequence();
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

}

function startGame() {
  window.game = new Game();
}
