import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { VendorService } from '../../../core/services/vendor.service';
import { PurchaseOrderService } from '../../../core/services/purchase-order.service';
import { Vendor } from '../../../core/models/vendor.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule,
            MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
            MatDatepickerModule, MatNativeDateModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss'
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  vendors: Vendor[] = [];
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private vendorService: VendorService,
              private orderService: PurchaseOrderService, private router: Router) {
    this.orderForm = this.fb.group({
      vendorId: [null, Validators.required],
      description: [''],
      requiredDate: [null],
      items: this.fb.array([this.createItemGroup()])
    });
  }

  ngOnInit(): void {
    this.vendorService.getAll().subscribe(v => this.vendors = v.filter(v => v.status === 'ACTIVE'));
  }

  get items(): FormArray { return this.orderForm.get('items') as FormArray; }

  createItemGroup(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      unit: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  addItem(): void { this.items.push(this.createItemGroup()); }

  removeItem(index: number): void {
    if (this.items.length > 1) this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.orderForm.invalid) return;
    this.loading = true;
    this.orderService.create(this.orderForm.value).subscribe({
      next: () => this.router.navigate(['/purchase-orders']),
      error: (err) => { this.errorMessage = err.error?.message || 'Failed to create order'; this.loading = false; }
    });
  }
}
