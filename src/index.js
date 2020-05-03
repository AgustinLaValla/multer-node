const app = require('./app');
const colors = require('colors');

async function main() {
    await app.listen(app.get('port'));
    console.log(`${colors.magenta('Server on Port')} ${colors.green(app.get('port'))}`)
};

main();