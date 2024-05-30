
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddArticle.css'
import { HiArrowCircleLeft } from "react-icons/hi";

function AddArticle() {
  const { register, handleSubmit } = useForm();
  const { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  // Create axios instance with token
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const postNewArticle = async (article) => {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
    
    // Make HTTP post request
    try {
      const res = await axiosWithToken.post('http://localhost:4000/author-api/article', article);
      if (res.data.message === 'new article created') {
        navigate(`/author-profile/articles-by-author/${currentUser.username}`);
      }
    } catch (error) {
      setErr(error.response.data.message);
    }
  };

  const goBack = () => {
    navigate(`/author-profile/articles-by-author/${currentUser.username}`);
  };

  return (
    <div className="container">
      {/* Back button */}
      <button className="btn" onClick={goBack}><HiArrowCircleLeft className="fs-3" /></button>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow boxart">
            <div className="card-title text-center border-bottom fs-3">
              <h2 className="p-3">Write an Article</h2>
            </div>
            <div className="card-body fs-4">
              <form onSubmit={handleSubmit(postNewArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title")}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">Select a category</label>
                  <select
                    {...register("category")}
                    id="category"
                    className="form-select"
                  >
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
                    <option value="life">Life</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea
                    {...register("content")}
                    className="form-control"
                    id="content"
                    rows="10"
                  ></textarea>
                </div>

                <div className="text-end">
                  <button type="submit" className="text-light btn btn-success fw-bold fs-5">Post</button>
                </div>
              </form>
              {err && <p className='text-danger fs-5'>{err}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddArticle;
