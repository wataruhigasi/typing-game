"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function parseMapping(funcName, documentText) {
    const regex = new RegExp(`(${funcName})\\(\\S*?(\\[|\\{)(\\S+?)(\\]|\\})\\)`, 'g');
    let m = null;
    let result = [];
    do {
        m = regex.exec(documentText);
        if (m) {
            const items = m[3].replace(/('|^,|,$)/g, '')
                .split(',')
                .map(item => item.replace(/\:.*/, ''));
            result = [...result, ...items];
        }
    } while (m);
    return result;
}
function parseDocument(documentText) {
    return {
        state: parseMapping('mapState', documentText),
        getters: parseMapping('mapGetters', documentText),
        actions: parseMapping('mapActions', documentText),
        mutations: parseMapping('mapMutations', documentText)
    };
}
function buildSuggestions(documentText) {
    const spaceRegex = /\s+/g;
    const newDocumentText = documentText.replace(spaceRegex, '').replace('"', '\'');
    const parsedMappings = parseDocument(newDocumentText);
    const stateAndGetters = [
        ...parsedMappings.state,
        ...parsedMappings.getters
    ];
    const actionsAndMutations = [
        ...parsedMappings.actions,
        ...parsedMappings.mutations
    ];
    return [
        ...stateAndGetters.map(item => {
            return new vscode.CompletionItem(item, vscode.CompletionItemKind.Property);
        }),
        ...actionsAndMutations.map(item => {
            return new vscode.CompletionItem(item, vscode.CompletionItemKind.Method);
        }),
    ];
}
function activate(context) {
    const provider = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'vue' }, {
        provideCompletionItems(document, position) {
            const documentText = document.getText();
            const currentPos = document.offsetAt(position);
            const firstScriptTagPos = documentText.indexOf('<script>') + 8;
            const lastScriptTagPos = documentText.lastIndexOf('</script>');
            if (firstScriptTagPos <= currentPos && currentPos <= lastScriptTagPos) {
                // const linePrefix: string = document.lineAt(position).text.substr(0, position.character);
                // if (!linePrefix.endsWith('this.')) {
                //   return undefined;
                // }
            }
            else {
                const firstTemplateTagPos = documentText.indexOf('<template>') + 10;
                const lastTemplateTagPos = documentText.lastIndexOf('</template>');
                if (currentPos < firstTemplateTagPos || currentPos > lastTemplateTagPos) {
                    return undefined;
                }
            }
            return buildSuggestions(documentText);
        }
    }, '.');
    context.subscriptions.push(provider);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map