import PropTypes from "prop-types";
import styled from "styled-components";

const News = ({ noticia }) => {
  const { urlToImage, url, title, description, source } = noticia;

  return (
    <div className="col s12 m6 l4">
      <div className="card">
        <div className="card-image">
          <img src={urlToImage} alt={title} />
          <span className="card-title">{source.name}</span>
        </div>

        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <CardBtn>
          <Btn href={url} target="_blank" rel="noopener noreferrer">
            View Complete News
          </Btn>
        </CardBtn>
      </div>
    </div>
  );
};

const CardBtn = styled.div`
display: flex;
justify-content: center;
  border-top: 1px solid lightgray;
  padding: 1rem;
`;

const Btn = styled.a`
  background-color: #26a69a;
  color: white;
  text-align: center;
  width: 100%;
  margin: .5rem;
  padding: .5rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover{
    background-color: #19988c;
  }
`;

News.propTypes = {
  noticia: PropTypes.object.isRequired,
};

export default News;
