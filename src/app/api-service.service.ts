import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor( private http: HttpClient) { }

  key ='AIzaSyBj8UTS8ZMWWvPtBuAZjfmUm3rUA4QZoHo'

  // getCoords( address: string): Observable<>() {
  //   return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address
  //   +'&key='+this.key);
  // }
}
