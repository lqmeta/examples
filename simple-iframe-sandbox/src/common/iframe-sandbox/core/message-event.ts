import type {
  SandboxArgsType,
  SandboxReplyType,
} from '@/common/iframe-sandbox/utils/constant';

/**
 * mainPage send to iframe sandbox
 * @param args -
 */
export const iframeSandboxSend = <ParamsT>(
  args: SandboxArgsType<ParamsT>,
) => {
  console.log('[Send to iframe sandbox]:', args);
  const iframeWindow = window.frames?.iframeSandbox;
  iframeWindow?.postMessage(args);
};

/**
 * mainPage OnMessage from iframe sandbox
 */
export const iframeSandboxOnMessage = <T>(
  callback: (args: SandboxReplyType<T>, ev: MessageEvent<any>) => void,
): {
    dispose: () => void,
  } => {
  const handleMessages = (ev: MessageEvent<SandboxReplyType<T>>) => {
    callback(ev.data, ev);
  };

  window.addEventListener('message', handleMessages);
  return {
    dispose: () => {
      window.removeEventListener('message', handleMessages);
    },
  };
};
