import {Directive, ElementRef, Input, Output, EventEmitter } from 'angular2/core'
import {KeyCodeParser} from '../services/keyCodeParser.service'

@Directive({
    selector: '[shortcutInput]',
    host: {
        '(keydown)': 'onKeyDownUp($event)',
        '(keyup)': 'onKeyDownUp($event)'
    }
})
export class ShortcutInputDirective {
    @Output() keysPressed = new EventEmitter();

    private keyMap: boolean[] = []
    constructor(private _el: ElementRef, private _keyCodeParser: KeyCodeParser) { }
    onKeyDownUp(event: KeyboardEvent) {
        this.keyMap[event.keyCode] = event.type == 'keydown';
        this.getPressedKeys();
    }

    getPressedKeys() {
        var pressedKeysCodes = [];
        this.keyMap.forEach((isPressed, keyCode) => {
            if (isPressed) {
                pressedKeysCodes.push(keyCode);
            }
        });
        var pressedCharacters = pressedKeysCodes.map(keyCode => this._keyCodeParser.mapKeyCodeToActualCharacter(keyCode))
        this.keysPressed.emit(pressedCharacters);
    }

    setWrongStyle() {
        this._el.nativeElement.style.backgroundColor = "red";
    }

    setCorrectStyle() {
        this._el.nativeElement.style.backgroundColor = "green";
    }
}