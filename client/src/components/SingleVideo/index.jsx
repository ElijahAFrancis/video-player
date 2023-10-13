import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import { useQuery } from '@apollo/client';
import { QUERY_VIDEO } from '../../utils/queries';

const SingleVideo = () => {
    const { id } = useParams(); // Destructure 'id' from useParams

    console.log(id)

    const { loading, error, data } = useQuery(QUERY_VIDEO, {
        variables: { id: id }
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data || !data.video) {
        return <div>Video not found</div>;
    }

    const video = data.video;

    return (
        <ReactPlayer url={video.path} width="50%" height="50%" controls={true} />
    )
}

export default SingleVideo;