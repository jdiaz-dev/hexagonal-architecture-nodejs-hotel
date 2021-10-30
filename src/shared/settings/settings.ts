import { development } from "./development"
import { production } from "./production"

const environment = process.env.NODE_ENVIRONMENT == 'production' ? 'production' : 'development'
const availableEnvironments = {
    development: development,
    production: production
}

export const SETTINGS = availableEnvironments[environment]
