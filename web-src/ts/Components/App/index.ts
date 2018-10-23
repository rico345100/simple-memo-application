import './style.css';

class App extends HTMLElement {
    // Type Defs
    el:HTMLElement

    // Variable Defs
    constructor(...args) {
        super();

        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        console.log("It's connected");
    }
    render() {
        this.el = document.createElement('div');
        this.el.className = 'app';
    }
}

export default App;