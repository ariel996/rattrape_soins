import Http, {setHeader} from "@/Http";

const getPersonnels = () => {
    setHeader()
    return Http.get('/api/patient/personnel')
}

const getScheduler = (data) => {
    setHeader()
    return Http.post('/api/patient/scheduler', data)
}
const bookAppointment = (data) => {
    setHeader()
    return Http.post('/api/appointment/register', data)
}

const getMyAppointments = (status) => {
    setHeader()
    return Http.get('/api/patient/appointment/' + status)
}

export default {
    getPersonnels,
    getScheduler,
    bookAppointment,
    getMyAppointments,

}
