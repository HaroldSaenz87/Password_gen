// DOM Elements - all the elements we need from HTML
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length_value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generateBtn");
const copyButton = document.getElementById("copyBtn");
const strengthBar = document.querySelector(".strength_bar");
const strengthText = document.querySelector(".strength_container p");
const strengthLabel = document.getElementById("strength_label")

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input", () =>{
    lengthDisplay.textContent = lengthSlider.value;
});


generateButton.addEventListener("click", makePassword);

function makePassword(){
    const length = Number(lengthSlider.value);
    const includeUpper = uppercaseCheckbox.checked;
    const includeLower = lowercaseCheckbox.checked;
    const includeNumber = numbersCheckbox.checked;
    const includeSymbol = symbolsCheckbox.checked;

    if(!includeLower && !includeUpper && !includeNumber && !includeSymbol){
        alert("Please Select at least one character type.");
        return;
    }

    const newPassword = createRandomPassword(length, includeUpper, includeLower, includeNumber, includeSymbol);

    passwordInput.value = newPassword;

    updateStrength(newPassword);

}

function createRandomPassword(length, includeUpper, includeLower, includeNumber, includeSymbol ){
    let allChar = "";

    if(includeUpper){
        allChar += uppercaseLetters;
    }
    if(includeLower){
        allChar += lowercaseLetters;
    }
    if(includeNumber){
        allChar += numberCharacters;
    }
    if(includeSymbol){
        allChar += symbolCharacters;
    }

    let password = "";

    for(let i = 0; i < length; i++){
        const randomNum = Math.floor(Math.random() * allChar.length)
        password += allChar[randomNum];
    }

    return password;
}


function updateStrength(password){
    const passLength = password.length;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

    let strength = 0;

    strength += Math.min(passLength * 2, 40);

    if(hasUpper){
        strength += 15;
    }
    if(hasLower){
        strength += 15;
    }
    if(hasNumber){
        strength += 15;
    }
    if(hasSymbol){
        strength += 15;
    }

    if(passLength < 8){
        strength = Math.min(strength, 40);
    }

    const validPercent = Math.max(5, Math.min(100, strength));
    strengthBar.style.width = validPercent + "%";

    let strenghtText = "";
    let barColor = "";

    if(strength < 40){
        barColor = "#fc8181";
        strenghtText = "Weak";

    }
    else if(strength < 70){
        barColor = "#fbd38d";
        strenghtText = "Medium";
        
    }
    else{
        barColor = "#68d391";
        strenghtText = "Strong";
    }

    strengthBar.style.backgroundColor = barColor;
    strengthLabel.textContent = strenghtText;


}


window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", () =>{
    if(!passwordInput.value){
        return;
    }

    navigator.clipboard.writeText(passwordInput.value).then(() => showSuccess()).catch((error) => console.log("Could not copy:", error));
});

function showSuccess(){
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");
    copyButton.style.color = "#48bb78";

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");
        copyButton.style.color = "";
    }, 1500);
}

