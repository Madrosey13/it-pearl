$(documnent).ready(function(){
    $("#DisplayCurrency").click(GetCurrency);
    $("#Clear").click(ClearForm);
});

let myChart0;

async function GetCurrency(){
    "use strict";

    let form =$("#currency");
    if (form.valid()){
        let baseCurrency = document.getElementById("baseCurrency").value;
        let convertCurrency = document.getElementById("convertCurrency").value;
        let apiKey = "1jskOv89X78xC7cODOKkjT916wwZT2qS";
        let fromDate = document.getElementById("fromDate").value;
        let toDate = document.getElementById("toDate").value;

        let myURL = `https://api.polygon.io/v2/aggs/ticker/C:${BaseCurrency}${ConvertCurrency}/range/1/day/${FromDate}/${ToDate}?apiKey=${apiKey}`;
        let response = await fetch(myURL);

        if (response.ok){
            let data = await response.json();

            if (!data.results || data.results.lenth === 0){
                alert("No currency data found for the selected dates.");
                return;
            }

            let labels = [];
            let dataPoints = [];
            
            data.results.forEach(item =>{
                let date = new Date(item.t);
                labels.push(`${date.toLocaleString('en-US',{month:'short'})}${date.getDate()}`);
                dataPoints.push(parseFloat(item.c).toFixed(3));
            });

            let ctx0 = document.getElementById("chartjs-0").getContext('2d');

            if (myChart0){
                myChart0.destroy();
            }

            myChart0 = new CharacterData(ctx0, {
                type: "line"
                data:{
                    labels: labels,
                    datasets:[{
                        label:`One (${baseCurrency} to ${convertCurrency})`,
                        data: dataPoints,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        lineTension: 0.1
                    }]
                },
                options:{
                    responsive: true,
                    maintainAspectRatio: false,
                    title:{
                        display:true,
                        text:`${baseCurrency}to ${convertCurrency}`
                    },
                    scales:{
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: `${convertCurrency}`
                            },
                            ticks:{
                                callback: function (value){
                                    return parseFloat(value).toFixed(3);
                                }
                            }
                        }]
                    }
                }
            });

        } else{
            alert("Currency data not found! Status:"+ response.status);
        }
    }
}

function ClearForm(){
    "use strict";
    $("#baseCurrency").val("");
    $("#convertCurrency").val("");
    $("#fromDate").val("");
    $("#toDate").val("");

    if (myChart0){
        myChart0.destroy();
        myChart0 = null;
    }
}