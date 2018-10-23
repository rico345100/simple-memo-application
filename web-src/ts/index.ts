// Initialize Apollo Client
import GQLClient from './GQLClient';

// Register Web Components
import './Components/App';
import './Components/CreateMemoButton';
import { Observable } from 'rxjs';

// Delay the execution of main application flow by using IIFE
// Until browser loads all necessary resources
(function() {
    GQLClient.initialize();

    // Build Basic App
    const appEl = document.createElement('memo-app');
    document.body.appendChild(appEl);

    const createMemoButtonEl = document.createElement('create-memo-button');
    document.body.appendChild(createMemoButtonEl);
})();