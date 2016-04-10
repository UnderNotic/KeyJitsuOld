import {Directive, ElementRef, Input, Output, EventEmitter, OnDestroy } from 'angular2/core'
import {KeyCodeParser} from '../services/keyCodeParser.service'
// use rx to capture keyboard input with throttle
@Directive({
    selector: '[shortcutInput]',
    host: {
        '(keydown)': 'onKeyDownUp($event)',
        '(keyup)': 'onKeyDownUp($event)'
    }
})
export class ShortcutInputDirective implements OnDestroy {
    @Output() keysPressed = new EventEmitter();

    private keyMap: boolean[] = []
    constructor(private _el: ElementRef, private _keyCodeParser: KeyCodeParser) {
        this.preventDefaultKeyBehaviour();
    }

    private preventDefaultKeyBehaviour() {
        var that = this;
        document.onkeyup = function(event) {
            event.stopPropagation();
            event.preventDefault();
        };
        document.onkeydown = function(event) {
            event.stopPropagation();
            event.preventDefault();
        };
    }


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


    ngOnDestroy() {
        document.onkeyup = function(event) { };
        document.onkeydown = function(event) { };
    }
}