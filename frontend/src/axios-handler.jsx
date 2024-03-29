let base_url;

if (import.meta.env.VITE_BASE_LINE_URL) {
    base_url = import.meta.env.VITE_BASE_LINE_URL;
} else {
    base_url = "http://localhost:8000/api/";
}

export const url_register = base_url + "register/";
export const url_login = base_url + "login/";
export const url_users = base_url + "users/";
export const url_workers_management = base_url + "workers-mangement/";
export const url_select_shifts = base_url + "select-shifts/";
export const url_approved_shifts = base_url + "approved-shifts/";
export const url_managers_shifts = base_url + "shift-management/";
export const url_work_hours = base_url + "work-hours/";