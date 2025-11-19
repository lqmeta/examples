/**
 * 动态创建并插入一个 <iframe> 元素
 *
 * eg:
    <iframe
      name='iframeSandbox'
      src='/iframe-sandbox/index.html'
      sandbox='allow-scripts allow-same-origin'
    ></iframe>
 *
 */
export const initIframeSandbox = async (): Promise<Window | null> => {
  return new Promise(async (resolve) => {
    if (window.frames?.iframeSandbox) {
      resolve(window.frames?.iframeSandbox);
      return;
    }

    // 创建 iframe 元素
    const iframe = document.createElement('iframe');
    // 设置 iframe 的属性
    iframe.name = 'iframeSandbox';
    iframe.src = '/iframe-sandbox/index.html';
    iframe.sandbox = 'allow-scripts allow-same-origin';
    // 设置 iframe 的样式
    Object.assign(iframe.style, {
      width: '150px',
      height: '150px',
      border: 'none',
      position: 'fixed',
      top: '-1000px',
      left: '-1000px',
    });

    // 加载完成回调
    iframe.onload = () => {
      console.log('Iframe 加载完成');
      resolve(iframe.contentWindow);
    };

    document.body.appendChild(iframe);
  });
};
