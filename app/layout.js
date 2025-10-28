import "./globals.css";
import ClientProviders from "./ClientProviders";

export const metadata = { title: "Advanced Todo App" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
