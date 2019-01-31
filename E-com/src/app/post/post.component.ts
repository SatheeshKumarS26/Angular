import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { NotFoundError } from '../not-known-error';
import { AppError } from '../app-error';
import { BadInput } from '../bad-input-error';

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
    this.postservice.getpost().subscribe(response => this.posts = response);
  }

  createpost(input: HTMLInputElement) {
  let post: any = {title: input.value};
  this.posts.splice(0, 0, post); // pessimistic update
  input.value = '';
  this.postservice.createpost(post).subscribe(response => {
    post = response;
  },
  (error: AppError) => {
    this.posts.splice(0, 1);  // pessimistic
   if (error instanceof BadInput) {
    // this.form.setErrors(error);
   } else {
    throw error;
   }
  });
  }

  updatepost(post) {
  this.postservice.updatepost(post).subscribe(() => {
    alert('Successfully updated isRead Field');
  },
  (error: AppError) => {
   if (error instanceof NotFoundError) {
    alert(`Error Occured because: ${error}`);
   } else {throw error; } // global error Handler
  });
  }

  deletepost(post) {
    this.postservice.deletepost(post).subscribe(() => {
      const index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    },
    (error: AppError) => {
     if (error instanceof NotFoundError) {
      alert(`Error Occured because: ${error}`);
     } else {
      throw error;
     }
    });
  }

  getGitFollowers () {
    this.postservice.gitFollowers().subscribe(res => {
      console.log(res);
      alert('Console has list of followers');
  });
}

}
