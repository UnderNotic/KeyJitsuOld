import {Component} from 'angular2/core'
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'

import {HomeComponent} from '../home/home.component'
import {DashboardComponent} from '../dashboard/dashboard.component'


@RouteConfig([
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent }
])
@Component({
    selector: 'keyjitsu-app',
    templateUrl: './app/main/main.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MainComponent {
    constructor(
        private _router: Router
    ) { }
}