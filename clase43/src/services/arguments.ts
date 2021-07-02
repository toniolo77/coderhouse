import minimist from 'minimist';

const args = minimist(process.argv.slice(2), {
    alias: {
        p: 'port'
    },
    default: {
        port: 8080
    }
});

export default args;