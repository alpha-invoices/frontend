import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegistrationService {

	http: Http;

    constructor(http: Http) {
    	  this.http = http;
    }



    private extractData(res: Response) {
         let body = res.json();
         return JSON.stringify(body) || "";
    }
    private handleError (error: any) {
         return error.message;
    }
}