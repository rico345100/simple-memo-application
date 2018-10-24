import { Observable, fromEvent } from 'rxjs';
import { injectStyle } from '../../utils';

@injectStyle(require('./style.css'))
class CreateMemoButton extends HTMLElement {
    el: HTMLElement
    onclick$: Observable<Event>

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    render() {
        this.el = document.createElement('div');
        this.el.className = 'create-button';
        this.el.innerText = '+';

        this.onclick$ = fromEvent(this.el, 'click');

        this.shadowRoot.appendChild(this.el);
    }
}

window.customElements.define('create-memo-button', CreateMemoButton);

export default CreateMemoButton;