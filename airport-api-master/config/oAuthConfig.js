/**
 * OAuth Config Const
 */

const oAuthConfig = {
    JWT_SECRET_FOR_ACCESS_TOKEN: 'XT6PRpRuehFsyMa2',
    JWT_SECRET_FOR_REFRESH_TOKEN: 'JWPVzFWkqGxoE2C2',
    JWT_ISSUER: 'Exeeria',
    JWT_ACCESS_TOKEN_EXPIRY_SECONDS: 1209600,
    JWT_REFRESH_TOKEN_EXPIRY_SECONDS: 1209600, // In seconds
}

/**
 * Const client id 
 */

const ClientIds = {
    common: {
        client_id: 'e2NsaWVudElkOiIiLCBuYW1lOiJlcGljZ2Vtcy1hZG1pbiJ9',
        client_secret: 'e2NsaWVudElkOiIiLCBuYW1lOiJlcGljZ2Vtcy1hZG1pbiJ9',
        AuthKey: 'ZTJOc2FXVnVkRWxrT2lJaUxDQnVZVzFsT2lKbGNHbGpaMlZ0Y3kxaFpHMXBiaUo5OmUyTnNhV1Z1ZEVsa09pSWlMQ0J1WVcxbE9pSmxjR2xqWjJWdGN5MWhaRzFwYmlKOQ==',
    },
    admin: {
        client_id: 'e2NsaWVudElkOiIiLCBuYW1lOiJlcGljZ2Vtcy1hZG1pbiJ9',
        client_secret: 'e2NsaWVudElkOiIiLCBuYW1lOiJlcGljZ2Vtcy1hZG1pbiJ9',
        AuthKey: 'ZTJOc2FXVnVkRWxrT2lJaUxDQnVZVzFsT2lKbGNHbGpaMlZ0Y3kxaFpHMXBiaUo5OmUyTnNhV1Z1ZEVsa09pSWlMQ0J1WVcxbE9pSmxjR2xqWjJWdGN5MWhaRzFwYmlKOQ==',
    }
}

module.exports = {
    oAuthConfig,
    ClientIds
}



