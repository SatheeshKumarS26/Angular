import { Component, OnInit } from '@angular/core';
import { NgRedux , select} from 'ng2-redux';
import { IAppState } from '../store';
import { INCREMNT } from '../actions';

@Component({
  selector: 'app-redux-test',
  templateUrl: './redux-test.component.html',
  styleUrls: ['./redux-test.component.css']
})
export class ReduxTestComponent implements OnInit {

  title = 'Redux Test';
  @select() counter;

  constructor( public ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
  }

  increment() {
  this.ngRedux.dispatch({type: INCREMNT});
  }
}
