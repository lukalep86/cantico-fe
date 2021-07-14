import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserProfile } from 'src/app/models/user';
import { DirectionServiceService } from 'src/app/services/direction-service.service';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.scss'],
})
export class QueryResultComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();

  resultData: IUserProfile[];
  invitationForm: FormGroup;
  idUserArray: number[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dirService: DirectionServiceService
  ) { }

  ngOnInit(): void {
    this.resultData = history?.state?.data;
    console.log(this.resultData);
    if (this.resultData?.length) {
      this.resultData.forEach((user: IUserProfile) => {
        this.idUserArray.push(user.idUser);
      });
    }
    this.invitationForm = this.fb.group({
      mailTo: [this.idUserArray],
      content: [null, Validators.required],
      eventDate: [null]
    });;
  }

  goHome(): void {
    this.router.navigate(['direction']);
  }

  sendInvitation(): void {
    if (this.invitationForm.valid) {
      console.log(this.invitationForm.getRawValue());
      this.subscriptions.add(
        this.dirService
          .sendInvitation(this.invitationForm.getRawValue())
          .subscribe({
            complete: () => {
              this.router.navigate(['direction']);
            }
          })
      );
    }
  }
}
