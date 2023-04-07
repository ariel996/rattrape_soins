import Http, {setHeader} from "@/Http";

const getMyPatients = () => {
    setHeader()
    return Http.get('/api/staff/patient')
}
const getMyAppointments = () => {
    setHeader()
    return Http.get('/api/appointments')
}
const getMyAppointment = (status) => {
    setHeader()
    return Http.get('/api/appointment/' + status)
}

const getMyPlannings = () => {
    setHeader()
    return Http.get('/api/staff/availabilities');
}

const getMyPlanning = (id) => {
    setHeader()
    return Http.get('/api/staff/availabilities/' + id);
}

const UpdatePlanning = (id, data)=>{
    setHeader()
    return Http.put('/api/staff/availabilities/' + id, data)
}


export default {
    getMyPatients,
    getMyAppointments,
    getMyAppointment,
    getMyPlannings,
    getMyPlanning,
    UpdatePlanning,

}
