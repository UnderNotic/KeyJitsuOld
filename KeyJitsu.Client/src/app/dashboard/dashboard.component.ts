import {Component, OnInit} from 'angular2/core'
import {Router} from 'angular2/router'
import {RouteParams} from 'angular2/router'
import {Dragula} from '../shared/directives/dragula.directive'
import {DragulaService} from '../shared/providers/dragula.provider'
import {ShortcutService} from '../shared/services/shortcut.service'
import {JumboComponent} from '../jumbo/jumbo.component'

@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html',
    styleUrls: ['./app/dashboard/dashboard.component.css'],
    providers: [ShortcutService],
    directives: [Dragula, JumboComponent],
    viewProviders: [DragulaService]
})
export class DashboardComponent implements OnInit {

    categories: string[]
    private editor: string;

    constructor(
        private _router: Router, private _routerParams: RouteParams, private _shortcutService: ShortcutService
    ) {
        this.editor = _routerParams.get('editor');
    }

    ngOnInit() {
        this._shortcutService.getAllCategories(this.editor).subscribe(categories => this.categories = categories);
    }

    onFightClick() {
        this._router.navigate(['Game', { editor: this.editor }]);
    }

    onPussyOutClick() {
        this._router.navigate(['Home']);
    }
} 