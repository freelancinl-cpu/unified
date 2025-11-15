
export enum ShowroomID {
  A = 'Branch A',
  B = 'Branch B',
  C = 'Branch C',
  D = 'Branch D',
}

export interface Customer {
  CNIC: string;
  Mobile_Number: string;
  Full_Name: string;
  Address: string;
}

export interface SalesTransaction {
  Transaction_ID: string;
  Customer_CNIC: string;
  Showroom_ID: ShowroomID;
  Purchase_Date: Date;
  Bike_Model: string;
  Bike_Engine_No: string;
  Bike_Chassis_No: string;
}
