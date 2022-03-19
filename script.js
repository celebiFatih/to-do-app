//Add Elements
const form = document.querySelector('form')
const input = document.querySelector('#txtTaskName')
const btnDeleteAll = document.querySelector('#btnDeleteAll')
const tasklist = document.querySelector('#task-list')

// call all event listeners
eventListeners()

function eventListeners(){
    // submit event
    form.addEventListener('submit',addNewItem)

}

// add new item
function addNewItem(e){

    if(input.value === ''){
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
    a.classList='delete-item float-right'
    a.setAttribute('href','#')
    a.innerHTML = '<i class="fas fa-times"></i>'

    // add a to li
    li.appendChild(a)

    // add li to ul
    tasklist.appendChild(li)

    // clear input value after add new item
    input.value=""

    e.preventDefault() //formun varsayılan olarak submit olmasını kapat //sayfa yenilenmesin
}