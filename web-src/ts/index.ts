import { Note } from '../../src/entity/Note';

// Initialize Apollo Client
import GQLClient from './GQLClient';

// Register Web Components
import './Components/App';
import './Components/CreateMemoButton';
import './Components/MemoItem';
import './Components/FullscreenViewer';

// Import Types
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ObservableHTMLElement, ObservableXHRElement } from './types';

// Import Queries
import { createNote } from './GraphQL/mutations';

// Import Subjects
import { toList$, toFullscreen$, requestData$ } from './subjects';

async function createMemo() {
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

// Refreshing Memo List
let memoEls:Array<HTMLElement> = [];

async function renderMemos(notes:Note[]) {
    const appEl:ObservableXHRElement = document.getElementById('app');
    
    // Remove previous Memos
    memoEls.map((memoEl:ObservableHTMLElement) => {
        memoEl.parentNode.removeChild(memoEl);
    });

    memoEls = [];

    notes.map((note:Note) => {
        const memoEl:ObservableHTMLElement = document.createElement('memo-item');
        memoEl.setAttribute('title', note.title);
        memoEl.onclick$.pipe(
            takeUntil(appEl.unsubscriber$)
        ).subscribe(() => {
            toFullscreen$.next(note);
        });

        appEl.el.appendChild(memoEl);

        memoEls.push(memoEl);
    });
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

    // Render Memos
    toList$.subscribe(renderMemos);

    // Fullscreen Viewer
    const fullScreenViewerEl:HTMLElement = document.createElement('fullscreen-viewer');
    document.body.appendChild(fullScreenViewerEl);

    fullScreenViewerEl.setAttribute('show', 'false');

    toList$.subscribe(() => fullScreenViewerEl.setAttribute('show', 'false'));
    toFullscreen$.subscribe((note:Note) => {
        fullScreenViewerEl.setAttribute('title', note.title);
        fullScreenViewerEl.setAttribute('text', note.text);
        fullScreenViewerEl.setAttribute('createdAt', note.createdAt);
        fullScreenViewerEl.setAttribute('updatedAt', note.updatedAt);
        fullScreenViewerEl.setAttribute('show', 'true');
    });

    // Fetch Data to begin
    requestData$.next();
})();
