$(document).ready(function() {
    function makeTable(stocks){
        // TODO: pass an array into makeTable containing the stock objects
        //       containing TICKER, QTY, GAIN, PRICE 
        for(stock in stocks){
            makeRow(stock.ticker,stock.qty,stock.gain,stock.price)
        }
    }

    function makeRow(ticker,quantity,gain,price){
        var row = ` <tr> `+
        `<td><a href="#">${ticker}</a></td>` +
        `<td>${quantity}</td>` +
        `<td>${gain}</td>` +
        `<td>${price}</td></tr>`
        $("tbody#stocks").append(row);
    }

    makeTable()
});
$("form.stocksearch").on("submit", function(event) {
    event.preventDefault();
    $(".validate").remove();
    var ticker = $("#tickersearch").val().trim();

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

