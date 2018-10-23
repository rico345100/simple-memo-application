import App from './Components/App';

// Delay the execution of main application flow by using IIFE
// Until browser loads all necessary resources
(function() {
    const app:App = new App();
    app.render();
})();