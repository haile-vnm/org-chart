import styles from './org-chart.module.scss';

/* eslint-disable-next-line */
export interface OrgChartProps {}

export function OrgChart(props: OrgChartProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to OrgChart!</h1>
    </div>
  );
}

export default OrgChart;
