import {ErrorHandler} from '@angular/core';

export class AppErrorHandler implements ErrorHandler {

    handleError(error){
        console.log("Error is****", error)
        /*this.myForm.setErrors({
                    message: error.customMessage
                })*/
    }

}