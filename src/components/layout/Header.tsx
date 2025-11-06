import React from 'react';
import { useUser } from '@/hooks/useUser';

export function Header() {
  const { user, logout } = useUser();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Mon Application
        </h1>
        <nav>
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Déconnexion
            </button>
          ) : (
            <div className="space-x-4">
              <a href="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Connexion
              </a>
              <a 
                href="/register" 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Inscription
              </a>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
