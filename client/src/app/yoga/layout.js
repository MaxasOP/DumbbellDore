import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/yoga',
  'Yoga',
  'Explore yoga routines by difficulty and build a regular practice.',
);

export default function Layout({ children }) {
  return children;
}
