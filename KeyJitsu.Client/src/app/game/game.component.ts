import {Component, OnInit} from 'angular2/core'
import {JumboComponent} from '../jumbo/jumbo.component'
import {Shortcut} from '../interfaces/shortcut'
import {ShortcutInputDirective} from '../shared/directives/shortcutInput'

@Component({
    selector: 'game',
    templateUrl: './app/game/game.component.html',
    styleUrls: ['./app/game/game.component.css'],
    directives: [JumboComponent, ShortcutInputDirective]
})
export class GameComponent implements OnInit {

    private keyMap: boolean[] = []
    historyShortcuts: Shortcut[]

    constructor() {
        this.historyShortcuts = [{ hotkey: "asd", name: "some shortcut" }];
    }

    ngOnInit() {
        
            Mousetrap.bind('4', function() { console.log('4'); });
    }
    
    onKeysPressed(keysString){
        console.log("hallo key is: " + keysString);
    }
}