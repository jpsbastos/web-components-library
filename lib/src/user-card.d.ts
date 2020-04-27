export declare class UserCard extends HTMLElement {
    private showInfo;
    private nameListener;
    private deleteListener;
    constructor();
    connectedCallback(): void;
    get id(): string;
    get name(): string;
    set name(newValue: string);
    set avatar(newValue: any);
    set id(newValue: string);
    set nameClicked(callback: any);
    set deleteClicked(callback: any);
    disconnectedCallback(): void;
    toggleInfo(): void;
}
