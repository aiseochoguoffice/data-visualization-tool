import React, { useState, useRef } from 'react';
import { DataRow } from '../types';
import { parseCSVFile, parseExcelFile } from '../utils/dataParser';

interface DragDropZoneProps {
  onDataLoaded: (data: DataRow[]) => void;
  children: React.ReactNode;
}

const DragDropZone: React.FC<DragDropZoneProps> = ({ onDataLoaded, children }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      try {
        let data: DataRow[];
        if (file.name.endsWith('.csv')) {
          data = await parseCSVFile(file);
        } else {
          data = await parseExcelFile(file);
        }
        onDataLoaded(data);
      } catch (error) {
        console.error('파일 파싱 오류:', error);
        alert('파일을 읽는 중 오류가 발생했습니다.');
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      try {
        let data: DataRow[];
        if (file.name.endsWith('.csv')) {
          data = await parseCSVFile(file);
        } else {
          data = await parseExcelFile(file);
        }
        onDataLoaded(data);
      } catch (error) {
        console.error('파일 파싱 오류:', error);
        alert('파일을 읽는 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div
      className={`drag-drop-zone ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default DragDropZone; 