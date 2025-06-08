
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Dashboard from '@/components/Dashboard';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import EventManagementDashboard from '@/components/EventManagementDashboard';
import AuthPage from '@/components/AuthPage';

const Index = () => {
  // Check current route
  const showManagement = window.location.hash === '#management';
  const showAuth = window.location.hash === '#auth';
  
  if (showAuth) {
    return <AuthPage />;
  }
  
  if (showManagement) {
    return <EventManagementDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
        <Dashboard />
        <Partners />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
