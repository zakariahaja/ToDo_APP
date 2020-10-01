document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let itrEl = e.target
    let inputField = Array.from(e.target.getElementsByTagName('input')).find(x => x.getAttribute("name") == "new-item")
    let valueNewItem = inputField.value
    let itemsList
    itrEl = itrEl.parentElement
    while (itrEl) {
        if (itrEl.classList.contains("create-form-container")) {
            break
        }
        itrEl = itrEl.parentElement
    }
    itemsList = itrEl.nextSibling
    while (itemsList) {
        if (itemsList.classList.contains("list-of-items")) {
            break
        }
        itemsList = itemsList.nextSibling
    }
    axios.post("/create-item", {item: valueNewItem}).then(function (response) {
        inputField.value=""
        inputField.focus()
        itemsList.insertAdjacentHTML('beforeend',response.data.li)
    }).catch(function (error) {
        if(error.response){
            if(error.response.status == 531){
                alert("Error In Insertion !!! \nPlease Try Again Later !!")
            }
            if(error.response.status == 431){
                alert("Full DataBase !!! \nPlease Delete Some Items !")
            }

        }
    })
})

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-me")) {
        let btnParent = e.target.parentElement
        let btnParentSibs = getAllSiblings(btnParent)
        for (var i = 0; i < btnParentSibs.length; i++) {
            if (btnParentSibs[i].classList.contains("div-form")) {
                btnParentSibs[i].classList.remove("d-none")
                btnParentSibs[i].classList.add("d-flex")
                let el = btnParentSibs[i].firstChild
                while (el) {
                    if (el.name == "new-value-of-item-to-edit") {
                        el.focus();
                        el.select();
                        break
                    }
                }
            }
            if (btnParentSibs[i].classList.contains("item-text")) {
                btnParentSibs[i].classList.add("d-none")
            }
        }
    }
    if (e.target.classList.contains("cancel-changes")) {
        if (e.target.parentElement.classList.contains("div-form")) {
            e.target.parentElement.classList.add("d-none")
            e.target.parentElement.classList.remove("d-flex")
        }
        let el = e.target.parentElement.nextSibling
        let oldValue
        while (el) {
            if (el.classList.contains("item-text")) {
                el.classList.remove("d-none")
                oldValue = el.textContent
                break
            }
            el = el.nextSibling
        }
        el = e.target.previousSibling
        while (el) {
            if (el.name == "new-value-of-item-to-edit") {
                el.value = oldValue
                break
            }
            el = el.previousSibling
        }
    }
    if (e.target.classList.contains("save-changes")) {
        let item_id = e.target.closest('li').getAttribute("data-id")
        let newTodoValue
        let btnSibs = getAllSiblings(e.target)
        for (var i = 0; i < btnSibs.length; i++) {
            if (btnSibs[i].name == "new-value-of-item-to-edit") {
                newTodoValue = btnSibs[i].value
                break
            }
        }

        axios.post("/update-item", {item_id: item_id, new_value_todo: newTodoValue}).then(function () {
            if (e.target.parentElement.classList.contains("div-form")) {
                e.target.parentElement.classList.add("d-none")
                e.target.parentElement.classList.remove("d-flex")
            }
            let el = e.target.parentElement.nextSibling
            while (el) {
                if (el.classList.contains("item-text")) {
                    el.classList.remove("d-none")
                    el.textContent = newTodoValue
                    break
                }
                el = el.nextSibling
            }
        }).catch(function () {
            alert("Please Try Again Later !!")
        })
    }
    if (e.target.classList.contains("delete-me") && confirm("Do you want to delete this Item permanenetly ?")) {
        let liItem = e.target.closest('li')
        let item_id = liItem.getAttribute("data-id")
        axios.post("/delete-item", {item_id: item_id}).then(function () {
            liItem.remove()
        }).catch(function () {
            alert("Please Try Again Later !!")
        })
    }
})

function getAllSiblings(elem, filter) {
    var sibs = [];
    elem = elem.parentNode.firstChild;
    do {
        if (elem.nodeType === 3) continue; // text node
        if (!filter || filter(elem)) sibs.push(elem);
    } while (elem = elem.nextSibling)
    return sibs;
}
