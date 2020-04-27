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
template.innerHTML = "\n    <style>\n\n        label {\n            font-weight: bold;\n        }\n\n        textarea {\n            resize: none;\n        }\n\n        .form-control {\n            border-radius: 5px;\n            display: block;\n            margin-bottom: 10px;\n            padding: 10px;\n            width: 100%;\n        }\n\n        .form-group {\n            width: 80%;\n        }\n\n        #submitBtn {\n            border-radius: 5px;\n            font-size: 20px;\n            padding: 10px;\n        }\n    </style>\n    <form id=\"emailForm\" onsubmit=\"return false\">\n        <div class=\"form-group\">\n            <label for=\"email\">Email:</label>\n            <input id=\"email\" type=\"text\" class=\"form-control\" readonly name=\"email\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"subject\">Subject:</label>\n            <input id=\"subject\" type=\"text\" class=\"form-control\" placeholder=\"Type a subject ...\" required>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"message\">Message:</label>\n            <textarea rows=\"5\" id=\"message\" class=\"form-control\" placeholder=\"Type a message ...\" required></textarea>\n        </div>\n        <button id=\"submitBtn\" type=\"submit\">Enviar!</button>\n    </form>\n    </div>\n";
var EmailForm = /** @class */ (function (_super) {
    __extends(EmailForm, _super);
    function EmailForm() {
        var _this = _super.call(this) || this;
        _this.attachShadow({ mode: 'open' });
        _this.shadowRoot.appendChild(template.content.cloneNode(true));
        return _this;
    }
    Object.defineProperty(EmailForm.prototype, "email", {
        get: function () {
            return this.getAttribute('email');
        },
        set: function (newValue) {
            this.shadowRoot.querySelector('#email').setAttribute('value', newValue);
            this.setAttribute('email', newValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailForm.prototype, "subject", {
        get: function () {
            return this.shadowRoot.querySelector('#subject').value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailForm.prototype, "message", {
        get: function () {
            return this.shadowRoot.querySelector('#message').value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailForm.prototype, "submitted", {
        set: function (callback) {
            var _this = this;
            this.submittedListener = function () {
                var msgToSend = {
                    email: _this.email,
                    subject: _this.subject,
                    message: _this.message
                };
                callback(msgToSend);
            };
            this.shadowRoot.querySelector('#submitBtn').addEventListener('click', this.submittedListener);
        },
        enumerable: true,
        configurable: true
    });
    EmailForm.prototype.disconnectedCallback = function () {
        this.shadowRoot.querySelector('#submitBtn').removeEventListener('click', this.submittedListener);
    };
    return EmailForm;
}(HTMLElement));
exports.EmailForm = EmailForm;
if (!customElements.get('email-form')) {
    customElements.define('email-form', EmailForm);
}
