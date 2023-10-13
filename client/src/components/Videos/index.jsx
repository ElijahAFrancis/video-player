import { Link } from "react-router-dom";
// import { videoCard } from "./videoCard"
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
            <>
              <h2>
                {user.name}'s Videos
              </h2>
              {user.videos.map((video) => (
                <div key={video._id} className="my-2">
                  <h3>
                    {/* {video.title} */}
                  </h3>
                  <h2>
                    {/* Uploaded on {new Date(parseInt(video.uploadDate)).toLocaleDateString()} */}
                    </h2>
                  <div className="flex-row">
                    <ReactPlayer url={`https://storage.googleapis.com/uploads_bucket_instaclip/ef499b64-7fab-4ece-b50d-9d8195e2c5da.mp4`} width="100%" height="400px" controls={true} />
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </>
    );
  }
  
  export default Videos;
  
