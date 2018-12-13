import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PubSubService {

    private toastRequest = new Subject<string>();
    toastRequested$ = this.toastRequest.asObservable();

    private addRequest = new Subject();
    addRequested$ = this.addRequest.asObservable();

    private showAddButtonRequest = new Subject<boolean>();
    showAddButtonRequested$ = this.showAddButtonRequest.asObservable();

    private setTitleRequest = new Subject<string>();
    setTitleRequested$ = this.setTitleRequest.asObservable();

    private personCollectionUpdatedRequest = new Subject();
    personCollectionUpdatedRequested$ = this.personCollectionUpdatedRequest.asObservable();

    constructor() { }

    addRequested(): void {
        this.addRequest.next();
    }

    showToast(toastMessage: string): void {
        this.toastRequest.next(toastMessage);
    }

    showAddButton(showButton: boolean): void {
        this.showAddButtonRequest.next(showButton);
    }

    setTitle(titleText: string): void {
        this.setTitleRequest.next(titleText);
    }

    personCollectionUpdated(): void {
        this.personCollectionUpdatedRequest.next();
    }

}
