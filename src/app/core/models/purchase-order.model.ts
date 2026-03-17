export type OrderStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'ORDERED' | 'RECEIVED' | 'CANCELLED';

export interface PurchaseOrderItem {
  id?: number;
  itemName: string;
  description?: string;
  unit?: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
}

export interface PurchaseOrder {
  id: number;
  orderNumber: string;
  vendorId: number;
  vendorName: string;
  createdByName: string;
  approvedByName?: string;
  status: OrderStatus;
  totalAmount: number;
  description?: string;
  requiredDate?: string;
  approvedDate?: string;
  createdAt: string;
  updatedAt: string;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderRequest {
  vendorId: number;
  description?: string;
  requiredDate?: string;
  items: PurchaseOrderItem[];
}
