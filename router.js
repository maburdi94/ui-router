
class Route {

    #regexp;

    path = '';
    render = () => `<p>${this.path}</p>`;

    exec(path) {
        return this.#regexp.exec(path).groups;
    }

    test(path) {
        return this.#regexp.test(path);
    }

    constructor(config) {

        // Assign only relevant props
        for (const prop in config) {
            if (prop in this) this[prop] = config[prop];
        }

        // Replace /:param with named capture group
        let reStr = '^' + this.path.replace(/:(\w+)/ig, '(?<$1>\\S+)');

        // Exact regex match
        if (config.exact) reStr += '$';

        this.#regexp = new RegExp(reStr);
    }
}

class Router {

    routes = [];

    match(path) {
        return this.routes.find(route => route.test(path));
    }

    constructor(routes) {

        // Base config
        let config = { path: '' };

        // Flatten children
        this.routes = routes.flatMap(function configureRoute(config) {
            if (config.children) {
                return config.children.flatMap(configureRoute.bind(config));
            } else {
                let path = this.path + config.path;
                return [new Route({...config, path})];
            }
        }.bind(config));
    }

    static routes(routes) {
        if (routes instanceof Array) {
            return new Router(routes);
        }
    }
}


window.Router = Router;
