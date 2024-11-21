const localStorageKey = 'yup'

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

Date.prototype.addYears = function(years) {
    var date = new Date(this.valueOf())
    date.setFullYear(date.getFullYear() + years)
    return date
}

Date.prototype.getMonthPretty = function() {
    var date = new Date(this.valueOf())
    var month = date.getMonth() + 1
    return ("0" + month).slice(-2)
}

function weeksBetween(date1, date2) {
    console.log('weeks')
    return Math.round((date2 - date1) / (7 * 24 * 60 * 60 * 1000))
}

function addPerson() {
    const name = prompt('Name', 'Bob')
    if (!name) return

    const birthday = prompt('Birthday', 'yyyy-mm-dd')
    if (!birthday) return

    const maxAge = prompt('Life expectancy', '80')
    if (!maxAge) return

    if (name && birthday && maxAge) {
        const person = {
            name,
            birthday,
            maxAge
        }

        let stored = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
        stored.push(person)
        localStorage.setItem(localStorageKey, JSON.stringify(stored))

        const warning = document.getElementById('warning')
        warning.innerHTML = ''
        
        displayPersons(stored)
        selectPerson(person)
    }
}

function getPersons() {
    const stored = localStorage.getItem(localStorageKey)
    if (stored) return JSON.parse(stored)
    return []
}

function selectPerson(p) {
    const personLabel = document.getElementById('person-label')
    personLabel.innerHTML = p.name
    displayBoard(p)
}

function displayPersons(persons) {
    if (persons.length == 1) return
    
    const menu = document.getElementById('persons')
    menu.innerHTML = ''
    persons.forEach((p) => {
        const item = document.createElement('button')
        item.innerHTML = p.name
        item.onclick = () => selectPerson(p)
        
        menu.appendChild(item)
    })
}

function displayBoard(activePerson) {  
    const board = document.getElementById('board')
    board.innerHTML = ''

    const birthday = new Date(activePerson.birthday)
    const death = birthday.addYears(parseInt(activePerson.maxAge))
    const now = new Date()

    const weeks = weeksBetween(birthday, death)

    for (let i = 0; i < weeks; i++) {
        const curr = birthday.addDays(7 * (i + 1))

        let w = document.createElement('div')
        w.id = `${curr.getFullYear()}-${curr.getMonthPretty()}-${curr.getDate()}`
        w.classList.add('week-square')

        if (curr < now) {
            w.classList.add('past')
        }

        board.appendChild(w)
    }
}

function init() {
    const persons = getPersons()
    
    const warning = document.getElementById('warning')
    if (!persons || persons.length == 0) {
        warning.innerHTML = 'Nothing to display'
        return
    }

    displayPersons(persons)

    const activePerson = persons[0]
    selectPerson(activePerson)

    displayBoard(activePerson)
}

init()

