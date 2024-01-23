import styles from './page.module.scss';
import { OrgChart } from '@orgchart/org-chart';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <OrgChart></OrgChart>
    </div>
  );
}
