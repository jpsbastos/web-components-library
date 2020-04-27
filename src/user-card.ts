    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            .user-card {
                box-sizing: border-box;
                font-family: 'Arial', sans-serif;
                background: #f4f4f4;
                height: 200px;
                display: flex;
                border-bottom: lightblue 5px solid;
                align-items: center;
            }

            .user-card:hover {
                background: #BDECFB;
            }

            .img-container {
                box-sizing: border-box;
                margin-right: 5%;
                width: 30%;
                text-align: center;
            }

            .img-container img {
                border-radius: 50%;
            }

            .info-container {
                width: 70%;
            }

            .user-card button {
                cursor: pointer;
                background: #989fa5;
                color: #fff;
                border: 0;
                border-radius: 5px;
                padding: 5px 10px;
            }

            .info {
                display: none;
            }

            h3 {
                color: coral;
                cursor: pointer;
            }

            #delete-btn {
                background: red;
            }

        </style>
        <div class="user-card">
            <div class="img-container">
                <img></img>
            </div>
            <div class="info-container">
                <h3></h3>
                <div class="info">
                    <p><slot name="email"/></p>
                    <p><slot name="phone"/></p>
                </div>
                <button id="toggle-info">Show Info</button>
                <button id="delete-btn">Delete</button>
            </div>
        </div>
    `
    export class UserCard extends HTMLElement {
        private showInfo: boolean;
        private nameListener: EventListener;
        private deleteListener: EventListener;

        constructor() {
            super();
            this.showInfo = false;
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback(): void {
            this.shadowRoot.querySelector('#toggle-info')
                .addEventListener('click', () => this.toggleInfo());
        }

        
        get id(): string {
            return this.getAttribute('id');
        }

        get name(): string {
            return this.getAttribute('name');
        }

        set name(newValue) {
            this.shadowRoot.querySelector('h3').innerText = newValue;
            this.setAttribute('name', newValue);
        }

        set avatar(newValue) {
            this.shadowRoot.querySelector('img').src = newValue;
            this.setAttribute('avatar', newValue);
        }

        set id(newValue) {
            this.setAttribute('id', newValue);
        }

        set nameClicked(callback) {
            this.nameListener =  () => {
                callback(this.name);
            };

            this.shadowRoot.querySelector('h3').addEventListener('click', this.nameListener);
        }

        set deleteClicked(callback) {
            this.deleteListener = () => {
                const answer = confirm(`Are you sure you want to remove "${this.name}"from your contacts list?`);
                if(answer) {
                    callback(+this.id);
                }
            };

            this.shadowRoot.querySelector('#delete-btn')
                .addEventListener('click', this.deleteListener);
        }

        disconnectedCallback() : void {
            this.shadowRoot.querySelector('#toggle-info')
                .removeEventListener('click', () => this.toggleInfo());
            this.shadowRoot.querySelector('h3')
                .removeEventListener('click', this.nameListener);
            this.shadowRoot.querySelector('delete-btn')
                .removeEventListener('click', this.deleteListener);
        }

        toggleInfo() : void {
            this.showInfo = !this.showInfo;

            const info: HTMLElement = this.shadowRoot.querySelector('.info');
            const toggleBtn: HTMLElement = this.shadowRoot.querySelector('#toggle-info');
            if(this.showInfo) {
                info.style.display = 'block';
                toggleBtn.innerText = 'Hide Info';
            } else {
                info.style.display = 'none';
                toggleBtn.innerText = 'Show Info';
            }
        }
    }

    if (!window.customElements.get('user-card')) {
        window.customElements.define('user-card', UserCard);
    }