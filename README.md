# UI-Router
## An Angular style router using web components

This is a very simplified version of a Angular style router. It uses the same <router-outlet> component like Angular but this is much more simplified. It will take route parameters like in Angular (but it is still a work in progress). 

Also, this code DOES NOT rely on any dependencies. (Hooray!) That means not path-to-regexp or anything like that. Actually, the regexp is very simple and uses capture groups to pass the params to the render function of the route. 
