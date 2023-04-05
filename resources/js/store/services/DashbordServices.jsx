import Http, {setHeader} from "../../Http";

export const AdminDashboardServices = () => {
    setHeader();
    return Http.get('api/admin/dashboard')
}
export const SecretaryDashboardServices = () => {
    setHeader();
    return Http.get('api/secretary/dashboard')
}

export const StaffDashboardServices = () => {
    setHeader();
    return Http.get('api/staff/dashboard')
}

export const PatientDashboardServices = () => {
    setHeader();
    return Http.get('api/patient/dashboard')
}
