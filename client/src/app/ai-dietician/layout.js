import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/ai-dietician',
  'Meal Planner',
  'Build a meal plan around your calorie, protein, and dietary targets.',
);

export default function Layout({ children }) {
  return children;
}
