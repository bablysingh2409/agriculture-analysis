import './App.css';
import { MantineProvider } from '@mantine/core';
import AgricultureDashboard from './components/AgricultureDashboard';
import CropStatistics from './components/CropStats';

function App() {
  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Indian Agriculture Analysis Dashboard
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-0.5 w-12 bg-blue-500"></div>
              <p className="text-gray-600 text-lg">
                Production Trends and Crop Performance Statistics (1950-2020)
              </p>
              <div className="h-0.5 w-12 bg-blue-500"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 relative">
            <div className="p-3">
              <AgricultureDashboard />
            </div>
            
            <div className="hidden lg:block absolute h-full w-px bg-gray-200 left-1/2 top-0 transform -translate-x-1/2" />
            
            <div className="lg:hidden w-full h-px bg-gray-200 my-6" />
            
            <div className="p-3">
              <CropStatistics />
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8 pb-4">
          Data sourced from Indian Agricultural Statistics
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;