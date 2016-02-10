import {Component, OnInit} from 'angular2/core'
import {Router} from 'angular2/router'
import {Dragula} from '../shared/directives/dragula.directive'
import {DragulaService} from '../shared/providers/dragula.provider'

@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html',
    styleUrls: ['./app/dashboard/dashboard.component.css'],
    directives: [Dragula],
    viewProviders: [DragulaService]
})
export class DashboardComponent implements OnInit {

    categories: Object[] = []

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
        this.categories = [{
            name: "Editing",
            hotkeys: [
                {
                    name: "New file",
                    hotkey: "Ctrl + N"
                },
                {
                    name: "Cut",
                    hotkey: "Ctrl + X"
                }]
        },
            {
                name: "Navigation"
            },
            {
                name: "File Management"
            }
        ];
    }

} 