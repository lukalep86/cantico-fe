export interface IUserProfile {
  idUserInfoProfile?: number;
  idUser?: number;
  email?: string;
  gender?: string;
  age?: number;
  maritalStatus?: string;
  education?: string;
  geoLocation?: string;
  languages?: string;
  employment?: string;
  frequenter?: string;
  deviceUse?: boolean;
  reasonDeviceUse?: string;
  eventFrequency?: string;
  viewer?: string;
  operaType?: string;
  purchasingOperaItems?: string;
  communityAttendance?: boolean;
  hobby?: string;
  culturalInteresting?: string;
  dateInsert?: null;
  dateModify?: Date;
  notificationRecieved?: boolean;
  dateNotificationRecieved?: Date;
  dateNotificationExperied?: Date;
  notifications?: INotificationType[];
}

export interface INotificationType {
  idNotificationType?: number;
  description?: string;
  enabled?: boolean;
  idUserInfoProfile?: number;
}

export interface IUserCredentials {
  username?: string;
  password?: string;
}

export interface ILoggedUser {
  idUser?: number;
  name?: string;
  surname?: string;
  email?: string;
  phone?: number;
}

export interface IQueryForm {
  gender?: string[];
  fromAge?: string;
  toAge?: string;
  maritalStatus?: string[];
  education?: string[];
  geoLocation?: string;
  languages?: string[];
  employment?: string[];
  frequenter?: string[];
  deviceUse?: string;
  reasonDeviceUse?: string[];
  notifications?: string[];
  eventFrequency?: string[];
  viewer?: string;
  operaType?: string[];
  purchasingOperaItems?: string[];
  communityAttendance?: string;
  hobbies?: string[];
  culturalInteresting?: string[];
}

export interface IPushNotification {
  idPushNotify?: number;
  idUserProfile?: number;
  content?: string;
  checked?: boolean;
}
