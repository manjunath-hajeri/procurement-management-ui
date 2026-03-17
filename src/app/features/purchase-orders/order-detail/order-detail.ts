import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PurchaseOrderService } from '../../../core/services/purchase-order.service';
import { PurchaseOrder, OrderStatus } from '../../../core/models/purchase-order.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe,
            MatCardModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.scss'
})
export class OrderDetailComponent implements OnInit {
  order?: PurchaseOrder;
  itemColumns = ['itemName', 'unit', 'quantity', 'unitPrice', 'totalPrice'];

  constructor(private orderService: PurchaseOrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.orderService.getById(id).subscribe(o => this.order = o);
  }

  updateStatus(status: OrderStatus): void {
    this.orderService.updateStatus(this.order!.id, status).subscribe(o => this.order = o);
  }
}
