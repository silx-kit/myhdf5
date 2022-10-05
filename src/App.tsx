import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Dropzone from './Dropzone';
import Help from './Help';
import Layout from './Layout';
import Services from './Services';
import ViewerContainer from './ViewerContainer';

function App() {
  return (
    <Dropzone>
      <Layout>
        <Routes>
          <Route path="/" element={<Services />} />
          <Route path="/help" element={<Help />} />
          <Route
            path="/view"
            element={
              <Suspense fallback={null}>
                <ViewerContainer />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </Dropzone>
  );
}

export default App;
