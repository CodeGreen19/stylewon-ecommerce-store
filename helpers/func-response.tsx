import { toast } from "sonner";

export function errorResponse(error: string) {
  return { success: false, message: error };
}

export function successResponse(message: string) {
  return { success: true, message };
}

export function showToast(res: { message: string; success: boolean }) {
  if (!res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
  }
}
