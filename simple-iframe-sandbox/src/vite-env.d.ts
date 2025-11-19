/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface Window {
  /**
   * iframe name
   *  - window.frames?.iframeSandbox
   *  - iframe 沙箱环境
   */
  iframeSandbox: Window | undefined;
}
