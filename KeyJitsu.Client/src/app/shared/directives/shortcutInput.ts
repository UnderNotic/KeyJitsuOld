import {Directive, ElementRef, Input } from 'angular2/core'

@Directive({
    selector: '[shortcutInput]',
    host: {
        '(keydown)': 'onKeyDownUp($event)',
        '(keyup)': 'onKeyDownUp($event)'
    }
})
export class ShortcutInputDirective {
    private keyMap: boolean[]
    constructor(private el: ElementRef) {
        this.keyMap = [];
        
    }

    onKeyDownUp(event: KeyboardEvent) {
        this.keyMap[event.keyCode] = event.type == 'keydown';
    }

    getPressedKeys() {
        var pressedKeysCodes = [];
        for (let index = 0; index < this.keyMap.length; index++) {
            if (this.keyMap[index] === true)
                pressedKeysCodes.push(this.keyMap[index]);
        }
        return pressedKeysCodes.map(code => String.fromCharCode(code));
    }

    setWrongStyle() {
        this.el.nativeElement.style.backgroundColor = "red";
    }

    setCorrectStyle() {
        this.el.nativeElement.style.backgroundColor = "green";
    }
}