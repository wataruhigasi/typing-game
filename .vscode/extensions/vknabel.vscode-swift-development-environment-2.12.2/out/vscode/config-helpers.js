"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceKitLSPLocation = exports.sourcekitLspServerOptions = exports.toolchainPath = exports.lspServerOptions = exports.languageServerPath = exports.sourcekiteServerOptions = exports.isLSPTracingOn = exports.isBuildTracingOn = exports.buildOnSave = exports.lsp = exports.LangaugeServerMode = void 0;
const path = require("path");
const fs = require("fs");
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
var LangaugeServerMode;
(function (LangaugeServerMode) {
    LangaugeServerMode["SourceKit"] = "sourcekit-lsp";
    LangaugeServerMode["LanguageServer"] = "langserver";
    LangaugeServerMode["SourceKite"] = "sourcekite";
})(LangaugeServerMode = exports.LangaugeServerMode || (exports.LangaugeServerMode = {}));
/**
 * @returns which language server to use
 */
function lsp() {
    return vscode_1.workspace
        .getConfiguration()
        .get("sde.languageServerMode", LangaugeServerMode.SourceKit);
}
exports.lsp = lsp;
/**
 * @returns if the project should be built when a file is saved
 */
function buildOnSave() {
    return vscode_1.workspace.getConfiguration().get("sde.buildOnSave", true);
}
exports.buildOnSave = buildOnSave;
/**
 * @returns if build logging is enabled
 */
function isBuildTracingOn() {
    return vscode_1.workspace.getConfiguration().get("sde.enableTracing.client");
}
exports.isBuildTracingOn = isBuildTracingOn;
function isLSPTracingOn() {
    return vscode_1.workspace.getConfiguration().get("sde.enableTracing.LSPServer");
}
exports.isLSPTracingOn = isLSPTracingOn;
/**
 * get server options for
 * @param context the current extension context
 */
function sourcekiteServerOptions(context) {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(path.join("out/sourcekites-server", "server.js"));
    // The debug options for the server
    const debugOptions = Object.assign({ execArgv: ["--nolazy", "--inspect=6004"] }, process.env);
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions = {
        run: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            options: debugOptions,
        },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            options: debugOptions,
        },
    };
    return serverOptions;
}
exports.sourcekiteServerOptions = sourcekiteServerOptions;
function languageServerPath() {
    return vscode_1.workspace
        .getConfiguration("swift")
        .get("languageServerPath", "/usr/local/bin/LanguageServer");
}
exports.languageServerPath = languageServerPath;
function lspServerOptions() {
    // Load the path to the language server from settings
    const executableCommand = languageServerPath();
    const run = {
        command: executableCommand,
        options: process.env,
    };
    const debug = run;
    const serverOptions = {
        run: run,
        debug: debug,
    };
    return serverOptions;
}
exports.lspServerOptions = lspServerOptions;
function toolchainPath() {
    return vscode_1.workspace.getConfiguration("sourcekit-lsp").get("toolchainPath");
}
exports.toolchainPath = toolchainPath;
function sourcekitLspServerOptions() {
    const toolchain = vscode_1.workspace.getConfiguration("sourcekit-lsp").get("toolchainPath");
    const sourcekitPath = sourceKitLSPLocation(toolchain);
    // sourcekit-lsp takes -Xswiftc arguments like "swift build", but it doesn't need "build" argument
    const sourceKitArgs = vscode_1.workspace
        .getConfiguration()
        .get("sde.swiftBuildingParams", [])
        .filter(param => param !== "build");
    const env = toolchain
        ? Object.assign(Object.assign({}, process.env), { SOURCEKIT_TOOLCHAIN_PATH: toolchain }) : process.env;
    const run = {
        command: sourcekitPath,
        options: { env },
        args: sourceKitArgs,
    };
    const serverOptions = run;
    return serverOptions;
}
exports.sourcekitLspServerOptions = sourcekitLspServerOptions;
function sourceKitLSPLocation(toolchain) {
    const explicit = vscode_1.workspace
        .getConfiguration("sourcekit-lsp")
        .get("serverPath", null);
    if (explicit)
        return explicit;
    const sourcekitLSPPath = path.resolve(toolchain || "/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain", "usr/bin/sourcekit-lsp");
    const isPreinstalled = fs.existsSync(sourcekitLSPPath);
    if (isPreinstalled) {
        return sourcekitLSPPath;
    }
    return vscode_1.workspace
        .getConfiguration("swift")
        .get("languageServerPath", "/usr/local/bin/sourcekit-lsp");
}
exports.sourceKitLSPLocation = sourceKitLSPLocation;
//# sourceMappingURL=config-helpers.js.map