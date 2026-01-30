import { syncRecords } from '@/src/services/SyncService';
import React, { useEffect } from 'react';
import RecordForm from '../../components/RecordForm';


const App: React.FC = () => {
  useEffect(() => {
    // Try to sync on app load if online
    if (navigator.onLine) {
      syncRecords();
    }
  }, []);

  return (
    <div>
      <h1>Medical Records</h1>
      <RecordForm />
    </div>
  );
};

export default App;
