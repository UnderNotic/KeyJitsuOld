import {Injectable} from 'angular2/core'
import {Http, Response, Headers, RequestOptions} from 'angular2/http'
import {Shortcut} from '../../interfaces/shortcut'
import {Observable} from 'rxjs/Rx'

@Injectable()
export class ShortcutService {

    private URL: string = "http://localhost:61704/api";
    private HEADERS: Headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

    constructor(private http: Http) { }

    getSingleShortcutQuestion(editor: string, categories: string[]): Observable<string> {
        let category = categories.reduce((previousValue, currentValue) => `${previousValue}&category[]=${currentValue}`);
        let options = new RequestOptions({ headers: this.HEADERS });        
        return this.http.get(`${this.URL}/Shortcuts/GetSingleShortcutQuestion?editor=${editor}&categories=${category}`, options).map(res => <string>res.json()).catch(this.handleError);
    }

    getSingleShortcutAnswer(editor: string, name: string, hotkey: string): Observable<boolean> {
        let body = JSON.stringify({ editor, name, hotkey });
        let options = new RequestOptions({ headers: this.HEADERS });
        return this.http.post(`${this.URL}/Shortcuts/GetSingleShortcutAnswer`, body, options).map(res => <boolean>res.json()).catch(this.handleError);
    }

    getAllCategories(editor: string): Observable<string[]> {
        let options = new RequestOptions({ headers: this.HEADERS });
        return this.http.get(`${this.URL}/Shortcuts/GetAllCategories?editor=${editor}`, options).map(res => <string[]>res.json()).catch(this.handleError)
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}