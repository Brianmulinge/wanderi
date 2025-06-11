'use client';

import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#consultation', label: 'Consultation' },
  ];

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-background shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <Shield className="h-7 w-7 text-primary" />
                  <span className="text-xl font-bold text-foreground">Wanderi</span>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 p-6">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="block text-lg text-muted-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-4 rounded-lg"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-6 border-t border-border space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Switch Theme</span>
                  <ThemeToggle />
                </div>
                
                <a
                  href="#consultation"
                  onClick={closeMenu}
                  className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 