export interface VehicleItem {
  _id?: string;
  createdAt?: string;
  brand_id?: string;
  model?: string;
  color_id?: string;
  number_plate?: string;
  chassis_no?: string;
  license_plate?: string;
  model_year?: number | string;
  odometer?: string;
  mileage?: number | string;
  type?: string;
  fuel_type?: string;
  body_type?: string;
  status?: "completed" | "processing" | "pending" | "failed" | string;
  issues?: string;
  amount?: number | string;
  progress?: string | number;
  date?: string;
  additional_services?: string;
  image?: string;
  brand?: string;
}

export interface JobItem {
  _id?: string;
  createdAt?: string;
  name?: string;
  year?: number | string;
  license_plate?: string;
  status?: "completed" | "processing" | "pending" | "failed" | string;
  issues?: string;
  amount?: number | string;
  progress?: string | number;
  additional_services?: string;
  date?: string;
}

export interface Labor {
  technician_id?: string;
  hours?: number;
  hourly_rate?: number;
  issue_id?: string;
  additional_note?: string;
}

export interface Part {
  part_id?: string;
  quantity?: number;
  unit_cost?: number;
  issue_id?: string;
  additional_note?: string;
}

// export interface Service {
//   service_library_id?: string;
//   labour_markup?: number;
//   labour_markup_unit?: "percent";
//   parts_markup?: number;
//   parts_markup_unit?: "percent";
//   discount?: number;
//   discount_unit?: "percent";
//   tax?: number;
//   tax_unit?: "percent";
//   status?: "pending" | "approved" | "rejected" | "completed";
//   labors?: Labor[];
//   parts?: Part[];
// }

export interface Service {
  _id?: string;
  date?: string; // ISO date string
  service?: string;
  hours?: number | string;
  year?: number | string;
  name?: string;
  job_card?: string;
  vehicle_brand?: string;
  status?: "Completed" | "Processing" | "Pending" | "Failed" | string; // extend as needed
  issues?: string;
  additional_services?: string;
  amount?: number | string;
  progress?: number; // 0 to 100
  // Add any other properties you use or might receive
}

export interface ServiceRequest {
  services?: Service[];
}

export interface Appointment {
  _id?: string,
  name?: string,
  scheduled_at?: string,
  concern?: string,
  priority?: string,
  towing_service?: string,
  created_at?: string,
  vehicle?: string,
  user_id?: string,
}
export interface Customer {
  _id: string; 
  name: string; 
  email: string; 
  services: string; 
  joinedAt: string; 
  status: string;
  avatar?: string;
}

export interface Staff {
  _id: string; 
  name: string; 
  email: string; 
  role: string; 
  joinedAt: string; 
  status: string;
  avatar?: string;
}

export interface Role {
  id: string; 
  name: string; 
  assignedStaffs?: string; 
  created_at?: string; 
  status?: string;
  permissions?: number[];
}

export interface Permission { 
  group: string, 
  permissions: 
  {
    id: number, 
    name: string, 
    group: string
  }[]
}
