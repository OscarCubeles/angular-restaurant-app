import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  commentForm: FormGroup;
  formErrors: any;
  validationMessages: any;
  id: any;

  date: Date;

  @ViewChild('fform') feedbackFormDirective: any;

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public baseURL: any
  ) {
    this.prev = '';
    this.next = '';
    this.dishIds = [];
    this.dish = new Dish();
    this.date = new Date();
    this.commentForm = this.fb.group({
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],

      comment: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.formErrors = {
      author: '',
      rating: '',
      comment: '',
    };
    this.validationMessages = {
      author: {
        required: 'Author is required.',
        minlength: 'Author must be at least 2 characters long.',
        maxlength: 'Author cannot be more than 25 characters long.',
      },
      comment: {
        required: 'Comment is required.',
        minlength: 'Comment must be at least 2 characters long.',
        maxlength: 'Comment cannot be more than 25 characters long.',
      },
      rating: {
        required: 'Rating is required.',
        pattern: 'Rating must cannot contain letters, only numbers.',
      },
    };
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      comment: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  ngOnInit() {
    this.dishservice
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishservice.getDish(params['id']))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev =
      this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next =
      this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.saveComment();
      this.resetForm();
    } else {
      console.log('Form not submitted. There are errors with the form fields.');
    }
  }

  saveComment(): void {
    this.route.params.subscribe((id) => (this.id = id['id']));
    let author: string = this.commentForm.value['author'];
    let commentStr: string = this.commentForm.value['comment'];
    this.dishservice.addDishComment(
      this.id,
      author,
      commentStr,
      this.getRatingValue()
    );
  }

  isFormValid(): boolean {
    return this.commentForm.status === 'VALID' ? true : false;
  }

  getRatingValue(): number {
    return +document.getElementById('matslider')!.innerText;
  }

  resetForm(): void {
    this.feedbackFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      comment: '',
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
