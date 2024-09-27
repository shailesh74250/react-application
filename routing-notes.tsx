/*
- Routing
React Router: The standard routing library for React.
Reach Router: An alternative with focus on accessibility (now merged with React Router).
Next.js: Framework with built-in routing for server-rendered React apps.

Best Practices
Code Splitting with Routes:

Combine lazy loading with route-based code splitting for better performance.
Dynamic Routing:

Handle dynamic segments (e.g., /users/:id) efficiently.
Nested Routes:

Use nested routing for complex UI hierarchies.
Redirects and Not Found Routes:

Implement proper redirects and 404 pages.
*/

// Practical 
// npm install react-router-dom @types/react-router-dom
// src/routes.tsx
import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const UserList = lazy(() => import('./pages/UserList'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Routes: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={UserList} />
          <Route path="/users/:id" component={UserProfile} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;

// Note: lazy loading can't work without Suspense HOC
// Lazy component should be wrap within Suspense

// Integrate Routes in App
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import GlobalStyles from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes />
    </Router>
  );
};

export default App;


