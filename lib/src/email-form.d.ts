export declare class EmailForm extends HTMLElement {
    private submittedListener;
    constructor();
    set email(newValue: string);
    get email(): string;
    get subject(): string;
    get message(): string;
    set submitted(callback: any);
    disconnectedCallback(): void;
}
