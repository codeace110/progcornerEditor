

//end of load Dom content

const toggleButton = document.getElementById("theme-toggle");

const body = document.body;

toggleButton.addEventListener("click", function() {
    body.classList.toggle("dark-theme");
});;

//end of theme togle