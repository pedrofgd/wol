import './style.css'
import { Board } from './board.ts'
import { Menu } from './menu.ts';

const board = new Board(
    document.querySelector<HTMLDivElement>("#board")!,
    document.querySelector<HTMLDivElement>("#person-label")!,
    document.querySelector<HTMLDivElement>("#warning")!
);

const menu = new Menu(
    document.querySelector<HTMLDivElement>('#persons')!,
    document.querySelector<HTMLButtonElement>('#add')!);

menu.subscribe((p) => board.build(p));
menu.setupImportDefinitions(document.querySelector<HTMLButtonElement>('#import')!);

// Start application
menu.build();


