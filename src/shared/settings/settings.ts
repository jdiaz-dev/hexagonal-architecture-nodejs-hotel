import { development } from './development';
import { production } from './production';
import { integration } from './integration';

type environmentType = 'production' | 'integration' | 'development';
let environment: environmentType;

if (process.env.NODE_ENVIRONMENT === 'production') {
    environment = 'production';
} else if (process.env.NODE_ENVIRONMENT === 'integration') {
    environment = 'integration';
} else {
    environment = 'development';
}
const availableEnvironments = {
    development,
    production,
    integration,
};

export const SETTINGS = availableEnvironments[environment];
