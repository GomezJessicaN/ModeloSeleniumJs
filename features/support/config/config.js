////////////////////////////////////////////////
///////////// TESTS CONFIGURATIONS /////////////
////////////////////////////////////////////////

module.exports.config = {
    // BASE CONGIG
    SITE_URL: 'http://localhost:4200/',

    // USERS AND ROLES
    USER: (process.env.USER || 'nombreUsuario'),
    PASS: (process.env.PASS || 'password'),

    // browserstack
    user: 'bsuser47048',
    key: 'vAJT61TXD8iEJjLdjnVE',
    server: 'hub-cloud.browserstack.com',
    capabilities: [{
        browserName: 'chrome'
    }],
    BROWSERSTACK: (process.env.BROWSERSTACK == "true" || false),
    CHROMEHEADLESS: (process.env.CHROMEHEADLESS == "true" || false)
}