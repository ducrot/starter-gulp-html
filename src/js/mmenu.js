$(document).ready(function() {
    $("#navbarSupportedContent").mmenu({
        wrappers: ["bootstrap4"],
        extensions: ["position-right"]
    }, {
        // configuration
        offCanvas: {
            pageSelector: "#page"
        }
    });
});