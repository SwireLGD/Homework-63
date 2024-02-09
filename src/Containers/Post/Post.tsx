import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApiPost } from "../../types";
import axiosApi from "../../axiosApi";
import Loader from "../../Components/Loader/Loader";
import {format} from "date-fns";

const Post = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<ApiPost | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPost = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axiosApi.get<ApiPost | null>('/posts/' + params.id + '.json');
            setPost(response.data);
        } catch (error) {
            console.error("Failed to fetch post", error);
        }
        setIsLoading(false);
    }, [params.id]);

    useEffect(() => {
        void fetchPost();
    }, [fetchPost]);

    const handleDelete = useCallback(async () => {
        if (params.id) {
            setIsLoading(true);
            try {
                await axiosApi.delete('/posts/' + params.id + '.json');
                navigate('/');
            } catch (error) {
                console.error('Failed to delete the post', error);
            }
            setIsLoading(false);
        }
    }, [params.id, navigate]);

    let postArea = <Loader />

    if (!isLoading && post) {
        postArea = (
            <div className="card mt-4 p-4">
                <span className="text-muted fs-6 ">Created on: {format(post.createdAt,'dd.MM.yyyy HH:mm')}</span>
                <h2>{post.title}</h2>
                <article>
                    {post.description}
                </article>
                <div className="mt-3">
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    <Link to={'/posts/' + params.id + '/edit'} className="btn btn-success ms-3">Edit</Link>
                </div>
            </div>
        )
    } else if (!isLoading && !post) {
        postArea = (
            <h1>Not Found</h1>
        )
    }

    return postArea;
};

export default Post;