// Import Entity Types
import { Note } from '../../src/entity/Note';

// Initialize Apollo Client
import GQLClient from './GQLClient';

// Register Web Components
import './Components/App';
import './Components/CreateMemoButton';
import './Components/MemoItem';
import './Components/FullscreenViewer';

// Import Types
import { ObservableXHRElement } from './types';

// Import Subjects
import { toList$, toFullscreen$, requestData$ } from './subjects';

// Delay the execution of main application flow by using IIFE
// Until browser loads all necessary resources
(function() {
    GQLClient.initialize();

    // Build Basic App
    const appEl:ObservableXHRElement = document.createElement('memo-app');
    appEl.id = 'app';
    document.body.appendChild(appEl);

    // Create New Memo Button
    const createMemoButtonEl:HTMLElement = document.createElement('create-memo-button');
    document.body.appendChild(createMemoButtonEl);

    // Fullscreen Viewer
    const fullScreenViewerEl:HTMLElement = document.createElement('fullscreen-viewer');
    document.body.appendChild(fullScreenViewerEl);

    fullScreenViewerEl.setAttribute('show', 'false');

    toList$.subscribe(() => fullScreenViewerEl.setAttribute('show', 'false'));
    toFullscreen$.subscribe((note:Note) => {
        fullScreenViewerEl.setAttribute('id', note.id.toString());
        fullScreenViewerEl.setAttribute('title', note.title);
        fullScreenViewerEl.setAttribute('text', note.text);
        fullScreenViewerEl.setAttribute('createdAt', note.createdAt);
        fullScreenViewerEl.setAttribute('updatedAt', note.updatedAt);
        fullScreenViewerEl.setAttribute('show', 'true');
    });

    // Fetch Data to begin
    requestData$.next();
})();
