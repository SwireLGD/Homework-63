import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi";

const NewPost = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({ title: '', description: ''});

    useEffect(() => {
        const fetchPost = async () => {
            if (params.id) {
                try {
                    const response = await axiosApi.get('/posts/' + params.id + '.json');
                    setPost({ title: response.data.title, description: response.data.description })
                } catch (error) {
                    console.error('Failed to fetch data', error);
                }
            }
        };

        fetchPost();
    }, [params.id]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost(prev => ({...prev, [name]: value}));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedPost = {
            ...post,
            createdAt: new Date().toISOString()
          };
    
        try {
          if (params.id) {
            await axiosApi.put('/posts/' + params.id + '.json', updatedPost);
          } else {
            await axiosApi.post('/posts.json', updatedPost);
          }
          navigate('/');
        } catch (error) {
          console.error("Failed to submit post", error);
        }
      }, [params.id, post, navigate]);

    return (
        <div className="d-flex flex-column align-items-center text-center w-100 mt-5">
            <h1>{params.id ? 'Edit Post' : 'New Post'}</h1>
            <form onSubmit={handleSubmit} className="w-75">
                <div>
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        className="input-group-text w-100 mb-3"
                        id="title"
                        name="title"
                        type="text"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div>
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        className="input-group-text w-100 mb-2"
                        style={{ minHeight: '500px' }}
                        id="description"
                        name="description"
                        value={post.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">{params.id ? 'Edit' : 'Create'}</button>
            </form>
        </div>
    );
};

export default NewPost;