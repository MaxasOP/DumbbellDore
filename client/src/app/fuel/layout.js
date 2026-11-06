import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/fuel',
  'Fuel Your Day - Nutrition Log',
  'Track your daily food intake, search presets for meals, and manage your protein, fat, and carbohydrate macronutrient targets.',
);

export default function Layout({ children }) {
  return children;
}
