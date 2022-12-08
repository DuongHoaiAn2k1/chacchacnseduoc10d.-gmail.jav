
var superArray = [];
var superString = {
    email: '',
    password: '',
    name: '',
}
function Validator(options){

    var selectorRules = {};

    function validate(inputElement,rule){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;
        // Lấy các rules của selector
        var rules = selectorRules[rule.selector];
        // Lặp qua từng rule rồi kiểm tra
        for (var i = 0; i < rules.length; ++i){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }
                    if(errorMessage) {
                        errorElement.innerText = errorMessage;
                        inputElement.classList.add('is-invalid');
                        inputElement.parentElement.classList.add('text-danger');
                        
                    }
                    else{
                        errorElement.innerText = '';
                        inputElement.classList.remove('is-invalid');
                        inputElement.parentElement.classList.remove('text-danger');
                    }
        return !errorMessage;
    }
    // Lấy các phần tử từ cái form
    var formElement = document.querySelector(options.form);
    if(formElement){
        //Submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isFormValid = true;
            // Lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid){
                    isFormValid = false;
                }
            });
           
            if(isFormValid){
                // Trường hợp submit với js
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input){
                        values[input.name] = input.value;
                        return values;
                    }, {});
                    console.log(formValues);
                    // superString = formValues;
                    // console.log(superString);
                    superString.email = formValues.email;
                    superString.password = formValues.psw;
                    superString.name = formValues.fname;
                    localStorage.setItem('Account',JSON.stringify(superString));
                    // superArray.push(superString);
                    alert('Đăng ký thành công');
                    window.location.href='tintuc.html';
                    // console.log(superArray);
                }
                // Trường hợp submit với hành vi mặc định
                else{

                }
            }

        }
        // Lặp qua từng rules, lắng nghe các sự kiện
        options.rules.forEach(function (rule) {
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector] = [rule.test];
            }
           
            var inputElement = formElement.querySelector(rule.selector);

            if(inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.classList.remove('is-invalid');
                    inputElement.parentElement.classList.remove('text-danger');
                }
            }
        });
    }

}  
Validator.isRequired = function (selector,message){
    return{
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message;
        }
    };
}
Validator.isEmail = function(selector){
    return{
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Email không hợp lệ!';
        }
    };
}

Validator.minLength = function(selector, min){
    return{
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự!`;
        }
    };
}

Validator.checkPW = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message;
        }
    }
}
// '<div id="content-btn">'+
//             '<button id="signin-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Đăng Nhập</button>'+
//             '<button onclick="logOut();" id="signup-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Đăng ký</button>'+
// '</div>';
var changeContent1 = document.getElementById('signin-btn');
var changeContent2 = document.getElementById('signup-btn');
let saveAccount = localStorage.getItem('Account');
    saveAccount = JSON.parse(saveAccount);
    localStorage.setItem('Name',saveAccount.name);
var checkTF;
function checkSignIn(){
    let emailChecked = document.getElementById('exampleInputEmail1').value;
    let passWordChecked = document.getElementById('exampleInputPassword1').value;
    if(emailChecked === saveAccount.email && passWordChecked === saveAccount.password){
        alert('Đăng nhập thành công');
        checkTF = true;
        localStorage.setItem('CheckCode',checkTF);
        window.location.href="tintuc.html";
        return true;
    }
    alert('Thông tin đăng nhập không chính xác');
    document.onclick = function (event){
        if(event.defaultPrevented) return;
        event.preventDefault();
    }
    return false;
}
if(localStorage.getItem('CheckCode') == 'true'){
    changeContent2.innerHTML = 'Thoát';
    let element = document.getElementById('content-btn');
    element.outerHTML = 
        '<div id="content-btn">'+
        '<button id="signin-btn" type="button" class="btn btn-primary" data-bs-toggle="modal">'+localStorage.getItem('Name')+'</button>'+
        '<button onclick="logOut();" id="signup-btn" type="button" class="btn btn-primary" data-bs-toggle="modal">Thoát</button>'+
        '</div>';
    changeContent1.innerHTML = localStorage.getItem('Name');
}
var x = document.getElementById('signup-btn');
var y = document.getElementById('signin-btn');
function logOut() {
    x.innerHTML = 'Đăng ký';
    y.innerHTML = 'Đăng nhập';
    localStorage.removeItem('Name');
    let element = document.getElementById('content-btn');
        element.outerHTML = 
            '<div id="content-btn">'+
            '<button id="signin-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Đăng Nhập</button>'+
            '<button onclick="logOut();" id="signup-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Đăng ký</button>'+
            '</div>';
    checkTF = false;
    localStorage.setItem('CheckCode',checkTF);
    alert('Tài khoản đã được đăng xuất');
}

// function upAccount () {
//     localStorage.setItem('Account','');
// }