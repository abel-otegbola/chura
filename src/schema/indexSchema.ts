import * as Yup from "yup";

// Validation schema with Yup
export const createAppointmentSchema = Yup.object({
  customer: Yup.string().required("Customer name is required"),
  vehicle: Yup.string().required("Vehicle is required"),
  concerns: Yup.string().required("Concerns description is required"),
  scheduledDate: Yup.date()
    .required("Scheduled date is required")
    .min(new Date(), "Date cannot be in the past"),
  address: Yup.string().optional(),
});

export const createRoleSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  permissions: Yup.array().required("permissions are required").min(1, "Add permissions to this role")
});