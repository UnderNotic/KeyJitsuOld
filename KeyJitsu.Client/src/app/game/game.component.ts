import {Component, OnInit} from 'angular2/core'
import {JumboComponent} from '../jumbo/jumbo.component'
import {Shortcut} from '../interfaces/shortcut'
import {ShortcutInputDirective} from '../shared/directives/shortcutInput'
import {ShortcutService} from '../shared/services/shortcut.service'

@Component({
    selector: 'game',
    templateUrl: './app/game/game.component.html',
    styleUrls: ['./app/game/game.component.css'],
    providers: [ShortcutService],
    directives: [JumboComponent, ShortcutInputDirective]
})
export class GameComponent implements OnInit {

    private keyMap: boolean[] = []
    historyShortcuts: Shortcut[]
    shortcutQuestion: string

    constructor(private _shortcutService: ShortcutService) {
        this.historyShortcuts = [{ hotkey: "asd", name: "some shortcut" }];
    }

    ngOnInit() {
        this._shortcutService.getSingleShortcutQuestion("VisualStudioResharper", ["Explore", "Navigate"]).subscribe(question => this.shortcutQuestion = question;
        
        Mousetrap.bind('4', function() { console.log('4'); });
    }
    
    onKeysPressed(keysString){
        console.log("hallo key is: " + keysString);
    }
}