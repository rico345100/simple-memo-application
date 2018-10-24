# 연결된 모든 Observer 일괄 구독 해제하기
아래 상황처럼, 루프로 생성한 여러 엘리먼트들이 각각 구독을 한 상태에서,

```javascript
// Create new Memos
const { notes } = result.data;

notes.map((note:Note) => {
    const memoEl:ObservableHTMLElement = document.createElement('memo-item');
    memoEl.setAttribute('title', note.title);
    memoEl.onclick$.subscribe(() => {
        console.log('Clicked', note);
    });

    appEl.el.appendChild(memoEl);

    memoEls.push(memoEl);
});
```

만약 노트들을 새로 렌더링하는 경우 그냥 엘리먼트를 삭제한다고 해서 Observer들을 자동으로 구독 해제하지는 않습니다.

여전히 메모리에 남아있게 되는데요, 이때는 Subject와 takeUntil 오퍼레이터로 해결 가능합니다.

```javascript
class App extends HTMLElement {
    unsubscriber$: Subject<boolean>     // Unsubscribe 목적으로 만들어진 Subject

    ...

    async fetchData() {
        // If already has subscribers, unsubscribe them all
        if(this.unsubscriber$) {
            this.unsubscriber$.next(true);          // 중요!
            this.unsubscriber$.unsubscribe();
        }

        ...
    }
```

위 App Class에는 fetchData라는 메서드가 있는데, 이 메서드가 호출되면 unsubscriber$라는 Subject를 구독한 모든 Observer를 구독해제할 수 있습니다.

이때 바로 takeUntil 오퍼레이터가 사용됩니다.

```javascript
notes.map((note:Note) => {
    const memoEl:ObservableHTMLElement = document.createElement('memo-item');
    memoEl.setAttribute('title', note.title);

    // takeUntil(appEl.unsubscriber$)를 구독했으므로, 이 Subject가 true가 되면 자동으로 구독을 해제합니다.
    memoEl.onclick$.pipe(
        takeUntil(appEl.unsubscriber$)
    ).subscribe(() => {
        console.log('Clicked', note);
    });

    ...
});
```

테스트를 위해, 아래와 같이 fetchData 메서드에 의도적으로 딜레이를 넣고, onclick을 테스트해봤습니다.

```javascript
/**
 * Wait until specified ms passed
 * @param {number} ms - Miliseconds
 */
export function delay(ms:number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

```

```javascript
async fetchData() {
    // If already has subscribers, unsubscribe them all
    if(this.unsubscriber$) {
        this.unsubscriber$.next(true);
        this.unsubscriber$.unsubscribe();
    }

    console.log('Wait 3 seconds... Do your tests');
    await delay(3000);
    console.log('Passed 3 seconds.');
    
    this.unsubscriber$ = new Subject<boolean>();

    try {
        const data:ApolloQueryResult<any> = await GQLClient.instance.query({ query: fetchNotes });
        this.ondatareceived$.next(data);
    }
    catch(err) {
        console.error(err);
        console.error(err.stack);
    }
}
```

fetchData가 호출되기 전에는 정상적으로 동작하던 onclick$이 fetchData가 호출된 즉시 반응을 하지 않습니다.

그리고 3초가 지나면 새로운 엘리먼트들이 생성되고 각각의 onclick$을 구독하게 됩니다.