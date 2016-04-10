import {Component} from 'angular2/core'
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'
import {DashboardComponent} from '../dashboard/dashboard.component'

@Component({
    selector: 'home',
    templateUrl: './app/home/home.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class HomeComponent {
    constructor(
        private _router: Router
    ) { }

    onVisualStudioClick() {
        this._router.navigate(['Dashboard', { editor: "VisualStudioResharper" }]);
    }
}