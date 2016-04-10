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
    categories: string[]

    constructor(private _shortcutService: ShortcutService, private _router: Router, routerParams: RouteParams) {
        this.editor = routerParams.get('editor');
        this.categories = routerParams.get('categories');
    }

    ngOnInit() {
        this.getQuestion();
    }

    onKeysPressed(keysString) {
       this._shortcutService.getSingleShortcutAnswer(this.editor, this.shortcutQuestion, keysString).subscribe(isCorrect => this.processAnswer(isCorrect));
    }

    processAnswer(correct: boolean) {
        
        this.historyShortcuts.push({ name: this.shortcutQuestion, correct: correct });
        this.getQuestion();
    }

    private getQuestion(){
        this._shortcutService.getSingleShortcutQuestion(this.editor, this.categories).subscribe(question => this.shortcutQuestion = question);        
}

    onPussyOutClick() {
        this._router.navigate(['Home']);
    }
}