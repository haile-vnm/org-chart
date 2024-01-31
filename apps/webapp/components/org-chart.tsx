/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';
import { createRoot } from 'react-dom/client';
import { NodeContent } from './node-content';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OrgChartComponent = (props: { setClick: (node: any) => void; onNodeClick: (node: any) => void; data: any}) => {
  const d3Container = useRef(null);
  let chart: OrgChart<{id: string}>;

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
        .nodeWidth(() => 400)
        .nodeHeight(() => 170)
        .nodeContent(n => {
          return `<div id="${n.id}"></div>`
        })
        .nodeUpdate(n => {
          const nodeElement = document.getElementById(n.id!);
          if (!nodeElement) {
            return null;
          }

          return createRoot(nodeElement).render(<NodeContent node={n}></NodeContent>)
        })
        .onNodeClick((...args: any) => {
          console.log(args, 'Id of clicked node ');
          props.onNodeClick(args[0]);
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <button className="btn btn-primary">Button</button>
      <div ref={d3Container} />
    </div>
  );
};
