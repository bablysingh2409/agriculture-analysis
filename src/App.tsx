import './App.css';
import { MantineProvider } from '@mantine/core';
import AgricultureDashboard from './components/AgricultureDashboard';
import CropStatistics from './components/CropStats';

function App() {
  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AgricultureDashboard />
            <CropStatistics />
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;