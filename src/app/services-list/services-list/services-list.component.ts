import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  @Input()
  people: { id: string; name: string; }[];


  //people: string[];
  // @Input()
  // people: Person[];

  @Output()
  personSelected: EventEmitter<string> = new EventEmitter<string>();


  onPersonSelected(person: { id: string; name: string; }) {
      this.personSelected.emit(person.id);
  }
  constructor() { 

  }

  ngOnInit() {
  }

}
