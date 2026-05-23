import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.html',
  styleUrl: './upload.scss',
})
export class UploadComponent {
  selectedFile: File | null = null;
  isLoading = false;
  errorMessage = '';
  isDragging = false;

  constructor(private apiService: ApiService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.setFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
        this.errorMessage = 'Only .csv files are supported.';
        return;
      }
      this.setFile(file);
    }
  }

  private setFile(file: File): void {
    this.selectedFile = file;
    this.errorMessage = '';
  }

  uploadPortfolio(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.uploadCSV(this.selectedFile).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Upload success:', response);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Upload failed. Please check your file and try again.';
        console.error('Upload failed:', error);
      },
    });
  }
}