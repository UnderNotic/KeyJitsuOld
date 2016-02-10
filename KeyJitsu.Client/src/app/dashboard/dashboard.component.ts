import {Component} from 'angular2/core'
import {Router} from 'angular2/router'
import {Dragula} from '../shared/directives/dragula.directive'
import {DragulaService} from '../shared/providers/dragula.provider'

@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html',
    directives: [Dragula],
    viewProviders: [DragulaService]
})
export class DashboardComponent {
    constructor(
        private _router: Router
    ) { }
} 