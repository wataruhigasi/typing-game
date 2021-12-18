"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilerArgumentsForImportPath = exports.expandingSourceGlob = void 0;
const path = require("path");
const glob = require("glob");
const expandingSourceGlob = (fromPath, targetPath) => (sourceGlob) => {
    return new Promise((resolve, reject) => {
        const options = {
            cwd: targetPath,
            root: fromPath
        };
        glob(sourceGlob, options, (error, matches) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(matches.map(match => path.normalize(path.resolve(targetPath, match))));
            }
        });
    });
};
exports.expandingSourceGlob = expandingSourceGlob;
const compilerArgumentsForImportPath = (importPath) => [
    "-Xcc",
    "-I",
    "-Xcc",
    importPath,
    "-I",
    importPath,
    "-Xcc",
    "-F",
    "-Xcc",
    importPath,
    "-F",
    importPath
];
exports.compilerArgumentsForImportPath = compilerArgumentsForImportPath;
//# sourceMappingURL=path-helpers.js.map