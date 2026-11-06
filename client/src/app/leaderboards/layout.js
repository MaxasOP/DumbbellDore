import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/leaderboards',
  'Leaderboards & Rankings',
  'See how you rank against other members in workouts, streak duration, and overall fitness consistency.',
);

export default function Layout({ children }) {
  return children;
}
