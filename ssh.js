
const
    Client = require("ssh2").Client;

class Ssh {

    constructor (params) {
        this.connection = new Client();
        this.params = params;
    }

    connect() {
        this.connection.connect(this.params);

        return new Promise((resolve, reject) => {
            this.connection.once("error", reject);
            this.connection.once("ready", () => {
                this.connection.removeListener("error", reject);
                resolve(this);
            });
        });
    }

    exec(command) {
        return new Promise((resolve, reject) => {
            this.connection.exec(command, (err, stream) => {
                if (err) {
                    reject();
                    return;
                }

                let stdout = "";
                let stderr = "";

                stream.on("data", data => stdout += data);
                stream.stderr.on("data", data => stderr += data);
                stream.on("close", (code, signal) => resolve([code, signal, stdout, stderr]));
            });
        });
    }

    close() {
        this.connection.end();
    }

    static async open(params) {
        const sshClient = new Ssh(params);
        return await sshClient.connect();
    }
}

module.exports = Ssh;
