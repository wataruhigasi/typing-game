# Changelog

## Unreleased

## 2.12.2

- fix crashes in non-workspace usages

## 2.12.1

[CVE-2021-28792](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-28792): Fixes vulnerability which allowed malicous workspaces to execute code when opened by providing. Now the vulnerable configs cannot be overrided in workspaces anymore:
`sourcekit-lsp.serverPath`, `swift.languageServerPath`, `swift.path.sourcekite`, `swift.path.sourcekiteDockerMode`, `swift.path.swift_driver_bin`, `swift.path.shell`. Reported by [@Ry0taK](https://github.com/Ry0taK).

## 2.12.0

- Better and more helpful error messages on first start
- Upgraded dependencies

## 2.11.2

- Running default target did not work [#94](https://github.com/vknabel/vscode-swift-development-environment/issues/94)

## 2.11.1

- [Disable C and C++ for sourcekit-lsp](https://forums.swift.org/t/disable-sourcekit-lsp-for-c-files/30717/3)

## 2.11.0

- Allow lang server restart [#82](https://github.com/vknabel/vscode-swift-development-environment/issues/82) [#85](https://github.com/vknabel/vscode-swift-development-environment/issues/85) by @clayreimann
- Commands for stop, clean and run [#82](https://github.com/vknabel/vscode-swift-development-environment/issues/82) [#85](https://github.com/vknabel/vscode-swift-development-environment/issues/85) by @clayreimann
- Added tables for all configurations and commands to README

## 2.10.1

- Did not respect default toolchain path

## 2.10.0

- Default to Xcode's sourcekit-lsp on macOS instead of sourcekite
- README.md instruction improvements [#70](https://github.com/vknabel/vscode-swift-development-environment/issues/70) by [@fxn](https://github.com/fxn).

## 2.9.1

- Support iOS for sourcekit-lsp [#64](https://github.com/vknabel/vscode-swift-development-environment/issues/64) by [@haifengkao](https://github.com/haifengkao)

## 2.9.0

- `sourcekit-lsp` with different toolchains failed [#63](https://github.com/vknabel/vscode-swift-development-environment/issues/63)
- Drop broken debugger of SDE [#22](https://github.com/vknabel/vscode-swift-development-environment/issues/22)

If you are curious about how to set debugging up, see [Debugging Swift in VS Code](https://www.vknabel.com/pages/Debugging-Swift-in-VS-Code/).

## 2.8.3

- Fixed ignored Toolchain Path [vknabel/sourcekite#9](https://github.com/vknabel/sourcekite/issues/9)

## 2.8.2

- Fixed diagnostics not being shown [#58](https://github.com/vknabel/vscode-swift-development-environment/issues/58) [#57](https://github.com/vknabel/vscode-swift-development-environment/issues/57)

## 2.8.1

- Fixed an issue preventing autocompletion to work reliably on Linux, fixes [#54](https://github.com/vknabel/vscode-swift-development-environment/issues/54)
- Installation instructions now correctly link `/usr/lib/libsourcekitdInProc.so`, noticed by [@kennethz3](https://github.com/kennethz3)
- Support quoted arguments in settings, fixed by [@haifengkao](https://github.com/haifengkao)

## 2.8.0

- Now LSP-mode `sourcekite` supports `sourcekit-lsp.toolchainPath` after updating to [sourcekite@0.6.0](https://github.com/vknabel/sourcekite/releases/tag/0.6.0)

## 2.7.1

- `sourcekit-lsp.serverPath` wasn't read correctly, fixed by [M1xA @AnyCPU](https://github.com/AnyCPU)

## 2.7.0

- Latest sourcekite is now compatible with Swift 5.
- Added options for sourcekit-lsp: `sourcekit-lsp.serverPath` and `sourcekit-lsp.toolchainPath`. [#39](https://github.com/vknabel/vscode-swift-development-environment/issues/39)
- `sde.languageServerMode` now explicitly offers `sourcekit-lsp`.
- Updated installation instructions with a stronger emphasize on sourcekit-lsp.

_More details at [SDE 2.7.0 released](https://www.vknabel.com/pages/SDE-2-7-0-released/)_

## 2.6.0

- Add support for alternative language servers like [RLovelett/langserver-swift](https://github.com/RLovelett/langserver-swift) [#21](https://github.com/vknabel/vscode-swift-development-environment/issues/21)

Probably Apple's recently announced language server will be supported, too. See https://forums.swift.org/t/new-lsp-language-service-supporting-swift-and-c-family-languages-for-any-editor-and-platform/17024 for more infos.

If you prefer RLovelett's LangserverSwift, SDE will read your old `swift.languageServerPath`-config. In order to actually use it your need to set `sde.languageServerMode` to `langserver`.

## 2.5.2

- Warnings indicated a build failure

## 2.5.1

- Resolve `~` to the home dir [#30](https://github.com/vknabel/vscode-swift-development-environment/issues/30)
- Removed unuseful data from hover docs
- Remove code formatter, use [vknabel/vscode-swiftformat](https://github.com/vknabel/vscode-swiftformat) instead
- Installation instructions had wrong argument order for `ln -s` (thanks to [@mijo-gracanin](https://github.com/mijo-gracanin))
- Added note about installing `libcurl4-openssl-dev` (thanks to [@mijo-gracanin](https://github.com/mijo-gracanin))

## 2.5.0

- Autocompletion for SPM dependencies [#27](https://github.com/vknabel/vscode-swift-development-environment/issues/27) (thanks to [@yeswolf](https://github.com/yeswolf))
- Better support for vscode workspaces
- New setting `swift.targets` for supporting autocompletion if SDE can't.

Especially when using Xcode projects SDE cannot infer the correct compiler arguments. Now you can fix this by explicitly supplying targets with their sources and compiler arguments. SDE will still detect other targets automatically.

```json
{
  "swift.targets": [
    {
      "name": "YourWatchExtension",
      "path": "YourProject/YourWatchExtension",
      "sources": ["**/*.swift"],
      "compilerArguments": [
        "-sdk",
        "/Applications/Xcode.app/Contents/Developer/Platforms/WatchOS.platform/Developer/SDKs/WatchOS.sdk",
        "-target",
        "armv7k-apple-watchos4.0"
      ]
    }
  ]
}
```

## 2.4.4

- Hotfix release: outdated vscode dependencies [#31](https://github.com/vknabel/vscode-swift-development-environment/issues/31) (thanks to [@akdor1154](https://github.com/akdor1154))

## 2.4.3

- Hotfix release: fixes autocompletion

## 2.4.2

_Broken release_

- Dummy module did always precede real ones leading to bad completion behavior

## 2.4.1

- Extension did not work correctly
- Can now be disabled by `"sde.enable": false`

## 2.4.0

- Bumped internal dependencies to be more reliable on newer vscode versions
- New setting `sde.swiftBuildingParams` allows run other commands than `swift build` [#24](https://github.com/vknabel/vscode-swift-development-environment/issues/24) [jinmingjian/sde#32](https://github.com/jinmingjian/sde/issues/32)

### Building Params

It is now possible to run different commands when building swift code.

- `"sde.swiftBuildingParams": ["build"]`: default setting
- `"sde.swiftBuildingParams": ["build", "--build-path", ".vscode-build"]`: build in different directory, see [#24](https://github.com/vknabel/vscode-swift-development-environment/issues/24)
- `"sde.swiftBuildingParams": ["build", "--build-tests"]`: compile tests, but do not run them
- `"sde.swiftBuildingParams": ["test"]`: runs unit tests [jinmingjian/sde#32](https://github.com/jinmingjian/sde/issues/32)

## 2.3.2

- Code format did fail [#19](https://github.com/vknabel/vscode-swift-development-environment/issues/19)
- Code format always indented by 4 spaces. Now configurable.

### Tabwidth

By default `editor.tabSize` will be used. As this setting is global and affects all code, you can optionally override it using `"[swift]": { "tabSize": 2 }`.

## 2.3.1

- Accidentially logged SourceKit's `key.kind` and `key.description`
- Removed unused config `editor.quickSuggestions`
- Will no longer write `sde.buildOnSave` or `editor.quickSuggestions` to workspace settings
- `#` will now trigger completions
- `-target` will now be detected for `UIKit`, `AppKit`, `WatchKit` and `Foundation` on macOS and linux [#15](https://github.com/vknabel/vscode-swift-development-environment/issues/15)
- Index all swift files together when no `Package.swift` defined [#14](https://github.com/vknabel/vscode-swift-development-environment/issues/14)

## 2.3.0

- Fixes autocompletion for methods and invocations leading to invalid syntax [#9](https://github.com/vknabel/vscode-swift-development-environment/issues/9)
- Fixes a bug thats lead the extension to stop working [#10](https://github.com/vknabel/vscode-swift-development-environment/issues/10)
- Display documentation on Hover [#11](https://github.com/vknabel/vscode-swift-development-environment/issues/11)

## 2.2.0

- Autocompletion for external libraries like AppKit and UIKit after restart [#8](https://github.com/vknabel/vscode-swift-development-environment/issues/8)
- Display short documentation on autocompletion
- More reliable autocompletion, especially for global namespace
- New `"sde.sourcekit.compilerOptions"` setting

### How do I get autocompletion for UIKit?

Just add `"sde.sourcekit.compilerOptions": ["-target", "arm64-apple-ios11.0"]` to your workspace settings in Visual Studio Code and restart it.

## 2.1.3

- Improved new README
- Deprecated debugger, use [LLDB Debugger](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) instead

An example config of using LLDB Debugger can be seen below. `program` should contain the path to your built executable as before, the `preLaunchTask` is optional, but will run `swift build` before each debug session to keep your binaries up to date.

> **Note:** Currently I don't know of any reliable solution to debug your Swift tests.
> If you do, please file an issue or write me an [email](mailto:dev@vknabel.com).

```js
// .vscode.json/launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Run your Executable",
            "program": "${workspaceFolder}/.build/debug/your-executable",
            "args": [],
            "cwd": "${workspaceFolder}",
            "preLaunchTask": "swift-build"
        }
}
```

```js
// .vscode.json/tasks.json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "swift-build",
            "type": "shell",
            "command": "swift build"
        }
}
```

## 2.1.2

## 2.1.1

- Did not work with latest vscode [#2](https://github.com/vknabel/vscode-swift-development-environment/issues/2) and [#3](https://github.com/vknabel/vscode-swift-development-environment/issues/3)

## 2.1.0

- Initial Swift 4 support [jinmingjian/sde#38](https://github.com/jinmingjian/sde/issues/38).

## 2.0.20170209

- make a sourcekite docker image and add a new experimental setting "swift.path.sourcekiteDockerMode" for easier adoption for Linux users (issue: [#26](https://github.com/vknabel/vscode-swift-development-environment/issues/26)) (MacOS users do not need to update to this version in that there is no other additions in this version)

## 2.0.20170206

- release 2.0 ships a Swift language server backend and a new simple, async, pipe driven language server frontend (issue: [#9](https://github.com/vknabel/vscode-swift-development-environment/issues/9)). This new backend solves the unicode problem of original tool sourcekit-repl. This new frontend improves the code logic and the performance which leave the room for future messaging optimization when needed as well. Futhermore, it is not needed to build whole things from Swift's sources any more.

### 2.0 Release Broadcast

The `2.0` release introduces a new tool, [SourceKite](https://github.com/jinmingjian/sourcekite), as the interface to **SourceKit** library. Since the Swift `ABI` is not stable, you need to build it if you want to use SDE. Go to [SourceKite](https://github.com/jinmingjian/sourcekite) for further instructions.

Also because the Swift ABI **is not stable**, you may find that the _Hover Help_ or the _Code Completion_ don't display the right information after you upgrade your Swift toolchain. This is because the SourceKit library you linked with the [SourceKite](https://github.com/jinmingjian/sourcekite) tool can't understand the sources or binaries of your project. To fix this, **rebuild your project** and **restart vscode**.

#### Want to downgrade?

If the release broke your current experience or if you accidentally upgraded, you can go back to the previous releases like this:

1. Download the 1.x vsix from [the release page](https://github.com/vknabel/swift-development-environment/releases)
2. Remove the installed version in your vscode
3. Install the local `.vsix` package in your vscode

## 1.0.20170129

- serveral fixs for release 1.x and we want to release great new 2.0

## 1.0.20170118

- experimental built-in sourcekit interface (only for macOS)

## 1.0.20170114

- add an config option for shell exec path (issue: [#15](https://github.com/vknabel/vscode-swift-development-environment/issues/15))

## 1.0.20170113

- fix hard-coded shell exec path for macOS (issue: [#14](https://github.com/vknabel/vscode-swift-development-environment/issues/14))

## 1.0.20170112

- add container type info in hover (issue: [#6](https://github.com/vknabel/vscode-swift-development-environment/issues/6))

## 1.0

- Initial public release.

You can read a [hands-on introduction](http://blog.dirac.io/2017/01/11/get_started_sde.html) for a detailed explanation.
