import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Root element validation with better error handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  // Create emergency fallback UI
  const fallbackDiv = document.createElement('div');
  fallbackDiv.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #F8FAFC;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    padding: 20px;
  `;
  
  fallbackDiv.innerHTML = `
    <div style="text-align: center; max-width: 500px;">
      <h1 style="font-size: 24px; color: #0F172A; margin-bottom: 16px;">
        페이지 로딩 오류
      </h1>
      <p style="color: #64748B; margin-bottom: 24px; line-height: 1.6;">
        루트 엘리먼트를 찾을 수 없습니다. 페이지를 새로고침하거나 아래 연락처로 문의해주세요.
      </p>
      <a 
        href="mailto:sr100@kakao.com" 
        style="
          display: inline-block;
          background: #0F172A;
          color: white;
          padding: 12px 24px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 600;
        "
      >
        이메일 문의하기
      </a>
    </div>
  `;
  
  document.body.appendChild(fallbackDiv);
  
  throw new Error("Critical: Root element with id 'root' not found in DOM");
}

// Create React root and render app
const root = ReactDOM.createRoot(rootElement);

// Global error boundary fallback
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  
  // You can add error tracking service here (e.g., Sentry)
  // Sentry.captureException(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // You can add error tracking service here
  // Sentry.captureException(event.reason);
});

// Render app with StrictMode for development checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring (optional)
if (typeof window !== 'undefined' && 'performance' in window) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
    }
    
    // You can send this to analytics
    // analytics.track('page_load', { loadTime: pageLoadTime });
  });
}

// Service Worker registration (for PWA - optional)
/*
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}
*/