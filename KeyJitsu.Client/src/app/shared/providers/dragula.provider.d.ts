import { EventEmitter } from 'angular2/core';
export declare class DragulaService {
    cancel: EventEmitter<any>;
    cloned: EventEmitter<any>;
    drag: EventEmitter<any>;
    dragend: EventEmitter<any>;
    drop: EventEmitter<any>;
    out: EventEmitter<any>;
    over: EventEmitter<any>;
    remove: EventEmitter<any>;
    shadow: EventEmitter<any>;
    dropModel: EventEmitter<any>;
    removeModel: EventEmitter<any>;
    private events;
    private bags;
    add(name: any, drake: any): any;
    find(name: any): any;
    destroy(name: any): void;
    setOptions(name: any, options: any): void;
    private handleModels(name, drake);
    private setupEvents(bag);
    private domIndexOf(child, parent);
}
