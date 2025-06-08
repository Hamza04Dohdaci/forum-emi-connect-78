
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Dashboard from '@/components/Dashboard';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import EventManagementDashboard from '@/components/EventManagementDashboard';

const Index = () => {
  // For demo purposes, you can toggle between the landing page and the management dashboard
  const showManagement = window.location.hash === '#management';
  
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
