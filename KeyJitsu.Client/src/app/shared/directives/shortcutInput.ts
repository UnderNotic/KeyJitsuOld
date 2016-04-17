import {Directive, ElementRef, Input, Output, EventEmitter, OnDestroy } from 'angular2/core'
import {KeyCodeParser} from '../services/keyCodeParser.service'
import {Observable} from 'rxjs/Rx'
// use rx to capture keyboard input with throttle
@Directive({
    selector: '[shortcutInput]'
})
export class ShortcutInputDirective implements OnDestroy {
    @Output() keysPressed = new EventEmitter();

    private keyMap: boolean[] = []
    constructor(private _el: ElementRef, private _keyCodeParser: KeyCodeParser) {
        this.preventDefaultKeyBehaviour();
        this.observeKeyPress();
    }

    private preventDefaultKeyBehaviour() {
        var that = this;
        document.onkeyup = function (event) {
            event.stopPropagation();
            event.preventDefault();
        };
        document.onkeydown = function (event) {
            event.stopPropagation();
            event.preventDefault();
        };
    }

    private observeKeyPress() {
        var downObservable = Observable.fromEvent(document, 'keydown');
        var upObservable = Observable.fromEvent(document, 'keyup');
        downObservable.merge(upObservable).subscribe(event => this.onKeyDownUp(event));
    }

    private onKeyDownUp(event: KeyboardEvent) {
        this.keyMap[event.keyCode] = event.type == 'keydown';
        var pressedCharacters = this.getPressedKeys();
        if(this.keyMap.every(x => x == false)) this.keysPressed.emit(pressedCharacters);
    }

    private getPressedKeys() : string[] {
        var pressedKeysCodes = [];
        this.keyMap.forEach((isPressed, keyCode) => {
            if (isPressed) {
                pressedKeysCodes.push(keyCode);
            }
        });
        return pressedKeysCodes.map(keyCode => this._keyCodeParser.mapKeyCodeToActualCharacter(keyCode))
    }

    setWrongStyle() {
        this._el.nativeElement.style.backgroundColor = "red";
    }

    setCorrectStyle() {
        this._el.nativeElement.style.backgroundColor = "green";
    }

    ngOnDestroy() {
        document.onkeyup = function (event) { };
        document.onkeydown = function (event) { };
    }
}