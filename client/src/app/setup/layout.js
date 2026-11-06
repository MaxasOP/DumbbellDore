import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/setup',
  'Personalize Your Goals',
  'Set your fitness goals, log your body metrics, and personalize your daily calorie and protein targets.',
);

export default function Layout({ children }) {
  return children;
}
