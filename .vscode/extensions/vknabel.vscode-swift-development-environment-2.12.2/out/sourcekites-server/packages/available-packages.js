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
exports.availablePackages = void 0;
const description_package_1 = require("./description-package");
const swift_file_package_1 = require("./swift-file-package");
const debug_yaml_package_1 = require("./debug-yaml-package");
const config_package_1 = require("./config-package");
const package_helpers_1 = require("./package-helpers");
const availablePackages = (fromPath) => __awaiter(void 0, void 0, void 0, function* () {
    const [configTargets, debugYamlTargets, descriptionTargets, swiftFileTargets,] = yield Promise.all([
        (0, config_package_1.configPackage)(fromPath),
        (0, debug_yaml_package_1.debugYamlPackage)(fromPath),
        (0, description_package_1.descriptionPackage)(fromPath),
        (0, swift_file_package_1.swiftFilePackage)(fromPath),
    ]);
    return (0, package_helpers_1.flatteningTargetsWithUniqueSources)(configTargets, debugYamlTargets, descriptionTargets, swiftFileTargets);
});
exports.availablePackages = availablePackages;
//# sourceMappingURL=available-packages.js.map