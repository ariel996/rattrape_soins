import Http, {setHeader} from "../../Http";
import store from '../index'
import * as MessageAction from '../actions/messages'

export const AdminDashboardServices = () => {
    setHeader();
    return Http.get('api/admin/dashboard')
}
