import Http, {setHeader} from "@/Http";

const getMyPatients = () => {
    setHeader()
    return Http.get('/api/staff/patient')
}

export default {
    getMyPatients,

}
