import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IQueryForm, IUserProfile } from 'src/app/models/user';
import { DirectionServiceService } from 'src/app/services/direction-service.service';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit {

  private subscriptions: Subscription = new Subscription();

  queryForm: FormGroup;

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
    private router: Router,
    private dirService: DirectionServiceService,
    private fb: FormBuilder
  ) {
    this.queryForm = this.fb.group({
      gender: [null],
      fromAge: [null],
      toAge: [null],
      maritalStatus: [null],
      education: [null],
      geoLocation: [null],
      languages: [null],
      employment: [null],
      frequenter: [null],
      deviceUse: [null],
      reasonDeviceUse: [null],
      notifications: [null],
      eventFrequency: [null],
      viewer: [null],
      operaType: [null],
      purchasingOperaItems: [null],
      communityAttendance: [null],
      hobbies: [null],
      culturalInteresting: [null],
    });
  }

  ngOnInit(): void {
  }

  get notification(): FormArray {
    return this.queryForm.get('notification') as FormArray;
  }

  goHome(): void {
    this.router.navigate(['']);
  }

  searchUsers(): void {
    if (this.queryForm.dirty) {
      const queryForm: IQueryForm = this.queryForm.getRawValue();
      this.subscriptions.add(
        this.dirService.searchUsers(queryForm).subscribe({
          next: (dataUsers: IUserProfile[]) => {
            this.router.navigate(['query-result'], {state: {data: dataUsers}});
          },
          error: () => {

          }
        })
      );
    }
    // const queryParamsBody: HttpParams = new HttpParams().append(
    //   'gender',
    //   queryForm?.gender?.map(item => item)?.join(',')
    // ).append(
    //   'fromAge', queryForm?.fromAge
    // ).append(
    //   'toAge', queryForm?.toAge
    // ).append(
    //   'maritalStatus', queryForm?.maritalStatus?.map(item => item)?.join(',')
    // ).append(
    //   'education', queryForm?.education?.map(item => item)?.join(',')
    // ).append(
    //   'geoLocation', queryForm?.geoLocation
    // ).append(
    //   'languages', queryForm?.languages?.map(item => item)?.join(',')
    // ).append(
    //   'employment', queryForm?.employment?.map(item => item)?.join(',')
    // ).append(
    //   'frequenter', queryForm?.frequenter?.map(item => item)?.join(',')
    // ).append(
    //   'deviceUse', queryForm?.deviceUse
    // ).append(
    //   'reasonDeviceUse', queryForm?.reasonDeviceUse?.map(item => item)?.join(',')
    // ).append(
    //   'notification', queryForm?.notification?.map(item => item)?.join(',')
    // ).append(
    //   'eventFrequency', queryForm?.eventFrequency?.map(item => item)?.join(',')
    // ).append(
    //   'viewer', queryForm?.viewer
    // ).append(
    //   'operaType', queryForm?.operaType?.map(item => item)?.join(',')
    // ).append(
    //   'purchasingOperaItems', queryForm?.purchasingOperaItems?.map(item => item)?.join(',')
    // ).append(
    //   'communityAttendance', queryForm?.communityAttendance
    // ).append(
    //   'hobby', queryForm?.hobby?.map(item => item)?.join(',')
    // ).append(
    //   'culturalInteresting', queryForm?.culturalInteresting?.map(item => item)?.join(',')
    // );

    // const queryParamsBody: HttpParams = new HttpParams({fromObject: {
    //   gender: queryForm?.gender?.map(item => item)?.join(','),
    //   fromAge: queryForm?.fromAge,
    //   toAge: queryForm?.toAge,
    //   maritalStatus: queryForm?.maritalStatus?.map(item => item)?.join(','),
    //   education: queryForm?.education?.map(item => item)?.join(','),
    //   geoLocation: queryForm?.geoLocation,
    //   languages: queryForm?.languages?.map(item => item)?.join(','),
    //   employment: queryForm?.employment?.map(item => item)?.join(','),
    //   frequenter: queryForm?.frequenter?.map(item => item)?.join(','),
    //   deviceUse: queryForm?.deviceUse,
    //   reasonDeviceUse: queryForm?.reasonDeviceUse?.map(item => item)?.join(','),
    //   notifications: queryForm?.notifications?.map(item => item)?.join(','),
    //   eventFrequency: queryForm?.eventFrequency?.map(item => item)?.join(','),
    //   viewer: queryForm?.viewer,
    //   operaType: queryForm?.operaType?.map(item => item)?.join(','),
    //   purchasingOperaItems: queryForm?.purchasingOperaItems?.map(item => item)?.join(','),
    //   communityAttendance: queryForm?.communityAttendance,
    //   hobbies: queryForm?.hobbies?.map(item => item)?.join(','),
    //   culturalInteresting: queryForm?.culturalInteresting?.map(item => item)?.join(',')
    // }});

  }

  selectDeselectAll(checked: boolean, multiSelect: string, multiSelectArray: string[]): void {
    if (checked) {
      this.queryForm.get(multiSelect).setValue(multiSelectArray);
    } else {
      this.queryForm.get(multiSelect).setValue(null);
    }
  }

  checkIfAllSelected(multiSelect: string, multiSelectArray: string[]): boolean {
    let ret: boolean;
    if (this.queryForm.get(multiSelect).value === multiSelectArray) {
      ret = true;
    } else {
      ret = false;
    }
    return ret;
  }

}
