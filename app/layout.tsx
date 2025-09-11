import "./../styles/globals.css";

function getBaseUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";
  return raw.startsWith("http") ? raw : `https://${raw}`;
}

const baseUrl = getBaseUrl();

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Thiệp cưới Kha & Hạ",
    template: "%s | Thiệp cưới",
  },
  description: "Trân trọng kính mời bạn đến chung vui cùng gia đình chúng tôi.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Thiệp cưới",
    title: "Thiệp mời cưới Kha & Hạ",
    description: "Trân trọng kính mời...",
    images: [
      {
        url: "/images/og.JPG",
        width: 1200,
        height: 630,
        alt: "Thiệp cưới Kha & Hạ",
      },
    ],
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiệp cưới Kha & Hạ",
    description: "Trân trọng kính mời...",
    images: ["/images/og.JPG"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
