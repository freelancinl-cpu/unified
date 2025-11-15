import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { SearchScreen } from './components/SearchScreen';
import { NewSaleScreen } from './components/NewSaleScreen';
import { PurchaseHistoryScreen } from './components/PurchaseHistoryScreen';
import { CrmService } from './services/crmService';
import { SearchIcon } from './components/icons/SearchIcon';
import { UserPlusIcon } from './components/icons/UserPlusIcon';
import { ListBulletIcon } from './components/icons/ListBulletIcon';


type View = 'search' | 'new_sale' | 'purchase_history';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('search');
  
  // useMemo ensures the service is instantiated only once
  const crmService = useMemo(() => new CrmService(), []);

  // This key forces a re-mount of NewSaleScreen when a sale is added,
  // effectively resetting its internal state.
  const [newSaleScreenKey, setNewSaleScreenKey] = useState(0);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  }, []);

  const handleSaleAdded = useCallback(() => {
    setNewSaleScreenKey(prev => prev + 1);
  }, []);

  const NavButton: React.FC<{
    view: View;
    label: string;
    icon: React.ReactNode;
  }> = ({ view, label, icon }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-semibold ${
        currentView === view
          ? 'bg-white text-blue-600 shadow-sm'
          : 'bg-transparent text-slate-300 hover:bg-slate-700'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-xl sm:text-2xl font-bold">
              Unified Bike Sales & CRM
            </h1>
            <nav className="flex items-center gap-1 sm:gap-2 bg-slate-900/50 p-1 rounded-lg">
              <NavButton
                view="search"
                label="Lookup"
                icon={<SearchIcon className="h-5 w-5" />}
              />
              <NavButton
                view="new_sale"
                label="New Sale"
                icon={<UserPlusIcon className="h-5 w-5" />}
              />
              <NavButton
                view="purchase_history"
                label="History"
                icon={<ListBulletIcon className="h-5 w-5" />}
              />
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {currentView === 'search' && <SearchScreen crmService={crmService} />}
        {currentView === 'new_sale' && <NewSaleScreen key={newSaleScreenKey} crmService={crmService} onSaleAdded={handleSaleAdded} />}
        {currentView === 'purchase_history' && <PurchaseHistoryScreen crmService={crmService} />}
      </main>

      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Unified Bike Sales & CRM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;