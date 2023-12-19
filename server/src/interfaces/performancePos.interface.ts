export interface IPerformancePos {
    id: number;
    employeeId: number,
    orderIdPos: number;
    orderTimestampPos: Date;
    orderPricePos: number;
    orderDeliveredTimestampPos: Date,
    customerEmailPos: string;
    serviceRating: number;
    foodRating: number;
    feedback: string;
  }