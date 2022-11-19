import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true,
});

export type CitizenType = {
  id: number;
  age: number;
  city: string;
  name: string;
  someNote: string;
};

export const workersAPI = {
  async getTest() {
    //return instance.get(`/citizens`);
    try{
      const res = await axios.get('http://localhost:8081/citizens')
      console.log('res',res)
      return res
    }catch (e) {
      console.log(e)
    }
  },
  async createCitizen(age:number,city:string,name:string,someNote:string){

  }
};
