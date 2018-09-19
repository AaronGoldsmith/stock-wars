$("form.stocksearch").on("submit", function(event) {
    event.preventDefault();
    var ticker = $("#tickersearch").val().trim();

    $.ajax({url: "https://api.iextrading.com/1.0/stock/" + ticker + "/price", 
    error: function () {
        newRes = $("<p style='color: red; margin-top: 10px;'>It looks like that symbol isn't valid, please try again.</p>")
        $(".stocksearch").append(newRes);
    },
    success: function() {
        window.location.replace("stock?ticker=" + ticker);
}
});
});
