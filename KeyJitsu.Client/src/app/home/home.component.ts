import {Component} from 'angular2/core'
import {Router} from 'angular2/router'

@Component({
    selector: 'keyjitsu-app',
    templateUrl: './app/home/app.component.html'
})
export class AppComponent{
    constructor(
        private _router: Router
    ){ }
}