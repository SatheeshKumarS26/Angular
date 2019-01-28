import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { PostService } from './post.service';
import { NotKnownError } from '../not-known-error';
import { KnownError } from '../known-error';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any[];

  constructor(private postservice: PostService) {
  }

  ngOnInit() {
    this.postservice.getpost().subscribe(response => {
      this.posts = response.json();
      },
      (error: Response) => {
       if (error.status === 404) {
        alert(`Error Occured because: ${error.statusText}`);
       } else {
        alert('Unexpected Error has occured');
       }
      }
      );
  }

  createpost(input: HTMLInputElement) {
  let post: any = {title: input.value};
  input.value = '';
  this.postservice.createpost(post).subscribe(response => {
    post = response.json();
    this.posts.splice(0, 0, post);
  },
  (error: Response) => {
   if (error.status === 404) {
    alert(`Error Occured because: ${error.statusText}`);
   } else {
    alert('Unexpected Error has occured');
   }
  });
  }

  updatepost(post) {
  this.postservice.updatepost(post).subscribe(response => {
  },
  (error: Response) => {
   if (error.status === 404) {
    alert(`Error Occured because: ${error.statusText}`);
   } else {
    alert('Unexpected Error has occured');
   }
  });
  }

  deletepost(post) {
    this.postservice.deletepost(post).subscribe(response => {
      const index = this.posts.indexOf(post);
      this.posts.splice(0, index);
    },
    (error: KnownError) => {
     if (error instanceof NotKnownError) {
      alert(`Error Occured because: ${error}`);
     } else {
      alert('Unexpected Error has occured');
     }
    });
  }

}
