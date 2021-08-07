import { Injectable, ɵConsole } from '@angular/core';
import { Prod } from './prod.model';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiurl

@Injectable({
  providedIn: 'root'
})



export class ProdService {

  constructor(private http: HttpClient) {

  }





  getProds(pageSize, currentPage) {
    console.log("service", pageSize, currentPage)

    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`

    return this.http.get(BACKEND_URL + '/prods' + queryParams)

  }

  getProdById(id) {
    console.log("########",id)
    return this.http.get(BACKEND_URL + '/prods/' + id)
  }

  addProd(name, cost) {
    const prodData = {
      name:name,
      cost:cost
    }

    return this.http.post(BACKEND_URL + '/prods', prodData)

  }

  updateProd(name, cost, id) {
    const prodData = {
      name:name,
      cost:cost
    }



    return this.http.put(BACKEND_URL + '/prods/' + id, prodData)
  }


  deleteProd(id) {
    console.log("id", id)
    return this.http.delete(BACKEND_URL + '/prods/' + id)
  }

}
