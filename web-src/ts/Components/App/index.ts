import gql from 'graphql-tag';
import GQLClient from '../../GQLClient';

const style = require('./style.css');

const fetchNotesQuery = gql`
{
    notes {
        id
        title
        text
        createdAt
        updatedAt
    }
}
`;

class App extends HTMLElement {
    el: HTMLElement

    constructor(...args:Array<any>) {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
        this.fetchData();
    }
    async fetchData() {
        try {
            const data = await GQLClient.instance.query({
                query: fetchNotesQuery
            });
            
            console.log(data);
        }
        catch(err) {
            console.error(err);
            console.error(err.stack);
        }
    }
    render() {
        this.el = document.createElement('div');
        this.el.className = 'app';
        this.el.innerText = 'Helloworld';

        this.shadowRoot.appendChild(this.el);
        
        const styleEl = document.createElement('style');
        styleEl.innerText = style;

        this.shadowRoot.appendChild(styleEl);
    }
}

window.customElements.define('memo-app', App);

export default App;