import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer} from 'angular2/core'
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
export class GameComponent implements OnInit, AfterViewInit {

    @ViewChild('shortcutInput') input: ElementRef;
    
    private keyMap: boolean[] = []
    historyShortcuts: ShortcutAnswer[] = []
    shortcutQuestion: string
    editor: string
    categories: string[]

    constructor(private _shortcutService: ShortcutService, private _router: Router, routerParams: RouteParams, private renderer: Renderer) {
        this.editor = routerParams.get('editor');
        
        var routerParam = routerParams.get('categories');
        this.categories = Object.prototype.toString.call(routerParam) == '[object String]' ? [routerParam] : routerParam;
    }

    ngOnInit() {
        this.getQuestion();
    }
    
    ngAfterViewInit(){
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus', []);
    }

    onKeysPressed(keysString) {
       this._shortcutService.getSingleShortcutAnswer(this.editor, this.shortcutQuestion, keysString).subscribe(isCorrect => this.processAnswer(keysString, isCorrect));
    }

    processAnswer(keysString: string, correct: boolean) {
        this.historyShortcuts.push({ name: this.shortcutQuestion, correct: correct, keys: keysString});
        var length = this.historyShortcuts.length;
        if(length > 6) this.historyShortcuts = this.historyShortcuts.slice(length - 6, length);
        this.getQuestion();
    }

    private getQuestion(){
        this._shortcutService.getSingleShortcutQuestion(this.editor, this.categories).subscribe(question => this.shortcutQuestion = question);        
}

    onPussyOutClick() {
        this._router.navigate(['Home']);
    }
}