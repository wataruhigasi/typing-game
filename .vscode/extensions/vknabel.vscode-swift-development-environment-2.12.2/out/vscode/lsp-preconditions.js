"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentLspPreconditions = void 0;
const vscode_1 = require("vscode");
const AbsolutePath_1 = require("../helpers/AbsolutePath");
const config = require("./config-helpers");
const config_helpers_1 = require("./config-helpers");
const fs = require("fs");
function currentLspPreconditions() {
    return __awaiter(this, void 0, void 0, function* () {
        yield generalPreconditions();
        switch (config.lsp()) {
            case config_helpers_1.LangaugeServerMode.LanguageServer:
                return currentLanguageServerPreconditions();
            case config_helpers_1.LangaugeServerMode.SourceKit:
                return currentSourcekitLspPreconditions();
            case config_helpers_1.LangaugeServerMode.SourceKite:
                return currentSourcekitePreconditions();
        }
    });
}
exports.currentLspPreconditions = currentLspPreconditions;
var PreconditionActions;
(function (PreconditionActions) {
    PreconditionActions["Retry"] = "Retry";
    PreconditionActions["OpenSettings"] = "Settings";
    PreconditionActions["InstructionsSourcekitLsp"] = "Help for sourcekit-lsp";
    PreconditionActions["InstructionsSourcekite"] = "Help for sourcekite";
    PreconditionActions["InstructionsLangserver"] = "Help for LangserverSwift";
})(PreconditionActions || (PreconditionActions = {}));
function generalPreconditions() {
    return __awaiter(this, void 0, void 0, function* () {
        const shellPath = (0, AbsolutePath_1.absolutePath)(vscode_1.workspace.getConfiguration().get("swift.path.shell"));
        if (!shellPath || !fs.existsSync(shellPath)) {
            yield handlePreconditionAction(yield vscode_1.window.showErrorMessage(`Wrong shell path ${shellPath} for setting swift.path.shell.`, PreconditionActions.Retry, PreconditionActions.OpenSettings));
        }
        const swiftPath = (0, AbsolutePath_1.absolutePath)(vscode_1.workspace.getConfiguration().get("swift.path.swift_driver_bin"));
        if (!swiftPath || !fs.existsSync(swiftPath)) {
            yield handlePreconditionAction(yield vscode_1.window.showErrorMessage(`Swift not found at path ${swiftPath} for setting swift.path.swift_driver_bin`, PreconditionActions.Retry, PreconditionActions.OpenSettings));
        }
    });
}
function currentLanguageServerPreconditions() {
    return __awaiter(this, void 0, void 0, function* () {
        const lspPath = config.languageServerPath();
        if (!fs.existsSync(lspPath)) {
            yield handlePreconditionAction(yield vscode_1.window.showErrorMessage(`Langserver not found at \`${lspPath}\`.
  Install it and provide the path to \`swift.languageServerPath\`.`, PreconditionActions.Retry, PreconditionActions.OpenSettings, PreconditionActions.InstructionsLangserver));
        }
    });
}
function currentSourcekitLspPreconditions() {
    return __awaiter(this, void 0, void 0, function* () {
        const sourcekitLspPath = config.sourceKitLSPLocation(config.toolchainPath());
        if (!fs.existsSync(sourcekitLspPath)) {
            yield handlePreconditionAction(yield vscode_1.window.showErrorMessage(`sourcekit-lsp not found at \`${sourcekitLspPath}\`.
Install it and provide the path to \`sourcekit-lsp.serverPath\`.`, PreconditionActions.Retry, PreconditionActions.OpenSettings, PreconditionActions.InstructionsSourcekitLsp));
        }
    });
}
function currentSourcekitePreconditions() {
    return __awaiter(this, void 0, void 0, function* () {
        const isDockerMode = vscode_1.workspace
            .getConfiguration()
            .get("swift.path.sourcekiteDockerMode", false);
        const sourcekitePath = (0, AbsolutePath_1.absolutePath)(vscode_1.workspace.getConfiguration().get("swift.path.sourcekite"));
        if (!isDockerMode && !fs.existsSync(sourcekitePath)) {
            yield handlePreconditionAction(yield vscode_1.window.showErrorMessage(`\`sourcekite\` not found at \`${sourcekitePath}\`.
    Install it and provide the path to \`swift.path.sourcekite\`.`, PreconditionActions.Retry, PreconditionActions.OpenSettings, PreconditionActions.InstructionsSourcekite));
        }
    });
}
function handlePreconditionAction(action) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (action) {
            case PreconditionActions.Retry:
                yield currentLspPreconditions();
                break;
            case PreconditionActions.OpenSettings:
                if (action === "Settings") {
                    yield vscode_1.commands.executeCommand("workbench.action.openSettings");
                }
                break;
            case PreconditionActions.InstructionsSourcekite:
                yield vscode_1.commands.executeCommand("vscode.open", vscode_1.Uri.parse("https://github.com/vknabel/vscode-swift-development-environment/tree/2.11.1#using-sourcekit-lsp"));
                break;
            case PreconditionActions.InstructionsSourcekitLsp:
                yield vscode_1.commands.executeCommand("vscode.open", vscode_1.Uri.parse("https://github.com/vknabel/vscode-swift-development-environment/tree/2.11.1#using-sourcekite"));
                break;
            case PreconditionActions.InstructionsLangserver:
                yield vscode_1.commands.executeCommand("vscode.open", vscode_1.Uri.parse("https://github.com/vknabel/vscode-swift-development-environment/tree/2.11.1#using-langserver-swift"));
                break;
        }
    });
}
//# sourceMappingURL=lsp-preconditions.js.map