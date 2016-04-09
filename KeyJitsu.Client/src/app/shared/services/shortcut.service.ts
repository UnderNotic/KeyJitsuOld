import {Injectable} from 'angular2/core'
import {Http, Response} from 'angular2/http'
import {Shortcut} from '../../interfaces/shortcut'
import {Observable} from 'rxjs/Rx'

@Injectable()
export class ShortcutService {

    private URL: string = "http://localhost:61704/api";

    constructor(private http: Http) { }

    getSingleShortcutQuestion(editor: string, categories: string[]): Observable<string> {
        var category = categories.reduce((previousValue, currentValue) => `${previousValue}&category[]=${currentValue}`);
        return this.http.get(`${this.URL}/Shortcuts/GetSingleShortcutQuestion?editor=${editor}&categories=${category}`).map(res => <string>res.json()).catch(this.handleError);
    }

    getSingleShortcutAnswer(editor: string, name: string, hotkey: string): Observable<boolean> {
        return this.http.get(`${URL}/Shortcuts/GetSingleShortcutAnswer?editor=${editor}&name=${name}&hotkey=${hotkey}`).map(res => <boolean>res.json()).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}