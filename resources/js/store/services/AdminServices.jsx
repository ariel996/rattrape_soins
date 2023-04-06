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
const getPersonnel = (id) => {
    setHeader()
    return Http.get('/api/personnels/' + id)
}

export default {
    getPersonnel,
    getErrorMessage,
    deletePersonnel,
    createPersonnel,
    getPersonnels,
}
