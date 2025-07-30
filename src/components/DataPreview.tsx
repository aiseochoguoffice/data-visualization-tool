import React from 'react';
import { DataRow } from '../types';

interface DataPreviewProps {
  data: DataRow[];
}

const DataPreview: React.FC<DataPreviewProps> = ({ data }) => {
  if (data.length === 0) return null;

  const columns = Object.keys(data[0]);
  const previewData = data.slice(0, 10); // 처음 10행만 표시

  return (
    <div className="data-preview-container">
      <h4>데이터 미리보기</h4>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-muted">
        총 {data.length}행 중 처음 10행을 표시합니다.
      </p>
    </div>
  );
};

export default DataPreview; 