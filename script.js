// FORM
const form = document.getElementById("form");
// INPUTS
    const firstname         = document.getElementById("firstname");
    const lastname          = document.getElementById("lastname");
    const password          = document.getElementById("password");
    const confirmPassword   = document.getElementById("confirmpass");
    const email             = document.getElementById("email");
// VALIDATION COLOR
    const green = "#4caf50";
    const red   = "#f44336";

// START
    form.addEventListener("submit",e =>{
        if(
            validateFirstName() &&
            validateLastName() &&
            validatePassword() &&
            validateConfirmPassword() &&
            validateEmail() 
        ){
            const name = firstname.value;
            const container = document.querySelector(".container");
            const loader = document.createElement("DIV");
            loader.className = "progress";
            
            const loadingBar = document.createElement("DIV");
            loadingBar.className = "indeterminate";
            loader.appendChild(loadingBar);
            container.appendChild(loader);

            setTimeout(function(){ 
                const loaderDiv = document.querySelector(".progress");
                const panel = document.createElement("DIV");
                panel.className = "card-panel green";

                const text = document.createElement("span");
                text.className = "white-text"
                text.appendChild(document.createTextNode(`Sign up successful, welcom to SocialApe ${name}`));
                panel.appendChild(text);
                container.replaceChild(panel,loaderDiv);
            },1000);
        } 

        e.preventDefault();
    });
// FIRST NAME
    function validateFirstName()
    {
    // CHECK IF IS EMPTY
        if(checkIfEmpty(firstname)) return;
    // IS IF IT HAS ONLY LETTERS
        if(!checkIfOnlyLetters(firstname)) return;
        return true;
    }
// LASTNAME
    function validateLastName()
    {
    // CHECK IF IS EMPTY
        if(checkIfEmpty(lastname)) return;
    // IS IF IT HAS ONLY LETTERS
        if(!checkIfOnlyLetters(lastname)) return;
        return true;
    }
// PASSWORD
    function validatePassword()
    {
    // CHECK IF IS EMPTY
        if(checkIfEmpty(password)) return;
    // MUST OF IN CERTAIN LENGTH
        if(!meetLength(password,6,100)) return;
    // CHECK PASSWORD AGAINST OUR CHARACTER SET
        if(!containsCharacters(password,4)) return
        return true    
    }
// PASSWORD CONFIRM
    function validateConfirmPassword()
    {
        if(password.className !== "valid"){
            setInvalid(confirmPassword,"Password must be valid..");
            return;
        }// IF THEY MATCH
        if(password.value !== confirmPassword.value){
            setInvalid(confirmPassword,"Passwords must match..");
            return;
        }else{
            setValid(confirmPassword);
        }
        return true;
    }
// EMAIL
    function validateEmail()
    {
        if(checkIfEmpty(email)) return;
        if(!containsCharacters(email,5)) return;
        return true;
    }
// *****************************
// EMPTY 1
    function checkIfEmpty(field)
    {
        if(isEmpty(field.value.trim())){
            setInvalid(field, `${field.name} must not be empty...`);
            return true;
        }else{
            setValid(field);
            return false;
        }
    }
// EMPTY 2
    function isEmpty(value)
    {
        if(value === "") return true;
        return false;
    }
// SET IN VALID 3
    function setInvalid(field,message)
    {
        field.className = "invalid";
        field.nextElementSibling.innerHTML = message;
        field.nextElementSibling.style.color = "#ff0000";
    }
// SET VALID 4
    function setValid(field)
    {
        field.className = "valid";
        field.nextElementSibling.innerHTML = "";
    }
// CHECK LETTER 1 
    function checkIfOnlyLetters(field)
    {
        if(/^[a-zA-Z]+$/.test(field.value)){
            setValid(field);
            return true;
        }else{
            setInvalid(field,`${field.name} must contain only letter..`);
            return false;
        }
    }
// *****************************
// PASSWORDS LENGTH 1
    function meetLength(field,minLength,maxLength)
    {
        if(field.value.length >= minLength && field.value.length < maxLength){
            setValid(field);
            return true;
        }else if(field.value.length < minLength){
            setInvalid(field,`${field.name} must be at least ${minLength} characters long..`);
            return false;
        }else{
            setInvalid(field,`${field.name} must be shorter than ${maxLength} characters`);
            return false;
        }
    }
// PASSWORD CONFIRM 2
    function containsCharacters(field,code)
    {
        let regEx;
        switch(code){
            // 1 lettrs
            case 1: 
                regEx = /(?=.*[a-zA-Z])/;
                return matchWithRegEx(regEx,field,"Must contain at least one letter.");
            // 2 letter and number
            case 2:
                regEx = /(?=.*\d) (?=.*[a-zA-Z])/;
                return matchWithRegEx(regEx,field,"Must contain at least one letter and one number..");
            // 3 uppercase, lowercase and number
            case 3:
                regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
                return matchWithRegEx(regEx,field,"Must contain at least one uppercase, one lowercase letter and one number..");
            // 4 uppercase, lowercase, number and special char
            case 4:
                regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
                return matchWithRegEx(regEx,field,"Must contain at least one uppercase, one lowercase letter, one number and one special character..");
            // 5 ..
            case 5:
                regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return matchWithRegEx(regEx,field,"Must be valid email address..")
            default: return false;
        }
    }
// .. 3
    function matchWithRegEx(regEx,field,message)
    {
        if(field.value.match(regEx)){
            setValid(field);
            return true;
        }else{
            setInvalid(field,message);
            return false;
        }
    }