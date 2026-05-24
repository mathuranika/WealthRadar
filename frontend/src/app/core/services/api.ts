import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl =
    '/api';

  constructor(
    private http: HttpClient
  ) {}

  uploadCSV(file: File) {

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    return this.http.post(
      `${this.baseUrl}/upload`,
      formData
    );

  }

  uploadReports(files: File[]) {

    const formData =
      new FormData();

    files.forEach((file) => {
      formData.append(
        'files',
        file
      );
    });

    return this.http.post(
      `${this.baseUrl}/upload`,
      formData
    );

  }

}
