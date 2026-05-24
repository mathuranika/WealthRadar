import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api';
import { PortfolioService } from '../../core/services/portfolio';
import { ChangeDetectorRef } from '@angular/core';

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

  uploadResponse:any=null;

  constructor(
    private apiService:ApiService,
    private portfolioService:PortfolioService,
    private cdr:ChangeDetectorRef
  ){}

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

    const files =
      Array.from(
        event.dataTransfer?.files ?? []
      );

    if (files.length) {
      this.setFiles(files);
    }

  }

  private setFiles(files: File[]): void {

    const validFiles =
      files.filter(
        (file) => this.isSupported(file)
      );

    if (validFiles.length !== files.length) {

      this.errorMessage =
        'Upload Excel reports only (.xlsx or .xls).';

      return;
    }

    if (validFiles.length > 3) {

      this.errorMessage =
        'Upload up to 3 Groww reports.';

      return;
    }

    this.selectedFiles = validFiles;
    this.errorMessage = '';

  }

  private isSupported(file: File): boolean {

    const name =
      file.name.toLowerCase();

    return (
      name.endsWith('.xlsx') ||
      name.endsWith('.xls')
    );

  }

  removeFile(fileToRemove: File): void {

    this.selectedFiles =
      this.selectedFiles.filter(
        (file) =>
          file !== fileToRemove
      );

  }

  uploadPortfolio():void{

  if(!this.selectedFiles.length)return;

  this.isLoading=true;
  this.errorMessage='';

  const file=this.selectedFiles[0];

  this.apiService.uploadPortfolio(file).subscribe({

    next:(response:any)=>{

      this.portfolioService.setPortfolio({
        summary:response.summary,
        holdings:response.holdings,
        alerts:response.alerts,
        analysis:response.analysis,
        concerns:response.concerns||[]
      });

      this.isLoading=false;

    },

    error:(error)=>{

      console.error(error);

      this.errorMessage=
        'Upload failed. Please try again.';

      this.isLoading=false;

    }

  });

}

}