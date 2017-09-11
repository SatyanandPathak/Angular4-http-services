import { NotFoundError } from './../errors/not-found-error';
import { AppError } from './../errors/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Http } from '@angular/http';

@Component({
    selector: 'posts-component',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.css']
})
export class PostsComponent implements OnInit{

    myForm = new FormGroup({

    })

    posts:any[];
    constructor(private postService: PostService){
        

    }

    ngOnInit(){
        this.postService.getAll()
        .subscribe(
            data => {this.posts = data}, 
        (error : AppError) => {
            if(error instanceof NotFoundError){
                console.log("Not found")
                this.myForm.setErrors({
                    message: error.customMessage
                });
            }

            console.log("unexpected error occured", error)
            this.myForm.setErrors({
                message: error.customMessage
            });
        })
    }

    createPost(input: HTMLInputElement){
        let post = {title: input.value}
        // Optimistic update hoping that post always succeded
        // We will rollback in the error if it fails
        this.posts.splice(0, 0, post)

        this.postService.create(post)
        .subscribe(
            data => {
            post['id'] = data.id;
            // Pessimistic update only if the call succedes
            //this.posts.splice(0, 0, post)
        }, 
        (error: AppError ) => {
            this.posts.splice(0, 1)

            this.myForm.setErrors({
                message: error.customMessage
            })
        })

        input.value = '';
        
    }

    updatePost(post){
        
        let postData = {title:"updated the title", id: post.id}
        this.postService.update(postData, post.id)
        .subscribe( () => {
            let index = this.posts.indexOf(post)
            this.posts.splice(index, 0, postData)
        }, (error : AppError) => {
            this.myForm.setErrors({
                message: error.customMessage
            })
        })
    }

    deletePost(post){

        let index = this.posts.indexOf(post);
        // Optimistic update
        this.posts.splice(index, 1);

        this.postService.delete(post.id)
        .subscribe(() => {
            //this.posts.splice(index, 1);
        }, (error : AppError)=> {
            if (error instanceof AppError){
                this.posts.splice(index, 0, post)

                //throw error;
                console.log("Setting the error", error)
                this.myForm.setErrors({
                    message: error.customMessage
                })
                
            }
        });
    }


}

    
    