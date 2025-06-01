import * as echart from "echarts";
import { RefObject, useEffect, useRef, useState } from "react";

export const useEchart = (): [
  RefObject<HTMLDivElement> | RefObject<null>,
  echart.ECharts | undefined
] => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<echart.ECharts>();

  useEffect(() => {
    if (chartRef.current) {
      const instance = echart.init(chartRef.current);
      setChartInstance(instance);
    }
  }, []);

  return [chartRef, chartInstance];
};


// // 使用
// const MyChart = () => {
//   const [chartRef, chartInstance] = useEchart();

//   useEffect(() => {
//     if (chartInstance) {
//       // 配置图表选项
//       const options = {
//         title: {
//           text: '示例图表',
//         },
//         tooltip: {},
//         xAxis: {
//           data: ['A', 'B', 'C', 'D'],
//         },
//         yAxis: {},
//         series: [{
//           type: 'bar',
//           data: [10, 20, 30, 40],
//         }],
//       };

//       // 设置图表的配置项和数据
//       chartInstance.setOption(options);
//     }
//   }, [chartInstance]);

//   return <div ref={chartRef} style={{ width: '600px', height: '400px' }}></div>;
// };