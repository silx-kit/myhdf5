import { Route, Routes } from 'react-router-dom';

import Dropzone from './Dropzone';
import Layout from './Layout';
import OpenHdf5 from './OpenHdf5';

function App() {
  return (
    <Dropzone>
      <Layout>
        <Routes>
          <Route path="/" element={<OpenHdf5 />} />
          <Route path="/help" />
        </Routes>
      </Layout>
    </Dropzone>
  );
}

export default App;
