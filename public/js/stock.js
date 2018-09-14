var axios = require('axios')
function getStock(SYM){
    var queryURL = `https://api.iextrading.com/1.0/stock/${SYM}/book`
    axios.get(queryURL).
    then(function(response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });

}
getStock("TSLA");