import {Injectable} from 'angular2/core'
import {Http, Response, Headers, RequestOptions} from 'angular2/http'
import {Shortcut} from '../../interfaces/shortcut'
import {Observable} from 'rxjs/Rx'

@Injectable()
export class ShortcutService {

    private URL: string = "http://localhost:61704/api";

    constructor(private http: Http) { }

    getSingleShortcutQuestion(editor: string, categories: string[]): Observable<string> {
        let category = categories.reduce((previousValue, currentValue) => `${previousValue}&category[]=${currentValue}`);
        return this.http.get(`${this.URL}/Shortcuts/GetSingleShortcutQuestion?editor=${editor}&categories=${category}`).map(res => <string>res.json()).catch(this.handleError);
    }

    getSingleShortcutAnswer(editor: string, name: string, hotkey: string): Observable<boolean> {
        let body = JSON.stringify({ editor, name, hotkey });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.URL}/Shortcuts/GetSingleShortcutAnswer`, body, options).map(res => <boolean>res.json()).catch(this.handleError);
    }

    getAllCategories(editor: string): Observable<string[]> {
        return this.http.get(`${this.URL}/Shortcuts/GetAllCategories?editor=${editor}`).map(res => <string[]>res.json()).catch(this.handleError)
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}