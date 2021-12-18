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
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const AbsolutePath_1 = require("../helpers/AbsolutePath");
const config = require("./config-helpers");
const config_helpers_1 = require("./config-helpers");
const lsp_preconditions_1 = require("./lsp-preconditions");
function currentServerOptions(context) {
    switch (config.lsp()) {
        case config_helpers_1.LangaugeServerMode.LanguageServer:
            return config.lspServerOptions();
        case config_helpers_1.LangaugeServerMode.SourceKit:
            return config.sourcekitLspServerOptions();
        case config_helpers_1.LangaugeServerMode.SourceKite:
            return config.sourcekiteServerOptions(context);
    }
}
function currentClientOptions() {
    switch (config.lsp()) {
        case config_helpers_1.LangaugeServerMode.SourceKit:
            return {
                documentSelector: ["swift", "objective-c", "objective-cpp"],
                synchronize: undefined,
            };
        case config_helpers_1.LangaugeServerMode.SourceKite:
            return {
                initializationOptions: {
                    isLSPServerTracingOn: config.isLSPTracingOn(),
                    skProtocolProcess: (0, AbsolutePath_1.absolutePath)(vscode_1.workspace.getConfiguration().get("swift.path.sourcekite")),
                    skProtocolProcessAsShellCmd: vscode_1.workspace
                        .getConfiguration()
                        .get("swift.path.sourcekiteDockerMode"),
                    skCompilerOptions: vscode_1.workspace.getConfiguration().get("sde.sourcekit.compilerOptions"),
                    toolchainPath: vscode_1.workspace.getConfiguration("sourcekit-lsp").get("toolchainPath") || null,
                },
            };
        default:
            return {};
    }
}
let lspClient;
let clientDisposable;
/**
 * Starts the LSP client (which specifies how to start the LSP server), and registers
 * a dispoasble in the extension context.
 * @param context the SDE extension context
 */
function startLSPClient(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, lsp_preconditions_1.currentLspPreconditions)();
        let clientOptions = Object.assign({ 
            // Register the server for plain text documentss
            documentSelector: [
                { language: "swift", scheme: "file" },
                { pattern: "*.swift", scheme: "file" },
            ], synchronize: {
                configurationSection: ["swift", "editor", "[swift]"],
                // Notify the server about file changes to '.clientrc files contain in the workspace
                fileEvents: [
                    vscode_1.workspace.createFileSystemWatcher("**/*.swift"),
                    vscode_1.workspace.createFileSystemWatcher(".build/*.yaml"),
                ],
            } }, currentClientOptions());
        // Create the language client and start the client.
        const lspOpts = currentServerOptions(context);
        lspClient = new node_1.LanguageClient("Swift", lspOpts, clientOptions);
        clientDisposable = lspClient.start();
        context.subscriptions.push(clientDisposable);
    });
}
/**
 * Stops the current LSP client and starts a new client.
 * The client is stopped using the disposable returned from `client.start()`
 * @param context the SDE extension context
 */
function restartLSPClient(context) {
    return __awaiter(this, void 0, void 0, function* () {
        clientDisposable.dispose();
        yield startLSPClient(context);
    });
}
exports.default = {
    startLSPClient,
    restartLSPClient,
};
//# sourceMappingURL=lsp-interop.js.map