import React from 'react';
import { ChartType } from '../types';

interface ChartSelectorProps {
  selectedChart: ChartType;
  onChartChange: (chartType: ChartType) => void;
  numericColumns: string[];
  categoricalColumns: string[];
  onAxisChange: (xAxis: string, yAxis: string) => void;
  chartTitle: string;
  onTitleChange: (title: string) => void;
}

const ChartSelector: React.FC<ChartSelectorProps> = ({
  selectedChart,
  onChartChange,
  numericColumns,
  categoricalColumns,
  onAxisChange,
  chartTitle,
  onTitleChange
}) => {
  const chartTypes = [
    { value: 'line', label: '선형그래프', icon: '📈' },
    { value: 'bar', label: '막대그래프', icon: '📊' },
    { value: 'doughnut', label: '도넛차트', icon: '🍩' },
    { value: 'radar', label: '레이더차트', icon: '🕸' },
    { value: 'treemap', label: '트리맵', icon: '🌳' },
    { value: 'gantt', label: '간트차트', icon: '📅' }
  ];

  const handleXAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yAxisSelect = document.getElementById('yAxis') as HTMLSelectElement;
    onAxisChange(e.target.value, yAxisSelect.value);
  };

  const handleYAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const xAxisSelect = document.getElementById('xAxis') as HTMLSelectElement;
    onAxisChange(xAxisSelect.value, e.target.value);
  };

  return (
    <div className="chart-selector-container">
      <h4>차트 설정</h4>
      
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">차트 타입</label>
          <select
            className="form-select"
            value={selectedChart}
            onChange={(e) => onChartChange(e.target.value as ChartType)}
          >
            {chartTypes.map((chart) => (
              <option key={chart.value} value={chart.value}>
                {chart.icon} {chart.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">차트 제목</label>
          <input
            type="text"
            className="form-control"
            value={chartTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="차트 제목을 입력하세요"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">X축 (카테고리)</label>
          <select
            id="xAxis"
            className="form-select"
            onChange={handleXAxisChange}
          >
            <option value="">선택하세요</option>
            {categoricalColumns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6">
          <label className="form-label">Y축 (수치)</label>
          <select
            id="yAxis"
            className="form-select"
            onChange={handleYAxisChange}
          >
            <option value="">선택하세요</option>
            {numericColumns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ChartSelector; 