import { publicMetadata } from '../seo';

export const metadata = publicMetadata(
  '/form-analysis',
  'Video Form Analysis',
  'Upload a working set to review visible movement range and repetition consistency.',
);

export default function Layout({ children }) {
  return children;
}
