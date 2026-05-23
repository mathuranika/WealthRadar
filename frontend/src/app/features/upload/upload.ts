import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.html',
  styleUrl: './upload.scss'
})
export class UploadComponent {

  selectedFile: File | null = null;

  constructor(
    private apiService: ApiService
  ) {}

  onFileSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (input.files?.length) {
      this.selectedFile =
        input.files[0];
    }

  }

  uploadPortfolio(): void {

    if (!this.selectedFile) {
      return;
    }

    this.apiService
      .uploadCSV(this.selectedFile)
      .subscribe({

        next: (response) => {
          console.log(
            'Upload success:',
            response
          );
        },

        error: (error) => {
          console.error(
            'Upload failed:',
            error
          );
        }

      });

  }

}