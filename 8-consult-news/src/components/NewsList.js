import News from "./News"
import PropTypes from "prop-types"

const NewsList = ({news}) => (
    news ? (
        <div className="row">
            {news.map(noticia => (
                <News 
                    key={noticia.url}
                    noticia={noticia}
                />
            ))}
        </div>
    ) : null
        
)

NewsList.propTypes = {
    news: PropTypes.array.isRequired
}

export default NewsList;