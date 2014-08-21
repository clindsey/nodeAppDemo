module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      files: ["Gruntfile.js", "app.js", "server.js", "clientSide/lib/*.js", "clientSide/lib/**/*.js", "routes/*.js", "tests/*.js", "tests/**/*.js"],
      options: {
        jshintrc: "./.jshintrc"
      }
    },

    release: {
      options: {
        npm: false
      }
    },

    browserify: {
      "nodeAppDemo-clientSide": {
        src: ["./clientSide/lib/*.js"],
        dest: "public/js/nodeDemoApp.js"
      }
    },

    exec: {
      setup: {
        cmd: "npm install && npm install --prefix ./clientSide/ && grunt browserify && chmod +x bin/server"
      },

      runDev: {
        cmd: "DEBUG=nodeAppDemo NODE_ENV=development ./bin/server"
      },

      runProd: {
        cmd: "DEBUG=nodeAppDemo NODE_ENV=prod node ./bin/server"
      }
    },

    simplemocha: {
      options: {
        globals: ["should"],
        timeout: 5000,
        ignoreLeaks: false,
        ui: "bdd",
        reporter: "spec"
      },
      all: {src: ["tests/*.js", "tests/**/*.js"]}
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-release");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-simple-mocha");


  // Default task.
  grunt.registerTask("default", "watch");
};
