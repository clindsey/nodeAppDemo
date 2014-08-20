module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      files: ["Gruntfile.js", "app.js", "clientSide/lib/*.js", "clientSide/lib/**/*.js", "routes/*.js"],
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
        cmd: "npm install && grunt browserify"
      },

      runDev: {
        cmd: "DEBUG=nodeAppDemo NODE_ENV=development node ./app.js"
      },

      runProd: {
        cmd: "DEBUG=nodeAppDemo NODE_ENV=prod node ./app.js"
      }
    },

    simplemocha: {
      options: {
        globals: ["should"],
        timeout: 3000,
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
