import {
  useRef,
  // useState,
} from 'react';
import './app.scss';

// import type {
//   WorkerResponseType,
// } from './common/worker/type';
import {
  createWorker,
} from './common/worker/create-worker';
import { uuidv4 } from './common/string/uuidv4';

function App() {
  const messageWorkerRef = useRef<Worker | null>(null);

  const getWorker = () => {
    if (messageWorkerRef.current) {
      return messageWorkerRef.current;
    }

    const worker = createWorker();
    messageWorkerRef.current = worker;

    worker.onmessage = (e) => {
      console.log('main thread | received message from worker:', e.data);
    };

    worker.onerror = (error) => {
      console.error('main thread | onerror:', error);
    };

    return worker;
  };

  return (
    <section>
      <h1>Simple Web Worker</h1>

      <section>
        <button
          className='wm-btn'
          onClick={() => {
            const worker = getWorker();
            worker.postMessage({
              type: 'arraySort',
              callId: uuidv4(),
              params: {
                array: [99, 23, 12, 2333, 34, 1234, 123, 1623],
              }
            })
          }}
        >
          发送消息
        </button>
      </section>
    </section>
  )
}

export default App
