import { useQuery } from '@apollo/client';
import Upload from '../components/Upload';
// import ProfileList from '../components/Profile';
// import { QUERY_PROFILES } from '../utils/queries';
import "../styles/Home.css";

const Home = () => {
  //   const { loading, data } = useQuery(QUERY_PROFILES);
  //   const profiles = data?.profiles || [];

  return (
    <main className="main">
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <Upload />
        </div>
      </div>
    </main>
  );
};

export default Home;