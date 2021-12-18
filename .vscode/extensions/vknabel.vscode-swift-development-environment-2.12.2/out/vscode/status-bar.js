"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusBarItem = void 0;
const vscode_1 = require("vscode");
const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
function buildAnimator() {
    let i = 0;
    return function () {
        i = (i + 1) % frames.length;
        return frames[i];
    };
}
let buildItem;
let defaultColor;
let animationInterval;
const getItem = () => {
    if (!buildItem) {
        buildItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        defaultColor = buildItem.color;
    }
    buildItem.color = defaultColor;
    buildItem.show();
    return buildItem;
};
const stopAnimation = () => clearInterval(animationInterval);
exports.statusBarItem = {
    start(action = "building") {
        stopAnimation();
        const item = getItem();
        const nextFrame = buildAnimator();
        animationInterval = setInterval(() => {
            item.text = `${nextFrame()} ${action}`;
        }, 100);
    },
    succeeded(action = "build") {
        stopAnimation();
        const item = getItem();
        item.text = `$(check) ${action} succeeded`;
        item.color = defaultColor;
        setTimeout(() => item.hide(), 10000);
    },
    failed(action = "build") {
        stopAnimation();
        const item = getItem();
        item.text = `$(issue-opened) ${action} failed`;
        item.color = "red";
    },
};
//# sourceMappingURL=status-bar.js.map