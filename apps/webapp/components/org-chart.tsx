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
        .nodeWidth(() => 400)
        .nodeHeight(() => 120)
        .nodeContent((n: any) => {
          return `<div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              Shoes!
              <div class="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <div class="badge badge-outline">Fashion</div>
              <div class="badge badge-outline">Products</div>
            </div>
          </div>
        </div>`
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
