import { AppComponent } from './../app.component';
import { InternalServerError } from './../errors/internal-server.error';
import { NotFoundError } from './../errors/not-found-error';
import { BadRequest } from './../errors/bad-request-error';
import { AppError } from './../errors/app-error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
//import the below three  instead of using Observable from Rx
//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

/***
 * Base class for http service
 */

@Injectable()
export class DataService {

    constructor(private url:string, private http:Http){}

    getAll(){
        return this.http.get(this.url)
        .map(response => response.json())
        .catch(this.handleError)
    }

    get(id){
        return this.http.get(this.url + "/" + id)
        .catch(this.handleError);
    }

    create(resource){
        //return Observable.throw(new AppError("Simulating an error"));
        return this.http.post(this.url, JSON.stringify(resource))
        .map(response => response.json())
        .catch(this.handleError);
    }

    update(resource, id){
        return this.http.put(this.url + '/' + id, JSON.stringify(resource))
        .map(response => response.json())
        .catch(this.handleError);
    }

    patch(resource){
        return this.http.patch(this.url, JSON.stringify(resource))
        .map(response => response.json())
        .catch(this.handleError);
    }

    delete(id){
        return Observable.throw(new AppError("Sample Error"))
        /*return this.http.delete(this.url + "/" + id)
        .map(response => response.json())
        .catch(this.handleError);*/
    }

    /**
        * handle all the possible errors. Usually in each of the throw we used to add arrow function
        * @param error 
    */
    private handleError(error:Response){

        if(error.status === 400){
            return Observable.throw(new BadRequest("Invalid Request",error));
        } else if(error.status === 404){
            return Observable.throw(new NotFoundError("Resource not found", error));
        } else if(error.status === 500) {
            return Observable.throw(new InternalServerError("Internal server error", error));
        }
        return Observable.throw(new AppError("Sorry for the invonvinience. Please try again later", error));
    }

}