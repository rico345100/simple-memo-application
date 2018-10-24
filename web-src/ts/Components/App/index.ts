import { Observable, Subject } from 'rxjs';
import { ApolloQueryResult } from 'apollo-boost';
import { publish } from 'rxjs/operators';
import GQLClient from '../../GQLClient';
import { fetchNotes } from '../../GraphQL/queries';
import { injectStyle } from '../../utils';

@injectStyle(require('./style.css'))
class App extends HTMLElement {
    el: HTMLElement
    ondatareceived$: Subject<any>

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.ondatareceived$ = new Subject<any>();

        this.render();
    }
    connectedCallback() {
        this.fetchData();
    }
    async fetchData() {
        try {
            const data:ApolloQueryResult<any> = await GQLClient.instance.query({ query: fetchNotes });
            this.ondatareceived$.next(data);
        }
        catch(err) {
            console.error(err);
            console.error(err.stack);
        }
    }
    render() {
        this.el = document.createElement('div');
        this.el.className = 'memo-app';

        const titleEl = document.createElement('div');
        titleEl.className = 'title';
        titleEl.innerText = 'Simple Memo Application';
        this.el.appendChild(titleEl);

        const descEl = document.createElement('div');
        descEl.className = 'description';
        descEl.innerText = 'Click [+Button] to create new Memo / Click Memo to see detail';
        this.el.appendChild(descEl);

        this.shadowRoot.appendChild(this.el);
    }
}

window.customElements.define('memo-app', App);

export default App;