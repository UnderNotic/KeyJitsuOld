import {Component, OnInit} from 'angular2/core'
import {JumboComponent} from '../jumbo/jumbo.component'
import {Shortcut} from '../interfaces/shortcut'
import {ShortcutAnswer} from '../interfaces/shortcutAnswer'
import {ShortcutInputDirective} from '../shared/directives/shortcutInput'
import {ShortcutService} from '../shared/services/shortcut.service'
import {Router, RouteParams} from 'angular2/router'


@Component({
    selector: 'game',
    templateUrl: './app/game/game.component.html',
    styleUrls: ['./app/game/game.component.css'],
    providers: [ShortcutService],
    directives: [JumboComponent, ShortcutInputDirective]
})
export class GameComponent implements OnInit {

    private keyMap: boolean[] = []
    historyShortcuts: ShortcutAnswer[] = []
    shortcutQuestion: string
    editor: string

    constructor(private _shortcutService: ShortcutService, private _router: Router, routerParams: RouteParams) {
        this.editor = routerParams.get('editor');
    }

    ngOnInit() {
        this._shortcutService.getSingleShortcutQuestion(this.editor, ["Explore", "Navigate"]).subscribe(question => this.shortcutQuestion = question);
    }

    onKeysPressed(keysString) {
        this._shortcutService.getSingleShortcutAnswer(this.editor, this.shortcutQuestion, keysString).subscribe(isCorrect => this.processAnswer(isCorrect));
    }

    processAnswer(correct: boolean) {
        this.historyShortcuts.push({ name: this.shortcutQuestion, correct: correct });
    }


    onPussyOutClick() {
        this._router.navigate(['Home']);
    }
}