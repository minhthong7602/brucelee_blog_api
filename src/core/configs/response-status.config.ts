export const RESPONSE_STATUS = {
  SUCCESSED: 'SUCCESSED',
  ERROR: 'ERROR'
};

export class ResponseModel {
  status: string;
  message: string;
  data: any;
}