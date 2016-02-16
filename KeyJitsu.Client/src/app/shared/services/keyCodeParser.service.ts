import {Injectable} from 'angular2/core';

@Injectable()
export class KeyCodeParser {
    constructor() { }

    mapKeyCodeToActualCharacter(characterCode) {
        if (typeof characterCode != "number") {
            return false;
        }
        var characterMap = [];
        characterMap[32] = "SPACE";
        characterMap[16] = "SHIFT";
        characterMap[17] = "CTRL";
        characterMap[192] = "~";
        characterMap[189] = "-";
        characterMap[187] = "+";
        characterMap[8] = "BACKSPACE";
        
        var character: any = "";
        if (characterCode >= 65 && characterCode <= 90) {
            return String.fromCharCode(characterCode);
        }
        return characterMap[characterCode];
    }
}
