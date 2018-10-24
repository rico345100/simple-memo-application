import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-boost';;
import GQLClient from '../../GQLClient';
import { fetchNotes } from '../../GraphQL/queries';
import { injectStyle } from '../../utils';
import { toList$, requestData$, toFullscreen$ } from '../../subjects';
import { Note } from '../../../../src/entity/Note';
import { ObservableHTMLElement } from '../../types';

@injectStyle(require('./style.css'))
class App extends HTMLElement {
    el: HTMLElement
    memoEls: Array<HTMLElement>
    unsubscriber$: Subject<boolean>

    constructor() {
        super();

        this.memoEls = [];

        this.attachShadow({ mode: 'open' });
        this.unsubscriber$ = new Subject<boolean>();

        this.render();
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
    renderMemos(notes:Note[]) {
        // Remove previous Memos
        this.memoEls.map((memoEl:HTMLElement) => {
            memoEl.parentNode.removeChild(memoEl);
        });

        this.memoEls = [];

        notes.map((note:Note) => {
            const memoEl:ObservableHTMLElement = document.createElement('memo-item');
            memoEl.setAttribute('title', note.title);
            memoEl.onclick$.pipe(
                takeUntil(this.unsubscriber$)
            ).subscribe(() => {
                toFullscreen$.next(note);
            });
    
            this.el.appendChild(memoEl);
    
            this.memoEls.push(memoEl);
        });
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
        toList$.subscribe((notes:Note[]) => this.renderMemos(notes));
    }
}

window.customElements.define('memo-app', App);

export default App;