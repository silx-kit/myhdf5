import { Route, Routes } from 'react-router-dom';

import Dropzone from './Dropzone';
import Layout from './Layout';
import Services from './Services';
import ViewerContainer from './ViewerContainer';

function App() {
  return (
    <Dropzone>
      <Layout>
        <Routes>
          <Route path="/" element={<Services />} />
          <Route path="/help" />
          <Route path="/view" element={<ViewerContainer />} />
        </Routes>
      </Layout>
    </Dropzone>
  );
}

export default App;
