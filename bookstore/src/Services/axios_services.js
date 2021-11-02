import axios from 'axios';

export default function axios_service(){

}

axios_service.prototype.post =  function(url,data){
    return axios.post(url,data,{
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    }
    });
}

axios_service.prototype.put =  function(url,data){
  return axios.put(url,data,{
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
  }
  });
}


axios_service.prototype.postCart =  function(url){
  
  return axios.post(url,{},{
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    }
  });
}

axios_service.prototype.get =  function(url){
  return axios.get(url,{
      headers: {
        'x-access-token': localStorage.getItem('token')
      },
    });
  }

  axios_service.prototype.delete =  function(url){
    return axios.delete(url,{
        headers: {
          'x-access-token': localStorage.getItem('token')
        },
      });
    }