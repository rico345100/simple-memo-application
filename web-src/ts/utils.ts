/**
 * Inject CSS as inner <style /> element
 * @param {string} css - Serialized Style Sheet for injection.
 */
export function injectStyle(css:string, ...args:any) {
    return function(target:any) {
        const origRender = target.prototype.render;

        target.prototype.render = function() {
            origRender.call(this);

            const container:HTMLElement = this.shadowRoot ? this.shadowRoot : this.el;

            const styleEl = document.createElement('style');
            styleEl.innerText = css;

            container.appendChild(styleEl);
        };
    };
}

/**
 * Wait until specified ms passed
 * @param {number} ms - Miliseconds
 */
export function delay(ms:number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}