import './date-extensions';
import { savePerson } from './storage';

export class Person {
    name: string;
    birthday: Date;
    maxage: number;
    weeks: number;

    constructor(name: string, birthday: Date, maxage: number) {
        this.name = name;
        this.birthday = birthday;
        this.maxage = maxage;
        
        const death = birthday.addYears(maxage);
        this.weeks = birthday.weeksUntil(death);
    }

    static fromJSON(value: any): Person {
        if (!value || !value.name || !value.birthday || !value.maxage)
            throw Error(`Invalid input for type Person:` + value);

        return new Person(value.name, new Date(value.birthday), value.maxage);
    }
}

export function createPerson(): Person | null {
    try {
        const name = _askName();
        const birthday = _askBirthday();
        const maxage = _askMaxAge();

        var person = new Person(name, birthday, maxage);
        savePerson(person);
        return person;
    } catch (err) {
        console.log("ERR - failed to add person with:", err);
        return null;
    }
}


function _askName(): string {
    const name = prompt('Name', 'Bob');
    if (!name) {
        alert("Invalid input. Please provide the correct name");
        throw Error("Invalid name");
    }

    return name;
}

function _askBirthday(): Date {
    const birthdayInput = prompt('Birthday', 'yyyy-mm-dd');
    if (!birthdayInput || isNaN(Date.parse(birthdayInput))) {
        alert("Invalid input. Please provide the correct birthday date");
        throw Error("Invalid birthday");
    }

    return new Date(birthdayInput);
}

function _askMaxAge(): number {
    const maxageInput = prompt('Life expectancy', '80');
    if (!maxageInput || isNaN(parseInt(maxageInput))) {
        alert("Invalid input. Please provide correct life expectancy");
        throw Error("Invalid life expectancy");
    }

    return +maxageInput;
}
