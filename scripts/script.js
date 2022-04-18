//PURCHASE FORM

let tickets = {
    choiceOfTicket : [1000,500,5000],
    duration : [0,250,500,1000]
}

function calculateTotalCost(){
    var choiceOfTicket = tickets["choiceOfTicket"];
    var outlayOfDuration = tickets["duration"];
    var outlay = 0;
    var extras = 0;
    var choice = document.getElementById("choice").value;
    if(choice == ""){
        alert("Choose your preferance");
        document.getElementById("choice").focus
        return false;
    }

    choice = parseInt(choice);
    var costOfTicket = choiceOfTicket[choice];
    var adultTicket = document.getElementById("numberOfAdults").value;
    if (adultTicket == ""){
        adultTicket = 0;
    }
    else{
        adultTicket = parseInt(adultTicket);
    }

    var childTicket = document.getElementById("numberOfChildren").value;
    if (childTicket == ""){
        childTicket = 0;
    }
    else{
        childTicket = parseInt(childTicket);
    }
    var duration = document.getElementById("duration").value;
    duration = parseInt(duration);
    
    if(adultTicket > 0 || childTicket > 0){
        extras = outlayOfDuration[duration]; //extra charges
    }

    var foodToken = document.getElementById("noOfTokens").value;
        foodToken = parseInt(foodToken*500);
    var annualPass = document.getElementById("noOfPasses").value;
        annualPass = parseInt(annualPass*5000);

    var adultCost = costOfTicket*adultTicket;
    var childCost = (costOfTicket/2)*childTicket;
    outlay = parseFloat(adultCost+childCost+extras+foodToken+annualPass);
    document.getElementById("outlay").innerHTML = outlay.toFixed(2);

}
var numberOfRows = 0;
function addToOrder(){
    var now = new Date();
    var month = new Array("1","2","3","4","5","6","7","8","9","10","11","12");
    console.log(now.getDate()+"/"+month[now.getMonth()]+"/"+now.getFullYear());

    var outlay = parseFloat(document.getElementById("outlay").innerHTML);
    if(outlay == 0){
        alert("Kindly fill the form below!");
        return;
    }
    var foodToken = document.getElementById("noOfTokens").value;
    var foodOutlay = parseInt(foodToken*500);
    var annualPass = document.getElementById("noOfPasses").value;
    var annualOutlay = parseInt(annualPass*5000);
        

    document.getElementById("bookingInvoice").style = "display: block";

    var ctrlChoice = document.getElementById("choice");
    var selectd_choice = ctrlChoice.options[ctrlChoice.selectedIndex].text;

    var ctrlDuration = document.getElementById("duration");
    var selected_duration = ctrlDuration.options[ctrlDuration.selectedIndex].text;

    var tbody = document.getElementById("tbody");
    var trow = tbody.insertRow(-1)

    var numberOfAdults = document.getElementById("numberOfAdults").value;
    var numberOfChildren = document.getElementById("numberOfChildren").value;
    
    var total = parseFloat(document.getElementById("outlay").innerHTML);
    total = total - (annualOutlay + foodOutlay);

//table
    if(numberOfAdults > 0 || numberOfChildren>0){

        numberOfRows++;

        td1 = trow.insertCell(0);
        td1.innerHTML = selectd_choice;

        td2 = trow.insertCell(1);
        td2.innerHTML = document.getElementById("date").value;

        td3 = trow.insertCell(2);
        td3.innerHTML = selected_duration;

        td4 = trow.insertCell(3);
        td4.innerHTML = numberOfAdults;

        td5 = trow.insertCell(4);
        td5.innerHTML = numberOfChildren;

        td6 = trow.insertCell(5);
        td6.innerHTML=total.toFixed(2);
        td6.style = "text-align:right";

        td7 = trow.insertCell(6);
        td7.innerHTML = "<a href='javascript:void(0)' style='color:pink;font-weight:bold' onclick='clearRecord(this.parentElement);'>X</a>";
    }
//extras
    var grandAnnualPass = parseFloat(document.getElementById("Annual").innerHTML);
    grandAnnualPass = grandAnnualPass + annualPass;
    var grandFoodToken = parseFloat(document.getElementById("Food").innerHTML);
    grandFoodToken = grandFoodToken + foodToken;
    document.getElementById("annualOutlay").innerHTML = grandAnnualPass;
    document.getElementById("foodOutlay").innerHTML = grandFoodToken;
    var grandTotal = parseFloat(document.getElementById("grandTotalOutlay").innerHTML);
    grandTotal = grandTotal+total+annualOutlay+foodOutlay;
    var grandAnnualPassOutlay = parseFloat(document.getElementById("annualOutlay").innerHTML);
    grandAnnualPassOutlay = grandAnnualPassOutlay + annualOutlay;
    var grandFoodTokenOutlay = parseFloat(document.getElementById("foodOutlay").innerHTML);
    grandFoodTokenOutlay = grandFoodTokenOutlay + foodOutlay;

    document.getElementById("annualOutlay").innerHTML = grandAnnualPassOutlay.toFixed(2);
    document.getElementById("clearPass").innerHTML = "<a href='javascript:void(0)' style='color:aliceBlue;font-weight:bold' onclick='clearPass(this.parentElement);'>X</a>";
    document.getElementById("foodOutlay").innerHTML = grandFoodTokenOutlay.toFixed(2);
    document.getElementById("clearToken").innerHTML = "<a href='javascript:void(0)' style='color:aqua;font-weight:bold' onclick='clearToken(this.parentElement);'>X</a>";
    document.getElementById("grandTotalOutlay").innerHTML = grandTotal.toFixed(2);

    resetForm1();
}

function clearRecord(selected_item){
    var value = confirm("Clear record.");
    
    if(value == true){
        var table = document.getElementById("invoice");
        var grandTotal = parseFloat(document.getElementById("grandTotal").innerHTML);
        var total = parseFloat(selected_item.parentElement.cells[5].innerHTML);
        grandTotal = grandTotal - total;
        document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);
        table.deleteRow(selected_item.parentElement.rowIndex);
        numberOfRows--;
    }
   

}
function clearPass(){
    var grandAnnualPassOutlay = parseFloat(document.getElementById("annualOutlay").innerHTML);
    var grandTotal = parseFloat(document.getElementById("grandTotal").innerHTML);
    var grandAnnualPass = document.getElementById("Annual").innerHTML;

    if(grandAnnualPassOutlay >  0){
        grandAnnualPassOutlay = grandAnnualPassOutlay-5000;
        grandAnnualPass = grandAnnualPass-1;
        grandTotal = grandTotal-5000;
        var value = confirm("Clear 1 annual pass.");
    }

    
    if( value == true){
        document.getElementById("annualOutlay").innerHTML = grandAnnualPassOutlay.toFixed(2);
        document.getElementById("Annual").innerHTML = grandAnnualPass;
        document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);
    }
}
function placeOrder(selected_item){
    var tableBody = document.getElementById("tbody");
    var grandTotal = document.getElementById("grandTotal").innerHTML

    var value = confirm("Total outlay is " + grandTotal + "\n the Booking's made, thank you! \n Confirm booking");
    
    if(value == true){

        document.getElementById("grandTotal").innerHTML = 0.00.toFixed(2);
        document.getElementById("annualOutlay").innerHTML = 0.00.toFixed(2);
        document.getElementById("foodOutlay").innerHTML = 0.00.toFixed(2);
        document.getElementById("Annual").innerHTML = 0;
        document.getElementById("Food").innerHTML = 0;

        document.getElementById("bookingInvoice").style = "display: none;";

        while(1 < numberOfRows){
            tableBody.deleteRow(selected_item.parentElement.rowIndex);
            numberOfRows++;
        }
    }
}

function resetForm1(){
    document.getElementById("form1").reset();
    document.getElementById("outlay").innerHTML = "0.00";
}


//DONATE FORM
function donateQuota(){
    quota = document.getElementById("quota").value;
}

var finalQuota;
function makeDonation(){
    var fname = document.getElementById("fname").value;
    var residentAddress = document.getElementById("rAddr").value;
    var creditCardNo = document.getElementById("CCNo").value;
    var pinNo = document.getElementById("PIN");

var fnamePattern = /^[A-Za-z\s\.]{2,}$/;
var residentAddressPattern= /^[A-Za-z\d\.\-\/\#\,\s]+$/;
var creditCardNoPattern= /^[0-9]{20,20}$/;
var pinNoPattern = /^[0-9]{4,4}$/;

if( fname == "" || residentAddress == "" || creditCardNo == "" || pinNo == ""){
    alert("Please fill all required the fields");
    return false;
}

if(finalQuota == "Choose your preferance" || finalQuota == ""){
    alert("Please enter the donation amount you prefer.")
    return false;
}

if(!fname.match(fnamePattern)){
    alert("Please enter a valid full name.");
    document.getElementById("fname").focus();
    return false;
}

if(!residentAddress.match(residentAddressPattern)){
    alert("Please enter a valid resident address.");
    document.getElementById("rAddr").focus();
    return false;
}

if(!creditCardNo.match(creditCardNoPattern)){
    alert("Please enter a valid credit card nymber.");
    document.getElementById("CCNo").focus();
    return false;
}

if(!pinNo.match(pinNoPattern)){
    if(pinNo.length<4){
        alert("Pin number requires 4 characters.")
    }
    else{
        alert("Please enter a valid pin number.");
    }
    document.getElementById("PIN").focus();
    return false;
}
document.getElementById("details").style = "display:block";
document.getElementById("confirm").style = "display: block";
}

function confirmDonation(){
    document.getElementById("form2").reset();
    document.getElementById("details").innerHTML = "";
    document.getElementById("details").style = "display:none;";
    document.getElementById("confirm").style = "display:none;";
    var confirm = document.getElementById("confirm").value;

    if(confirm == "Confirm donation"){
        alert("Donation received " + finalQuota);
        return false;
    }
}