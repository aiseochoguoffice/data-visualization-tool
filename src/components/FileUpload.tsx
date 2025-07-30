import React, { useState, useRef } from 'react';
import { DataRow } from '../types';
import { parseExcelFile, parseCSVFile } from '../utils/dataParser';

interface FileUploadProps {
  onDataLoaded: (data: DataRow[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setIsLoading(true);
    try {
      let data: DataRow[];
      
      if (file.name.endsWith('.csv')) {
        data = await parseCSVFile(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        data = await parseExcelFile(file);
      } else {
        throw new Error('지원하지 않는 파일 형식입니다. CSV 또는 Excel 파일을 업로드해주세요.');
      }
      
      onDataLoaded(data);
    } catch (error) {
      alert(`파일 처리 중 오류가 발생했습니다: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-upload-container">
      <div
        className={`file-upload-area ${isDragging ? 'dragover' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {isLoading ? (
          <div>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">로딩 중...</span>
            </div>
            <p className="mt-3">파일을 처리하고 있습니다...</p>
          </div>
        ) : (
          <div>
            <i className="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
            <h4>파일을 업로드하세요</h4>
            <p className="text-muted">
              CSV 또는 Excel 파일을 드래그 앤 드롭하거나 클릭하여 선택하세요
            </p>
            <small className="text-muted">
              지원 형식: .csv, .xlsx, .xls
            </small>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileUpload; 