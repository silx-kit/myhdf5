import { Route, Routes } from 'react-router-dom';

import Dropzone from './Dropzone';
import Home from './Home';
import Layout from './Layout';

function App() {
  return (
    <Dropzone>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" />
        </Routes>
      </Layout>
    </Dropzone>
  );
}

export default App;
