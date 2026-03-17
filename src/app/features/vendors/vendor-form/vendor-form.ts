import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VendorService } from '../../../core/services/vendor.service';

@Component({
  selector: 'app-vendor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatCardModule,
            MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './vendor-form.html',
  styleUrl: './vendor-form.scss'
})
export class VendorFormComponent implements OnInit {
  vendorForm: FormGroup;
  isEditMode = false;
  vendorId?: number;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private vendorService: VendorService,
              private router: Router, private route: ActivatedRoute) {
    this.vendorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      contactPerson: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    this.vendorId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.vendorId;
    if (this.isEditMode) {
      this.vendorService.getById(this.vendorId!).subscribe(v => this.vendorForm.patchValue(v));
    }
  }

  onSubmit(): void {
    if (this.vendorForm.invalid) return;
    this.loading = true;
    const request = this.isEditMode
      ? this.vendorService.update(this.vendorId!, this.vendorForm.value)
      : this.vendorService.create(this.vendorForm.value);
    request.subscribe({
      next: () => this.router.navigate(['/vendors']),
      error: (err) => { this.errorMessage = err.error?.message || 'Failed to save vendor'; this.loading = false; }
    });
  }
}
