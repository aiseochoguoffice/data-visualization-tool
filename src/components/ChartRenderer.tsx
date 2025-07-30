import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Doughnut, Radar, Line, Bar } from 'react-chartjs-2';
import { DataRow, ChartType, ChartData } from '../types';
import D3Charts from './D3Charts';
import GanttChart from './GanttChart';
import { downloadChartAsImage, downloadSVGAsImage, downloadGanttChartAsImage, generateFilename } from '../utils/chartDownloader';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

interface ChartRendererProps {
  data: DataRow[];
  chartType: ChartType;
  xAxis: string;
  yAxis: string;
  chartTitle: string;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({
  data,
  chartType,
  xAxis,
  yAxis,
  chartTitle
}) => {
  const generateChartData = (): ChartData => {
    if (!xAxis || !yAxis) {
      return { labels: [], datasets: [] };
    }

    const labels = data.map(row => String(row[xAxis]));
    const values = data.map(row => Number(row[yAxis]));

    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
    ];



    return {
      labels,
      datasets: [{
        label: yAxis,
        data: values,
        backgroundColor: chartType === 'doughnut' ? colors : colors[0],
        borderColor: chartType === 'doughnut' ? colors : colors[0],
        borderWidth: 1
      }]
    };
  };

  const getChartOptions = () => {
    const baseOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom' as const,
        },
        title: {
          display: true,
          text: chartTitle || `${xAxis} vs ${yAxis}`,
        },
      },
    };

    switch (chartType) {
      case 'doughnut':
        return {
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            legend: {
              position: 'bottom' as const,
              labels: {
                boxWidth: 20,
                padding: 15,
                usePointStyle: true,
              },
            },
          },
        };
      case 'radar':
        return {
          ...baseOptions,
          scales: {
            r: {
              beginAtZero: true,
            },
          },
        };
      case 'line':
      case 'bar':
        return {
          ...baseOptions,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };

      default:
        return baseOptions;
    }
  };

  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDownload = async () => {
    if (!xAxis || !yAxis) {
      alert('X축과 Y축을 먼저 선택해주세요.');
      return;
    }

    const filename = generateFilename(chartType, xAxis, yAxis);

    if (chartType === 'treemap') {
      // D3.js 차트 다운로드
      if (svgRef.current) {
        await downloadSVGAsImage(svgRef.current, filename);
      }
    } else if (chartType === 'gantt') {
      // 간트 차트 다운로드
      if (chartRef.current) {
        await downloadGanttChartAsImage(chartRef.current, filename);
      }
    } else {
      // Chart.js 차트 다운로드
      if (chartRef.current) {
        await downloadChartAsImage(chartRef.current, filename);
      }
    }
  };

  const renderChart = () => {
    const chartData = generateChartData();
    const options = getChartOptions();

    if (!xAxis || !yAxis) {
      return (
        <div className="text-center p-5">
          <p className="text-muted">X축과 Y축을 선택해주세요.</p>
        </div>
      );
    }

    switch (chartType) {
      case 'doughnut':
        return <Doughnut data={chartData as any} options={options} />;
      case 'radar':
        return <Radar data={chartData as any} options={options} />;
      case 'line':
        return <Line data={chartData as any} options={options} />;
      case 'bar':
        return <Bar data={chartData as any} options={options} />;


      case 'treemap':
        // D3.js로 구현한 차트들
        return <D3Charts data={data} chartType={chartType} xAxis={xAxis} yAxis={yAxis} svgRef={svgRef} />;
      case 'gantt':
        // 간트 차트로 구현
        return <GanttChart data={data} xAxis={xAxis} yAxis={yAxis} ref={chartRef} />;
      default:
        return <Bar data={chartData as any} options={options} />;
    }
  };

  return (
    <div className="chart-renderer-container">
      <div className="chart-container" ref={chartRef}>
        {renderChart()}
      </div>
      
      {xAxis && yAxis && (
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-secondary download-btn"
            onClick={handleDownload}
            title="차트를 PNG 이미지로 다운로드"
          >
            다운로드
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartRenderer; 