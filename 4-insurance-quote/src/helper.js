export const getYearDifference = (year) => {
    return new Date().getFullYear() - year;
}

export const incrementByContinent = (continent) => {
    let increment

    switch (continent) {
        case 'north-america':
            increment = 1.20;
            break;
        case 'south-america':
            increment = 1.05;
            break;
        
        case 'europe':
            increment = 1.30;
            break;
        
        case 'asia':
            increment = 1.15;
            break;
        case 'africa':
            increment = 1.10;
            break;
        case 'oceania':
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