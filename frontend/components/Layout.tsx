import React, { ReactNode } from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Get real-time weather information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-base-100">
        <main>{children}</main>
        <footer className="footer footer-center p-4 bg-base-200 text-base-content">
          <div>
            <p>© {new Date().getFullYear()} - Weather App powered by OpenWeatherMap</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
