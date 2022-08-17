import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Comment } from '../shared/comments';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map((dishes) => dishes[0]));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(
      map((dishes) => dishes.map((dish) => dish.id))
    );
  }

  addDishComment(
    dishId: number,
    author: string,
    comment: string,
    rating: number
  ): void {
    var newComment = new Comment(rating, comment, author);
    console.log('Need to add the dish in the server');

    //var dishes = DISHES;
    //dishes[dishId].comments.push(newComment);
  }
}
