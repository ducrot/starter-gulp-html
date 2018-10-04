import 'jquery.mmenu/dist/jquery.mmenu'

$(document).ready(function() {
    $("#mobileMenu").mmenu({
        extensions: ["position-right"]
    }, {
        // configuration
        offCanvas: {
            pageSelector: "#page"
        },
        classNames: {
            selected: "active"
        }
    });
});