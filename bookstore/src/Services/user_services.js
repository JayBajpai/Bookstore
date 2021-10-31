import axios_service from './axios_services';
import {baseURL} from './environment'

class UserService{

    constructor(){
        this.axios_service = new axios_service();
    }

    login(data){
       let url = baseURL+'user/login';
       return this.axios_service.post(url,data);
    }

    register(data){
       let url = baseURL+'user/registration';
        return this.axios_service.post(url,data);
    }

    getAllBooks(){
        let url = baseURL+'user/get/book';
        return this.axios_service.get(url);
    }
}
export default new UserService();