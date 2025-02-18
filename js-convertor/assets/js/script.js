function calculate() {
    "use strict";

    // Get a reference to the form - Use the ID of the form
    let form = $( "#convertor" );
    
    // If all of the form elements are valid, the get the form values
    if (form.valid()) {
        
        // Operand
        let operand = document.getElementById("Operand").value;

        // From Unit Operator
        let operator1;
        if (document.getElementById("CMOperator").checked) {
            operator1 = document.getElementById("MOperator").value;
        }
        if (document.getElementById("MOperator").checked) {
            operator1 = document.getElementById("MOperator").value;
        }
        if (document.getElementById("KMOperator").checked) {
            operator1 = document.getElementById("KMOperator").value;
        }
        if (document.getElementById("INOperator").checked) {
            operator1 = document.getElementById("INOperator").value;
        }    
        if (document.getElementById("FTOperator").checked) {
            operator1 = document.getElementById("FTOperator").value;
        }    
        if (document.getElementById("YDOperator").checked) {
            operator1 = document.getElementById("YDOperator").value;
        }
        if (document.getElementById("MIOperator").checked) {
            operator1 = document.getElementById("MIOperator").value;
        }
        
        //To Unit Operator
        let operator2;
        if (document.getElementById("CMOperator2").checked) {
            operator1 = document.getElementById("MOperator2").value;
        }
        if (document.getElementById("MOperator2").checked) {
            operator1 = document.getElementById("MOperator2").value;
        }
        if (document.getElementById("KMOperator2").checked) {
            operator1 = document.getElementById("KMOperator2").value;
        }
        if (document.getElementById("INOperator2").checked) {
            operator1 = document.getElementById("INOperator2").value;
        }    
        if (document.getElementById("FTOperator2").checked) {
            operator1 = document.getElementById("FTOperator2").value;
        }    
        if (document.getElementById("YDOperator2").checked) {
            operator1 = document.getElementById("YDOperator2").value;
        }
        if (document.getElementById("MIOperator2").checked) {
            operator1 = document.getElementById("MIOperator2").value;
        }
        

        CalculateResult(operand, operator1, operator2);
    }
}

async function CalculateResult(operand, operator1, operator2) {
    "use strict;"
        
        // URL and method used with AJAX Call
        let myURL = "https://brucebauer.info/assets/ITEC3650/unitsconversion.php";

        /* AJAX calculator requires Operand1, Operator, and Operand2 */
        myURL = myURL + "?Operand=" + encodeURIComponent(operand) + "&Operator=" + encodeURIComponent(operator1) + "&Operator2=" + encodeURIComponent(operator2);

        /* fetch the results */
        let myCalcObject = await fetch(myURL);
        let myResult = await myCalcObject.text();
        
        document.getElementById("Result").innerHTML = myResult;
}

function clearform() {
    "use strict";
    
    document.getElementById("Operand").value = "";
    document.getElementById("OperandMsg").innerHTML = "";
    
    
    document.getElementById("CMOperator").checked = false;
    document.getElementById("MOperator").checked = false;
    document.getElementById("KMOperator").checked = false;
    document.getElementById("INOperator").checked = false;
    document.getElementById("FTOperator").checked = false;
    document.getElementById("YDOperator").checked = false;
    document.getElementById("MIOperator").checked = false;
    document.getElementById("Operator1Msg").innerHTML = "";

    document.getElementById("CMOperator2").checked = false;
    document.getElementById("MOperator2").checked = false;
    document.getElementById("KMOperator2").checked = false;
    document.getElementById("INOperator2").checked = false;
    document.getElementById("FTOperator2").checked = false;
    document.getElementById("YDOperator2").checked = false;
    document.getElementById("MIOperator2").checked = false;
    document.getElementById("Operator2Msg").innerHTML = "";

    document.getElementById("Result").innerHTML = "";
}

$( "#convertor" ).validate({

});