import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import ReactPlayer from 'react-player';
import { QUERY_USER } from '../../utils/queries';

function Videos() {
    const { data } = useQuery(QUERY_USER);
    let user;
  
    if (data) {
      user = data.user;
    }
  
    return (
      <>
        <div className="container my-1">
  
          {user ? (
            <div>
              <h2>
                Your Videos
              </h2>
              <div className="flex-row">
                {user.videos.map((video) => (
                  <div key={video._id} className="flex">
                    <Link to={`/video/${video._id}`}>
                      <ReactPlayer url={video.path} width="25%" height="25%" controls={false} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
  
  export default Videos;
  
