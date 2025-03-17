import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { StorageService } from '../../../auth/components/services/storage/storage.service';



const BASIC_URL=["http://localhost:8080"];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient) { }

  postCar(carDto:any):Observable<any>{
   return this.http.post(BASIC_URL+"/api/admin/car",carDto,{
     headers:this.createAuthorizationHeader()
   });
  }

  // getAllCars(carDto: any={}): Observable<any> {
  //   return this.http.post(BASIC_URL + "/api/admin/car", carDto, {
  //     headers: this.createAuthorizationHeader()
  //   });
  // }
  getAllCars(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'), // 👈 Use stored token
      'Content-Type': 'application/json'
    });
  
    return this.http.get(BASIC_URL + "/api/admin/car", { headers });
  }
  deleteCar(id:number):Observable<any>{
    return this.http.delete(BASIC_URL+"/api/admin/car/" +id,{
      headers:this.createAuthorizationHeader()
    });
  }
  
createAuthorizationHeader(): HttpHeaders{
  let authHeaders : HttpHeaders=new HttpHeaders();
  return authHeaders.set(
    'Authorization',
    'Bearer ' + StorageService.getToken()
  );
}

}
