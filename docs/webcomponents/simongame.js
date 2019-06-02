class SimonGame extends HTMLElement {
    constructor() {
      super();
      this.root = this.attachShadow({ mode: 'open' });
    }

    // constructor() {
    //     super();
    //     this.name = this.getAttribute('name');
    //     this.attachShadow({mode:'open'});
    // }

    // ${this.name}

    connectedCallback() {
        this.render();
        // this.shadowRoot.querySelector('button').addEventListener('click', ()=> this.checkTodo());
    }

    render () {
      this.root.innerHTML = `
            <style>
             

            </style>
           


            <main id="simon-game">
                <h1>Pastel Simon Game</h1>

                <section id="gameBoard">
                    <div class="alert" id="correct">Perfect!</div>
                    <div class="alert" id="incorrect">Wrong!</div>
                    <button id="button-0" class="btnClick btnYellow"></button>
                    <button id="button-1" class="btnClick btnRed"></button>
                    <button id="button-2" class="btnClick btnBlue"></button>
                    <button id="button-3" class="btnClick btnGreen"></button>
                </section>

                <button id="startGame">Let's start</button>
                <button id="resetBtn">Reset</button>

            
                <div id="gameLevel">
                    Level <span id="level"></span>
                </div>

                <div id="introduction">
                    Click the "Start" button then watch the pattern of the flashing panels.<br>
                    Press the panels in the same order you saw them flash.
                </div>

            </main>

            `;
    }
  }
  
  customElements.define('simongame', SimonGame);