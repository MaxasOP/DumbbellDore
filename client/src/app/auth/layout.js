import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/auth',
  'Sign In or Create an Account',
  'Access your DumbbellDore account to log workouts, track progress, and customize your diet and fitness goals.',
);

export default function Layout({ children }) {
  return children;
}
