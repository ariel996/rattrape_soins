import {AdminDashboardServices} from "@/store/services/DashbordServices";

export async function AdminDashboardLoader() {
    const data = await AdminDashboardServices();
    return {data};
}
