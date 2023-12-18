export interface IPerformance {
  id: number;
  orderIdPos: number;
  orderTimestampPos: Date;
  orderPricePos: number;
  customerEmailPos: string;
  serviceRating: number;
  foodRating: number;
  feedback: string;
  orderIdKds: number;
  orderPreparationTimeKds: number;
  numberOfOrdersKds: number;
}