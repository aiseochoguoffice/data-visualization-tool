import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { DataRow } from '../types';

export const parseExcelFile = (file: File): Promise<DataRow[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        resolve(jsonData as DataRow[]);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsArrayBuffer(file);
  });
};

export const parseCSVFile = (file: File): Promise<DataRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results: any) => {
        resolve(results.data as DataRow[]);
      },
      error: (error: any) => {
        reject(error);
      }
    });
  });
};

export const getNumericColumns = (data: DataRow[]): string[] => {
  if (data.length === 0) return [];
  
  const columns = Object.keys(data[0]);
  return columns.filter(column => {
    return data.some(row => {
      const value = row[column];
      return typeof value === 'number' || !isNaN(Number(value));
    });
  });
};

export const getCategoricalColumns = (data: DataRow[]): string[] => {
  if (data.length === 0) return [];
  
  const columns = Object.keys(data[0]);
  return columns.filter(column => {
    return data.some(row => {
      const value = row[column];
      return typeof value === 'string' && isNaN(Number(value));
    });
  });
}; 