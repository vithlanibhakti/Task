import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ErrorBoundary} from 'react-error-boundary'
import {Toast} from './Helpers/CommonHelper';
function ErrorFallback({error, resetErrorBoundary}) {
  
  Toast.fire({
    icon: 'error',
    title: 'Something went wrong, Please contact admin!!'
})
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary
    FallbackComponent={ErrorFallback}
    >
    <App />
  </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
