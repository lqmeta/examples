import workerUrl from './tools.worker?url';

/**
 * 创建一个新的 Web Worker 实例
 * @returns 返回创建的 Worker 对象
 */
export const createWorker = () => {
  const worker = new Worker(workerUrl, { type: 'classic' });
  return worker;
};
