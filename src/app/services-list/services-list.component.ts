import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  people: { id: string; name: string; }[];
  //people: string[];
  // @Input()
  // people: Person[];

  // @Output()
  // personSelected: EventEmitter<number> = new EventEmitter<number>();


  // onPersonSelected(person: Person) {
  //     this.personSelected.emit(person.id);
  // }
  constructor() { 
    this.people=[{id:"/horoscope",name:"horoscope"},{id:"/matchmaking",name:"matchmaking"}];
  }

  ngOnInit() {
  }

}
