inputItems = document.querySelectorAll(".form-input")
formItems = Array.from(document.querySelectorAll(".form__item"))
options = document.querySelectorAll(".form-options__item")
switchBtn = document.querySelector(".slider")
prevBtns = document.querySelectorAll(".form-btn__prev")
nextBtns = document.querySelectorAll(".form-btn__next")
confirmBtns = document.querySelectorAll(".form-btn__confirm")
checkBoxItem = document.querySelectorAll(".form-add-ons__item")
changePlan = document.querySelector(".form-total__options-chosed__change")
itemFooter = document.querySelectorAll(".footer__item")
checkValueSwitch = "Monthly"
if (window.matchMedia("(max-width: 739px)").matches) {
    itemSteps = document.querySelector(".step-list--mobile").querySelectorAll(".step-list__num")
    itemSteps[0].classList.add("step-list__num--active")
        
    window.addEventListener("load", (e) => {
        document.querySelector(".multi-step").style.height = `${window.innerHeight*0.9}px`
    })
}
else {
    itemSteps = document.querySelector(".step-list--desktop").querySelectorAll(".step-list__num")
    itemSteps[0].classList.add("step-list__num--active")
}
var switchItem = {
    Monthly: document.querySelectorAll(".form-my__option")[0],
    Yearly: document.querySelectorAll(".form-my__option")[1]
}
var data = {
    Monthly: {
        Arcade: `$9/mo`,
        Advanced: `$12/mo`,
        Pro: `$15/mo`,
        Os: `+$1/mo`,
        Ls: `+$2/mo`,
        Cp: `+$2/mo`,
    },
    Yearly: {
        Arcade: `$90/yr`,
        Advanced: `$120/yr`,
        Pro: `$150/yr`,
        Os: `+$10/yr`,
        Ls: `+$20/yr`,
        Cp: `+$20/yr`,
    }
}
var userData = {}




var Validate = {
    step_1: () => {
        var check = true
        for (const item of inputItems) {
            if (item.value == "") {
                item.parentElement.querySelector(".form-label__required").classList.add("form-label__required--valid")
                item.classList.add("form-input--invalid")
                check = false
            }
            else {
                if (item.type == "email") {
                    check = Validate.isEmail(item.value)
                }
                if (item.type == "tel") {
                    check = Validate.isTel(item.value)
                }
                if (!check) {
                    item.parentElement.querySelector(".form-label__required").classList.add("form-label__required--valid")
                    item.classList.add("form-input--invalid")
                }
            }
        }
        userData.Name = inputItems[0].value
        userData.Email = inputItems[1].value
        userData.Tel = inputItems[2].value
        return check
    },
    step_2: () => {
        var element = document.querySelector(".form-options__item--selected")
        if (!element) {
            document.querySelector(".form-options-text").style.display = "block"
        }
        else {
            userData.Plan = element.querySelector(".form-name").innerText
            userData.Options = checkValueSwitch
            return true
        }
    },
    step_3: () => {
        userData.Add_ons = []
        for (const item of document.querySelectorAll(".form-add-ons__item--checked")) {
            userData.Add_ons.push({
                Product: item.querySelector(".form-name").innerText,
                Price: item.querySelector(".form-add-ons__price").innerText
            })
            
        }
        Validate.step_4()
        return true
    },
    step_4: () => {
        planName = document.querySelector(".form-total__options-chosed__name")
        planPrice = document.querySelector(".form-total__options-chosed__price")
        addOns = document.querySelector(".form-total__add-ons")
        totalText = document.querySelector(".form-total-price__text")
        totalPrice = document.querySelector(".form-total-price__value")
        Price = 0
        txtHTML = ""
        planName.innerText = `${userData.Plan} (${userData.Options})`
        planPrice.innerText = `${data[userData.Options][userData.Plan]}`
        totalText.innerText = `Per ${userData.Options.replace("ly","")}`
        Price += parseInt((Array.from(planPrice.innerText.match(/\d+/g)))[0])
        for (const item of userData.Add_ons) {
            txtHTML += `<div class="form-total__add-ons__item">`
            txtHTML += `<div class="form-total__add-ons__name">${item.Product}</div>`
            txtHTML += `<div class="form-total__add-ons__price">${item.Price}</div>`
            txtHTML += `</div>`
            Price += parseInt((Array.from(item.Price.match(/\d+/g)))[0])
        }
        if (userData.Options == "Monthly") {
            var priceTxt = "mo"
        }
        else  {
            var priceTxt = "yr"
        }
        addOns.innerHTML = txtHTML
        totalPrice.innerText = `$${Price}/${priceTxt}`
    },
    isEmail: (value) => {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return regex.test(value) ? true : false
    },
    isTel: (value) => {
        var regex = /\+[0-9]+ [0-9]+ [0-9]+ [0-9]+/i;
        return regex.test(value) ? true : false
    }
}
var getFirstLetter = (str) => {
    return str.split(" ").map(word => word[0]).join("")
}

var renderData = (value) => {
    for (const item of options) {
        item.querySelector(".form-text").innerText = data[value][item.querySelector(".form-name").innerText]
    }
    for (const item of checkBoxItem) {
        item.querySelector(".form-add-ons__price").innerText = data[value][getFirstLetter(item.querySelector(".form-name").innerText)]
    }
}
renderData(checkValueSwitch)

for (const item of inputItems) {
    item.onclick = () => {
        inputItems.forEach(element => {
            element.parentElement.querySelector(".form-label__required").classList.remove("form-label__required--valid")
            element.classList.remove("form-input--invalid")
        })
    }

}
for (const item of options) {
    item.onclick = () => {
        document.querySelector(".form-options-text").style.display = "none"
        if (document.querySelector(".form-options__item--selected")) {
            document.querySelector(".form-options__item--selected").classList.remove("form-options__item--selected")
            item.classList.add("form-options__item--selected")
        }
        else {
            item.classList.add("form-options__item--selected")
        }
    }
}
switchBtn.onclick = () => {
    if (checkValueSwitch == "Monthly") {
        checkValueSwitch = "Yearly"
        for (const item of options) {
            item.querySelector("div").innerHTML += `<div class="form-text__free">2 months free</div>`
        }
    }
    else {
        checkValueSwitch = "Monthly"
        for (const item of options) {
            item.querySelector("div").removeChild(item.querySelector(".form-text__free"))
        }
    }
    document.querySelector(".form-my__option--selected").classList.remove("form-my__option--selected")
    switchItem[checkValueSwitch].classList.add("form-my__option--selected")
    renderData(checkValueSwitch)
}
for (const item of checkBoxItem) {
    item.onclick = (e) => {
        if (e.pointerId == -1) {
            item.classList.toggle("form-add-ons__item--checked")
        }
    }
}
for (const item of nextBtns) {
    item.onclick = () => {
        var numStep = formItems.indexOf(document.querySelector(".form__item--active")) + 1
        if (Validate[`step_${numStep}`]()) {
            document.querySelector(".step-list__num--active").classList.remove("step-list__num--active")
            itemSteps[numStep].classList.add("step-list__num--active")
            var itemForm = document.querySelector(".form__item--active")
            var itemFooterBtn = document.querySelector(".footer__item--active")
            itemForm.classList.remove("form__item--active")
            itemForm.nextElementSibling.classList.add("form__item--active")
            itemFooterBtn.classList.remove("footer__item--active")
            itemFooterBtn.nextElementSibling.classList.add("footer__item--active")
        }
    }
}
for (const item of prevBtns) {
    item.onclick = () => {
        var numStep = formItems.indexOf(document.querySelector(".form__item--active"))
        console.log(numStep)
        document.querySelector(".step-list__num--active").classList.remove("step-list__num--active")
        itemSteps[numStep-1].classList.add("step-list__num--active")
        var itemForm = document.querySelector(".form__item--active")
        var itemFooterBtn = document.querySelector(".footer__item--active")
        itemForm.classList.remove("form__item--active")
        itemForm.previousElementSibling.classList.add("form__item--active")
        itemFooterBtn.classList.remove("footer__item--active")
        itemFooterBtn.previousElementSibling.classList.add("footer__item--active")
    }
}
changePlan.onclick = () => {
    document.querySelector(".form__item--active").classList.remove("form__item--active")
    formItems[1].classList.add("form__item--active")
    document.querySelector(".step-list__num--active").classList.remove("step-list__num--active")
    itemSteps[1].classList.add("step-list__num--active")
    document.querySelector(".footer__item--active").classList.remove("footer__item--active")
    itemFooter[1].classList.add("footer__item--active")
}
for (const item of confirmBtns) {
    item.onclick = () => {
        document.querySelector(".form__item--active").classList.remove("form__item--active")
        formItems[4].classList.add("form__item--active")
        document.querySelector(".footer").style.display = "none"
        document.querySelector(".multi-step").style.height = `${window.innerHeight}px`
    }
}
