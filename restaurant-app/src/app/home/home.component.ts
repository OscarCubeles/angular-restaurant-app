import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { PrintHook } from '@angular/flex-layout';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public baseURL: any
  ) {
    this.dish = new Dish();
    this.promotion = new Promotion();
    this.leader = new Leader();
  }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish().subscribe((dish) => (this.dish = dish));
    this.promotionservice
      .getFeaturedPromotion()
      .subscribe((promotion) => (this.promotion = promotion));
    this.leaderService
      .getFeaturedLeader()
      .subscribe((leader) => (this.leader = leader));
  }
}
