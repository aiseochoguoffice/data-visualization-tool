import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export const downloadChartAsImage = async (
  chartElement: HTMLElement,
  filename: string = 'chart.png'
) => {
  try {
    const canvas = await html2canvas(chartElement, {
      backgroundColor: '#ffffff',
      scale: 2, // 고해상도
      useCORS: true,
      allowTaint: true
    });

    canvas.toBlob((blob: any) => {
      if (blob) {
        saveAs(blob, filename);
      }
    }, 'image/png');
  } catch (error) {
    console.error('차트 다운로드 중 오류:', error);
    alert('차트 다운로드에 실패했습니다.');
  }
};

export const downloadSVGAsImage = async (
  svgElement: SVGSVGElement,
  filename: string = 'chart.png'
) => {
  try {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob: any) => {
          if (blob) {
            saveAs(blob, filename);
          }
        }, 'image/png');
      }
      
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  } catch (error) {
    console.error('SVG 다운로드 중 오류:', error);
    alert('차트 다운로드에 실패했습니다.');
  }
};

export const downloadGanttChartAsImage = async (
  ganttElement: HTMLElement,
  filename: string = 'gantt-chart.png'
) => {
  try {
    // 다운로드 모드 클래스 추가
    ganttElement.classList.add('download-mode');
    
    // 잠시 대기하여 DOM 업데이트 완료
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const canvas = await html2canvas(ganttElement, {
      backgroundColor: '#ffffff',
      scale: 1, // 간트차트는 너무 크므로 1배 스케일
      useCORS: true,
      allowTaint: true,
      width: ganttElement.scrollWidth,
      height: ganttElement.scrollHeight,
      scrollX: 0,
      scrollY: 0
    });

    // 다운로드 모드 클래스 제거
    ganttElement.classList.remove('download-mode');

    canvas.toBlob((blob: any) => {
      if (blob) {
        saveAs(blob, filename);
      }
    }, 'image/png');
  } catch (error) {
    console.error('간트차트 다운로드 중 오류:', error);
    alert('간트차트 다운로드에 실패했습니다.');
  }
};

export const generateFilename = (chartType: string, xAxis: string, yAxis: string): string => {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  return `${chartType}_${xAxis}_vs_${yAxis}_${timestamp}.png`;
}; 