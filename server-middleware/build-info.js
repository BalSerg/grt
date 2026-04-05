import { version } from './../package.json';

const fs = require('fs/promises');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const dockerCommand = `cat /proc/self/cgroup | grep "pids" | head -n 1 | awk -F 'docker/' '{print $2}'`;

async function getDockerInfo() {
    const { stdout, stderr } = await exec(dockerCommand);
    if (stderr) {
        console.error('stderr:', stderr);
        return null;
    }
    return stdout;
} 

async function getBuildDate() {
    const stats = await fs.stat(`${process.cwd()}/.nuxt/App.js`);
    return stats.mtime.toLocaleString('ru-RU');
}

export default async function(req, res, next) {
    if (req.url.includes('/build-info')) {
        const dockerInfo = await getDockerInfo();
        const lastModified = await getBuildDate();

        const buildInfo = {
            version,
            dockerInfo,
            lastModified
        };

        res.buildInfo = buildInfo;
    }
    next();
}
