const style = require('./style.css');

class CreateMemoButton extends HTMLElement {
    el: HTMLElement

    constructor(...args:Array<any>) {
        super();
        this.attachShadow({ mode: 'open' });

        this.addEventListener('click', this.handleClick);
    }
    connectedCallback() {
        this.render();
    }
    handleClick() {
        console.log('You clicked CreateMemoButton!');
    }
    render() {
        this.el = document.createElement('div');
        this.el.className = 'create-button';
        this.el.innerText = '+';

        this.shadowRoot.appendChild(this.el);

        const styleEl = document.createElement('style');
        styleEl.innerText = style;

        this.shadowRoot.appendChild(styleEl);
    }
}

window.customElements.define('create-memo-button', CreateMemoButton);

export default CreateMemoButton;