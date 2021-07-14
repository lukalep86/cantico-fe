import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPushNotification, IUserProfile } from 'src/app/models/user';
import { DirectionServiceService } from 'src/app/services/direction-service.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  private subscriptions: Subscription = new Subscription();

  idUser = 5;
  idUserInfoProfile: number;
  userEmail: string;
  pushNotifications: IPushNotification[];
  unreadPushNotifications: boolean[] = [];
  profileLoaded = false;

  profileInformationForm: FormGroup;
  locations: string[] = [
    'roma',
    'milano',
    'napoli',
    'torino',
    'palermo'
  ];
  languages: string[] = [
    'italiano',
    'inglese',
    'francese',
    'spagnolo',
    'tedesco'
  ];
  employments: string[] = [
    'impiegato',
    'artigiano',
    'libero professionista',
    'direttore',
    'manovale'
  ];
  operaTypes: string[] = [
    'seria',
    'buffa',
    'melodramma',
    'farsa',
    'singspiel'
  ];
  purchasedItems: string[] = [
    'dvd',
    'cd',
    'vinili',
    'poster',
    'libri'
  ];
  hobbies: string[] = [
    'sport',
    'musica',
    'danza',
    'pittura'
  ];
  culturalInterests: string[] = [
    'sport',
    'musica',
    'arte',
    'scienza',
    'tencologie'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dirService: DirectionServiceService
  ) {
    this.profileInformationForm = this.fb.group({
      idUser: [this.idUser],
      idUserInfoProfile: [null],
      email: [this.userEmail],
      gender: [null, [Validators.required]],
      age: [null, [Validators.required]],
      maritalStatus: [null, [Validators.required]],
      education: [null, [Validators.required]],
      geoLocation: [null, [Validators.required]],
      languages: [null, [Validators.required]],
      employment: [null, [Validators.required]],
      frequenter: [null, [Validators.required]],
      deviceUse: [null, [Validators.required]],
      reasonDeviceUse: [null, [Validators.required]],
      notifications: this.fb.array([
        this.fb.group({
          idNotificationType: [null],
          description: ['Sms'],
          enabled: [null]
        }),
        this.fb.group({
          idNotificationType: [null],
          description: ['Email'],
          enabled: [null]
        }),
        this.fb.group({
          idNotificationType: [null],
          description: ['Push'],
          enabled: [null]
        }),
      ]),
      eventFrequency: [null, [Validators.required]],
      viewer: [null, [Validators.required]],
      operaType: [null, [Validators.required]],
      purchasingOperaItems: [null, [Validators.required]],
      communityAttendance: [null, [Validators.required]],
      hobby: [null, [Validators.required]],
      culturalInteresting: [null, [Validators.required]],
    });
  }

  get notifications(): FormArray {
    return this.profileInformationForm.get('notifications') as FormArray;
  }

  ngOnInit(): void {
    this.userEmail = history?.state?.email;
    this.getUserProfile();
  }

  getUserProfile(): void {
    if (this.userEmail) {
      this.subscriptions.add(
        this.dirService.getUserProfile(this.userEmail).subscribe({
          next: (data: IUserProfile) => {
            if (data?.idUserInfoProfile) {
              this.profileInformationForm.patchValue(data);
              this.profileLoaded = true;
              this.idUserInfoProfile = data.idUserInfoProfile;
              this.getNotifications();
            } else {
              this.profileInformationForm.get('email').setValue(this.userEmail);
              this.profileLoaded = true;
            }
          }
        })
      );
    }
  }

  getNotifications(): void {
    if (this.idUserInfoProfile) {
      this.subscriptions.add(
        this.dirService.getPushNotifications(this.idUserInfoProfile).subscribe({
          next: (notifications: IPushNotification[]) => {
            this.pushNotifications = notifications;
            this.unreadPushNotifications = [];
            notifications.forEach((notif: IPushNotification) => {
              if (notif?.checked === false) {
                this.unreadPushNotifications.push(true);
              }
            });
          }
        })
      );
    }
  }

  sendForm(): void {
    this.subscriptions.add(
      this.dirService.updateUserProfile(
        this.profileInformationForm.getRawValue()
      ).subscribe({
        next: (data: IUserProfile) => {
          this.idUserInfoProfile = data.idUserInfoProfile;
        },
        complete: () => {
          this.getUserProfile();
        }
      })
    );
  }

  goHome(): void {
    this.router.navigate(['']);
  }

  checkNotification(notification: IPushNotification): void {
    if (!notification.checked) {
      this.subscriptions.add(
        this.dirService.checkPushNotifications(notification.idPushNotify).subscribe({
          complete: () => {
            this.getNotifications();
          }
        })
      );
    }
  }

}
