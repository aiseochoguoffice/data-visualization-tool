import React, { forwardRef } from 'react';
import { DataRow } from '../types';

interface GanttChartProps {
  data: DataRow[];
  xAxis: string;
  yAxis: string;
}

interface GanttData {
  taskName: string;
  startMonth: number;
  endMonth: number;
  group: string;
}

const GanttChart = forwardRef<HTMLDivElement, GanttChartProps>(({ data, xAxis, yAxis }, ref) => {
  // 간트 차트 데이터 변환
  const ganttData: GanttData[] = data.map(row => ({
    taskName: String(row['공정명'] || ''),
    startMonth: Number(row['시작월'] || 1),
    endMonth: Number(row['종료월'] || 1),
    group: String(row['공정그룹'] || 'A')
  }));

  // 월별 레이블 생성
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const monthLabels = months.map(month => `${month}월`);

  // 공정그룹에 따른 색상 결정 (빨주노초파남보)
  const getGroupColor = (group: string) => {
    switch (group) {
      case 'A': return '#ff6b6b'; // 빨간색
      case 'B': return '#ff8c42'; // 주황색
      case 'C': return '#ffd93d'; // 노란색
      case 'D': return '#6bcf7f'; // 초록색
      case 'E': return '#4d96ff'; // 파란색
      case 'F': return '#9b59b6'; // 남색
      case 'G': return '#e91e63'; // 보라색
      default: return '#ddd';
    }
  };

  return (
    <div className="gantt-chart-container" ref={ref}>
      <div className="gantt-chart">
        <div className="gantt-header">
          <div className="gantt-task-header">공정명</div>
          <div className="gantt-timeline-header">
            {monthLabels.map((month, index) => (
              <div key={index} className="gantt-month-header">
                {month}
              </div>
            ))}
          </div>
        </div>
        
        <div className="gantt-body">
          {ganttData.map((task, taskIndex) => (
            <div 
              key={taskIndex} 
              className="gantt-row"
            >
              <div className="gantt-task-name">{task.taskName}</div>
              
              <div className="gantt-timeline">
                {months.map((month, monthIndex) => {
                  const isInRange = month >= task.startMonth && month <= task.endMonth;
                  const isStart = month === task.startMonth;
                  const isEnd = month === task.endMonth;
                  
                  return (
                    <div key={monthIndex} className="gantt-month-cell">
                      {isInRange && (
                        <div 
                          className={`gantt-bar ${isStart ? 'gantt-bar-start' : ''} ${isEnd ? 'gantt-bar-end' : ''}`}
                          style={{ 
                            backgroundColor: getGroupColor(task.group),
                            width: '100%',
                            height: '20px',
                            borderRadius: isStart ? '10px 0 0 10px' : isEnd ? '0 10px 10px 0' : '0'
                          }}
                          title={`${task.taskName}: ${task.startMonth}월 ~ ${task.endMonth}월 (그룹: ${task.group})`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              

            </div>
          ))}
        </div>
      </div>
      

    </div>
  );
});

export default GanttChart; 