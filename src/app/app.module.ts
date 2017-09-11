import { AppErrorHandler } from './errors/error-handler';
import { PostService } from './services/post.service';
import { PostsComponent } from './firsthttp/posts.component';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PostService,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
