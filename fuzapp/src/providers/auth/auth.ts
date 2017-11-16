import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Headers} from "@angular/http";

/*
 Generated class for the AuthProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class AuthProvider {
  private token: any;
  private CLOUD_API: string;


  constructor(public http: HttpClient, public storage: Storage) {
    console.log('initializing authprovider');
    this.CLOUD_API = 'https://YOUR_HEROKU_APP.herokuapp.com/api/auth/protected';
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        this.token = value;

        let headers = new HttpHeaders();
        headers.append('Authorization', this.token);

        this.http.get(this.CLOUD_API, {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  createAccount(details: any) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.CLOUD_API, JSON.stringify(details), {headers: headers})
        .subscribe(res => {
          let data = res[''];
          this.token = data.token;
          this.storage.set('token', this.token);

          resolve(data);
        }, err => {
          reject(err);
        })
    });
  }

  login() {

  }

  logout() {
    this.storage.set('token', '');
  }

}
