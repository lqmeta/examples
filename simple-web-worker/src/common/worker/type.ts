export type WorkerEventDataType = {
  type: string;
  callId: string;
  params: any;
};

export type WorkerResponseType = {
  code: number;
  callId: string;
  data: any;
  message: string;
};
