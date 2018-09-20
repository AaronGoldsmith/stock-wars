<<<<<<< HEAD

$("form.stocksearch").on("submit", function (event)
{
=======
//Stock search form on dashboard
$("form.stocksearch").on("submit", function(event) {
>>>>>>> master
    event.preventDefault();
    $(".validate").remove();
    var ticker = $("#tickersearch").val().trim();

<<<<<<< HEAD
    $.ajax({
        url: "https://api.iextrading.com/1.0/stock/" + ticker + "/price",
        error: function ()
        {
            newRes = $("<p style='color: red; margin-top: 10px;' class='validate'>It looks like that symbol isn't valid, please try again.</p>")
            $(".stocksearch").append(newRes);
        },
        success: function ()
        {
            window.location.replace("stock?ticker=" + ticker);
        }
    });
});

=======
    // This ajax call checks to make sure that is is a legitimate stock symbol
    // if error, it displays an error to the user. If success it adds the ticker
    //symbol to the url to be received by the "stock" webpage
    $.ajax({url: "https://api.iextrading.com/1.0/stock/" + ticker + "/price", 
    error: function () {
        newRes = $("<p style='color: red; margin-top: 10px;' class='validate'>It looks like that symbol isn't valid, please try again.</p>")
        $(".stocksearch").append(newRes);
    },
    success: function() {
        window.location.replace("stock?ticker=" + ticker);
    }
    });
});
>>>>>>> master
