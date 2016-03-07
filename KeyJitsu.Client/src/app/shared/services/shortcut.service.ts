import {Injectable} from 'angular2/core'
import {Http, Response} from 'angular2/http'
import {Shortcut} from '../../interfaces/shortcut'
import {Observable} from 'rxjs/observable'

export class ShortcutService {

    private URL: string = "http://localhost:61704/";

    constructor(private http: Http) { }

    getSingleShortcut(editor: string, categories: string[]) {
        var category = categories.reduce((previousValue, currentValue) => `${previousValue}&category[]=${currentValue}`);

        this.http.get(`${this.URL}/GetSingleShortcut?editor=${editor}&categories=${category}`).map(res => <Shortcut[]>res.json().data).catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}