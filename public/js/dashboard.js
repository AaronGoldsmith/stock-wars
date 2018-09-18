$("form.stocksearch").on("submit", function(event) {
    event.preventDefault();
    var ticker = $("#tickersearch").val().trim();
    window.open("stock?ticker=" + ticker);
});
