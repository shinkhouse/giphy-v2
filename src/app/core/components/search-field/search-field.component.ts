import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
    query: string;
    modelChange = new Subject<string>();
    @Input() value: any;
    @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
      this.modelChange.pipe(debounceTime(300)).subscribe(() => {
          this.queryChange.emit(this.query);
      });
    }

    ngOnInit(): void {
      if (this.value !== undefined) {
          this.query = this.value;
      }
    }

    queryChanged() {
      this.modelChange.next();
    }
}
