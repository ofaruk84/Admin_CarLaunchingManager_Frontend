import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendee } from '../models/attendee';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {

  

  apiUrl:string ="https://localhost:44366/api/Attendees/getall"

  constructor(private httpClient:HttpClient) { }

  getAttendes():Observable<ListResponseModel<Attendee>>
  {
      return this.httpClient.get<ListResponseModel<Attendee>>(this.apiUrl);
  }
}
