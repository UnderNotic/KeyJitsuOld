import {Component} from 'angular2/core'
import {Router} from 'angular2/router'
// import {Dragula} from 'directives/dragula.directive'


@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html'
})
export class DashboardComponent {
    constructor(
        private _router: Router
    ) { }
} 