import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataModel } from '../data/data-model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: Observable<any>;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
   this.data = this.http.get<any>('../assets/data-graph.json');
  }

}
