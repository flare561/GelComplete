$(document).ready(function() {
    $("#tags")
        .on( "keydown", function( event ) {
            if ( event.keyCode === $.ui.keyCode.TAB &&
                $( this ).autocomplete( "instance" ).menu.active ) {
                event.preventDefault();
            }
        })
        .autocomplete({
            source: function(request, response) {
                $.ajax(`http://gelbooru.com/index.php?page=tags&s=list&sort=desc&order_by=index_count&tags=*${$("#tags").val().split(" ").pop()}*`,{
                    success: function (data) {
                        response($.makeArray($("tr td span a", data).map(function () {
                            return this.innerText
                        })).slice(0, 10))
                    }
                });
            },
            focus: function() {
                // prevent value inserted on focus
                return false;
            },
            select: function( event, ui ) {
                var terms = $("#tags").val().split(" ");
                // remove the current input
                terms.pop();
                // add the selected item
                terms.push( ui.item.value );
                // add placeholder to get the comma-and-space at the end
                terms.push( "" );
                this.value = terms.join( " " );
                return false;
            },
            delay: 0,
            minLength: 3

            });
    $("#tags").focus();
});