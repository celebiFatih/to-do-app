//Add Elements
const form = document.querySelector('form')
const input = document.querySelector('#txtTaskName')
const btnDeleteAll = document.querySelector('#btnDeleteAll')
const tasklist = document.querySelector('#task-list')
// const items = ['item 1', 'item 2', 'item 3', 'item 4']
let items; // above elements will now be added from local storage

// call load items
loadItems()

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

function loadItems() {

    // get items from local storage
    items = getItemsFromLS()

    // print received element with calling createItem method
    items.forEach(function (item) {
        createItem(item)
    })
}

// get items from local storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = []; // if the 'items' is null make the global items object a null array object
    } else {
        items = JSON.parse(localStorage.getItem('items')) // if the 'items' is not null transform the global items object a JSON object and let get to items
    }
    return items
}

// set item to local storage
function setItemToLS(text) {
    // first of all get items from ls
    items = getItemsFromLS();
    // add to new element in items
    items.push(text)
    // add the items with the item from ls added on top of the items with the same name
    localStorage.setItem('items', JSON.stringify(items))// Conversion done because only string expressions are passed to ls.-Square brackets..
}

//delete item from local storage
function deleteItemFromLS(text) {
    items = getItemsFromLS() // lets get items from ls
    
    // items and its index numbers from ls
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1) // an element starting from index.
        }
    })
    // save the items list after deletion process
    localStorage.setItem('items',JSON.stringify(items))
}

// create html li
function createItem(text) {
    // create li
    const li = document.createElement('li')
    // add li classname
    li.className = 'list-group-item list-group-item-secondary'
    // add li text from input value
    li.appendChild(document.createTextNode(text))

    // create a
    const a = document.createElement('a')
    a.classList = 'delete-item float-right'
    a.setAttribute('href', '#')
    a.innerHTML = '<i class="fas fa-times"></i>'

    // add a to li
    li.appendChild(a)

    // add li to ul
    tasklist.appendChild(li)
}

// add new item
function addNewItem(e) {

    if (input.value === '') {
        alert('add new item')
        return
    }

    // create item
    createItem(input.value)

    // save to local storage
    setItemToLS(input.value)

    // clear input value after add new item
    input.value = ""

    e.preventDefault() // turn off the form's default submission -- don't refresh the page
}

// delete an item
function deleteItem(e) {
    // if clicked elemet is the icon element delete its parent's parent element--li
    if (e.target.className === 'fas fa-times') {
        if (confirm('are you sure?')) {
            e.target.parentElement.parentElement.remove()

            //send the text want to delete
            deleteItemFromLS(e.target.parentElement.parentElement.textContent)
        }
    }

    e.preventDefault() // scrools do not move
}

function btnDeleteAllItems(e) {

    if (confirm('are you sure?')) {

        // tasklist.innerHTML='' // alternative-1

        // alternative-2
        /*tasklist.childNodes.forEach(function (item) {
            // this is gets all task list items with text items
            if (item.nodeType === 1) { // get just the elemets-without text items
                item.remove()
            }
        });*/

        // alternative-3
        while(tasklist.firstChild){ // as long as the ul object has firstChild--until tasklist is null
            tasklist.removeChild(tasklist.firstChild)
        }

        localStorage.clear()
    }

    e.preventDefault()
}