import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { NotFoundError } from '../not-known-error';
import { BadInput } from '../bad-input-error';
import { AppError } from '../app-error';
import { DataService } from './data-service.service';

@Injectable()
export class PostService extends DataService {

  constructor(http: Http) {
    super('http://jsonplaceholder.typicode.com/posts', http);
   }
}
