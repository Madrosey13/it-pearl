async function GetStock() {
    "use strict";

    // Get a reference to the form - Use the ID of the form
    let form = $("#currency");
    
      // If all of the form elements are valid, the get the form values
    if (form.valid()) {
        
        let fromcurrency= "USD"
        let tocurrency= "EUR"
        let fromdate= "2025-02-18"
        let todate= "2025-02-21"
        let apiKey = "35eaVfKsObXpSg2O4kMLj9udr2DgVW1f"

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