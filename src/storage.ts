import { Person } from './person';

const localStorageKey: string = "yup";

export function loadPersons(): Person[] {
    try {
        const stored = localStorage.getItem(localStorageKey);
        if (!stored) return [];
        return JSON.parse(stored).map((item: any) => Person.fromJSON(item));
    } catch (err) {
        console.log("Failed to parse persons from local storage with error:", err);
        return [];
    }
}

export function savePerson(person: Person): void {
    const persons = loadPersons();
    persons.push(person)
    localStorage.setItem(localStorageKey, JSON.stringify(persons));
}

export function importDefinitions(input: string): boolean {
    try {
        const persons: Person[] = JSON.parse(input) as Person[];
        if (!persons) return false;

        localStorage.setItem(localStorageKey, input);
        return true;
    } catch (err) {
        console.log("Failed to import definitions with input:", input);
        return false;
    }

}
