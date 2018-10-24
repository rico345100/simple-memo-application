import { fromEvent } from 'rxjs';
import GQLClient from '../../GQLClient';
import { injectStyle } from '../../utils';
import { createNote } from '../../GraphQL/mutations';
import { requestData$ } from '../../subjects';

@injectStyle(require('./style.css'))
class CreateMemoButton extends HTMLElement {
    el: HTMLElement
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    async createMemo() {
        const title = window.prompt("Type the name of the new memo: ");

        if(!title) return;
    
        try {
            const variables = { title, text: '' };
            await GQLClient.instance.mutate({ mutation: createNote, variables });
            
            // Refetch Data!
            requestData$.next();
        }
        catch(err) {
            alert('Failed to create memo! Check the Browser console to see details!');
            console.error(err);
            console.error(err.stack);
        }
    }
    render() {
        this.el = document.createElement('div');
        this.el.className = 'create-button';
        this.el.innerText = '+';
        
        fromEvent(this.el, 'click').subscribe(this.createMemo);

        this.shadowRoot.appendChild(this.el);
    }
}

window.customElements.define('create-memo-button', CreateMemoButton);

export default CreateMemoButton;