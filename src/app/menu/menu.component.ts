import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut()],
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;
  errMSG: string;

  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public baseURL: any
  ) {
    this.selectedDish = new Dish();
    this.dishes = [];
    this.errMSG = '';
  }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe({
      next: (dishes) => (this.dishes = dishes),
      error: (errmess) => (this.errMSG = <any>errmess),
      complete: () => console.info('complete'),
    });
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
