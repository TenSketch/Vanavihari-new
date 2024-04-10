import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'access_token';
  private accessUsername = 'username';
  private accessUserFullname = 'userfullname';
  private apiCommonUrl = 'https://www.zohoapis.com/creator/custom/vanavihari';

  private bookingRooms = 'booking_rooms';
  private searchData = 'search_data';

  private refreshRoomsComponentSource = new Subject<void>();
  refreshRoomsComponent$ = this.refreshRoomsComponentSource.asObservable();

  constructor(private http: HttpClient) {}

  sendDataToServer(apiUri: any, params: any): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this.http.get<any>(`${this.apiCommonUrl}/${apiUri}`, { params });
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  setAccountUsername(username: string): void {
    localStorage.setItem(this.accessUsername, username);
  }

  setAccountUserFullname(userfullname: string): void {
    localStorage.setItem(this.accessUserFullname, userfullname);
  }

  getAccountUsername(): string | null {
    return localStorage.getItem(this.accessUsername);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getUserFullName(): string | null {
    return localStorage.getItem(this.accessUserFullname);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  setBookingRooms(resortType: string, rooms: any[]): void {
    localStorage.setItem(resortType, JSON.stringify(rooms));
  }
  getBookingRooms(resortType: any): any | null {
    console.log('resortType--', resortType);
    const roomsJson = localStorage.getItem(resortType);
    console.log('roomsJson==', roomsJson);
    if (roomsJson) {
      return JSON.parse(roomsJson);
    }
    return null;
  }
  clearBookingRooms(resortType: string): void {
    localStorage.removeItem(resortType);
  }

  setSearchData(data: any[]): void {
    localStorage.setItem(this.searchData, JSON.stringify(data));
  }
  getSearchData(data: string | null | ''): any | null {
    const searchDataJson = localStorage.getItem(this.searchData);
    if (searchDataJson) {
      if (data !== null && data !== '')
        return JSON.parse(searchDataJson)[0][data];
      else return JSON.parse(searchDataJson)[0];
    }
    return null;
  }
  clearSearchData(): void {
    localStorage.removeItem(this.searchData);
  }

  refreshRoomsComponent(): void {
    this.refreshRoomsComponentSource.next();
  }
}
