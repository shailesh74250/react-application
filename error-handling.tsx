Proper error handling ensures that your application can gracefully handle unexpected situations.

Best Practices
Global Error Boundaries:

Catch rendering errors in components using error boundaries.
Handling Asynchronous Errors:

Properly handle errors in promises and async/await functions.
User-Friendly Error Messages:

Display meaningful error messages to users without exposing technical details.
Logging Errors:

Log errors for debugging purposes using services like Sentry or LogRocket.

Error Boundary Component:

// src/components/common/ErrorBoundary.tsx
import React, { ErrorInfo } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Error Boundary Caught:', error, errorInfo);
    // e.g., Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import GlobalStyles from './styles/GlobalStyles';
import ErrorBoundary from './components/common/ErrorBoundary';

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <GlobalStyles />
        <Routes />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
