import { DataService } from './data-service';
import { BadRequest } from './../errors/bad-request-error';
import { InternalServerError } from './../errors/internal-server.error';
import { NotFoundError } from './../errors/not-found-error';
import { AppError } from './../errors/app-error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';




@Injectable()
export class PostService extends DataService {  
  constructor(http: Http) { 
    super("http://jsonplaceholder.typicode.com/posts", http);

  }
}
