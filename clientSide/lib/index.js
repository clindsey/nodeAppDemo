var $ = require("jquery"),
    progress = require("./components/progressBar"),
    uploadForm = require("./components/uploadForm"),
    results = require("./components/results"),
    salaryViewer = require("./components/salaryViewer"),
    data = { employeeData: {} };

/**
 * Uploads files and retrieves the result, while
 * reporting status to user.
 *
 * @param {File} employeesFile
 * @param {File} salariesFile
 */
function uploadFiles(employeesFile, salariesFile) {
  var form, req;

  form = new window.FormData();
  form.append("employees", employeesFile);
  form.append("salaries", salariesFile);

  req = new XMLHttpRequest();
  req.open("POST", "/analyze", true);

  req.onload = function () {
    // TODO verify data//try catch
    data.employeeData = JSON.parse(req.responseText).data;
    results.show(data.employeeData);
  };

  req.onerror = function () {
    uploadForm.showError("Failed to upload your files.  Please try again.");
  };

  req.onabort = function () {
    uploadForm.showError("You aborted the upload!");
  };

  req.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      progress.update(Math.round((event.loaded / event.total) * 100));
    }
    else {
      progress.update(0);
    }
  };

  progress.display();
  req.send(form);
}

/****** Event Handlers ******/
/**
 * Handler for when the user clicks the
 * upload button for employee and salary files.
 *
 * @param {Objecty} event
 */
function uploadFilesHandler(event) {
  event.preventDefault();

  var employeesFile = $("#employeesInputFile")[0].files[0],
      salariesFile = $("#salariesInputFile")[0].files[0];

  if (!employeesFile) {
    return uploadForm.showError("You must upload an employees CSV file!");
  }

  if (!salariesFile) {
    return uploadForm.showError("You must upload a salaries CSV file!");
  }

  uploadFiles(employeesFile, salariesFile);
}

function startOverHandler(event) {
  event.preventDefault();

  uploadForm.reset();
  uploadForm.show();
}

$(document).ready(function() {
  // Initialize Elements

  // Hack to use Bootstrap's modals...
  window.$("#salaryModal").modal({
    show: false
  });

  // Events
  $("#upload").on("click", uploadFilesHandler);
  $("#startOver").on("click", startOverHandler);
  $("#resultsDataContainer").on("click", "a", salaryViewer.employeeClickHandler.bind(undefined, data));
});


