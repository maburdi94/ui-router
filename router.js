
import {pathToRegexp} from "./path-to-regexp.js";

class Route {
    #regexp;
    #keys = [];

    exec(path) {
        let matches = this.#regexp.exec(path);
        return this.#keys.reduce((params, key, i) => {
            params[key.name] =  matches[i + 1];
            return params;
        }, {});
    }

    isMatch(path) {
        return this.#regexp.test(path);
    }

    constructor({
        path = '',
        render = () => `<p>${this.path}</p>`,
        exact = false
    }) {
        this.#regexp = pathToRegexp(path, this.#keys);

        this.path = path;
        this.exact = exact;

        this.render = render;
    }
}

class Router {

    routes = [];

    constructor(routes) {

        this.routes = routes.flatMap(route => configureRoute(route));

        function configureRoute(config, root = '') {
            if (config.children) {
                return config.children.flatMap(childRoute => configureRoute(childRoute, root + config.path));
            } else {
                return [new Route({...config, path: root + config.path})];
            }
        }

        console.log(this);
    }

    static routes(routes) {
        if (routes instanceof Array) {
            return new Router(routes);
        }
    }
}


window.Router = Router;
