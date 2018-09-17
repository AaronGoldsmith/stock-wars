$(document).ready(function() {
    var form = $("#transForm");
    var ticker = $("#ticker");
    var quantity = $("#quantity");


    form.on("submit", function(event) {
        event.preventDefault();
        var tickerValue = ticker.val().trim();
        if(ticker.val().length === 0) {
            return;
        };
        var currentPrice;
        var query = `https://api.iextrading.com/1.0/stock/${tickerValue}/price`
        $.ajax({url: query, success: function(result){
            currentPrice = result;
        }}).then(function() {
            var total = currentPrice * quantity.val();
            var transaction = {
                ticker: ticker.val().trim(),
                quantity: quantity.val().trim(),
                price: currentPrice,
                total_price: total  
            }
            $.post("/api/transaction", transaction)
        });

        
});

});