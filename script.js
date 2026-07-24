const inputBox = document.getElementById("input-box");
const button = document.getElementById("button")
button.addEventListener(
    "click",
    addName
);
function addName(){
    if(inputBox.value === ''){
        alert("Please add a name");
    }
    else{
        console.log(inputBox.value);
    }
}