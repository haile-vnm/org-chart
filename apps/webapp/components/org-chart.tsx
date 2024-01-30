/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OrgChartComponent = (props: { setClick: (node: any) => void; onNodeClick: (node: any) => void; data: any}) => {
  const d3Container = useRef(null);
  let chart: any = null;

  function addNode(node: any) {
    chart.addNode(node);
  }

  props.setClick(addNode);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth(() => 200)
        .nodeHeight(() => 120)
        .nodeContent((n: any) => {
          return `<div className='flex w-100 h-100'>{'xxxxx${n.data.id}}'}</div>`
        })
        .onNodeClick((d: any) => {
          console.log(d, 'Id of clicked node ');
          props.onNodeClick(d);
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
