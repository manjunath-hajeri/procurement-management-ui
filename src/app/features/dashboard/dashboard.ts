import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { VendorService } from '../../core/services/vendor.service';
import { PurchaseOrderService } from '../../core/services/purchase-order.service';
import { PurchaseOrder } from '../../core/models/purchase-order.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatTableModule, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  totalVendors = 0;
  totalOrders = 0;
  pendingApproval = 0;
  approvedOrders = 0;
  recentOrders: PurchaseOrder[] = [];
  displayedColumns = ['orderNumber', 'vendorName', 'status', 'totalAmount'];

  constructor(private vendorService: VendorService, private orderService: PurchaseOrderService) {}

  ngOnInit(): void {
    this.vendorService.getAll().subscribe(v => this.totalVendors = v.length);
    this.orderService.getAll().subscribe(orders => {
      this.totalOrders = orders.length;
      this.pendingApproval = orders.filter(o => o.status === 'SUBMITTED').length;
      this.approvedOrders = orders.filter(o => o.status === 'APPROVED').length;
      this.recentOrders = orders.slice(0, 5);
    });
  }
}
