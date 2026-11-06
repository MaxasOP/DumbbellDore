import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/challenges',
  'Fitness Challenges',
  'Join exciting fitness challenges, push your limits, and earn rewards for hitting training milestones.',
);

export default function Layout({ children }) {
  return children;
}
