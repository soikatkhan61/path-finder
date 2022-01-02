function success_alert(status){
    var alert = document.querySelector('#alert')
    var close_btn = document.querySelector('#close-btn')
    var messages1 = document.querySelector('#messages1')
    console.log(status)
    // window.addEventListener("load", function () {
    alert.classList.remove('hide')
    alert.classList.add('show')
    alert.classList.add('showAlert')
    alert.classList.remove('fail')
    alert.classList.remove('position_change')
    close_btn.classList.remove('close-btn-failed')
    fa_icon.classList.remove('fa-exclamation-triangle')
    fa_icon.classList.add('fa-check-circle')
    messages1.innerHTML = status

    setTimeout(function (e) {
        alert.classList.add('hide')
        alert.classList.remove('show')
    }, 5000)
    // });

    close_btn.addEventListener('click', function () {
        alert.classList.add('hide')
        alert.classList.remove('show')
    })
}

function warning_alert(status){
    //select html stuff
    var alert = document.querySelector('#alert')
    var close_btn = document.querySelector('#close-btn')
    var fa_icon = document.querySelector('#fa_icon')
    var messages1 = document.querySelector('#messages1')

    messages1.innerHTML = status
    alert.classList.remove('hide')
    alert.classList.add('show')
    alert.classList.add('fail')
    alert.classList.add('showAlert')
    alert.classList.add('position_change')
    close_btn.classList.add('close-btn-failed')
    fa_icon.classList.remove('fa-check-circle')
    fa_icon.classList.add('fa-exclamation-triangle')

    setTimeout(function (e) {
        alert.classList.add('hide')
        alert.classList.remove('show')
    }, 5000)


    close_btn.addEventListener('click', function () {
        alert.classList.add('hide')
        alert.classList.remove('show')
    })
}

//select the button
let action_buttons = document.getElementsByClassName("action_button")
let start_search_button = document.querySelector('#start-search-button')
let reset_button = document.querySelector('#reset-button')


for(let i=0;i<action_buttons.length;i++){
    var prev_button=-1;
    action_buttons[i].addEventListener("click",()=>{
        if(action_buttons[i].style.background == "blue"){
            action_buttons[i].style.background = "none"
        }else{
            action_buttons[i].style.background = "blue"
            prev_button = i
        }
    })
}

start_search_button.style.background = "#1CB96F"
reset_button.style.background = "red"





  



