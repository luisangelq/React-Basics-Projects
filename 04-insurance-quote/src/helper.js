export const getYearDifference = (year) => {
    return new Date().getFullYear() - year;
}

export const incrementByContinent = (continent) => {
    let increment

    switch (continent) {
        case 'North America':
            increment = 1.20;
            break;
        case 'South America':
            increment = 1.05;
            break;
        
        case 'Europe':
            increment = 1.30;
            break;
        
        case 'Asia':
            increment = 1.15;
            break;
        case 'Africa':
            increment = 1.10;
            break;
        case 'Oceania':
            increment = 1.25;
            break;
        default:
            break;
    }
    return increment;
}

export const incrementByPlan = (plan) => {
    let increment

    switch (plan) {
        case 'basic':
            increment = 1.20;
            break;
        case 'premium':
            increment = 1.40;
            break;
        default:
            break;
    }
    return increment;
} 