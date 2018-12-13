import { Component, OnInit } from '@angular/core';
import { PubSubService } from 'src/shared/pub-sub.service';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

    constructor(private pubSubService: PubSubService) { }

    ngOnInit() {
        this.pubSubService.showAddButton(false);
    }

}
