export type VendorStatus = 'ACTIVE' | 'INACTIVE' | 'BLACKLISTED';

export interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  status: VendorStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VendorRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
}
