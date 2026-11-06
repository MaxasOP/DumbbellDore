import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/reels',
  'Progress Reels',
  'Post workout photos and videos to the community feed.',
);

export default function Layout({ children }) {
  return children;
}
