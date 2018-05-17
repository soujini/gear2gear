import { Injectable } from '@angular/core';
import { Make } from '../data-model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MakeService {
  private makesUrl = '/api/makes';
  private putUrl = '/api/makes';
  books:any;
  constructor(private http: Http) { }

  // get("/api/makes")

  // this.http.get('/book').subscribe(data => {
  //   this.books = data;
  // });

  getMake()  {
  return this.http.get('http://localhost:3000/api/makes','');
  }
  public getMakes(): Observable<any> {
      return this.http.get('http://localhost:3000/api/makes','')
        .map(res => res.json())
  }
  public searchMakes(searchTerm): Observable<any> {
    console.log("in service");
      return this.http.get('http://localhost:3000/api/makes/search/'+searchTerm)
        .map(res => res.json())
  }

      // return this.http.get(this.makesUrl,'')
      //            .toPromise()
      //            .then(response => response.json() as Make[])
      //            .catch(this.handleError);

  // return this.http.get<Make[]>('http://localhost:3000/api/makes');
//}

// getMakes(){
//   this.http.get('/make').subscribe(data => {
//   this.books = data;
//   console.log("souj", data);
// });
// }


    // post("/api/makes")
    // createMake(newMake: Make): Promise<void | Make> {
    //   return this.http.post(this.makesUrl, newMake)
    //              .toPromise()
    //              .then(response => {response.json() as Make})
    //              .catch(this.handleError);
    // }

    // get("/api/makes/:id") endpoint not used by Angular app

    // delete("/api/makes/:id")
    // deleteMake(delMakeId: String): Promise<void | String> {
    //   return this.http.delete(this.makesUrl + '/' + delMakeId)
    //              .toPromise()
    //              .then(response => response.json() as String)
    //              .catch(this.handleError);
    // }

    // put("/api/makes/:id")
  //   updateMake(putMake: Make): Promise<void | Make> {
  // //   var putUrl = this.makesUrl + '/' + putMake._id;
  //     return this.http.put(this.putUrl, putMake)
  //                .toPromise()
  //                .then(response => response.json() as Make)
  //                .catch(this.handleError);
  //   }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.log(errMsg); // log to console instead
    }

}
