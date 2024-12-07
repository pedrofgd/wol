import { Person } from './person';
import './date-extensions';

export class Board {
    element: HTMLDivElement;
    label: HTMLDivElement;
    warning: HTMLDivElement;

    constructor(element: HTMLDivElement, label: HTMLDivElement, warning: HTMLDivElement) {
        this.element = element;
        this.label = label;
        this.warning = warning;
    }

    build(person: Person | null): void {
        if (!person) {
            this._setWarning();
            return;
        }

        const now = new Date();
        const birthday = new Date(person.birthday);

        this._setLabel(person.name);
        this._clear();

        for (let i = 0; i < person.weeks; i++) {
            const curr = birthday.addDays(7 * (i + 1));

            let w = document.createElement('div')
            w.id = `${curr.getFullYear()}-${curr.getMonthPretty()}-${curr.getDate()}`
            w.classList.add('week-square')

            if (curr < now) {
                w.classList.add('past')
            }

            this.element.appendChild(w)
        }
    }

    private _setWarning(): void {
        this.element.innerHTML = '';
        this.warning.innerHTML = 'Nothing to display';
    }

    private _clear(): void {
        this.element.innerHTML = '';
        this.warning.innerHTML = '';
    }

    private _setLabel(value: string): void {
        this.label.innerHTML = value;
    }
}
