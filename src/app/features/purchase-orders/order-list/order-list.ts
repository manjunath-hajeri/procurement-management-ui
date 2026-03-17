import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PurchaseOrderService } from '../../../core/services/purchase-order.service';
import { PurchaseOrder } from '../../../core/models/purchase-order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe, MatCardModule, MatTableModule,
            MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
            MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss'
})
export class OrderListComponent implements OnInit {
  displayedColumns = ['orderNumber', 'vendorName', 'status', 'totalAmount', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<PurchaseOrder>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: PurchaseOrderService) {}

  ngOnInit(): void { this.loadOrders(); }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe(orders => this.dataSource.data = orders);
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  deleteOrder(order: PurchaseOrder): void {
    if (confirm(`Delete order "${order.orderNumber}"?`)) {
      this.orderService.delete(order.id).subscribe(() => this.loadOrders());
    }
  }
}
