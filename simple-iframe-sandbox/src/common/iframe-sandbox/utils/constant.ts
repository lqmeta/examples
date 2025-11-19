
export enum SandboxTypeEnum {
  /**
   * svg 转 base64
   */
  svgToDataURL = 'svgToDataURL',
};

export enum SandboxReplyCodeEnum {
  /**
   * 成功
   */
  success = 0,
  /**
   * 异常
   */
  failed = -1,
};

export type SandboxArgsType<ParamsT> = {
  /**
   * 方法名称
   */
  type: SandboxTypeEnum;
  /**
   * "iframe sandbox" 广播时需要执行的 id
   */
  callId: string;
  /**
   * 需要传入的参数
   */
  params?: ParamsT;
  /**
   * 超时时间
   */
  timeout?: number;
};

export type SandboxReplyType<ResT> = {
  code: SandboxReplyCodeEnum;
  callId: string;
  data: ResT | null;
  message: string;
  // err?: any;
};
