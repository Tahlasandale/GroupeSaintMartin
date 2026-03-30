import { render } from 'preact';
import { RouterProvider } from 'react-router-dom';
import { router } from './App';
import { FirebaseClientProvider } from './firebase';
import { Toaster } from './components/ui/toaster';
import './app/globals.css';

function App() {
  return (
    <FirebaseClientProvider>
      <RouterProvider router={router} />
      <Toaster />
    </FirebaseClientProvider>
  );
}

render(<App />, document.getElementById('root')!);
