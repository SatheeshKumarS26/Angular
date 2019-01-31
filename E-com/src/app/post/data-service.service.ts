import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { BadInput } from '../bad-input-error';
import { NotFoundError } from '../not-known-error';
import { AppError } from '../app-error';

@Injectable()
export class DataService {

    constructor(private url: string , private http: Http) {

    }
        getpost() {
        return this.http.get(this.url).map(response => response.json()).catch(this.handleError);
        }
        updatepost(post) {
         return this.http.patch(this.url + '/' + post.id, {isRead : true}).catch(this.handleError);
       }
       deletepost(post) {
         return this.http.delete(this.url + '/' + post.id)
         .catch(this.handleError);
       }
       createpost(post) {
         // return Observable.throw(new AppError());  // pesimistic
         return this.http.post(this.url, post).map(response => response.json())
         .catch(this.handleError);
       }

       gitFollowers() {
         return this.http.get('https://api.github.com/users/mosh-hamedani/followers')
         .map(response => response.json()).catch(this.handleError);
       }
       private handleError(error: Response) {
         if (error.status === 400) {
           return Observable.throw(new BadInput(error));
         } else if (error.status === 404) {
           return Observable.throw(new NotFoundError(error));
         } else {
           return Observable.throw(new AppError(error));
         }
       }
}
