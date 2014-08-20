# nodeAppDemo
This is just a little Express/Web-App demo that lets you upload employee and salary csv files to
have a join done between the two and display the data in a pretty web-based UI.

## Usage
First run the setup script

```bash
grunt exec:setup
```

If you don't have grunt installed, you can either run an npm install
to get it or install it globally:

```bash
npm install grunt -g
```

You can then run in prod mode or dev mode.  Dev mode enables 
errorhandler (https://github.com/expressjs/errorhandler).

```bash
grunt exec:runDev
```

```bash
grunt exec:runProd
```

You may also run the app directly by doing:

```bash
node ./app.js
```

Finally, the web-application portion of it can be found at
http://localhost:PORT

### Available Options
You may pass in environment variables when running 
the app directly:

```bash
PORT=42 DEBUG=nodeAppDemo node ./app.js
```

PORT - Port to run the server on.
NODE_ENV - either development or prod
DEBUG - Specifies what debug output to display.  See https://github.com/visionmedia/debug.

## Development
Code can be linted by doing:

```bash
grunt jshint
```

and releases can be made via

```bash
grunt release
grunt release:patch
grunt release:minor
grunt release:major
```

Finally, the automated tests can be run by doing
```bash
grunt simplemocha
```

## License
Unlicense