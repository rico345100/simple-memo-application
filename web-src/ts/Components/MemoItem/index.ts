import { Observable, fromEvent } from 'rxjs';
import { injectStyle } from '../../utils';

@injectStyle(require('./style.css'))
class MemoItem extends HTMLElement {
    el: HTMLElement
    onclick$: Observable<Event>

    static get observedAttributes() {
        return ['title'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.render();
    }
    attributeChangedCallback(attrName:string, oldVal:any, newVal:any) {
        this.el.innerText = this.getAttribute('title');
    }
    render() {
        this.el = document.createElement('div');
        this.el.className = 'note';
        
        const title = this.getAttribute('title');

        this.el.innerText = title;

        this.onclick$ = fromEvent(this.el, 'click');
        this.shadowRoot.appendChild(this.el);
    }
}

window.customElements.define('memo-item', MemoItem);

export default MemoItem;