import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {AppErrorHandler} from './app-error-handler';
import { PostComponent } from './post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { PostService } from './post/post.service';
import { TableRelationComponent } from './table-relation/table-relation.component';
import { DataService } from './post/data-service.service';



@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    TableRelationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PostService, {provide: ErrorHandler , useClass: AppErrorHandler}, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
