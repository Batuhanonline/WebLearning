const draggable_list = document.getElementById('draggable-list')
const check = document.getElementById('check')

const lessonContents = [
    'Bir',
    'İki',
    'Üç',
    'Dört',
    'Beş',
    'Altı',
    'Yedi',
    'Sekiz',
    'Dokuz',
    'On'
]

//Store list items
const listItems = []

let dragStartIndex = 0

createList()

//Insert list items into DOM
function createList() {
    [...lessonContents]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((content, index) => {
            const listItem = document.createElement('li')

            listItem.setAttribute('data-index', index)

            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="content-name">${content}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
            `

            listItems.push(listItem)

            draggable_list.appendChild(listItem)
        })

        addEventListeners()
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    console.log(dragStartIndex);
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter() {
    this.classList.add('over')
}

function dragLeave() {
    this.classList.remove('over')
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index')
    console.log(dragEndIndex);
    swapItems(dragStartIndex, dragEndIndex) 

    this.classList.remove('over')
}

// Swap list items that are drag and drop
function swapItems(formIndex, toIndex) {
    const itemOne = listItems[formIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[toIndex].appendChild(itemOne)
    listItems[formIndex].appendChild(itemTwo)
}

// Check the order of list items 
function checkOrder(params) {
    listItems.forEach((listItem, index) => {
        const contentName = listItem.querySelector('.draggable')
        .innerText.trim()

        if(contentName !== lessonContents[index]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItem = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItem.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

check.addEventListener('click', checkOrder)