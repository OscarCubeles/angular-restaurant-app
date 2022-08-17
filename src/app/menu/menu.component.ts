import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { of } from 'rxjs';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;
  errMSG: string;


  constructor(private dishService: DishService, @Inject('BaseURL') public baseURL: any) {
    this.selectedDish = new Dish();
    this.dishes = [];
    this.errMSG = "";
    console.log(this.baseURL);
  }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe({
      next: dishes => this.dishes = dishes,
      error: errmess => this.errMSG = <any>errmess,
      complete: () => console.info('complete') 
  });}



  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
