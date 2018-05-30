
# SSH2 Wrapper

Simple [`ssh2`](https://github.com/mscdex/ssh2) wrapper using `async/await` to make it friendlier.

## Install and configure

    npm install

Create a file named `config.json` with the following properties:

    {
      "host": <address of the remote machine>,
      "username": <your remote user name>,
      "privateKey": <path to your private key>
    }

## Run the example

    node example
