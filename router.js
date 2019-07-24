
import {pathToRegexp} from "./path-to-regexp.js";


class Router {
    static routes(routes) {
        if (!routes instanceof Array) return;

        for (let route of routes) {
            route.regexp = pathToRegexp(route.path, route.keys = []);
        }

        return routes;
    }

}


window.Router = Router;
