import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TermsEnglish, TermsNonEnglish, Definition } from './data-classes';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  // Inject the HttpClient
  constructor(private http: HttpClient) { }

  // Http options for POST and PUT Requests
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  //Base URL for the web API
  private url = "https://a2-web-api.herokuapp.com/api";

  //---------------English Term Observable Methods-----------------//

  getEnglishTerms(): Observable<TermsEnglish[]> {
    return this.http.get<TermsEnglish[]>(`${this.url}/termsEng`);
  }

  getEnglishTermByWord(word: string): Observable<TermsEnglish[]> {
    return this.http.get<TermsEnglish[]>(`${this.url}/termsEng/search/${word}`);
  }

  addNewEnglishTerm(term: TermsEnglish): Observable<TermsEnglish> {
    return this.http.post<TermsEnglish>(`${this.url}/termsEng`, term, this.httpOptions);
  }

  getEnglishTermById(id: string): Observable<TermsEnglish> {
    return this.http.get<TermsEnglish>(`${this.url}/termsEng/${id}`);
  }

  incrementLikeDef(defId: string, term: TermsEnglish): Observable<TermsEnglish> {
    return this.http.put<TermsEnglish>(`${this.url}/termsEng/like/${defId}`, term, this.httpOptions);
  }

  incrementYesEng(term: TermsEnglish): Observable<TermsEnglish> {
    return this.http.put<TermsEnglish>(`${this.url}/termsEng/helpYes`, term, this.httpOptions);
  }

  incrementNoEng(term: TermsEnglish): Observable<TermsEnglish> {
    return this.http.put<TermsEnglish>(`${this.url}/termsEng/helpNo`, term, this.httpOptions);
  }

  addNewEngDef(id: string, newDef: Definition): Observable<TermsEnglish> {
    return this.http.put<TermsEnglish>(`${this.url}/termsEng/def/${id}`, newDef, this.httpOptions)
  }

  //---------------Non English Term Observable Methods-----------------//
  getAllNonEngByEngId(id: string): Observable<TermsNonEnglish[]> {
    return this.http.get<TermsNonEnglish[]>(`${this.url}/termsNonEng/termEngId/${id}`);
  }

  addNewNonEnglish(term: TermsNonEnglish): Observable<TermsNonEnglish> {
    return this.http.post<TermsNonEnglish>(`${this.url}/termsNonEng`, term, this.httpOptions);
  }

  getOneNonEngById(id: string): Observable<TermsNonEnglish> {
    return this.http.get<TermsNonEnglish>(`${this.url}/termsNonEng/${id}`);
  }

  incrementLikeDefNon(defId: string, term: TermsNonEnglish): Observable<TermsNonEnglish> {
    return this.http.put<TermsNonEnglish>(`${this.url}/termsNonEng/like/${defId}`, term, this.httpOptions);
  }

  incrementYesNon(term: TermsNonEnglish): Observable<TermsNonEnglish> {
    return this.http.put<TermsNonEnglish>(`${this.url}/termsNonEng/helpYes`, term, this.httpOptions);
  }

  incrementNoNon(term: TermsNonEnglish): Observable<TermsNonEnglish> {
    return this.http.put<TermsNonEnglish>(`${this.url}/termsNonEng/helpNo`, term, this.httpOptions);
  }

  addNewNonDef(id: string, newDef: Definition): Observable<TermsNonEnglish> {
    return this.http.put<TermsNonEnglish>(`${this.url}/termsNonEng/def/${id}`, newDef, this.httpOptions)
  }

}

