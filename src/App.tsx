import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FileUpload from './components/FileUpload';
import DataPreview from './components/DataPreview';
import ChartSelector from './components/ChartSelector';
import ChartRenderer from './components/ChartRenderer';
import DragDropZone from './components/DragDropZone';
import { DataRow, ChartType } from './types';
import { getNumericColumns, getCategoricalColumns } from './utils/dataParser';

function App() {
  const [data, setData] = useState<DataRow[]>([]);
  const [selectedChart, setSelectedChart] = useState<ChartType>('line');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const [chartTitle, setChartTitle] = useState<string>('');

  const handleDataLoaded = (newData: DataRow[]) => {
    setData(newData);
    // 기본 축 설정
    const numericCols = getNumericColumns(newData);
    const categoricalCols = getCategoricalColumns(newData);
    
    if (categoricalCols.length > 0) setXAxis(categoricalCols[0]);
    if (numericCols.length > 0) setYAxis(numericCols[0]);
  };

  const handleChartChange = (chartType: ChartType) => {
    setSelectedChart(chartType);
  };

  const handleAxisChange = (newXAxis: string, newYAxis: string) => {
    setXAxis(newXAxis);
    setYAxis(newYAxis);
  };

  const numericColumns = getNumericColumns(data);
  const categoricalColumns = getCategoricalColumns(data);

  return (
    <div className="App">
      <DragDropZone onDataLoaded={handleDataLoaded}>
        <div className="container">
          <header className="text-center my-5">
            <h1 className="display-4">📊 데이터 시각화 도구</h1>
            <p className="lead">엑셀/CSV 파일을 업로드하고 다양한 차트로 시각화하세요</p>
          </header>

          {data.length === 0 ? (
            <FileUpload onDataLoaded={handleDataLoaded} />
          ) : (
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <ChartSelector
                      selectedChart={selectedChart}
                      onChartChange={handleChartChange}
                      numericColumns={numericColumns}
                      categoricalColumns={categoricalColumns}
                      onAxisChange={handleAxisChange}
                      chartTitle={chartTitle}
                      onTitleChange={setChartTitle}
                    />
                    
                    <div className="mt-4">
                      <button
                        className="btn btn-outline-secondary btn-lg w-100"
                        onClick={() => setData([])}
                      >
                        새 파일 업로드
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-8">
                <ChartRenderer
                  data={data}
                  chartType={selectedChart}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  chartTitle={chartTitle}
                />
                
                <div className="mt-4">
                  <DataPreview data={data} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 푸터 */}
        <footer className="text-center py-4 mt-5">
          <div className="container">
            <p className="text-muted mb-0">
              제작 및 이용문의 : 서초구청 스마트도시과 (02-2155-6089)
            </p>
          </div>
        </footer>
      </DragDropZone>
    </div>
  );
}

export default App; 