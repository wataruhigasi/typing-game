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
exports.activate = exports.diagnosticCollection = void 0;
const vscode_1 = require("vscode");
const AbsolutePath_1 = require("./helpers/AbsolutePath");
const tools = require("./toolchain/SwiftTools");
const lsp_interop_1 = require("./vscode/lsp-interop");
const output_channels_1 = require("./vscode/output-channels");
let swiftBinPath = null;
let swiftBuildParams = ["build"];
let mostRecentRunTarget = "";
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        output_channels_1.default.init(context);
        if (vscode_1.workspace.getConfiguration().get("sde.enable") === false) {
            output_channels_1.default.build.log("SDE Disabled", false);
            return;
        }
        tools.setRunning(false);
        output_channels_1.default.build.log("Activating SDE");
        initConfig();
        yield lsp_interop_1.default.startLSPClient(context);
        //commands
        let toolchain = new tools.Toolchain(swiftBinPath, vscode_1.workspace.workspaceFolders && vscode_1.workspace.workspaceFolders[0]
            ? vscode_1.workspace.workspaceFolders[0].uri.fsPath
            : "/", swiftBuildParams);
        context.subscriptions.push(toolchain.diagnostics);
        context.subscriptions.push(toolchain.start());
        context.subscriptions.push(vscode_1.commands.registerCommand("sde.commands.build", () => toolchain.build()), vscode_1.commands.registerCommand("sde.commands.restartLanguageServer", () => __awaiter(this, void 0, void 0, function* () { return yield lsp_interop_1.default.restartLSPClient(context); })), vscode_1.commands.registerCommand("sde.commands.run", () => toolchain.runStart()), vscode_1.commands.registerCommand("sde.commands.selectRun", () => {
            vscode_1.window
                .showInputBox({ prompt: "Run which target?", value: mostRecentRunTarget })
                .then((target) => {
                if (!target) {
                    return;
                }
                mostRecentRunTarget = target;
                toolchain.runStart(target);
            });
        }), vscode_1.commands.registerCommand("sde.commands.restart", () => {
            toolchain.runStop();
            toolchain.runStart(mostRecentRunTarget);
        }), vscode_1.commands.registerCommand("sde.commands.stop", () => toolchain.runStop()), vscode_1.commands.registerCommand("sde.commands.clean", () => toolchain.clean()));
        vscode_1.workspace.onDidSaveTextDocument((document) => {
            if (tools.shouldBuildOnSave() && document.languageId === "swift") {
                toolchain.build();
            }
        }, null, context.subscriptions);
        // respond to settings changes
        vscode_1.workspace.onDidChangeConfiguration((event) => __awaiter(this, void 0, void 0, function* () {
            if (event.affectsConfiguration("sde") ||
                event.affectsConfiguration("swift") ||
                event.affectsConfiguration("sourcekit-lsp")) {
                yield lsp_interop_1.default.restartLSPClient(context);
            }
        }));
        // build on startup
        toolchain.build();
    });
}
exports.activate = activate;
function initConfig() {
    swiftBinPath = (0, AbsolutePath_1.absolutePath)(vscode_1.workspace.getConfiguration().get("swift.path.swift_driver_bin"));
    swiftBuildParams = vscode_1.workspace.getConfiguration().get("sde.swiftBuildingParams") || [
        "build",
    ];
}
//# sourceMappingURL=clientMain.js.map