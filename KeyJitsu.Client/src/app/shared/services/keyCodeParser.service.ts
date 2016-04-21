import {Injectable} from 'angular2/core';

@Injectable()
export class KeyCodeParser {
    constructor() { }

    mapKeyCodeToActualCharacter(characterCode) {
        var characterMap = [];
        characterMap[32] = "SPACE";
        characterMap[16] = "SHIFT";
        characterMap[17] = "CTRL";
        characterMap[18] = "ALT";
        characterMap[192] = "~";
        characterMap[189] = characterMap[109] = "-";
        characterMap[187] = characterMap[107] = "+";
        characterMap[8] = "BACKSPACE";
        characterMap[27] = "ESCAPE";
        characterMap[112] = "F1";
        characterMap[113] = "F2";
        characterMap[114] = "F3";
        characterMap[115] = "F4";
        characterMap[116] = "F5";
        characterMap[117] = "F6";
        characterMap[118] = "F7";
        characterMap[119] = "F8";
        characterMap[120] = "F9";
        characterMap[121] = "F10";
        characterMap[122] = "F11";
        characterMap[123] = "F12";
        characterMap[49] = characterMap[97] = "1";
        characterMap[50] = characterMap[98] = "2";
        characterMap[51] = characterMap[99] = "3";
        characterMap[52] = characterMap[100] = "4";
        characterMap[53] = characterMap[101] = "5";
        characterMap[54] = characterMap[102] = "6";
        characterMap[55] = characterMap[103] = "7";
        characterMap[56] = characterMap[104] = "8";
        characterMap[57] = characterMap[105] = "9";
        characterMap[48] = characterMap[96] = "0";
        characterMap[9] = "TAB";
        characterMap[20] = "CAPS LOCK";
        characterMap[91] = characterMap[92] = "WINDOW";
        characterMap[13] = "ENTER";
        characterMap[45] = "INSERT";
        characterMap[46] = "DELETE";
        characterMap[36] = "HOME";
        characterMap[35] = "END";
        characterMap[33] = "PAGE UP";
        characterMap[34] = "PAGE DOWN";
        characterMap[191] = characterMap[111] = "/";
        characterMap[220] = "\\";
        characterMap[188] = ",";
        characterMap[190] = characterMap[110] = ".";
        characterMap[37] = "ArrowLeft";
        characterMap[38] = "ArrowUp";
        characterMap[39] = "ArrowRight";
        characterMap[40] = "ArrowDown";
        characterMap[19] = "PAUSE";
        characterMap[145] = "SCROLL";
        characterMap[219] = "[";
        characterMap[221] = "]";
        characterMap[222] = '"';
        characterMap[186] = ";";
        
        
        if (characterCode >= 65 && characterCode <= 90) {
            return String.fromCharCode(characterCode);
        }
        return characterMap[characterCode];
    }
}
