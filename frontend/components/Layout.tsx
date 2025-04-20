import Head from 'next/head';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather application using OpenWeatherMap API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-base-100">
        {children}
      </main>
      
      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <div>
          <p>© {new Date().getFullYear()} - Weather App powered by OpenWeatherMap</p>
        </div>
      </footer>
    </div>
  );
}