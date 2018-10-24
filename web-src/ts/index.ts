import { ApolloQueryResult } from 'apollo-boost';
import { Note } from '../../src/entity/Note';

// Initialize Apollo Client
import GQLClient from './GQLClient';

// Register Web Components
import './Components/App';
import './Components/CreateMemoButton';
import './Components/MemoItem';

// Import Types
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ObservableHTMLElement, ObservableXHRElement } from './types';

// Import Queries
import { createNote } from './GraphQL/mutations';

async function createMemo() {
    const title = window.prompt("Type the name of the new memo: ");

    if(!title) return;

    try {
        const variables = { title, text: '' };
        await GQLClient.instance.mutate({ mutation: createNote, variables });
        
        // Refetch Data!
        const appEl:ObservableXHRElement = document.getElementById('app');
        appEl.fetchData();
    }
    catch(err) {
        alert('Failed to create memo! Check the Browser console to see details!');
        console.error(err);
        console.error(err.stack);
    }
}

// Delay the execution of main application flow by using IIFE
// Until browser loads all necessary resources
(function() {
    GQLClient.initialize();

    // Build Basic App
    const appEl:ObservableXHRElement = document.createElement('memo-app');
    appEl.id = 'app';
    document.body.appendChild(appEl);

    const createMemoButtonEl:ObservableHTMLElement = <ObservableHTMLElement><any> document.createElement('create-memo-button');
    document.body.appendChild(createMemoButtonEl);

    const memoButtonClick$:Observable<Event> = createMemoButtonEl.onclick$;

    // Create new memo!
    memoButtonClick$.subscribe(createMemo);

    // Refreshing Memo List
    let memoEls:Array<HTMLElement> = [];
    
    appEl.ondatareceived$.subscribe((result:ApolloQueryResult<any>) => {
        // Remove previous Memos
        memoEls.map((memoEl:ObservableHTMLElement) => {
            memoEl.parentNode.removeChild(memoEl);
        });

        memoEls = [];

        // Create new Memos
        const { notes } = result.data;

        notes.map((note:Note) => {
            const memoEl:ObservableHTMLElement = document.createElement('memo-item');
            memoEl.setAttribute('title', note.title);
            memoEl.onclick$.pipe(
                takeUntil(appEl.unsubscriber$)
            ).subscribe(() => {
                console.log('Clicked', note);
            });

            appEl.el.appendChild(memoEl);

            memoEls.push(memoEl);
        });
    });
})();
