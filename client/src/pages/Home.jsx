import { useQuery } from '@apollo/client';

import ProfileList from '../components/Profile';

import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProfileList
              profiles={profiles}
              title="Insta Clip"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
