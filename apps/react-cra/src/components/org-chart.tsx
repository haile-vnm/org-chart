import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { OrgChart } from 'd3-org-chart';
import { NodeContent } from './node-content';

class MyOrgChart extends OrgChart {
  constructor(onExpandCollapse) {
    super();

    this.onExpandCollapse = onExpandCollapse;
  }

  onButtonClick(event, node) {
    this.onExpandCollapse(event, node);
  }
}

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  const [chart, _] = useState(new MyOrgChart(() => {console.log('dddddddddddddddddddddddddddddddddddd', Date.now())}));
  const [, setUpdate] = useState(false);
  const [init, setInit] = useState(false);

  const cb = React.useCallback((d) => onClick(d));

  const onClick = React.useCallback(() => {
    console.log('Used react event system');
  });

  const renderChart = React.useCallback(() => {
    console.log('render chart', props.data);
    chart
      .container(d3Container.current)
      .data(props.data)
      .nodeContent((node) => {
        return `<div id=${node.id}></div>`;
      })
      .nodeWidth((d) => 400)
      .nodeHeight((d) => 120)
      .render();

    setUpdate((t) => !t);
  }, [chart, d3Container.current, props.data, init, props.onExpandCollapse]);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (d3Container.current && chart.firstDraw()) {
      renderChart();

      setInit(true);
    }

    // or you can do it here
    // if (init && props.data) {
    //   console.log('data changed');
    //   // chart.container(d3Container.current).data(props.data).updateNodesState();
    //   renderChart();
    // }
  }, [d3Container.current, chart.firstDraw()]);

  /**
   * When data changes rerender the chart with new data.
   * Checking for init makes sure we have initialized our content already
   *
   * The down side here is that you card components will not be able to hold there state.
   * Once the graph is rerendered, all state from that card components gets
   * reset back to there initial value
   *
   * I think the issue here is that when we rerender the chart, all the element the portal
   * is connecting to get recreated. thus when react tries to add the portal back it
   * creates a brand new version of the component
   *
   * if you using something like redux, mobx, or React Context then you can
   * probably get around this but havent figured out anything for this for just react yet
   */
  useLayoutEffect(() => {
    if (init && props.data) {
      console.log('data changed', props.data);
      // Maybe one of these child functions?
      renderChart();
    }
  }, [props.data, init, props.onExpandCollapse]);

  useEffect(() => {
    chart.onExpandCollapse = props.onExpandCollapse;
  }, [props.onExpandCollapse]);

  !chart.firstDraw() && console.log('rendering re333333333333333333333333act nodes', chart);

  return (
    <div>
      <div ref={d3Container} />
      {!chart.firstDraw() &&
        props.data.map((d) => {
          const element = document.getElementById(d.id);
          console.log('rerender elementttt', element);


          if (!element) return null;

          return createPortal(<NodeContent node={d} onClick={cb} />, element);
        })}
    </div>
  );
};
