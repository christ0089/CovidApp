export interface iresult {
  data: any[];
  dateRevised: Date;
  result: number;
  platform: string[];
}


export enum Result_Qualification {
    NOT_POTENIAL = 0,
    POTENTIAL = 10,
    SICK = 15
}