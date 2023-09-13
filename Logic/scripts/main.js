var button = document.querySelector("button");

button.onclick = function () {
    let account  = document.getElementById("account").value; 
    let password = document.getElementById("password").value;
    var accountavl = true;
    if(account != "110360226")
        accountavl = false;
    
    if(password != "abc123")
        accountavl = false;

    if(accountavl)
        location.href = "../My test Page/index.html"
    else 
        alert("The account have error");
    
};