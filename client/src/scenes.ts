import plant from './assets/biogas-scene-plant.jpg';
import feed from './assets/biogas-scene-feed.jpg';
import report from './assets/biogas-scene-report.jpg';
import dispatchScene from './assets/biogas-scene-dispatch.jpg';
import office from './assets/biogas-scene-office.jpg';

export function sceneForPath(pathname: string) {
  if (pathname.startsWith('/mis-entry')) return feed;
  if (pathname.startsWith('/final-mis') || pathname.startsWith('/consolidated')) return report;
  if (pathname.startsWith('/customers')) return dispatchScene;
  if (pathname.startsWith('/admin') || pathname.startsWith('/audit')) return office;
  return plant;
}
