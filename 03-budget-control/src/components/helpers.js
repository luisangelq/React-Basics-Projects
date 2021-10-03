export const checkBudget = (budget, remaining) => {
    let alert;
    if(budget / 4 >= remaining){
        alert = 'alert alert-danger';
    } else if(budget / 2 >= remaining){
        alert = 'alert alert-warning';
    } else {
        alert = 'alert alert-success';
    }

    return alert;
}