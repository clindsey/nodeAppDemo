# nodeAppDemo
This is just a little Express/Web-App demo.  Details coming soon.

## Usage
First run the setup script

```bash
grunt exec:setup
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


## License
Unlicense