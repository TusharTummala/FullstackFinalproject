
import { useState, useEffect } from 'react';
import { axiosWithToken } from '../../axiosWithToken';
import { useNavigate, Outlet } from 'react-router-dom';
import './Articles.css';

function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();

  const getArticlesOfCurrentAuthor = async () => {
    try {
      let res = await axiosWithToken.get(`http://localhost:4000/user-api/articles`);
      console.log(res);
      // Filter articles with status true
      const filteredArticles = res.data.payload.filter(article => article.status === true);
      setArticlesList(filteredArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      // Handle error appropriately
    }
  }
  
  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  }

  useEffect(() => {
    getArticlesOfCurrentAuthor();
  }, []);

  return (
<div className="container mt-3">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {articlesList.map((article) => (
          <div className="col mb-4" key={article.articleId}>
            <div className="card h-100 shadow d-flex flex-column justify-content-between" style={{ backgroundColor: '#f4f1de' }}>
              <div className="card-body">
                <h6 className="card-title text-primary">{article.category}</h6>
                <h5 className="card-title" style={{ color: 'terracotta' }}>{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "...."}
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => readArticleByArticleId(article)}>
                  <span>Read More</span>
                </button>
                <small className="text-muted d-block mt-2">
                  Last updated on {article.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
