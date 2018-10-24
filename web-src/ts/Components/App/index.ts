import { Subject } from 'rxjs';
import { ApolloQueryResult } from 'apollo-boost';;
import GQLClient from '../../GQLClient';
import { fetchNotes } from '../../GraphQL/queries';
import { injectStyle } from '../../utils';
import { toList$, requestData$ } from '../../subjects';

@injectStyle(require('./style.css'))
class App extends HTMLElement {
    el: HTMLElement
    unsubscriber$: Subject<boolean>

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();

        this.unsubscriber$ = new Subject<boolean>();
    }
    async fetchData() {
        // If already has subscribers, unsubscribe them all
        if(this.unsubscriber$) {
            this.unsubscriber$.next(true);
            this.unsubscriber$.unsubscribe();
        }

        this.unsubscriber$ = new Subject<boolean>();

        try {
            const result:ApolloQueryResult<any> = await GQLClient.instance.query({ query: fetchNotes });
            toList$.next(result.data.notes);
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

        requestData$.subscribe(this.fetchData);
    }
}

window.customElements.define('memo-app', App);

export default App;