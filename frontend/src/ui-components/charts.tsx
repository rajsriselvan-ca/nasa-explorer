import * as d3 from 'd3';
import { useEffect } from 'react';
import { NeoData } from '../types/neoData_types';
 
  export const BarChart = ({ data }: { data: NeoData[] | null }) => {
    useEffect(() => {
      if (!data) return;
  
      d3.select('#bar-chart').selectAll('*').remove();
  
      const svg = d3.select('#bar-chart')
        .append('svg')
        .attr('width', 300)
        .attr('height', 200);
  
      const sizes = data.map((d) => d.estimated_diameter.meters.estimated_diameter_max);
      const x = d3.scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, 300])
        .padding(0.1);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(sizes) || 0])
        .range([200, 0]);
  
      svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.name) || 0)
        .attr('y', (d) => y(d.estimated_diameter.meters.estimated_diameter_max))
        .attr('width', x.bandwidth())
        .attr('height', (d) => 200 - y(d.estimated_diameter.meters.estimated_diameter_max))
        .attr('fill', 'steelblue');
    }, [data]);
  
    return <div id="bar-chart"></div>;
  };
  
  // Scatter Chart
  export const ScatterChart = ({ data }: { data: NeoData[] | null }) => {
    useEffect(() => {
      if (!data) return;
  
      d3.select('#scatter-chart').selectAll('*').remove();
  
      const svg = d3.select('#scatter-chart')
        .append('svg')
        .attr('width', 300)
        .attr('height', 200);
  
      const x = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => parseFloat(d.close_approach_data[0].relative_velocity.kilometers_per_second)) || 0])
        .range([0, 300]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => parseFloat(d.close_approach_data[0].miss_distance.kilometers)) || 0])
        .range([200, 0]);
  
      svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d) => x(parseFloat(d.close_approach_data[0].relative_velocity.kilometers_per_second)))
        .attr('cy', (d) => y(parseFloat(d.close_approach_data[0].miss_distance.kilometers)))
        .attr('r', 5)
        .attr('fill', 'orange');
    }, [data]);
  
    return <div id="scatter-chart"></div>;
  };
  
  // Line Chart
  export const LineChart = ({ data }: { data: NeoData[] | null }) => {
    useEffect(() => {
      if (!data) return;
  
      d3.select('#line-chart').selectAll('*').remove();
  
      const svg = d3.select('#line-chart')
        .append('svg')
        .attr('width', 300)
        .attr('height', 200);
  
      const dates = data.map((d) => new Date(d.close_approach_data[0].close_approach_date));
      const sizes = data.map((d) => d.estimated_diameter.meters.estimated_diameter_max);
  
      const x = d3.scaleTime()
        .domain([d3.min(dates) || new Date(), d3.max(dates) || new Date()])
        .range([0, 300]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(sizes) || 0])
        .range([200, 0]);
  
      const line = d3.line<NeoData>()
        .x((d) => x(new Date(d.close_approach_data[0].close_approach_date)))
        .y((d) => y(d.estimated_diameter.meters.estimated_diameter_max));
  
      svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke-width', 2);
    }, [data]);
  
    return <div id="line-chart"></div>;
  };
  
  // Doughnut Chart
  export const DoughnutChart = ({ data }: { data: NeoData[] | null }) => {
    useEffect(() => {
      if (!data) return;
  
      d3.select('#doughnut-chart').selectAll('*').remove();
  
      const svg = d3.select('#doughnut-chart')
        .append('svg')
        .attr('width', 300)
        .attr('height', 200);
  
      const hazardousCount = data.filter((d) => d.is_potentially_hazardous_asteroid).length;
      const nonHazardousCount = data.length - hazardousCount;
  
      const pie = d3.pie<number>().value((d) => d);
      const arcs = pie([hazardousCount, nonHazardousCount]);
  
      const arcGenerator = d3.arc<d3.PieArcDatum<number>>()
        .innerRadius(50)
        .outerRadius(100);
  
      svg.selectAll('path')
        .data(arcs)
        .enter()
        .append('path')
        .attr('d', (d) => arcGenerator(d) || '') 
        .attr('fill', (d, i) => (i === 0 ? 'red' : '#28282B'))
        .attr('transform', 'translate(150, 100)');
    }, [data]);
  
    return <div id="doughnut-chart"></div>;
  };
  
  // Radar Chart
  export const RadarChart = ({ data }: { data: NeoData[] | null }) => {
    useEffect(() => {
      if (!data) return;
  
      d3.select('#radar-chart').selectAll('*').remove();
  
      const svg = d3.select('#radar-chart')
        .append('svg')
        .attr('width', 300)
        .attr('height', 200);
  
      const attributes = [
        { name: 'Size', value: data[0].estimated_diameter.meters.estimated_diameter_max },
        { name: 'Velocity', value: parseFloat(data[0].close_approach_data[0].relative_velocity.kilometers_per_second) },
        { name: 'Miss Distance', value: parseFloat(data[0].close_approach_data[0].miss_distance.kilometers) },
      ];
  
      const maxValues = {
        Size: d3.max(data, (d) => d.estimated_diameter.meters.estimated_diameter_max) || 0,
        Velocity: d3.max(data, (d) => parseFloat(d.close_approach_data[0].relative_velocity.kilometers_per_second)) || 0,
        MissDistance: d3.max(data, (d) => parseFloat(d.close_approach_data[0].miss_distance.kilometers)) || 0,
      };
  
      const radarScale = d3.scaleLinear()
        .domain([0, d3.max(Object.values(maxValues)) || 0])
        .range([0, 100]);
  
      const lineGenerator = d3.lineRadial<{ name: string; value: number }>()
        .angle((d, i) => (i * 2 * Math.PI) / attributes.length)
        .radius((d) => radarScale(d.value));
  
      svg.append('path')
        .datum(attributes)
        .attr('d', lineGenerator)
        .attr('fill', 'orange')
        .attr('fill-opacity', 0.5)
        .attr('stroke', 'black')
        .attr('transform', 'translate(150, 100)');
    }, [data]);
  
    return <div id="radar-chart"></div>;
  };
  
  // Heatmap
  export const Heatmap = ({ data }: { data: NeoData[] | null }) => {
    useEffect(() => {
      if (!data) return;
  
      d3.select('#heatmap').selectAll('*').remove();
  
      const svg = d3.select('#heatmap')
        .append('svg')
        .attr('width', 300)
        .attr('height', 200);
  
      const dates = data.map((d) => new Date(d.close_approach_data[0].close_approach_date));
      const velocities = data.map((d) => parseFloat(d.close_approach_data[0].relative_velocity.kilometers_per_second));
  
      const x = d3.scaleTime()
        .domain([d3.min(dates) || new Date(), d3.max(dates) || new Date()])
        .range([0, 300]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(velocities) || 0])
        .range([200, 0]);
  
      const colorScale = d3.scaleSequential(d3.interpolatePlasma)
        .domain([0, d3.max(velocities) || 0]);
  
      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => x(new Date(d.close_approach_data[0].close_approach_date)))
        .attr('y', (d) => y(parseFloat(d.close_approach_data[0].relative_velocity.kilometers_per_second)))
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', (d) => colorScale(parseFloat(d.close_approach_data[0].relative_velocity.kilometers_per_second)));
    }, [data]);
  
    return <div id="heatmap"></div>;
  };
  