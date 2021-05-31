const numCPUs = require("os").cpus().length;

export const getInfo =  (req, res) => {
    const info = {
        argIn: process.argv.splice(2).toString(),
        operativeSystem: process.platform,
        nodeVersion: process.version,
        memory: process.memoryUsage().heapUsed,
        executionPath: process.execPath,
        processId: process.pid,
        folder: process.cwd(),
        cpuProcess: numCPUs,
    }
    res.render("info/process", {info: info });
}