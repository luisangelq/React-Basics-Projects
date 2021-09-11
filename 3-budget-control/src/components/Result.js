import {Fragment} from 'react' 
import {checkBudget} from "./helpers"

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

export default Result;