src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js";
src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js";


$(document).ready(function(){

    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d")
    .then(function(res){
      res.json().then(function(data){
        console.log(data);

          for(let i=0; i<=data.length-1; i++){
            var img = document.createElement('img');
            img.src = (data[i].image.replace("large","thumb"));

            let oneHrPercentage = `${data[i].price_change_percentage_1h_in_currency}`
            let oneHrPercentageColor = "red"
            if (oneHrPercentage > 0) oneHrPercentageColor = "green"

            let twentyFourHrPercentageChange = `${data[i].price_change_percentage_24h}`
            let twentyFourHrPercentageChangeColor = "red"
            if (twentyFourHrPercentageChange > 0) twentyFourHrPercentageChangeColor = "green"

              function populateTable(){

              const userTable = $('#userTable');
              userTable.append(
              $('<tr class="content-row"></tr>').append(
                $('<td></td>').text(data[i].market_cap_rank),
                $('<td></td>').text(data[i].name),
                $('<td></td>').html(img),
                $('<td></td>').text(new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(data[i].current_price.toFixed(2))),
                $('<td></td>').text(data[i].price_change_percentage_1h_in_currency.toFixed(2)).css("color", oneHrPercentageColor),
                $('<td></td>').text(data[i].price_change_percentage_24h.toFixed(2)).css("color", twentyFourHrPercentageChangeColor),
                $('<td></td>').text(new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(data[i].market_cap.toFixed(2))),

              )
            )
          }
        populateTable();
      }
    })

  })
})
