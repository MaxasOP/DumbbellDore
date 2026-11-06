export const siteUrl = "https://dumbelldore.vercel.app";

export function publicMetadata(path, title, description) {
  const socialTitle = `${title} | DumbbellDore`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "DumbbellDore",
      url: path,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
  };
}
