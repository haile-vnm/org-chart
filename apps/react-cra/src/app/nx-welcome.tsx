import { useState } from 'react';
import { OrgChartComponent } from '../components/org-chart';
import React from 'react';

const data_ = [
  { id: 1, parentId: null, name: 'node1' },
  { id: 2, parentId: 1, name: 'node2' },
  { id: 3, parentId: 1, name: 'node3' },
  { id: 4, parentId: 1, name: 'node3' },
  { id: 5, parentId: 4, name: 'node3' },
  { id: 6, parentId: 5, name: 'node3' },
  { id: 7, parentId: 5, name: 'node3' },
];
const getChildrenIds = (item: any, data: any) => {
  const ids = [item.id];

  data?.forEach((child) => {
    if (child.parentId === item.id) {
      const childIds = getChildrenIds({ ...child }, data);

      ids.push(...childIds);
    }
  });

  return ids;
};
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export function NxWelcome({ title }: { title: string }) {
  const [data, setData] = useState(data_);
  const onExpandCollapse = React.useCallback(function hey(event, node) {
    setData((data) => {
      // dont rely on node coming from the event because it wont have updated _expand :thinking:
      const nodeFromData = data.find((d) => {
        return d.id === node.data.id;
      });

      const ids = getChildrenIds(nodeFromData, data);

      // Take out node that was click so it is still shown on graph
      ids.shift();

      return data.map((item) => {
        return {
          ...item,
          _expanded: ids.includes(item.id) ? !item._expanded : item._expanded,
        };
      });
    });
  }, []);
  return <OrgChartComponent
    data={data}
    onNodeClick={(node) => console.log(node.id)}
    onExpandCollapse={onExpandCollapse}
    setClick={(n) => console.log('setclick n', n.id)}>
  </OrgChartComponent>
}

export default NxWelcome;
