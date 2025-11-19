type WorkerEventDataType = {
  type: string;
  callId: string;
  params: any;
};

function isArray(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

const handleArraySort = (res: WorkerEventDataType) => {
  if (!isArray(res.params.array)) {
    console.error(`worker | ${res.type} | 参数不正确.`, res);
    return;
  }

  const {
    array,
  } = res.params;

  // 大型数组排序逻辑
  const sortedArray = array.sort((a: number, b: number) => a - b);

  // 发送回复消息
  self?.postMessage({
    code: 0,
    callId: res.callId,
    data: {
      sortedArray,
    },
    message: 'success',
  });
};

// 监听主线程发送的消息
self.onmessage = (e: MessageEvent) => {
  const res: WorkerEventDataType = e.data;

  if (
    typeof res !== 'object'
    || typeof res.type !== 'string'
    || typeof res.params !== 'object'
  ) {
    console.error('worker | 请求参数不正确.', res);
    return;
  }
  console.log('worker | received message from main thread:', res);

  function eventHandler(res: WorkerEventDataType) {
    switch (res.type) {
      case 'arraySort':
        handleArraySort(res);
        break;
      default:
        break;
    }
  }

  try {
    eventHandler(res);
  } catch (err) {
    console.error(err);
  }
};

// 错误处理
self.onerror = (error) => {
  console.error('worker | onerror:', error);
  const errorMessage = error instanceof ErrorEvent ? error.message : String(error);
  self.postMessage(`错误: ${errorMessage}`);
};

// Worker 初始化完成
self.postMessage('web worker 已初始化完毕，等待消息...');
