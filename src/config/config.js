const development = require('./dev.json');
const production = require('./prod.json');

export const getEnvironment = () => {
    const env = 'dev';
    switch (env) {
        case 'dev':
           return development;
        default:
            return production;
    }
};