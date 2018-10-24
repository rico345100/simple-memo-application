import { Observable, fromEvent } from 'rxjs';
import { injectStyle } from '../../utils';
// @ts-ignore
import memoIcon from '../../../images/memo.png';

@injectStyle(require('./style.css'))
class MemoItem extends HTMLElement {
    el: HTMLElement
    imageEl: HTMLImageElement
    textEl: HTMLParagraphElement
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
        this.textEl.innerText = this.getAttribute('title');
    }
    render() {
        this.el = document.createElement('div');
        this.el.className = 'note';

        this.imageEl = document.createElement('img');
        this.imageEl.className = 'img';
        this.imageEl.src = memoIcon;
        this.el.appendChild(this.imageEl);

        this.textEl = document.createElement('p');
        this.textEl.className = 'title';
        this.el.appendChild(this.textEl);
        
        this.attributeChangedCallback(null, null, null);

        this.onclick$ = fromEvent(this.el, 'click');
        this.shadowRoot.appendChild(this.el);
    }
}

window.customElements.define('memo-item', MemoItem);

export default MemoItem;