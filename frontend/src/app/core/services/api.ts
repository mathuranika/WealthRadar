import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8001';

  constructor(private http: HttpClient) {}

  uploadPortfolio(file: File): Observable<any> {

    const formData = new FormData();

    formData.append(
      'file',
      file
    );

    return this.http.post(
      `${this.baseUrl}/upload`,
      formData
    );
  }

  chat(question: string): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/chat`,
      { question }
    );
  }
}
