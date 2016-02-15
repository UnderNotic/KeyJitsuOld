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
    
    historyShortcuts: Shortcut[]
 
    constructor() {
        this.historyShortcuts = [{hotkey: "asd", name: "some shortcut"}];
        
     }

    ngOnInit() {
      
    }

    eventHandler(event){
        console.log("The event was ", event, event.keyCode, event.keyIdentifier);
    }
}