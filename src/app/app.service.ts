import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  
  constructor(private http: HttpClient){}

  getData(){
    console.log("Called");
    // return {"hello":"world"};
    return this.http.get('');
  }

}
