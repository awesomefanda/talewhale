import './globals.css';

export const metadata = {
  title: 'TaleWhale 🐋',
  description: 'AI-powered interactive comic books for kids',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-sky-50 min-h-screen font-sans">
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-x-hidden flex flex-col">
          <header className="p-4 bg-sky-400 text-white flex items-center justify-center gap-2">
            <span className="text-3xl">🐋</span>
            <h1 className="text-2xl font-black tracking-tight uppercase">TaleWhale</h1>
          </header>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
