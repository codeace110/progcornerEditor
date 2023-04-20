function runCode() {
  var outputContainer = document.getElementById("output-container");
  var code = editor.getValue();

  // Clear the output container
  outputContainer.innerHTML = "";

  // Redirect console.log() to the output container
  var oldLog = console.log;
  console.log = function (message) {
    var pre = document.createElement("pre");
    pre.innerText = message;
    outputContainer.appendChild(pre);
  };

  // Try to run the code and catch any errors
  try {
    eval(code);
  } catch (error) {
    // If an error occurs, display a custom error message in the output container
    var errorMessage =
      "Error: " + error.name + "\nMessage: " + error.message + "\n\n";
    errorMessage += "Possible fix: ";
    switch (error.name) {
      case "SyntaxError":
        errorMessage +=
          "Check for syntax errors in your code and correct them.";
        break;
      case "ReferenceError":
        errorMessage +=
          "Make sure that all variable and function names are spelled correctly and exist in the current scope.";
        break;
      case "TypeError":
        errorMessage +=
          "Check the data types of your variables and make sure that they are used correctly in your code.";
        break;
      default:
    }
    var p = document.createElement("p");
    p.innerText = errorMessage;
    p.style.color = "#FC2947";
    p.style.fontSize = "17px";
    p.style.fontWeight = "100";
    p.style.marginTop = "-30px";
    p.style.padding = "30px";
    outputContainer.appendChild(p);
  }

  // Restore console.log()
  console.log = oldLog;
}




var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  mode: "javascript",
  theme: "dracula",
});

// Set the editor width and height
editor.setSize("100%", "100%");

// Set the output container height
var outputContainer = document.getElementById("output-container");
outputContainer.style.height = window.innerHeight - 120 + "px";

// Listen for window resize events and adjust the output container height accordingly
window.addEventListener("resize", function () {
  outputContainer.style.height = window.innerHeight - 120 + "px";
});


