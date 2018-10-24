import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { toList$, deleteNote$, requestData$ } from '../../subjects';
import { injectStyle } from '../../utils';
// @ts-ignore
import trashCan from '../../../images/trash-can.png';

@injectStyle(require('./style.css'))
class FullscreenViewer extends HTMLElement {
    el: HTMLElement
    titleEl: HTMLElement
    titleSubjectEl: HTMLElement
    titleDateEl: HTMLElement
    textEl: HTMLElement
    updateButtonEl: HTMLElement
    closeButtonEl: HTMLElement
    deleteButtonEl: HTMLElement

    static get observedAttributes() {
        return ['title', 'text', 'createdAt', 'updatedAt', 'show'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.render();
    }
    attributeChangedCallback(attrName:string, oldVal:any, newVal:any) {
        const show = this.getAttribute('show');
        
        if(show === 'true') {
            this.titleSubjectEl.innerText = this.getAttribute('title');
            this.titleDateEl.innerText = `Created: ${this.getAttribute('createdAt')} / Updated: ${this.getAttribute('updatedAt')}`;
            this.textEl.innerText = this.getAttribute('text');

            this.el.style.display = 'block';
        }
        else {
            this.el.style.display = 'none';
        }
    }
    renderUpdateButton() {
        this.updateButtonEl = document.createElement('div');
        this.updateButtonEl.className = 'update-button';
        this.updateButtonEl.innerText = 'Edit';
        this.el.appendChild(this.updateButtonEl);
    }
    renderCloseButton() {
        this.closeButtonEl = document.createElement('div');
        this.closeButtonEl.className = 'close-button';
        this.closeButtonEl.innerText = 'Close';
        this.el.appendChild(this.closeButtonEl);

        fromEvent(this.closeButtonEl, 'click')
        .subscribe(() => requestData$.next());
    }
    renderDeleteButton() {
        this.deleteButtonEl = document.createElement('div');
        this.deleteButtonEl.className = 'delete-button';

        const img = document.createElement('img');
        img.className = 'delete-button__img';
        img.src = trashCan;

        this.deleteButtonEl.appendChild(img);
        
        this.el.appendChild(this.deleteButtonEl);
    }
    render() {
        this.el = document.createElement('div');
        this.el.className = 'fullscreen-viewer';

        this.titleEl = document.createElement('div');
        this.titleEl.className = 'title';
        this.el.appendChild(this.titleEl);

        this.titleSubjectEl = document.createElement('div');
        this.titleSubjectEl.className = 'title__subject';
        this.titleEl.appendChild(this.titleSubjectEl);

        this.titleDateEl = document.createElement('div');
        this.titleDateEl.className = 'title__date';
        this.titleEl.appendChild(this.titleDateEl);

        this.textEl = document.createElement('div');
        this.textEl.className = 'text';
        this.el.appendChild(this.textEl);

        this.shadowRoot.appendChild(this.el);
        this.attributeChangedCallback(null, null, null);

        this.renderUpdateButton();
        this.renderCloseButton();
        this.renderDeleteButton();
    }
}

window.customElements.define('fullscreen-viewer', FullscreenViewer);

export default FullscreenViewer;