import { useCookies } from "react-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, useNavigate } from "react-router-dom";

export function AdminDashBoard() {
    const [cookies, setCookie, removeCookie] = useCookies('adminName');
    const [videos, setVideos] = useState([{ VideoId: 0, Title: '', Url: '', Comments: '', Likes: 0, Category_Id: 0 }]);
    let navigate = useNavigate();

    function LoadVideos() {
        axios.get('http://127.0.0.1:2200/videos')
            .then(response => {
                setVideos(response.data);
            })
    }

    useEffect(() => {
        if (cookies['adminName'] === undefined) {
            navigate('/adminlogin');
        } else {
            LoadVideos();
        }
    }, []);

    return (
        <div style={{ width: '55%' }}>
            <h3> {cookies['adminName']} - Dashboard</h3>
            <div className="mb-4">
                <Link to="/addvideo" className="btn btn-primary">New Video</Link>
            </div>
            <table className="table table-hover" >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {videos.map(video =>
                        <tr key={video.VideoId}>
                            <td width="200">{video.Title}</td>
                            <td>
                                <iframe title={video.Title} src={video.Url} width="200" height="100"></iframe>
                            </td>
                            <td>
                                <Link  to={`/editvideo/${video.VideoId}`} className="btn btn-warning bi bi-pen-fill me-2">Edit</Link>
                                <Link to={`/deletevideo/${video.VideoId}`}  className="btn btn-danger bi bi-trash-fill">Delete</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

