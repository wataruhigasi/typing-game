"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
let disposables = [];
function makeChannel(name, showByDefault = true) {
    const _channel = vscode_1.window.createOutputChannel(`Swift - ${name}`);
    disposables.push(_channel);
    const retVal = {
        _channel,
        write(msg, show = showByDefault) {
            this._channel.append(msg);
            if (show) {
                this._channel.show(true);
            }
        },
        log(msg, show = showByDefault) {
            this._channel.appendLine(msg);
            if (show) {
                this._channel.show(true);
            }
        },
        clear() {
            this._channel.clear();
        },
    };
    return retVal;
}
function init(context) {
    context.subscriptions.push(...disposables);
}
exports.default = {
    init,
    noop: {
        log(msg, show) { },
        clear() { },
    },
    build: makeChannel("Build", false),
    run: makeChannel("Run"),
};
//# sourceMappingURL=output-channels.js.map