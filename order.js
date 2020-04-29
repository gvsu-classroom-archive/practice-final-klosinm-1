function getInput() {
    var inputValue = document.getElementById('inputField').value;
    if (inputValue === '') {
        document.getElementById('totalResponse').innerHTML = "Please input an ID from 1-3.";
    } else {
        loadData(inputValue)
    }
}

function formatData(data, inputValue) {

    let response = document.getElementById('totalResponse');

    var htmlString = `<h4>Order: ${inputValue} </h4>
    <table > 
    <tr>  
    <th>Item</th>
    <th>Quantity</th>
    <th>Price</th>
    </tr>`

    var totalCost = 0

    data.forEach((item) => {
        htmlString += `<tr>`
        //i < 3, for 3 columns
        for (var i = 0; i < 3; i++) {
            htmlString += `<td>`
            //columnn of item name
            if (i == 0) {
                htmlString += item.item;
            }
            //column of quantity
            else if (i == 1) {
                htmlString += item.quantity;
            }
            //column of price 
            else if (i == 2) {
                htmlString += "$ " + item.price;
                totalCost = totalCost + (item.price * item.quantity);
            }
            htmlString += `</td align="left">`
        }
        htmlString += `</tr align="left">`
    });

    htmlString += `</table>`
    htmlString += `<hr/>
    <table>
        <tr>
            <th>Total:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </th>
            <td align="left" id="totalCost">${totalCost.toFixed(2)}</td>
        </tr>
    </table> `

    response.innerHTML = htmlString
    document.getElementById('totalResponse').style.visibility = "visible"
}

function loadData(inputValue) {
    console.log("Fetching document");

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        //callpack ref xhr object
        console.log("Detected a change to readyState: " + xhr.readyState);
        console.log(xhr);
        if (xhr.readyState === 4) {
            console.log("The data is ready...");
            //raw string, so we need to parce is/do something with it
            console.log("Data as received: " + xhr.response);
            //create var data
            let data = ""
            try {
                data = JSON.parse(xhr.response);
            } catch {
                //no order id, so send to user that it doesn't exist
                document.getElementById('totalResponse').innerHTML = "Please input an ID from 1-3.";
            }
            console.log("Data after being parsed: " + data);
            formatData(data, inputValue);
        } else {
            document.getElementById('totalResponse').innerHTML = "ready state not 4."
        }
    }
    xhr.open("GET", "https://www.cis.gvsu.edu/~kurmasz/Orders/" + inputValue, true);
    xhr.send();
}

document.getElementById('submit').addEventListener('click', getInput);