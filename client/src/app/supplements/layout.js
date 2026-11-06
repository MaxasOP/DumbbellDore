import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/supplements',
  'Supplement Store',
  'Compare fitness supplements by category, goal, serving size, and listed price.',
);

export default function Layout({ children }) {
  return children;
}
