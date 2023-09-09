/**
 * 
 */

 document.addEventListener("DOMContentLoaded", function () {

        // Function to prevent Ctrl + M key combination
    function preventCtrlM(event) {
        if (event.ctrlKey && event.keyCode === 77) {
            event.preventDefault();
        }
    }

    // Add a keydown event listener to the document
    document.addEventListener("keydown", preventCtrlM);
});
