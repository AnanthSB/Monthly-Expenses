// JS Codes for Monthly Expenses Project in one file
showItems();   //this function calls out as soon as the Document page is loaded, 
fetchYears(); //this function calls out as soon as the Document page is loaded, 

// add function
function addBtn() {
    let item = document.getElementById('item').value;
    let cost = Number(document.getElementById('cost').value);
    if (item.length >= 3 && (parseInt(cost) > 1)) {
        let items = localStorage.getItem('items');
        if (items == null) {
            itemsObj = [];
        }
        else {
            itemsObj = JSON.parse(items);
        }
        let a = new Date();
        a = a.toGMTString();
        let date = a.slice(5, 16);

        let b = new Date();
        let time = b.toLocaleTimeString();
        let dateNtime = date.concat(` ${time}`)

        itemsObj.push({ item: item, date: dateNtime, cost: parseInt(cost) });

        // To Test/set date and time setting Manually.
        // With the help of this for loop you can add an item with your specified date and time.unlike current date and time
        // for (let i = 0; i < 1; i++) {
        //     itemsObj.push({ item: item, date: (`25 Sep 2025 6:48:29 pm`), cost: parseInt(cost)});
        // }

        localStorage.setItem('items', JSON.stringify(itemsObj));
        showItems();

    } else if (parseInt(cost) <= 0) {
        alert('Amount must be > 0');
    } else if (item != "" && item.length <= 3) {
        alert('Item length must be > 3');
    }
    window.location.reload();
}

// Delete function
function deleteItem(index) {
    let items = localStorage.getItem('items');
    if (items == null) {
        itemsObj = [];
    }
    else {
        itemsObj = JSON.parse(items);
    }
    itemsObj.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(itemsObj));

    let sum = 0;
    let html = "";
    itemsObj.forEach(function (element, index) {
        html += `<tr class="tr">
        <td class="td1">${index + 1}</td>
        <td class="itemName">
            <span>${element.item}</span> <span>${element.date}</span> </td> <td class="costPadding">${element.cost}
        </td>
        <td><button id = "${index}" onclick="deleteItem(this.id)" >Delete</button></td></tr>`;
        if (sum > element.cost) {
            sum = element.cost + sum;
        } else {
            sum = sum + element.cost;
        }
    });
    let tbody = document.getElementById('tbody');
    if (itemsObj.length != 0) {
        document.getElementById('totalspan').innerHTML = sum;
        tbody.innerHTML = html;
    } else {
        tbody.innerHTML = `<tr class= "noItems"><td>No items to show! Use 'Add an Expense' section above to add items.</td></tr>`;
        if (itemsObj.length == 0) {
            document.getElementById('totalspan').innerHTML = 0;
        }
    }
    showNotes();
    fetchYears();
}

// Function to show items data into table row from localStorage 
function showItems() {                                              //This funtion firstly fetch the localStorage whether an 
    let items = localStorage.getItem('items');                      //item is there by the name 'item' or not, if the 'item' is empty
    let sum = 0;
    if (items == null) {
        itemsObj = [];
    }
    else {
        itemsObj = JSON.parse(items);
    }
    let html = "";
    itemsObj.forEach(function (element, index) {
        html += `<tr class="tr">
        <td class="td1">${index + 1}</td>
        <td class="itemName">
            <span>${element.item}</span> <span>${element.date}</span> </td> <td class="costPadding">${element.cost}
        </td>
        <td><button id = "${index}" onclick="deleteItem(this.id)" >Delete</button></td></tr>`;
        if (sum > element.cost) {
            sum = element.cost + sum;
        } else {
            sum = sum + element.cost;
        }
    });
    let tbody = document.getElementById('tbody');
    if (itemsObj.length != 0) {
        tbody.innerHTML = html;
        document.getElementById('totalspan').innerHTML = sum;
    } else {
        tbody.innerHTML = `<tr class= "noItems"><td>No items to show! Use 'Add an Expense' section above to add items.</td></tr>`;
        if (itemsObj.length == 0) {
            document.getElementById('totalspan').innerHTML = 0;
        }
    }
}

//fetchYears(); to set years in years drop-down list as per the localstorage available years.
//#yearSelection
function fetchYears() {
    let items = localStorage.getItem('items');
    var years = [];
    var yearsSet = new Set();
    if (items == null) {
        itemsObj = [];
    } else {
        itemsObj = JSON.parse(items);
    }
    itemsObj.forEach(function (element, index) {
        years.push((element.date).slice(7, 11));
    })
    yearsSet = new Set(years);
    localStorage.setItem('years', JSON.stringify(yearsSet));

    let elemTag = document.getElementById('yearSelection');
    let str1 = "";
    let y = localStorage.getItem('years');
    y = JSON.parse(y);
    yearsSet.forEach(function (element) {
        elemTag.innerHTML += `<option value="${element}">${element}</option>`;
    });
};

// search by Year and month value , located goBtn inside navbar-r top-right-side.
//This event takes year and month input and shows in table rows by following steps 
let searchYear = document.getElementById('yearSelection');
let searchMonth = document.getElementById('monthSelection');
let goBtn = document.getElementById('GoBtn');
goBtn.addEventListener('click', () => {
    let searchYValue = searchYear.value;
    let searchMValue = searchMonth.value;
    let items = document.getElementsByClassName('tr');
    let totalSum = 0;
    Array.from(items).forEach(function (element) {
        let itemTxt = element.getElementsByClassName("itemName")[0];

        if ((itemTxt.innerHTML).includes(searchYValue) && (itemTxt.innerHTML).includes(searchMValue)) {
            element.style.display = "grid";
            totalSum += parseInt(element.children[2].innerHTML);
        }
        else {
            element.style.display = "none";
        }
    });
    document.getElementById('totalspan').innerHTML = `${totalSum}`;
    document.getElementById('navbar-r-b').innerHTML = `<b>|||</b>`;
    document.getElementById('navbar-r-b').style.transform = "rotate(90deg)";
    document.getElementById('navbar-rOnclick').style.fontWeight = "font-weight: 900";
    document.getElementById('navbar-rOnclick').style.visibility = "hidden";
    document.getElementById('moreData').style.visibility = "hidden";
    clicks = 1;
});
//After clicking cancel btn the entered test will be removed and Document will be reloaded
document.getElementById('searchCancelBtn').onclick = () => {
    document.getElementById('searchTxt').value = "";
    showItems();
}

//#navbar-r -Events on click, located inside #container top-right
var clicks = 1;
document.getElementById('navbar-r').onclick = () => {
    clicks += 1;
    if (clicks % 2 == 0) {
        let moreContainer = document.getElementById('moreContainer');
        moreContainer.style.border = "0px solid beige";                                     //sets border to 1px as user clicks

        document.getElementById('navbar-r-b').innerHTML =
         `<i class="clearable__clear" id="navbar-r-b-cancelBtn">&times;</i>`
        document.getElementById('navbar-rOnclick').style.visibility = "visible";            //navbar-rOnclick div containing history Box and its Feaures visible on clik on the button 'navbar-r'
    } else {
        let moreContainer = document.getElementById('moreContainer');

        moreContainer.style.border = "1px solid beige";
        moreArrow.innerHTML = `<i class="fa fa-angle-down" aria-hidden="true"></i>`;
        document.getElementById('navbar-r-b').innerHTML = `<b>|||</b>`;                     //returns back to normal navMenu style
        document.getElementById('navbar-rOnclick').style.fontWeight = "font-weight: 900";
        document.getElementById('navbar-rOnclick').style.visibility = "hidden";
        document.getElementById('moreData').style.visibility = "hidden";
    }
}

//#moreDiv -Events on click, located inside History box
let clicks2 = 1;
document.getElementById('moreDiv').onclick = () => {
    clicks2 += 1;
    // if clicks2 is even number then show/ else hide
    if (clicks2 % 2 == 0) {
        let moreArrow = document.getElementById('moreArrow');
        let moreContainer = document.getElementById('moreContainer');

        moreArrow.innerHTML = `<i class="fa fa-angle-up" aria-hidden="true"></i>`;      //change angle-down  to up
        moreContainer.style.border = "1px solid beige";                                 // sets border to 1px as user clicks
        document.getElementById('moreData').style.visibility = "visible";
    } else {
        let moreArrow = document.getElementById('moreArrow');
        let moreContainer = document.getElementById('moreContainer');

        moreArrow.innerHTML = `<i class="fa fa-angle-down" aria-hidden="true"></i>`;
        moreContainer.style.border = "0px solid beige";
        document.getElementById('moreData').style.visibility = "hidden";
    }
}

// _______________________________________________________________________________________________________________
//One function 'func()' for finding Highest,Lowest and Average spending Amount/PM     
function func() {
    let elem = document.getElementById('tbody').childNodes;
    let months = [];                                               //1st forLoop collecting all month strings and pushing into array months
    for (let i=0; i<elem.length; i++) {
        let str = elem[i].children[1].children[1].innerHTML;
        str = str.slice(3, 6);
        months.push(str);
    }
    months = new Set(months);
    var monthsLi = [];
    months.forEach(function (e, i) {
        monthsLi.push(e);
    });
    // _____________________________________
    // let elem = $('tr');
    let years = [];            //in 2nd forLoop collecting months
    for (let i = 0; i < elem.length; i++) {
        let str = elem[i].children[1].children[1].innerHTML;
        str = str.slice(7, 11);;
        years.push(str);
    }
    years = new Set(years);
    var yearsLi = [];
    years.forEach(function (e, i) {
        yearsLi.push(e);
    });
    // console.log(yearsLi);

    // loop by yearsLi____________________
    // let yearsLi = [2020, 2021];                  
    var listB = [];
    for (let h = 0; h < yearsLi.length; h++) {

        // loop by MonthLi____________________
        // monthsLi = ["Mar", "Apr", "Sep", "May", "Jun"]
        var listD = [];
        for (let i = 0; i < monthsLi.length; i++) {
            var a = `${monthsLi[i]}`;
            var obj = {};
            obj[a] = 0;

            //loop whole tr for required data extraction
            let items = $('tr');
            for (let j = 0; j < items.length; j++) {
                let str = items[j].children[1].children[1].innerHTML;

                if (str.includes(yearsLi[h]) && str.includes(monthsLi[i])) {
                    obj[a] += parseInt(items[j].children[2].innerHTML);
                }
            }
            // console.log(obj[a]);
            let x = `${monthsLi[i]}-${yearsLi[h]}`;
            let obj2 = {};
            obj2[x] = obj[a];
            listD.push(obj2);
            // obj[a] = 0;
        };
        // console.log(listD);

        let y = `${yearsLi[h]}`;
        let obj3 = {};
        obj3[y] = listD;
        listB.push(obj3);                                           // listB is array containing objects as{2021:(2)[…] }, wherein again object-2021 contains an array of two objects, where each objects having month-year key and total spent of that month as values. ex:[{"Sep-2021":1000},{"Oct-2021":1500}]
    };

    //navbar-r-b_section_________________OR______Sorting Yearly,Monthly and daily Section
    let lis = [];
    listB.forEach(function (elem, ind) {                            //Yearly iterating listB Array which has yearly sorted objects of Array
        for (var key in elem) {                                     //
            let monthValues = elem[key]                             //ex: monthValues[0]:[{"Sep-2021":1000},{"Oct-2021":1500}]
            var monthsL = [];                                       //
            monthValues.forEach(function (e, i) {                   //e  means element of monthValues array
                for (var key in e) {
                    var month1 = key;                               //ex: "Sep-2021"
                    var amount1 = e[key]                            //ex: 1000

                    let a1 = `${month1}`;
                    let obj1 = {};                                  //obj1 is created 
                    obj1[a1] = amount1;                             //a1 is key and obj1[a1] is value
                    monthsL.push(obj1);                             //monthsL is an array of objects with key:value pair,
                }                                                   //where objects are containing monthName:Value pair
            });
        }
        for (let i = 0; i < monthsL.length; i++) {                  // Monhtly iteration monthsL is array having objects which contains month:amount pairs
            for (var key in monthsL[i]) {
                var mKey = key;
                var mValue = monthsL[i][mKey];
                let keyStr = mKey;
                let value = mValue;
                lis.push(`${keyStr} ${value}`);                     //lis gonna be pushed ["Sep-2021 1000", "Oct-2021 1500","Sep-2022 0", "Oct-2022 2000"] pushing . Note there is space before amount
            }
        }
    });

    let strList = [];
    for (let i = 0; i < lis.length; i++) {                          //iterating lis,slicing and getting amount into an array strList
        let str = lis[i];
        str = parseInt(str.slice(9));                               //slicing from 9th index of str string i,e 'Sep-2024 900' ,returns 900
        if (str != 0) {
            strList.push(str);
        } else {
            continue;                                               //ignoring 0 as its optionally added automatically in lis array
        }
    }
    strList = strList.sort(function (a, b){ return b-a });          //Sorting descending order ex:[ 2100, 2000, 1900, 1500, 1300, 900, 500 ]
    let hAmount = parseInt(strList[0]);                             //hAmount as highest amount spent
    let lAmount = parseInt(strList[strList.length - 1]);            //lowest amount spent

    for (let i=0; i<lis.length; i++) {                              //iterating lis Array to slice and get amount from each element,
        let num = parseInt(lis[i].slice(9));                        //slicing from 9thIndex to get amount value 
        if (num == hAmount) {                                   
            hAmount = lis[i];                                   
        }
        if (num == lAmount) {
            lAmount = lis[i];
        }
    }

    //Average Spending/PM -section
    let avrgAmount = 0;
    for(let i=0; i<strList.length; i++){
        avrgAmount += parseInt(strList[i]);
    }
    FinalAvrgAmount = parseInt(avrgAmount/strList.length);  //averageAmount  
    
    // console.log(`Highest-spent : ${hAmount}`);                   //Highest-spent : Oct-2021 385
    // console.log(`Lowest-spent : ${lAmount}`);                    //Lowest-spent : Oct-2021 385
    // console.log(`Average-spending/PM : ${FinalAvrgAmount}`);     //Average-spending/PM : 385
    // // console.log(strList);
    // // console.log(lis);

    let elemTag1 = document.getElementById('moreMonth1');
    let dateMo = hAmount.slice(0,8);
    let amount = hAmount.slice(9);
    // console.log(amount);
    elemTag1.innerHTML = `<span>${dateMo}</span> &nbsp;&nbsp;&nbsp;Rs.<span>${amount}</span>`;
    
    let elemTag2 = document.getElementById('moreMonth2');
    let dateMoLow = lAmount.slice(0,8);
    let amountLow = lAmount.slice(9);
    elemTag2.innerHTML = `<span>${dateMoLow}</span> &nbsp;&nbsp;&nbsp;Rs.<span>${amountLow}</span>`;

    let eleTag3 = document.getElementById('moreMonth3');
    eleTag3.innerHTML = `<p>Rs.${FinalAvrgAmount}</p>`;
};
func();


// Search div for filtering table row data by each charectors and showing total sum
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let items = document.getElementsByClassName('tr');
    let sum = 0;
    Array.from(items).forEach(function (element,i) {
        let itemTxt = element.getElementsByClassName("itemName")[0].innerText.toLowerCase();
        let itemCost = element.getElementsByClassName("costPadding")[0].innerText;
        if (itemTxt.includes(inputVal)) {
            sum += parseInt(itemCost);
            element.style.display = "grid";
        }
        else {
            element.style.display = "none ";
        }
    });
    document.getElementById('totalspan').innerHTML = sum;
});