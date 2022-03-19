//Add Elements
const form = document.querySelector('form')
const input = document.querySelector('#txtTaskName')
const btnDeleteAll = document.querySelector('#btnDeleteAll')
const tasklist = document.querySelector('#task-list')

// call all event listeners
eventListeners()

function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewItem)

    // delete an item
    tasklist.addEventListener('click', deleteItem)

    // delete all items
    btnDeleteAll.addEventListener('click', btnDeleteAllItems)

}

// add new item
function addNewItem(e) {

    if (input.value === '') {
        alert('add new item')
    }

    // create li
    const li = document.createElement('li')
    // add li classname
    li.className = 'list-group-item list-group-item-secondary'
    // add li text from input value
    li.appendChild(document.createTextNode(input.value))



    // create a
    const a = document.createElement('a')
    a.classList = 'delete-item float-right'
    a.setAttribute('href', '#')
    a.innerHTML = '<i class="fas fa-times"></i>'

    // add a to li
    li.appendChild(a)

    // add li to ul
    tasklist.appendChild(li)

    // clear input value after add new item
    input.value = ""

    e.preventDefault() //formun varsayılan olarak submit olmasını kapat //sayfa yenilenmesin
}

// delete an item
function deleteItem(e) {

    if (confirm('are you sure?')) {
        // if clicked elemet is the icon element delete its parent's parent element--li
        if (e.target.className === 'fas fa-times') {
            e.target.parentElement.parentElement.remove()
        }
    }

    e.preventDefault() // scrools do not move
}

function btnDeleteAllItems(e) {

    if (confirm('are you sure?')) {

        // tasklist.innerHTML='' // alternative-1

        tasklist.childNodes.forEach(function (item) {
            // this is gets all task list items with text items
            if (item.nodeType === 1) { // get just the elemets-without text items
                item.remove()
            }
        });
    }






    e.preventDefault()
}