import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, Subject} from 'rxjs'
import {NgIf} from '@angular/common'

@Component({
  selector: 'm165-search',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>()

  input$ = new Subject<string>()

  ngOnInit() {
    this.input$.pipe(
      debounceTime(500),
      filter(term => term.length >= 3),
      distinctUntilChanged()
    ).subscribe(value => {
      this.search.emit(value)
    })
  }
}
