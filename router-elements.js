

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

            if (!(config && config.router)) {
                throw "Router outlet needs array of routes";
            }

            this.#config = config;
        }

        window.addEventListener('hashchange', this.routeChange.bind(this));
        window.addEventListener('load', this.routeChange.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener('hashchange', this.routeChange.bind(this));
        window.removeEventListener('load', this.routeChange.bind(this));
    }

    async routeChange(event) {
        let path = location.hash.slice(1);

        let dest = this.router.routes.find(route => route.isMatch(path));

        if (dest) {
            let params = dest.exec(path);
            this.innerHTML =  await dest.render(params);
        }
    }

    constructor() {
        super();
    }
});
