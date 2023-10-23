import { Route, Routes } from 'react-router-dom';

import Dropzone from './Dropzone';
import HelpPage from './HelpPage';
import Layout from './Layout';
import ServicesPage from './ServicesPage';
import ViewPage from './ViewPage';

function App() {
  return (
    <Dropzone>
      <Layout>
        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/view" element={<ViewPage />} />
        </Routes>
      </Layout>
    </Dropzone>
  );
}

export default App;
