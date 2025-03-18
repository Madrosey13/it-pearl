async function GetStock() {
    "use strict";

    // Get a reference to the form - Use the ID of the form
    let form = $("#currency");
    
      // If all of the form elements are valid, the get the form values
    if (form.valid()) {
        
        function fetchCurrencyData(){
            const fromCurrency = document.getElementById("fromCurrency").value;
            const toCurrency = document.getElementById("toCurrency").value;
            const fromDate = document.getElementById("fromDate").value;
            const toDate = document.getElementById("toDate").value;

            const apiKey = "YOUR_API_KEY";
            const url = "https://api.polygon.io/v2/aggs/ticker/C:${fromCurrency}${toCurrency}/range/1/day/${fromDate}/${toDate}?apiKey=${apiKey}";

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    renderChart(data);
                })
                .catch(error => console.error("Error fetching data:", error));
        }

        function renderChart(data){
            const ctx = document.getElementById("currencyChart").getContext("2d");
            const labels = data.results.map(entry => entry.t);
            const values = data.results.map(entry => entry.c);

            new Chart(ctx, {
                type:"line",
                data: {
                    labels: labels,
                    datasets: [{
                    data: values,
                    borderColor: "blue",
                    borderWidth: 1
                    }]
                },
                options:{
                    responsive: true,
                    scales: {
                        x: {title: {display: true, text: "Date"}},
                        y: {title: {display: true, text: "Value"}}
                    }
                }
            });
        }

        /* URL for AJAX Call https://api.polygon.io/v2/aggs/ticker/C:EURUSD/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey= **/
        let myURL1 = "https://api.polygon.io/v2/aggs/ticker/C:" + fromcurrency + tocurrency + "/range/1/day/" + fromdate + "/" + todate +"?adjusted=true&sort=asc&apiKey=" + apiKey;
        /* Make the AJAX call */
        let msg1Object = await fetch(myURL1);
        /* Check the status */
        if (msg1Object.status >= 200 && msg1Object.status <= 299) {            
            let msg1JSONText = await msg1Object.text();
            // Parse the JSON string into an object
            let msg1 = JSON.parse(msg1JSONText);
            /* Your code to process the result goes here - 
               display the returned message */
            document.getElementById("company").innerHTML = msg1.results.name;
            document.getElementById("address").innerHTML = msg1.results.address.address1 + ", " + msg1.results.address.city + ", " 
                + msg1.results.address.state + "   " + msg1.results.address.postal_code;
            document.getElementById("employees").innerHTML = msg1.results.total_employees;
            document.getElementById("description").innerHTML = msg1.results.sic_description;
            document.getElementById("url").innerHTML = msg1.results.homepage_url;
            document.getElementById("url").href = msg1.results.homepage_url;
        }
        else {
            /* AJAX complete with error - probably invalid stock ticker symbol */
                /* Your code to process the result goes here - 
                   display the returned message */
            alert("Stock Not Found - Status: " + msg1Object.status)
            return;
        }        
    }
}

function ClearForm() {
    "use strict;"
    document.getElementById("StockSymbol").value = "";
    document.getElementById("StockSymbolError").innerHTML = "";
    document.getElementById("company").innerHTML = "";
    document.getElementById("address").innerHTML = "";
    document.getElementById("employees").innerHTML = "";
    document.getElementById("description").innerHTML = "";
    document.getElementById("url").innerHTML = "";
    document.getElementById("url").href = "#";
    
}