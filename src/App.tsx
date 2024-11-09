
import './App.css'
import { MantineProvider } from '@mantine/core';
import AgricultureDashboard from './components/AgricultureDashboard';
import { theme } from './components/theme';


function App() {

  return (
    <>
      <MantineProvider theme={theme}>
        <div className="min-h-screen bg-gray-50">
          <AgricultureDashboard />
        </div>
      </MantineProvider>
    </>
  )
}

export default App
