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
  selectedFiles: File[] = [];
  isLoading = false;
  errorMessage = '';
  isDragging = false;

  constructor(private apiService: ApiService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.setFiles(Array.from(input.files));
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
    const files = Array.from(event.dataTransfer?.files ?? []);
    if (files.length) {
      this.setFiles(files);
    }
  }

  private setFiles(files: File[]): void {
    const validFiles = files.filter((file) => this.isSupported(file));

    if (validFiles.length !== files.length) {
      this.errorMessage = 'Upload CSV or PDF reports only.';
      return;
    }

    if (validFiles.length > 3) {
      this.errorMessage = 'Upload up to 3 Groww reports.';
      return;
    }

    this.selectedFiles = validFiles;
    this.errorMessage = '';
  }

  private isSupported(file: File): boolean {
    const name = file.name.toLowerCase();
    return name.endsWith('.csv') || name.endsWith('.pdf');
  }

  removeFile(fileToRemove: File): void {
    this.selectedFiles = this.selectedFiles.filter((file) => file !== fileToRemove);
  }

  uploadPortfolio(): void {
    if (!this.selectedFiles.length) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.uploadReports(this.selectedFiles).subscribe({
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
