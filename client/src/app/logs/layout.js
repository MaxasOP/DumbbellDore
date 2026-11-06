import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/logs',
  'Workout & Meal History Logs',
  'Search, filter, and review your historical logged workouts and nutrition entries over time.',
);

export default function Layout({ children }) {
  return children;
}
