

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

            console.log(config);

            if (!(config && config.router instanceof Array)) {
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

        let dest = this.router.find(one => one.regexp.test(path));
        let matches = dest.regexp.exec(path);

        let params = dest.keys.reduce((params, key, i) => {
            params[key.name] =  matches[i + 1];
            return params;
        }, {});

        if (dest) {
            this.innerHTML =  await dest.render(params);
        }
    }

    constructor() {
        super();
    }
});
