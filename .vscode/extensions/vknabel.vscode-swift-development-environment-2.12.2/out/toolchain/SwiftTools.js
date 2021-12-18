"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolchain = exports.shouldBuildOnSave = exports.swiftPackageExists = exports.setRunning = void 0;
const cp = require("child_process");
const fs = require("fs");
const path = require("path");
const vscode_1 = require("vscode");
const config = require("../vscode/config-helpers");
const output_channels_1 = require("../vscode/output-channels");
const status_bar_1 = require("../vscode/status-bar");
const DiagnosticFirstLine = /(.+?):(\d+):(\d+): (error|warning|note|.+?): (.+)/;
function setRunning(isRunning) {
    vscode_1.commands.executeCommand("setContext", "sde:running", isRunning);
}
exports.setRunning = setRunning;
function swiftPackageExists() {
    const manifestPath = vscode_1.workspace.workspaceFolders
        ? path.join(vscode_1.workspace.workspaceFolders[0].uri.fsPath, "Package.swift")
        : null;
    return manifestPath && fs.existsSync(manifestPath);
}
exports.swiftPackageExists = swiftPackageExists;
function shouldBuildOnSave() {
    return config.buildOnSave() && swiftPackageExists();
}
exports.shouldBuildOnSave = shouldBuildOnSave;
class Toolchain {
    constructor(swiftPath, pkgBasePath, args) {
        this.swiftBinPath = swiftPath;
        this.basePath = pkgBasePath;
        this.buildArgs = args;
    }
    // Getters
    get isRunning() {
        return this.runProc != undefined;
    }
    get diagnostics() {
        if (!this._diagnostics) {
            this._diagnostics = vscode_1.languages.createDiagnosticCollection("swift");
        }
        return this._diagnostics;
    }
    // Public API
    /**
     * @returns A Disposable that can be used to stop this instance of the Toolchain
     */
    start() {
        return {
            dispose: () => this.stop(),
        };
    }
    /**
     * Stops this instance of the Toolchain
     */
    stop() {
        var _a, _b;
        if (this.buildProc) {
            console.log("Stopping build proc");
        }
        (_a = this.buildProc) === null || _a === void 0 ? void 0 : _a.kill();
        if (this.runProc) {
            console.log("Stopping run proc");
        }
        (_b = this.runProc) === null || _b === void 0 ? void 0 : _b.kill();
    }
    spawnSwiftProc(args, logs, onExit) {
        // let oPipe = new Duplex({ highWaterMark: 1024, allowHalfOpen: false });
        // let ePipe = new Duplex({ highWaterMark: 1024, allowHalfOpen: false });
        const proc = cp.spawn(this.swiftBinPath, args, {
            cwd: this.basePath,
            // stdio: ["ignore", oPipe, ePipe],
        });
        proc.stderr.on("data", data => {
            logs.write(`${data}`);
        });
        let stdout = "";
        proc.stdout.on("data", data => {
            stdout += data;
            logs.write(`${data}`);
        });
        const promise = new Promise((resolve, reject) => {
            logs.log(`pid: ${proc.pid} - ${this.swiftBinPath} ${args.join(" ")}`);
            proc.on("error", err => {
                logs.log(`[Error] ${err.message}`);
                reject(err);
            });
            proc.on("exit", (code, signal) => {
                resolve(stdout);
                onExit(code, signal);
            });
        });
        return { proc, output: promise };
    }
    build(target = "") {
        output_channels_1.default.build.clear();
        output_channels_1.default.build.log("-- Build Started --");
        const start = Date.now();
        const buildArgs = [...this.buildArgs];
        if (target) {
            buildArgs.unshift(target);
        }
        if (!["build", "test"].includes(buildArgs[0])) {
            buildArgs.unshift("build");
        }
        status_bar_1.statusBarItem.start();
        try {
            const { proc, output: buildOutput } = this.spawnSwiftProc(buildArgs, output_channels_1.default.build, code => {
                const duration = Date.now() - start;
                if (code != 0) {
                    status_bar_1.statusBarItem.failed();
                    output_channels_1.default.build.log(`-- Build Failed (${(duration / 1000).toFixed(1)}s) --`, true);
                }
                else {
                    status_bar_1.statusBarItem.succeeded();
                    output_channels_1.default.build.log(`-- Build Succeeded (${(duration / 1000).toFixed(1)}s) --`);
                }
                this.buildProc = undefined;
            });
            buildOutput.then(buildOutput => this.generateDiagnostics(buildOutput));
            this.buildProc = proc;
        }
        catch (e) {
            console.log(e);
        }
    }
    generateDiagnostics(buildOutput = "") {
        this._diagnostics.clear();
        const newDiagnostics = new Map();
        const lines = buildOutput.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const match = line.match(DiagnosticFirstLine);
            if (!match) {
                // console.log(`line did not match - '${line}'`);
                continue;
                //       } else {
                //         console.log(`found diagnostic -
                // ${line}
                // ${lines[i + 1]}
                // ${lines[i + 2]}
                // -------`);
                //   console.log(match);
            }
            const [_, file, lineNumStr, startColStr, swiftSev, message] = match;
            // vscode used 0 indexed lines and columns
            const lineNum = parseInt(lineNumStr, 10) - 1;
            const startCol = parseInt(startColStr, 10) - 1;
            const endCol = lines[i + 2].trimEnd().length - 1;
            const range = new vscode_1.Range(lineNum, startCol, lineNum, endCol);
            const diagnostic = new vscode_1.Diagnostic(range, message, toVSCodeSeverity(swiftSev));
            diagnostic.source = "sourcekitd";
            if (!newDiagnostics.has(file)) {
                newDiagnostics.set(file, []);
            }
            newDiagnostics.get(file).push(diagnostic);
        }
        for (const entry of newDiagnostics) {
            const [file, diagnostics] = entry;
            if (file.includes("checkouts")) {
                continue;
            }
            // TODO: check for overlapping diagnostic ranges and collapse into `diagnostic.relatedInformation`
            const uri = vscode_1.Uri.parse(file);
            // TODO: check to see if sourcekitd already has diagnostics for this file
            this._diagnostics.set(uri, diagnostics);
        }
    }
    runStart(target = "") {
        setRunning(true);
        output_channels_1.default.run.clear();
        output_channels_1.default.run.log(`running ${target ? target : "package"}…`);
        const { proc } = this.spawnSwiftProc(target ? ["run", target] : ["run"], output_channels_1.default.run, (code, signal) => {
            // handle termination here
            output_channels_1.default.run.log(`Process exited. code=${code} signal=${signal}`);
            setRunning(false);
            this.runProc = undefined;
        });
        this.runProc = proc;
    }
    runStop() {
        setRunning(false);
        output_channels_1.default.run.log(`stopping`);
        this.runProc.kill();
        this.runProc = undefined;
    }
    clean() {
        status_bar_1.statusBarItem.start("cleaning");
        this.spawnSwiftProc(["package clean"], output_channels_1.default.build, (code, signal) => {
            status_bar_1.statusBarItem.succeeded("clean");
            output_channels_1.default.build.log("done");
        });
    }
}
exports.Toolchain = Toolchain;
function toVSCodeSeverity(sev) {
    switch (sev) {
        case "error":
            return vscode_1.DiagnosticSeverity.Error;
        case "warning":
            return vscode_1.DiagnosticSeverity.Warning;
        case "note":
            return vscode_1.DiagnosticSeverity.Information;
        default:
            return vscode_1.DiagnosticSeverity.Hint; //FIXME
    }
}
//# sourceMappingURL=SwiftTools.js.map