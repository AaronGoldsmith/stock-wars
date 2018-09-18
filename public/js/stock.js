var prices = [];
var dates = [];
var chartColor;
var marketCap;

$("#stockSearch").on("submit", function(event) {
    prices = [];
    dates = [];

    event.preventDefault();
    $(".news").empty();
    var ticker = $("#ticker").val().trim();
    $("#ticker").val('');
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
        $("#tickername").text(response.quote.companyName + " (" + response.quote.symbol + ")");
        $(".change").text("$" + response.quote.latestPrice + " ($" + response.quote.change + "/" + ((response.quote.changePercent * 100).toFixed(2)) + "%)");
        
        //Changing colors depending if stock is up or down
        if(response.quote.change > 0) {
        $(".change").css("color", "green");
        chartColor = "rgb(0,128,0)";
        } else {
        $(".change").css("color", "red");
        chartColor = "rgb(256,0,0)";  
        }

        var newsDiv = $("<div class='newsArticle'>");
        newsDiv.append("<h2 class='newsheader'>News</h2>")
        for(var i = 0; i < response.news.length; i++) {
            var newHeader = $("<h2 class='newsArticleHeader'>" + response.news[i].headline + "</h2>");
            newsDiv.append(newHeader);

            var newBody = $("<h4 class='newsBody'>" + response.news[i].summary + "</h4>");
            newsDiv.append(newBody);

            var newButton = $("<a class='articleLink' target='_blank' href='" + response.news[i].url + "'>View Article</a>");
            newsDiv.append(newButton);
        }
        $(".news").append(newsDiv);
        $(".52weekh").text("$" + response.quote.week52High);
        $(".52weekl").text("$" + response.quote.week52Low);
        $(".marketcap").text(response.quote.marketCap);
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

    })
})