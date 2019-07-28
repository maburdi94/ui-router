

customElements.define('router-link', class extends HTMLAnchorElement {
    constructor() {
        super();
        this.href = "#" + this.getAttribute('href');
    }
}, {extends: "a"});


customElements.define('router-outlet', class extends HTMLElement {

    #config = {
        router: []
    };

    get router() {
        return this.#config.router;
    }

    connectedCallback() {

        if (this.hasAttribute('config')) {
            let config = this.getAttribute('config');

            try {
                config = JSON.parse(config);    // JSON
            } catch (e) {
                config = window[config];    // Global variable
            }

            this.#config = config;
        }

        window.addEventListener('hashchange', this.routeChange.bind(this));
        window.addEventListener('load', this.routeChange.bind(this), { once: true });
    }

    disconnectedCallback() {
        window.removeEventListener('hashchange', this.routeChange.bind(this));
    }

    async routeChange(event) {
        let path = location.hash.slice(1);

        let dest = this.router.match(path);

        if (dest) {
            let params = dest.exec(path);

            this.innerHTML =  await dest.render(params);
        }
    }

    constructor() {
        super();
    }
});
