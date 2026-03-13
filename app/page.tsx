'use client';

import type { ReactNode } from 'react';
import Layout from './Layout';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import Gallery from './Gallery';
import Contact from './Contact';

const images = {
  hero: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxzZXJ2aWNlc3xlbnwwfDB8fHwxNzczNDI2Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  about: 'https://images.unsplash.com/photo-1605152280-88f5b73a5fbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwyfHxzZXJ2aWNlc3xlbnwwfDB8fHwxNzczNDI2Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  products: [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwzfHxzZXJ2aWNlc3xlbnwwfDB8fHwxNzczNDI2Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHw0fHxzZXJ2aWNlc3xlbnwwfDB8fHwxNzczNDI2Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHw1fHxzZXJ2aWNlc3xlbnwwfDB8fHwxNzczNDI2Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  ],
  gallery: [
    'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHw2fHxzZXJ2aWNlc3xlbnwwfDB8fHwxNzczNDI2Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHw4fHxzZXJ2aWNlc3xlbnwwfDB8fHwxNzczNDI2Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxMXx8c2VydmljZXN8ZW58MHwwfHx8MTc3MzQyNjY4NHww&ixlib=rb-4.1.0&q=80&w=1080',
  ],
};

export default function Home() {
  return (
    <Layout>
      <Hero
        image={images.hero}
        title="Book Your Fresh Look"
        subtitle="Experience the art of hair with our expert stylists."
        ctaText="Join our Stylist List"
        ctaLink="#contact"
      />
      <Features
        title="Expert Services"
        features={[
          {
            title: 'Men\'s Barbering',
            description: 'Expert cuts and shaves for the modern gentleman.',
            icon: 'fa-male',
          },
          {
            title: 'Women\'s Styling',
            description: 'Hair that makes a statement.',
            icon: 'fa-female',
          },
          {
            title: 'Hair Coloring',
            description: 'Transform your look with our expert colorists.',
            icon: 'fa-palette',
          },
          {
            title: 'Treatments',
            description: 'Relax and rejuvenate with our spa services.',
            icon: 'fa-spa',
          },
        ]}
      />
      <Testimonials
        title="What Our Clients Say"
        testimonials={[
          {
            text: 'Adis Saloon is the best! Their stylists are so talented and friendly.',
            name: 'John Doe',
            role: 'Client',
          },
          {
            text: 'I love my new hair! The team at Adis Saloon did an amazing job.',
            name: 'Jane Doe',
            role: 'Client',
          },
        ]}
      />
      <Gallery
        title="The Gallery"
        images={images.gallery}
      />
      <Contact
        title="Get in Touch"
        contact={{
          whatsapp: '+234 123 456 789',
          instagram: '@adis_saloon',
          email: 'info@adis-saloon.com',
          address: 'Lagos, Nigeria',
        }}
      />
    </Layout>
  );
}