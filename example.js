
const
    fs = require("fs"),
    Ssh = require("./ssh");

function loadConfig() {
    try {
        return JSON.parse(fs.readFileSync("./config.json", "utf8"));
    } catch (e) {
        if (e.code === "ENOENT") {
            console.error("Please configure `config.json` (see README.md) before running.");
        } else if (e.toString().includes("Unexpected end of JSON input")) {
            console.error("Malformed `config.json`. Please fix it and try again.");
        } else {
            console.error(e);
        }
        process.exit(1);
    }
}

/** @return {void} */
async function main() {
    const config = loadConfig();

    const ssh = await Ssh.open({
        host: config.host,
        username: config.username,
        privateKey: require("fs").readFileSync(config.privateKey)
    });

    const [code, signal, stdout, stderr] = await ssh.exec("uptime");
    console.info("code = " + code);
    console.info("signal = " + signal);
    console.info("stdout -----------------------------");
    console.info(stdout);
    console.info("stderr -----------------------------");
    console.info(stderr);

    ssh.close();
}

main();
