import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Comment } from '../shared/comments';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map((dishes) => dishes[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(
      map((dishes) => dishes.map((dish) => dish.id))
    ).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  addDishComment(
    dishId: number,
    author: string,
    comment: string,
    rating: number
  ): void {
    var newComment = new Comment(rating, comment, author);
    console.log('Need to add the dish in the server');
    // TODO: ADD THE DISH COMMENT TO THE SERVER w/ A PUT REQUEST
    //var dishes = DISHES;
    //dishes[dishId].comments.push(newComment);
    //this.http.put(baseURL + dishId)
    let dish = this.getDish(dishId.toString());
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(catchError(this.processHTTPMsgService.handleError));

    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
