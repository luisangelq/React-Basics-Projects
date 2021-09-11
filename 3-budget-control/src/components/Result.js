import {Fragment} from 'react' 
import {checkBudget} from "./helpers"
import PropTypes from 'prop-types'

const Result = ({budget, remaining}) => {
    return(
        <Fragment>
            <div className="alert alert-primary">
                Budget: ${budget}
            </div>
            <div className={checkBudget(budget, remaining)}>
                Remaining: ${remaining}
            </div>
        </Fragment>
    )
}

Result.propTypes = {
    budget: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired
}

export default Result;