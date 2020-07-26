const optionMenuButton = document.getElementById('optionMenuButton')
const optionMenu = document.getElementById('optionMenu')

optionMenuButton.onclick = () => {
    optionMenu.style.display = optionMenu.style.display === "block" ? "none" : "block"
}

//-----

const options = {
    minMin: 5,
    minMax: 40,
    maxMin: 100,
    maxMax: 500,
    intMin: 50,
    intMax: 200,
    colors: [],
    backgroundColor: "#000000"
}

const scrollContainer = document.getElementById('scrollContainer')
var circles = []
let idCount = 0;

scrollContainer.addEventListener('click', addCircle)

function addCircle (e) {
    const {
        minMin,
        minMax,
        maxMin,
        maxMax,
        intMin,
        intMax,
        colors  
    } = options

    const newCircle = new Circle(
        randomNumBetween(minMin, minMax),
        randomNumBetween(maxMin, maxMax),
        e.x,
        e.y,
        randomNumBetween(intMin, intMax),
        idCount,
        colors
    )
    idCount += 1

    circles.push(newCircle)
    addCircleToDOM(newCircle)
}

function addCircleToDOM(circle) {
    const existingCircle = document.getElementById(`circle-${circle.id}`)

   
    if (!existingCircle) {
        let newCircle = document.createElement('div')
        newCircle.className = 'circle'
        newCircle.style.cssText = circle.cssText
        newCircle.id = `circle-${circle.id}`

        scrollContainer.appendChild(newCircle)
    } else {
        existingCircle.style.cssText = circle.cssText
    }
}


window.addEventListener('scroll', () => {
    circles.forEach(circle => {
        circle.update()
        addCircleToDOM(circle)
    })
    window.scrollTo(0, document.body.scrollHeight / 2) 
})

function createOptionMenuRangeInput(name, minVar, maxVar) {
    const inputContainer = document.createElement('div')
    
    inputContainer.className="rangeInput"
    inputContainer.id = name

    const label = document.createElement('div')
    label.innerHTML = camelToTitle(name)
    label.style.width = '100%'

    const minInput = document.createElement('input')
    minInput.type="number"
    minInput.className="numInput"
    minInput.value = options[minVar]
    minInput.onchange = (e) => { options[minVar] = e.target.value }

    const to = document.createElement('span')
    to.innerText = 'to'
    to.style.padding = "0px 20px"

    const maxInput = document.createElement('input')
    maxInput.type="number"
    maxInput.className="numInput"
    maxInput.value = options[maxVar]
    maxInput.onchange = (e) => { options[maxVar] = e.target.value }

    inputContainer.appendChild(label)
    inputContainer.appendChild(minInput)
    inputContainer.appendChild(to)
    inputContainer.appendChild(maxInput)

    optionMenu.appendChild(inputContainer)
}

function createOptionMenuColorInput(name, elementType, onChange) {
    const colorInputContainer = document.createElement('div')
    colorInputContainer.className = 'colorInput'
    colorInputContainer.id = name

    const label = document.createElement('div')
    label.innerHTML = camelToTitle(name) 

    const colorInput = document.createElement(elementType)
    if (elementType === 'textarea') {
        colorInput.rows = 5
        colorInput.cols = 23
        colorInput.placeholder = '56a3a6,484538,cad49d,d4eac8,c0d8e0'
    } else {
        colorInput.placeholder = '56a3a6'
    }
    
    colorInput.onkeyup = onChange

    colorInputContainer.appendChild(label)
    colorInputContainer.appendChild(colorInput)

    optionMenu.appendChild(colorInputContainer)
}

function createOptionMenuClearButton() {
    const clearButton = document.createElement('button')
    clearButton.innerHTML = 'Clear All'

    clearButton.onclick = () => {
        circles = []
        scrollContainer.innerHTML = ''
    }

    clearButton.style.marginLeft = '3%'

    optionMenu.appendChild(clearButton)
}

createOptionMenuRangeInput('minDiameter', 'minMin', 'minMax')
createOptionMenuRangeInput('maxDiameter', 'maxMin', 'maxMax')
createOptionMenuRangeInput('intervalSize', 'intMin', 'intMax')
createOptionMenuColorInput('circleColors', 'textarea', (e) => {
    const { value } = e.target
    options.colors = csvToArr(value)
})
createOptionMenuColorInput('backgroundColor', 'input', (e) => {
    const { value } = e.target
    options.backgroundColor = `#${value}`
    scrollContainer.style.backgroundColor = `#${value}`
})
createOptionMenuClearButton()
