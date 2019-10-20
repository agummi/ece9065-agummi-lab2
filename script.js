var masterList = [
    { Name: 'The Alchemist', Due: '30', Type: 'Book', Picture: 'alchemist.jpg' },
    { Name: 'Ignited Minds', Due: '30', Type: 'Book', Picture: 'ignitedminds.jpg' },
    { Name: 'Unlimited Power', Due: '30', Type: 'Book', Picture: 'unlimitedpower.jpg' },
    { Name: 'Good to Great', Due: '30', Type: 'Book', Picture: 'goodtogreat.jpg' },
    { Name: 'The Power of Now', Due: '30', Type: 'Book', Picture: 'thepowerofnow.jpg' },
    { Name: 'Harry potter', Due: '10', Type: 'CD', Picture: 'harrypotter.jpg' },
    { Name: 'Beyond Skyline', Due: '10', Type: 'CD', Picture: 'beyondskyline.jpg' },
    { Name: 'Alice in Wonderland', Due: '10', Type: 'CD', Picture: 'alice.png' },
    { Name: 'Alita:Battle Angel', Due: '10', Type: 'CD', Picture: 'alita.jpg' },
    { Name: 'Fantastic Beasts', Due: '10', Type: 'CD', Picture: 'fantasticbeasts.jpg' }
   
];

var langArr = [
    { ENG: 'The Alchemist', FR: 'Lalchimiste' },
    { ENG: 'Ignited Minds', FR: 'Esprits enflammés' },
    { ENG: 'Unlimited Power', FR: 'Pouvoir illimité' },
    { ENG: 'Good to Great', FR: 'Bon à génial' },
    { ENG: 'The Power of Now', FR: 'le pouvoir du présent' },
    { ENG: 'Harry potter', FR: 'Harry potter' },
    { ENG: 'Beyond Skyline', FR: 'Au-delà de lhorizon' },
    { ENG: 'Alice in Wonderland', FR: 'Alice au pays des merveilles' },
    { ENG: 'Alita:Battle Angel', FR: 'Alita: Ange de bataille' },
    { ENG: 'Fantastic Beasts', FR: 'Bêtes fantastiques' }
    
];

var coList = [];
var currentyear = new Date().getFullYear();
var count = 0;
var currentLang = null;
var aFlag1 = 0;
var aFlag2 = 0;
var j = 0;


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('secondpage').style.display = 'none';
    document.getElementById('checkoutpage').style.display = 'none';
    currentLang = 1;

})


// main function to validate three inputs name email and year of birth
function formValidation() {
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var yob = document.getElementById('birth-year');
    if (name.value.length == 0) {
		alert("Name Field cannot be Empty");
        name.focus();
        return false;
    }
    document.getElementById('head').innerText = '';
    if (name.value == 'admin') {
        aFlag1 = 1;
    }
    if (yob.value == 1867) {
        aFlag2 = 1;
    }
    if (inputAlphabet(name)) {
        if (lengthDefine(name, 5, 100)) {
            if (emailValidation(email)) {
                if (yearValidation(yob)) {
                    if ((currentyear - yob.value > 18)) {
                        ageFormat = '[Foo]';
                    } else {
                        ageFormat = '[Child]';
                    }
                    emailFormat = '(' + email.value + ')'
                    document.getElementById('mainpage').style.display = "none";
                    document.getElementById('checkoutpage').style.display = "none";
                    document.getElementById('secondpage').style.display = "block";
                    if (aFlag1 == 1 && aFlag2 == 1) {
                        document.querySelector('#name2').innerHTML = "Librarian";
                        document.querySelector('#email2').innerHTML = "";
                        document.querySelector('#age').innerHTML = "";
                    } else {
                        document.querySelector('#name2').innerHTML = name.value;
                        document.querySelector('#email2').innerHTML = emailFormat;
                        document.querySelector('#age').innerHTML = ageFormat;
                    }
                    genLib();
                    return true;
                }
            }
        }
    }
    return false;
}

//function to change language
function changeLang(value) {
    if (value == 1 && currentLang !== value) {
        langArr.forEach(function (currentValue) {
            if (masterList.find(x => x.Name == currentValue.FR)) {
                masterList.find(x => x.Name == currentValue.FR)["Name"] = currentValue.ENG;
            }
            if (coList.length > 0) {
                if (coList.find(x => x.Name == currentValue.FR)) {
                    coList.find(x => x.Name == currentValue.FR)["Name"] = currentValue.ENG;
                }
            }
        })
        currentLang = 1;
        genLib();
        gencoLib();
    }
    if (value == 2 && currentLang !== value) {
        // to french
        langArr.forEach(function (currentValue) {
            if (masterList.find(x => x.Name == currentValue.ENG)) {
                masterList.find(x => x.Name == currentValue.ENG)["Name"] = currentValue.FR;
            }
            if (coList.length > 0) {
                if (coList.find(x => x.Name == currentValue.ENG)) {
                    coList.find(x => x.Name == currentValue.ENG)["Name"] = currentValue.FR;
                }

            }
        })
        currentLang = 2;
        genLib();
        gencoLib();
    }
}

//function to log out and clearing text fields
function LogOut() {
    aFlag1 = 0;
    aFlag2 = 0;
    document.getElementById('head').innerText = '';
    document.getElementById('p1').innerText = '';
    document.getElementById('p2').innerText = '';
    document.getElementById('p3').innerText = '';
    document.getElementById('p4').innerText = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('birth-year').value = '';
    document.getElementById('mainpage').style.display = "block";
    document.getElementById('secondpage').style.display = "none";
    switch (currentLang) {
        case 1:
            changeLang(2);
            break;
        case 2:
            changeLang(1);
            break;
    }
}

//function to get back to library page
function backToLibrary() {
    document.getElementById('checkoutpage').style.display = "none";
    document.getElementById('secondpage').style.display = "block";

}

//function to confirm purchase
function confirmPurchase() {
    if (confirm("Checkout " + coList.length + " items, please confirm.")) {
        alert("Purchased " + coList.length + " items");
        count = 0;
        coList = [];
        gencoLib();
        document.getElementById('checkoutpage').style.display = "none";
        document.getElementById('secondpage').style.display = "block";
    } else {
        for (var i = 0; i < coList.length; i++) {
            masterList.push(coList[i]);
        }
        count = 0;
        coList = [];
        gencoLib();
        genLib();
        document.getElementById('checkoutpage').style.display = "none";
        document.getElementById('secondpage').style.display = "block";
    }
}

// function to switch to checkoutpage
function checkOutPage() {
    document.getElementById('checkoutpage').style.display = 'block';
    document.getElementById('secondpage').style.display = 'none';
    gencoLib();

}

// function to generate check out page list
function gencoLib() {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    var due = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toLocaleDateString("en-US", options);
    var cotblString = '';
    var cotblStringHdr = "<tr><th>NAME</th><th>DUE DATE</th><th>ACTION</th></tr>";
    if (coList.length <= 0) {
        document.getElementById("coLib").innerHTML = '';
        document.getElementById("coLib").innerHTML = cotblStringHdr;
    }
    else {
        document.getElementById("coLib").innerHTML = '';
        coList.forEach(function (currentValue, index) {
            console.log(currentValue.name);
            cotblString = cotblString + '<tr><td>' + currentValue.Name + '</td><td><label>' + due + '</label></td><td><button type="button" onclick="remFrmBasket(this)" id="rem_' + (index + 1) + '">Remove</button></td></tr>'; // adding index+1 coz table tr=0 is header
        });
        document.getElementById("coLib").innerHTML = cotblStringHdr + cotblString;
    }
}

function remFrmBasket(i) {
    masterList.push(coList[i.id.split('_')[1] - 1])
    coList.splice(i.id.split('_')[1] - 1, 1);
    genLib();
    if (coList.length > 0) {
        gencoLib();
    }
    else {
        document.getElementById('secondpage').style.display = "block";
        document.getElementById('checkoutpage').style.display = "none";
    }
    count -= 1;
    if (count > 0) {
        document.getElementById('cobutton').innerHTML = 'Shopping Cart (' + (count) + ')';
    } else {
        document.getElementById('cobutton').innerHTML = 'Shopping Cart <i class="fas fa-shopping-cart"></i>';
    }
}


// function to generate a library
function genLib() {
    var tblString = '';
    var tblStringHdr = "<tr><th>ITEM</th><th>NAME</th><th>TYPE</th><th>DUE(IN DAYS)</th><th>ACTION</th></tr>";
    if (aFlag1 == 1 && aFlag2 == 1) {
        document.getElementById('cobutton').style.display = "none";
        document.getElementById('additembutton').style.display = "block";
        document.getElementById("lib1").innerHTML = '';
        masterList.forEach(function (currentValue, index) {
            tblString = tblString + '<tr><td><img src="images/' + currentValue.Picture + '"/></td><td>' + currentValue.Name + '</td><td>' + currentValue.Type + '</td><td><label>' + currentValue.Due + '</label></td><td><button type="button" id="edit_' + (index + 1) + '" onclick="edititem(this)">Edit</button><button type="button" id="del_' + (index + 1) + '" onclick="delitem(this)">Remove</button></td></tr>'
        });
        document.getElementById("lib1").innerHTML = tblStringHdr + tblString;
    } else {
        document.getElementById('cobutton').style.display = "block";
        document.getElementById('additembutton').style.display = "none";
        if (masterList.length <= 0) {
            document.getElementById("lib1").innerHTML = '';
            document.getElementById("lib1").innerHTML = tblStringHdr;

        }
        else {
            document.getElementById("lib1").innerHTML = '';
            masterList.forEach(function (currentValue, index) {
                tblString = tblString + '<tr><td><img src="images/' + currentValue.Picture + '"/></td><td>' + currentValue.Name + '</td><td>' + currentValue.Type + '</td><td><label>' + currentValue.Due + '</label></td><td><button type="button" onclick="addToBasket(this)" id="add_' + (index + 1) + '">Add to Cart</button></td></tr>'; // adding index+1 coz table tr=0 is header
            });
            document.getElementById("lib1").innerHTML = tblStringHdr + tblString;
        }
    }
}

//function to add an item to the library by admin
function addItem() {
    var NewRow = document.getElementById('lib1').insertRow(1);
    var Newcell1 = NewRow.insertCell(0);
    var Newcell2 = NewRow.insertCell(1);
    var Newcell3 = NewRow.insertCell(2);
    var Newcell4 = NewRow.insertCell(3);
    var Newcell5 = NewRow.insertCell(4);
    Newcell1.innerHTML = '<img src="images/pulse.jpg"/>';
    Newcell2.innerHTML = "<input type = 'text' id = 'addname'/>";
    Newcell3.innerHTML = "<input type = 'text' id = 'addtype'/>";
    Newcell4.innerHTML = "<input type = 'text' id = 'adddue'/>";
    Newcell5.innerHTML = '<button type="button" id="addnewitem" onclick="addNew()">Save</button><button type="button" id="canceladd" onclick="cancelAdd()">Cancel</button></td></tr>';
    document.getElementById('additembutton').style.display = "none";

}
// funtion to confirm adding new item
function addNew() {
    var newdict = {};
    var newname = document.getElementById("addname").value;
    var newtype = document.getElementById("addtype").value;
    var newdue = document.getElementById("adddue").value;
    var alphaExp = /^[a-zA-Z]+$/;
    if (newname.match(alphaExp)) {
        if (newtype.match(alphaExp) && (newtype == 'Book' || newtype == 'CD')) {
            if (!(isNaN(newdue)) && (newdue != '') && (newdue == 30 || newdue == 10)) {
                newdict = { Name: newname, Due: newdue, Type: newtype, Picture: 'pulse.jpg' };
                masterList.unshift(newdict);
                genLib();
                document.getElementById('additembutton').style.display = "block";
            } else {
                alert(" Please enter valid values: Type should be either 'BOOK' or 'CD' and Due should be 30 for books and 10 for CD.");
            }
        } else {
            alert(" Please enter valid values: Type should be either 'BOOK' or 'CD' and Due should be 30 for books and 10 for CD.");
        }
    } else {
        alert(" Please enter valid values: Type should be either 'BOOK' or 'CD' and Due should be 30 for books and 10 for CD.");
    }

}

// funtion to cancel adding new item
function cancelAdd() {
    genLib();
    document.getElementById('additembutton').style.display = "block";
}

//Function to edit an item by admin
function edititem(i) {

    var duecell = document.getElementById("lib1").rows[i.id.split("_")[1]].cells[3];
    var buttoncell = document.getElementById("lib1").rows[i.id.split("_")[1]].cells[4];
    buttoncell.innerHTML = '<button type="button" id="save_click" onclick="saveitem()">Save</button><button type="button" id="cancel_click" onclick="cancelsave()">Cancel</button></td></tr>';
    duecell.innerHTML = "<input type = 'text' id = 'changedue'/>";
    j = i.id.split('_')[1];

}

//function to save changes after editing an item's due 
function saveitem() {
    var duevalue = document.getElementById("changedue").value;
    if (isNaN(duevalue) || duevalue == '') {
        alert("Please enter a valid number");
    } else {
        masterList[j - 1].Due = duevalue;
        genLib();
    }
}


//function to cancel changes made to an item's due
function cancelsave() {
    genLib();
}


//Function to edit an item by admin
function delitem(i) {
    masterList.splice(i.id.split('_')[1] - 1, 1);
    genLib();
}

// Function that checks whether the input characters are restricted according to defined by user.
function lengthDefine(inputtext, min, max) {
    var uInput = inputtext.value
    if (uInput.length >= min && uInput.length <= max) {
        document.getElementById('p2').innerText = '';
        return true;
    } else {
		alert("Please enter the values between "+min + " and " +max+ " Characters");
        inputtext.focus();
        return false;
    }
}

// Function that checks if the input text is an alphabetic character or not.
function inputAlphabet(inputtext) {
    var alphaExp = /^[a-zA-Z\s]+$/;
    if (inputtext.value.match(alphaExp)) {
        document.getElementById('p1').innerText = '';
        return true;
    } else {
		alert("* Only alphabets are allowed *");
        inputtext.focus();
        return false;
    }
}

// Function that checks if an user entered valid email address or not and displays alert message on wrong email address format.
function emailValidation(inputtext) {
    var emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputtext.value.match(emailExp) || (aFlag1 == 1 && aFlag2 == 1)) {
        document.getElementById('p3').innerText = '';
        return true;
    } else {
		alert("Please enter a valid email address");
        inputtext.focus();
        return false;
    }
}
//function that validates yearofbirth
function yearValidation(inputtext) {
    if (aFlag1 == 1 && aFlag2 == 1) {
        return true;
    }
    if (inputtext.value >= 1900 && inputtext.value <= currentyear) {
        document.getElementById('p4').innerText = '';
        return true;
    } else {
		alert("Please enter a year between 1900 and "+currentyear+"");
        inputtext.focus();
        return false;
    }
}

//function to add items to basket
function addToBasket(i) {
    document.getElementById('cobutton').innerHTML = 'Shopping Cart';
    coList.push(masterList[i.id.split("_")[1] - 1]);
    document.getElementById('lib1').deleteRow((i.id.split('_')[1]));
    masterList.splice([i.id.split('_')[1] - 1], 1);
    genLib();
    console.log(coList);
    count += 1;
}
