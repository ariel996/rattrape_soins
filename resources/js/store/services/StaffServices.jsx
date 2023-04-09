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

const getAppointmentDetail = (id) => {
    setHeader()
    return Http.get('/api/appointment/show/' + id)
}
const updateStatusAppointment = (id, data) => {
    setHeader()
    return Http.post('/api/staff/appointment/update/status/' + id, data)
}

const addObservation = (data) => {
    setHeader()
    return Http.post('/api/observations/', data)
}

const getMyPlannings = () => {
    setHeader()
    return Http.get('/api/staff/availabilities');
}

const getMyPlanning = (id) => {
    setHeader()
    return Http.get('/api/staff/availabilities/' + id);
}

const UpdatePlanning = (id, data) => {
    setHeader()
    return Http.put('/api/staff/availabilities/' + id, data)
}


export default {
    getMyPatients,

    getMyAppointments,
    getMyAppointment,
    getAppointmentDetail,
    updateStatusAppointment,
    addObservation,

    getMyPlannings,
    getMyPlanning,
    UpdatePlanning,

}
