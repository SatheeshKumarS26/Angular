import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { NotKnownError } from '../not-known-error';
import { KnownError } from '../known-error';

@Injectable()
export class PostService {
  url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {
   }

   getpost() {
   return this.http.get(this.url);
   }

   updatepost(post) {
    return this.http.patch(this.url + '/' + post.id, {isRead : true});
  }
  deletepost(post) {
    return this.http.delete(this.url + '/' + post.id)
    .catch((error: Response) => {
      if (error.status === 404) {
        return Observable.throw(new NotKnownError);
      }
      return Observable.throw(new KnownError(error));
    })
    ;

  }
  createpost(post) {
    return this.http.post(this.url, post);
  }
}
