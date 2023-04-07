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
    return Http.get('/api/appointment/'+status)
}

export default {
    getMyPatients,
    getMyAppointments,
    getMyAppointment,

}
