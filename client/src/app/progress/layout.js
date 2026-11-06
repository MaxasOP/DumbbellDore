import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/progress',
  'Weekly Fitness Progress',
  'View your weekly workout completion rates, body metric logs, and top exercise categories.',
);

export default function Layout({ children }) {
  return children;
}
