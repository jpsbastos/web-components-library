"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var template = document.createElement('template');
template.innerHTML = "\n        <style>\n            .user-card {\n                box-sizing: border-box;\n                font-family: 'Arial', sans-serif;\n                background: #f4f4f4;\n                height: 200px;\n                display: flex;\n                border-bottom: lightblue 5px solid;\n                align-items: center;\n            }\n\n            .user-card:hover {\n                background: #BDECFB;\n            }\n\n            .img-container {\n                box-sizing: border-box;\n                margin-right: 5%;\n                width: 30%;\n                text-align: center;\n            }\n\n            .img-container img {\n                border-radius: 50%;\n            }\n\n            .info-container {\n                width: 70%;\n            }\n\n            .user-card button {\n                cursor: pointer;\n                background: #989fa5;\n                color: #fff;\n                border: 0;\n                border-radius: 5px;\n                padding: 5px 10px;\n            }\n\n            .info {\n                display: none;\n            }\n\n            h3 {\n                color: coral;\n                cursor: pointer;\n            }\n\n            #delete-btn {\n                background: red;\n            }\n\n        </style>\n        <div class=\"user-card\">\n            <div class=\"img-container\">\n                <img></img>\n            </div>\n            <div class=\"info-container\">\n                <h3></h3>\n                <div class=\"info\">\n                    <p><slot name=\"email\"/></p>\n                    <p><slot name=\"phone\"/></p>\n                </div>\n                <button id=\"toggle-info\">Show Info</button>\n                <button id=\"delete-btn\">Delete</button>\n            </div>\n        </div>\n    ";
var UserCard = /** @class */ (function (_super) {
    __extends(UserCard, _super);
    function UserCard() {
        var _this = _super.call(this) || this;
        _this.showInfo = false;
        _this.attachShadow({ mode: 'open' });
        _this.shadowRoot.appendChild(template.content.cloneNode(true));
        return _this;
    }
    UserCard.prototype.connectedCallback = function () {
        var _this = this;
        this.shadowRoot.querySelector('#toggle-info')
            .addEventListener('click', function () { return _this.toggleInfo(); });
    };
    Object.defineProperty(UserCard.prototype, "id", {
        get: function () {
            return this.getAttribute('id');
        },
        set: function (newValue) {
            this.setAttribute('id', newValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserCard.prototype, "name", {
        get: function () {
            return this.getAttribute('name');
        },
        set: function (newValue) {
            this.shadowRoot.querySelector('h3').innerText = newValue;
            this.setAttribute('name', newValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserCard.prototype, "avatar", {
        set: function (newValue) {
            this.shadowRoot.querySelector('img').src = newValue;
            this.setAttribute('avatar', newValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserCard.prototype, "nameClicked", {
        set: function (callback) {
            var _this = this;
            this.nameListener = function () {
                callback(_this.name);
            };
            this.shadowRoot.querySelector('h3').addEventListener('click', this.nameListener);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserCard.prototype, "deleteClicked", {
        set: function (callback) {
            var _this = this;
            this.deleteListener = function () {
                var answer = confirm("Are you sure you want to remove \"" + _this.name + "\"from your contacts list?");
                if (answer) {
                    callback(+_this.id);
                }
            };
            this.shadowRoot.querySelector('#delete-btn')
                .addEventListener('click', this.deleteListener);
        },
        enumerable: true,
        configurable: true
    });
    UserCard.prototype.disconnectedCallback = function () {
        var _this = this;
        this.shadowRoot.querySelector('#toggle-info')
            .removeEventListener('click', function () { return _this.toggleInfo(); });
        this.shadowRoot.querySelector('h3')
            .removeEventListener('click', this.nameListener);
        this.shadowRoot.querySelector('delete-btn')
            .removeEventListener('click', this.deleteListener);
    };
    UserCard.prototype.toggleInfo = function () {
        this.showInfo = !this.showInfo;
        var info = this.shadowRoot.querySelector('.info');
        var toggleBtn = this.shadowRoot.querySelector('#toggle-info');
        if (this.showInfo) {
            info.style.display = 'block';
            toggleBtn.innerText = 'Hide Info';
        }
        else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show Info';
        }
    };
    return UserCard;
}(HTMLElement));
exports.UserCard = UserCard;
if (!window.customElements.get('user-card')) {
    window.customElements.define('user-card', UserCard);
}
