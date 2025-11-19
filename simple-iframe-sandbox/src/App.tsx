import {
  useState,
  // useEffect,
} from 'react';
import './app.scss';

import {
  handleSvgToDataURL,
} from './common/iframe-sandbox/index';

const MOCK_SVG_STRING = "<svg id=\"svgGraph_light_56763490547596\" width=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 546.3333358764648 450\" style=\"max-width: 546.3333358764648px;\" role=\"graphics-document document\" aria-roledescription=\"pie\"><style>\nforeignObject { overflow: unset !important; }\n#svgGraph_light_56763490547596{font-family:\"trebuchet ms\",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#svgGraph_light_56763490547596 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#svgGraph_light_56763490547596 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#svgGraph_light_56763490547596 .error-icon{fill:#552222;}#svgGraph_light_56763490547596 .error-text{fill:#552222;stroke:#552222;}#svgGraph_light_56763490547596 .edge-thickness-normal{stroke-width:1px;}#svgGraph_light_56763490547596 .edge-thickness-thick{stroke-width:3.5px;}#svgGraph_light_56763490547596 .edge-pattern-solid{stroke-dasharray:0;}#svgGraph_light_56763490547596 .edge-thickness-invisible{stroke-width:0;fill:none;}#svgGraph_light_56763490547596 .edge-pattern-dashed{stroke-dasharray:3;}#svgGraph_light_56763490547596 .edge-pattern-dotted{stroke-dasharray:2;}#svgGraph_light_56763490547596 .marker{fill:#333333;stroke:#333333;}#svgGraph_light_56763490547596 .marker.cross{stroke:#333333;}#svgGraph_light_56763490547596 svg{font-family:\"trebuchet ms\",verdana,arial,sans-serif;font-size:16px;}#svgGraph_light_56763490547596 p{margin:0;}#svgGraph_light_56763490547596 .pieCircle{stroke:black;stroke-width:2px;opacity:0.7;}#svgGraph_light_56763490547596 .pieOuterCircle{stroke:black;stroke-width:2px;fill:none;}#svgGraph_light_56763490547596 .pieTitleText{text-anchor:middle;font-size:25px;fill:black;font-family:\"trebuchet ms\",verdana,arial,sans-serif;}#svgGraph_light_56763490547596 .slice{font-family:\"trebuchet ms\",verdana,arial,sans-serif;fill:#333;font-size:17px;}#svgGraph_light_56763490547596 .legend text{fill:black;font-family:\"trebuchet ms\",verdana,arial,sans-serif;font-size:17px;}#svgGraph_light_56763490547596 :root{--mermaid-font-family:\"trebuchet ms\",verdana,arial,sans-serif;}</style><g></g><g transform=\"translate(225,225)\"><circle cx=\"0\" cy=\"0\" r=\"186\" class=\"pieOuterCircle\"></circle><path d=\"M0,-185A185,185,0,0,1,57.168,175.945L0,0Z\" fill=\"#ECECFF\" class=\"pieCircle\"></path><path d=\"M57.168,175.945A185,185,0,0,1,-175.945,-57.168L0,0Z\" fill=\"#ffffde\" class=\"pieCircle\"></path><path d=\"M-175.945,-57.168A185,185,0,0,1,0,-185L0,0Z\" fill=\"hsl(80, 100%, 56.2745098039%)\" class=\"pieCircle\"></path><text transform=\"translate(137.04175725757537,-21.705282024332003)\" class=\"slice\" style=\"text-anchor: middle;\">45%</text><text transform=\"translate(-98.11106588963347,98.11106588963348)\" class=\"slice\" style=\"text-anchor: middle;\">35%</text><text transform=\"translate(-81.55520375558066,-112.25110796952394)\" class=\"slice\" style=\"text-anchor: middle;\">20%</text><text x=\"0\" y=\"-200\" class=\"pieTitleText\">饼图示例</text><g class=\"legend\" transform=\"translate(216,-33)\"><rect width=\"18\" height=\"18\" style=\"fill: rgb(236, 236, 255); stroke: rgb(236, 236, 255);\"></rect><text x=\"22\" y=\"14\">苹果</text></g><g class=\"legend\" transform=\"translate(216,-11)\"><rect width=\"18\" height=\"18\" style=\"fill: rgb(181, 255, 32); stroke: rgb(181, 255, 32);\"></rect><text x=\"22\" y=\"14\">香蕉</text></g><g class=\"legend\" transform=\"translate(216,11)\"><rect width=\"18\" height=\"18\" style=\"fill: rgb(255, 255, 222); stroke: rgb(255, 255, 222);\"></rect><text x=\"22\" y=\"14\">橙子</text></g></g></svg>";

function App() {
  const [base64Data, setBase64Data] = useState('');

  return (
    <div>
      <h1>Simple Iframe Sandbox</h1>

      <section>
        <button
          className='wm-btn'
          onClick={async () => {
            const { res } = await handleSvgToDataURL({
              svgString: MOCK_SVG_STRING,
            });
            if (res?.data) {
              setBase64Data(res?.data);
            }
          }}
        >
          发送消息
        </button>
      </section>

      <section>
        {
          base64Data ? (
            <img alt='svg 转 base64' src={base64Data} />
          ) : null
        }
      </section>
    </div>
  )
}

export default App
