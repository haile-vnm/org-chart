'use client';
import { OrgChartComponent } from '../components/org-chart';
import styles from './page.module.scss';
import { OrgChart } from '@orgchart/org-chart';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  const data = [
    { id: 1, parentId: null, name: 'node1' },
    { id: 2, parentId: 1, name: 'node2' },
    { id: 3, parentId: 1, name: 'node3' },
    { id: 4, parentId: 1, name: 'node3' },
    { id: 5, parentId: 4, name: 'node3' },
    { id: 6, parentId: 5, name: 'node3' },
    { id: 7, parentId: 5, name: 'node3' },
  ];
  return (
    <div className={styles.page}>
      {/* <OrgChart></OrgChart> */}
      <OrgChartComponent
        data={data}
        onNodeClick={(node) => console.log(node.id)}
        setClick={(n) => console.log('setclick n', n.id)}>
      </OrgChartComponent>
    </div>
  );
}
