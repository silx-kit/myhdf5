import { Route, Switch } from 'wouter';

import Dropzone from './Dropzone';
import HelpPage from './HelpPage';
import Layout from './Layout';
import ServicesPage from './ServicesPage';
import ViewPage from './ViewPage';

function App() {
  return (
    <Dropzone>
      <Layout>
        <Switch>
          <Route path="/">
            <ServicesPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>
          <Route path="/view">
            <ViewPage />
          </Route>
        </Switch>
      </Layout>
    </Dropzone>
  );
}

export default App;
