import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})


export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective: any;


  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy: Feedback;
  contactType = ContactType;
  formErrors:any;
  validationMessages: any;
  errMess: string;


  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedback = new Feedback();
    this.feedbackCopy = new Feedback();
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: ['', Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.errMess = "";
    this.formErrors = {
      'firstname': '',
      'lastname': '',
      'telnum': '',
      'email': ''
    };
    this.validationMessages = {
      'firstname': {
        'required':      'First Name is required.',
        'minlength':     'First Name must be at least 2 characters long.',
        'maxlength':     'FirstName cannot be more than 25 characters long.'
      },
      'lastname': {
        'required':      'Last Name is required.',
        'minlength':     'Last Name must be at least 2 characters long.',
        'maxlength':     'Last Name cannot be more than 25 characters long.'
      },
      'telnum': {
        'required':      'Tel. number is required.',
        'pattern':       'Tel. number must cannot contain letters, only numbers.'
      },
      'email': {
        'required':      'Email is required.',
        'email':         'Email not in valid format.',
        'pattern':       'Email not in valid format.'
      },
    };
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)] ],
      email: ['', [Validators.required,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedbackService.postFeedback(this.feedback).subscribe({
      next: (feedback) => ((this.feedback = feedback), (this.feedbackCopy = feedback)),
      error: (errmess) => (
        (this.feedback = new Feedback()),
        (this.feedbackCopy = new Feedback()),
        (this.errMess = <any>errmess)
      ),
      complete: () => console.info('complete'),
    });;
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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
