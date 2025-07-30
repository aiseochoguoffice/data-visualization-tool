import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DataRow } from '../types';

interface D3ChartsProps {
  data: DataRow[];
  chartType: 'treemap' | 'gauge';
  xAxis: string;
  yAxis: string;
  svgRef?: React.RefObject<SVGSVGElement>;
}

const D3Charts: React.FC<D3ChartsProps> = ({ data, chartType, xAxis, yAxis, svgRef }) => {
  const internalSvgRef = useRef<SVGSVGElement>(null);
  const finalSvgRef = svgRef || internalSvgRef;

  useEffect(() => {
    if (!data.length || !xAxis || !yAxis || !finalSvgRef.current) return;

    const svg = d3.select(finalSvgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    switch (chartType) {
      case 'treemap':
        renderTreemap(g, data, xAxis, yAxis, width, height);
        break;
      case 'gauge':
        renderGauge(g, data, yAxis, width, height);
        break;
    }
  }, [data, chartType, xAxis, yAxis]);

  const renderTreemap = (g: d3.Selection<SVGGElement, unknown, null, undefined>, data: DataRow[], xAxis: string, yAxis: string, width: number, height: number) => {
    const treemapData = {
      name: "root",
      children: data.map(row => ({
        name: String(row[xAxis]),
        value: Number(row[yAxis])
      }))
    };

    const treemap = d3.treemap()
      .size([width, height])
      .padding(1);

    const root = d3.hierarchy(treemapData as any)
      .sum((d: any) => d.value)
      .sort((a: any, b: any) => b.value! - a.value!);

    treemap(root as any);

    const cell = g.selectAll("g")
      .data(root.leaves())
      .enter().append("g")
      .attr("transform", (d: any) => `translate(${d.x0},${d.y0})`);

    cell.append("rect")
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
      .attr("stroke", "#fff");

    cell.append("text")
      .attr("x", 3)
      .attr("y", 15)
      .text(d => d.data.name)
      .style("font-size", "12px")
      .style("fill", "white");
  };



  const renderGauge = (g: d3.Selection<SVGGElement, unknown, null, undefined>, data: DataRow[], yAxis: string, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    const maxValue = d3.max(data, d => Number(d[yAxis])) as number;
    const currentValue = d3.mean(data, d => Number(d[yAxis])) as number;
    const percentage = (currentValue / maxValue) * 100;

    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    // 배경 원호
    g.append("path")
      .datum({ endAngle: Math.PI / 2 })
      .style("fill", "#ddd")
      .attr("d", arc as any);

    // 값 원호
    g.append("path")
      .datum({ endAngle: (-Math.PI / 2) + (Math.PI * percentage / 100) })
      .style("fill", "#4CAF50")
      .attr("d", arc as any);

    // 중앙 텍스트
    g.append("text")
      .attr("x", centerX)
      .attr("y", centerY - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .text(`${percentage.toFixed(1)}%`);

    g.append("text")
      .attr("x", centerX)
      .attr("y", centerY + 20)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text(`${currentValue.toFixed(0)} / ${maxValue.toFixed(0)}`);
  };

  return (
    <div className="d3-chart-container">
      <svg
        ref={finalSvgRef}
        width="600"
        height="400"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default D3Charts; 