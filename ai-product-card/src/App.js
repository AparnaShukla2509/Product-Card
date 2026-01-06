import React from "react";
import ProductForm from "./components/ProductForm";
import "./App.css";

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const App = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__content">
          
          <h1 className="app-header__title">AI Product Content Generator</h1>
          <p className="app-header__subtitle">Generate Smart Product Titles, Descriptions & Tags Instantly</p>
        </div>
        <div className="app-header__decoration" aria-hidden="true" />
      </header>

      <main className="app-content">
        <ProductForm />
      </main>

      <footer className="app-footer">
        <div className="app-footer__content">
          
          <div className="app-footer__tech">
            <span>React.js</span>
            <span className="app-footer__separator">•</span>
            <span>© {currentYear}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;