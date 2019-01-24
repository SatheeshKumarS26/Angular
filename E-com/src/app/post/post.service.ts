import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
    return this.http.delete(this.url + '/' + post.id);

  }
  createpost(post) {
    return this.http.post(this.url, post);
  }
}
