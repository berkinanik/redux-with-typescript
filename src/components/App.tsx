import { Provider } from 'react-redux';
import { store } from '../state';
import RepositoriesList from './RepositoriesList';

const App: React.FC = () => (
  <Provider store={store}>
    <div>
      <h1>Search for a package</h1>
      <RepositoriesList />
    </div>
  </Provider>
);

export default App;