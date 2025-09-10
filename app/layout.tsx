import "./../styles/globals.css";

export const metadata = {
  metadataBase: new URL(process.env.url || "http://localhost:3000"),
  title: {
    default: "Thiệp cưới Kha & Hạ",
    template: "%s | Thiệp cưới",
  },
  description: "Trân trọng kính mời bạn đến chung vui cùng gia đình chúng tôi.",
  openGraph: {
    type: "website",
    url: process.env.url,
    siteName: "Thiệp cưới",
    title: "Thiệp mời cưới Kha & Hạ",
    description: "Trân trọng kính mời...",
    images: [
      {
        url: "/images/5.jpg",
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
    images: ["/images/5.jpg"],
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
