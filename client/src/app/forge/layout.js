import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/forge',
  'Forge Workout Session',
  'Log your daily exercises, sets, reps, weight, and intensity using our fast mobile-friendly workout tracker.',
);

export default function Layout({ children }) {
  return children;
}
