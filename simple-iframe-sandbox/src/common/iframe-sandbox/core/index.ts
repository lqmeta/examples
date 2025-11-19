
import { uuidv4 } from '@/common/string/uuidv4';
import {
  SandboxTypeEnum,
  type SandboxReplyType,
  SandboxReplyCodeEnum,
} from '@/common/iframe-sandbox/utils/constant';
import {
  iframeSandboxSend,
  iframeSandboxOnMessage,
} from '@/common/iframe-sandbox/core/message-event';
import {
  formatNumber,
} from '@/common/numbers/format-number';
import {
  initIframeSandbox,
} from '@/common/iframe-sandbox/utils/init';

export type CoreExecuteResType<ResT> = {
  res: SandboxReplyType<ResT>,
  dispose: () => void;
};

export const execute = <ParamsT, ResT>({
  type,
  params,
  timeout = 5 * 1000,
}: {
  type: SandboxTypeEnum;
  params?: ParamsT,
  /**
   * 超时时间:
   *    - ms?: number
   *    - 若为 "< 0" 时，则不执行 setTimeout;
   *      - 即 不自动执行 res1.dispose() 移除监听事件
   */
  timeout?: number;
}): Promise<CoreExecuteResType<ResT>> => new Promise(async (resolve, reject) => {
    if (!window.frames?.iframeSandbox) {
      await initIframeSandbox();
    }

    /**
     * 记录是否执行过回调
     */
    let hadExecutedCallback = false;
    const callId = uuidv4();
    const startTime = performance.now();

    /**
     * "mainPage" 监听 "iframe sandbox" 广播
     */
    const res1 = iframeSandboxOnMessage<ResT>(async (res) => {
      // console.log('[mainPage OnMessage]:', res);

      if (res?.callId === callId) {
        // 单位为毫秒
        const endTime = performance.now();
        console.log(
          '[mainPage OnMessage]:',
          res,
          JSON.stringify(
            {
              type,
              params: params || {},
              callId,
              '请求耗时(s):': formatNumber((endTime - startTime) / 1000, 3),
            },
            null, 2,
          ),
        );

        hadExecutedCallback = true;
        resolve({
          res,
          dispose: res1.dispose,
        });
      }
    });

    /**
     * 向 "Sandbox" 发送消息
     */
    iframeSandboxSend({
      type,
      callId,
      params,
    });

    /**
     * 超时处理
     */
    if (timeout >= 0) {
      setTimeout(() => {
        res1.dispose();

        // 已经执行回调
        if (hadExecutedCallback) {
          return;
        }

        reject({
          res: {
            code: SandboxReplyCodeEnum.failed,
            callId,
            data: null,
            message: '执行超时',
          },
          dispose: res1.dispose,
        });
      }, timeout);
    }
  });
