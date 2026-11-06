import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/ai-workout',
  'Workout Planner',
  'Generate custom, goal-oriented workout routines tailored to your target muscles, equipment, and experience.',
);

export default function Layout({ children }) {
  return children;
}
