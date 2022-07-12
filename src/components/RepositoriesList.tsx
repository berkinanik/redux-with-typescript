import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    searchRepositories(term);
  };

  return (
    <div>
      <h3>RepositoriesList</h3>
      <form name="search-repositories" onSubmit={onSubmit}>
        <label htmlFor="term">
          Repository Name
          <input
            type="search"
            name="term"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <div>
        {error && <h3>{error}</h3>}
        {loading && <h3>loading...</h3>}
        {data && !loading && (
          <ol>
            {data.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default RepositoriesList;
