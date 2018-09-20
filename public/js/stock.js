var prices = [];
var dates = [];
var chartColor;
var marketCap;

//The below three lines take the URL that was sent and take out the ticker symbol, then assign to ticker
var url = window.location.href;
var split = url.split("=");
var ticker = split[1];

var total = $("#display-total")
var currentPrice;

$("#ticker").val(ticker);
<<<<<<< HEAD
    prices = [];
    dates = [];

    var query = "https://api.iextrading.com/1.0/stock/" + ticker + "/batch?types=quote,news,chart&range=6m&last=2";

    $.ajax({url: query, success: function(response) {
        //Display the information
        $(".allinfo").css("display", "block");
        //Loop through to create information for chart, starting at most recent
        for(var i = (response.chart.length - 1); i >= 0; i-=10) {
            var price = response.chart[i].close;
            var date = response.chart[i].date;
            prices.push(price);
            dates.push(date);
        }
        
        //Reversing prices and dates so they appear in order
        prices = prices.reverse();
        prices.push(response.quote.latestPrice);
        dates = dates.reverse();
        dates.push('Today')
        var change;
        if (response.quote.change < 0) {
            change = "-$" + (response.quote.change * -1);
        } else {
            change = "$" + response.quote.change;
        }
        $("#tickername").text(response.quote.companyName + " (" + response.quote.symbol + ")");
        $(".change").text(" (" + change + "/" + ((response.quote.changePercent * 100).toFixed(2)) + "%)");
        $("#cp").text("$"+response.quote.latestPrice)
        //Changing colors depending if stock is up or down
        if(response.quote.change > 0) {
=======

    // prices = [];
    // dates = [];

var query = "https://api.iextrading.com/1.0/stock/" + ticker + "/batch?types=quote,news,chart&range=6m&last=2";

$.ajax({url: query, success: function(response) {
//Display the information
    $(".allinfo").css("display", "block");
    //Loop through to create information for chart, starting at most recent
    //Also does every 10 days
    for(var i = (response.chart.length - 1); i >= 0; i-=10) {
        var price = response.chart[i].close;
        var date = response.chart[i].date;
        prices.push(price);
        dates.push(date);
    }

    //Reversing prices and dates so they appear in order
    prices = prices.reverse();

    //Today's price isn't in API call, so we are adding that below
    prices.push(response.quote.latestPrice);
    dates = dates.reverse();
    dates.push('Today');

    //For display purposes, using changing the currency format. "-" was appearing after "$".
    var change;

    if (response.quote.change < 0) {
        change = "-$" + (response.quote.change * -1);
    } else {
        change = "$" + response.quote.change;
    }

    //Displaying company name a ticker symbol from API
    $("#tickername").text(response.quote.companyName + " (" + response.quote.symbol + ")");

    //Displaying latest price, $ change, and % change
    $(".change").text("$" + response.quote.latestPrice + " (" + change + "/" + ((response.quote.changePercent * 100).toFixed(2)) + "%)");

    //Changing colors depending if stock is up or down for the day
    if(response.quote.change > 0) {
>>>>>>> master
        $(".change").css("color", "green");
        chartColor = "rgb(0,128,0)";
    } else {
        $(".change").css("color", "red");
        chartColor = "rgb(256,0,0)";  
    }

    //Presenting news articles to the user for the specific stock
    var newsDiv = $("<div class='newsArticle'>");
    for(var i = 0; i < response.news.length; i++) {
        var newHeader = $("<h2 class='newsArticleHeader'>" + response.news[i].headline + "</h2>");
        newsDiv.append(newHeader);

        var newBody = $("<h4 class='newsBody'>" + response.news[i].summary + "</h4>");
        newsDiv.append(newBody);

        var newButton = $("<a class='articleLink' target='_blank' href='" + response.news[i].url + "'>View Article</a>");
        newsDiv.append(newButton);
    }

    //Formatting market cap into currency with commas and regEx.
    var marketCap = response.quote.marketCap;
    marketCap = marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    //Adding metrics for the user to view about a specific stock
    $(".news").append(newsDiv);
    $(".52weekh").text("$" + response.quote.week52High);
    $(".52weekl").text("$" + response.quote.week52Low);
    $(".marketcap").text("$" + marketCap);
    $(".peratio").text(response.quote.peRatio);

}}).then(function() {
//Using chart.js to show stock chart
    var ctx = document.getElementById("myChart").getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                fill: false,
                borderColor: chartColor,
                data: prices,
                lineTension: 0
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
});


//Scripting to purchase stock
var form = $("#transForm");
var quantity = $("#quantity");

form.on("submit", function(event) {
    event.preventDefault();
    $(".validateuser").remove();
    //Validation for length of ticker
    if(ticker.length === 0) {
        return;
    };

    var currentPrice;

    var query = `https://api.iextrading.com/1.0/stock/${ticker}/price`
    //Call to IEX Trading to see the current stock price
    $.ajax({url: query, success: function(result){
        currentPrice = result;
    }}).then(function() {
    
        var bsChoice = $("#bsChoice").val();

        var bsquantity = $("#quantity").val().trim();

        //If selling stock the quantity turns to negative
        if(bsChoice === "Sell") {
            bsquantity *= -1;
        }
        //The total is negative too then
        var total = currentPrice * bsquantity;
        var transaction = {
            ticker: ticker,
            quantity: bsquantity,
            price: currentPrice,
            total_price: total  
        }
        //Post to database of the transaction
        $.post("/api/transaction", transaction).then(function(response) {
            //Validation that will be sent to user if there is not enough cash
            if(response === "Not enough cash") {
                var newRes = $("<p style='color:red' class='validateuser'>You do not have enough available cash to complete this transaction. Please try again.</p>");
                $("#transForm").append(newRes);
            } else {
                var newRes = $("<p style='color:green' class='validateuser'>You have completed your transaction.</p>");
                $("#transForm").prepend(newRes);
                
                window.location.replace("/dashboard");
            }
        });
    });
});