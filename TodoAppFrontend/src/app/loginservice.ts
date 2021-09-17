import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable()
export class Loginservice {

    isLogedIn: boolean = false;

    @Output() change: EventEmitter<boolean> = new EventEmitter();

    userLogedIn() {
        this.isLogedIn = true;
        this.change.emit(this.isLogedIn);
    }

    userLogedOut()
    {
        this.isLogedIn = false;
        this.change.emit(this.isLogedIn);
    }
}