var prices = [];
var dates = [];
var chartColor;
var marketCap;

var url = window.location.href;
var split = url.split("=");
var ticker = split[1];

$("#ticker").val(ticker);
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
        $(".change").text("$" + response.quote.latestPrice + " (" + change + "/" + ((response.quote.changePercent * 100).toFixed(2)) + "%)");
        
        //Changing colors depending if stock is up or down
        if(response.quote.change > 0) {
        $(".change").css("color", "green");
        chartColor = "rgb(0,128,0)";
        } else {
        $(".change").css("color", "red");
        chartColor = "rgb(256,0,0)";  
        }

        var newsDiv = $("<div class='newsArticle'>");
        for(var i = 0; i < response.news.length; i++) {
            var newHeader = $("<h2 class='newsArticleHeader'>" + response.news[i].headline + "</h2>");
            newsDiv.append(newHeader);

            var newBody = $("<h4 class='newsBody'>" + response.news[i].summary + "</h4>");
            newsDiv.append(newBody);

            var newButton = $("<a class='articleLink' target='_blank' href='" + response.news[i].url + "'>View Article</a>");
            newsDiv.append(newButton);
        }

        var marketCap = response.quote.marketCap;
        marketCap = marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        $(".news").append(newsDiv);
        $(".52weekh").text("$" + response.quote.week52High);
        $(".52weekl").text("$" + response.quote.week52Low);
        $(".marketcap").text("$" + marketCap);
        $(".peratio").text(response.quote.peRatio);


    }}).then(function() {
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
            var bsChoice = $("#bsChoice").val();
            console.log(bsChoice);
            var bsquantity = $("#quantity").val().trim();
            if(bsChoice === "Sell") {
                bsquantity *= -1;
            }
            var transaction = {
                ticker: ticker.val().trim(),
                quantity: bsquantity,
                price: currentPrice,
                total_price: total  
            }
            $.post("/api/transaction", transaction)
        });

        
});