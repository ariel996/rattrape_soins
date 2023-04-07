/**
 * Here you find All service need by the Administration of this website
 */
import Http, {setHeader} from "@/Http";

const getErrorMessage = (error) => {
    return (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
}

// personnel
const getPersonnels = () => {
    setHeader()
    return Http.get('/api/personnels')
}
const deletePersonnel = (id) => {
    setHeader()
    return Http.delete('/api/personnels/' + id)
}
const createPersonnel = (data) => {
    setHeader()
    return Http.post('/api/personnels', data)
}
const updatePersonnel = (id, data) => {
    setHeader()
    return Http.put('/api/personnels/' + id, data)
}
const getPersonnel = (id) => {
    setHeader()
    return Http.get('/api/personnels/' + id)
}

// ended personnel

//patient
const getPatients = () => {
    setHeader()
    return Http.get('/api/patients')
}
const deletePatient = (id) => {
    setHeader()
    return Http.delete('/api/patients/' + id)
}
const createPatient = (data) => {
    setHeader()
    return Http.post('/api/patients', data)
}
const updatePatient = (id, data) => {
    setHeader()
    return Http.put('/api/patients/' + id, data)
}
const getPatient = (id) => {
    setHeader()
    return Http.get('/api/patients/' + id)
}

export default {
    getErrorMessage,

    getPersonnel,
    deletePersonnel,
    createPersonnel,
    getPersonnels,
    updatePersonnel,

    getPatient,
    deletePatient,
    createPatient,
    getPatients,
    updatePatient,
}
