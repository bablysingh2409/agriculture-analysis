import './App.css';
import { MantineProvider } from '@mantine/core';
import AgricultureDashboard from './components/AgricultureDashboard';
import CropStatistics from './components/CropStats';

function App() {
  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 relative">
            <div className="p-3">
              <AgricultureDashboard />
            </div>
            
            {/* Vertical Divider - Only shows on large screens */}
            <div className="hidden lg:block absolute h-full w-px bg-gray-200 left-1/2 top-0 transform -translate-x-1/2" />
            
            {/* Horizontal Divider - Only shows on mobile */}
            <div className="lg:hidden w-full h-px bg-gray-200 my-6" />
            
            <div className="p-3">
              <CropStatistics />
            </div>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;