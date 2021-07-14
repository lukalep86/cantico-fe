import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { IPushNotification, IQueryForm, IUserProfile } from '../models/user';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DirectionServiceService {
  constructor(private http: HttpClient) {}

  getUserProfile(email: string): Observable<IUserProfile> {
    return this.http
      .get<IUserProfile>(`${apiUrl.domain}/userInfo/${email}`)
      .pipe();
  }

  updateUserProfile(data: IUserProfile): Observable<IUserProfile> {
    return this.http
      .put<IUserProfile>(`${apiUrl.domain}/userInfo/profile`, data)
      .pipe();
  }

  searchUsers(queryForm: IQueryForm): Observable<any> {
    return this.http
      .post<any>(`${apiUrl.domain}/userInfo/cluster`, queryForm)
      .pipe();
  }

  sendInvitation(invitationForm: any): Observable<any> {
    return this.http
      .post<any>(`${apiUrl.domain}/userInfo/sendNotification`, invitationForm)
      .pipe();
  }

  getPushNotifications(idUserInfoProfile: number): Observable<IPushNotification[]> {
    return this.http
      .get<IPushNotification[]>(`${apiUrl.domain}/push/${idUserInfoProfile}`)
      .pipe()
  }

  checkPushNotifications(idPushNotify: number): Observable<IPushNotification[]> {
    return this.http
      .put<IPushNotification[]>(`${apiUrl.domain}/push/checkPush/${idPushNotify}`, null)
      .pipe();
  }

}
