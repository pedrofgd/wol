import { createPerson, Person } from "./person";
import { importDefinitions, loadPersons } from "./storage";

export class Menu {
    element: HTMLDivElement;
    button: HTMLButtonElement;
    persons: Person[];
    activePerson?: Person;
    observers: ((person: Person | null) => void)[]; 

    constructor(element: HTMLDivElement, button: HTMLButtonElement) {
        this.element = element;
        this.button = button;
        this.persons = loadPersons();
        this.observers = [];
    }

    build() {
        this._load();
        this._setupButton();
    }

    subscribe(action: (person: Person | null) => void): void {
        this.observers.push(action);
    }

    notifyAll(person: Person | null) {
        this.observers.forEach(action => {
            action(person);
        })
    }

    setupImportDefinitions(element: HTMLButtonElement): void {
        element.addEventListener("click", () => {
            var definitions = prompt("Enter you data", "JSON");
            if (!definitions) return;

            var success = importDefinitions(definitions);
            if (!success) {
                alert("Invalid definitions. Check and try again.");
                return;
            }

            this._reload();
        });
    }

    private _load(): void {
        if (this.persons) {
            this.element.innerHTML = '';
            this.persons.forEach((p) => {
                const item = document.createElement('button');
                item.innerHTML = p.name;
                item.onclick = () => this.notifyAll(p);

                this.element.appendChild(item);
            })

            // default selection
            if (!this.activePerson) {
                this._setActive(this.persons[0]);
            }

            this.notifyAll(this.activePerson!);
        } else {
            // no selection
            this.notifyAll(null);
        }
    }

    private _reload() {
        this.persons = loadPersons();
        this._load();
    }

    private _setActive(person: Person) {
        this.activePerson = person;
    }

    private _setupButton() {
        this.button.addEventListener('click', () => this._addPerson());
    }

    private _addPerson() {
        const newP = createPerson();
        if (newP) {
            this.persons.push(newP);
            this._setActive(newP);

            // trigger re-render
            this._load();
        }
    }
}
