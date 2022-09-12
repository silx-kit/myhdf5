import { Route, Routes } from 'react-router-dom';

import Dropzone from './Dropzone';
import Layout from './Layout';
import Services from './Services';

function App() {
  return (
    <Dropzone>
      <Layout>
        <Routes>
          <Route path="/" element={<Services />} />
          <Route path="/help" />
        </Routes>
      </Layout>
    </Dropzone>
  );
}

export default App;
