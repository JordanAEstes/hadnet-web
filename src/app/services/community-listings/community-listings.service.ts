import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommunityListing } from '../../models/CommunityListing';

@Injectable({
  providedIn: 'root'
})
export class CommunityListingsService {

  constructor(private http: HttpClient) { }

  // dateExpire needs a format of '2019-05-12'
  addCommunityListing(title, body, imageUrl, dateExpire, idUser): Observable<CommunityListing[]> {
    return this.http.post<CommunityListing[]>('/api/community/addCommunityListing', {
      title, body, imageUrl, date_expire: dateExpire, idUser});
  }

  removeCommunityListing(listingId: number, idUser: number): Observable <CommunityListing[]> {
    return this.http.delete<CommunityListing[]>(`/api/community/removeCommunityListing?idUser=${idUser}&id=${listingId}`);
  }

  getAllCommunityListings(): Observable <CommunityListing[]> {
    return this.http.get<CommunityListing[]>('/api/community/getAllCommunityListings');
  }

  searchForCommunityListings(title: string): Observable <CommunityListing[]> {
    return this.http.get<CommunityListing[]>(`/api/community/searchForCommunityListings?title=${title}`); // takes a title as query
  }
}