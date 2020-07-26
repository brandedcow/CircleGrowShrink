function randomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16)
}

function camelToTitle(camel) {
    if (camel.length === 0) return camel
    
    const title = camel
        .split('')
        .map((letter, index) => {
            if (index == 0) return letter.toUpperCase()
            if (letter == letter.toUpperCase()) return ` ${letter}`
            else return letter
        })
        .join('')

    return title
}

function csvToArr(csvString) {
    const array = 
        csvString
            .split(',')
            .reduce((acc, curr) => {
                if (curr.length === 6) {
                    acc.push(`#${curr}`)
                }
                return acc
            }, [])

    return array
}

function pickRandom(array) {
    return array[randomNumBetween(0, array.length)]
}