import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/trainer-marketplace',
  'Trainer Marketplace',
  'Browse personal trainer profiles and fitness specialties.',
);

export default function Layout({ children }) {
  return children;
}
