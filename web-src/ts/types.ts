import { Observable, Subject } from 'rxjs';

export interface CustomHTMLElement extends HTMLElement {
    el?:HTMLElement
}

export interface ObservableHTMLElement extends CustomHTMLElement {
    onclick$?: Observable<Event>
    ondatareceived$?: Observable<any>
}

export interface XHRHTMLElement extends CustomHTMLElement {
    fetchData?: Function
}

export interface ObservableXHRElement extends ObservableHTMLElement, XHRHTMLElement {}