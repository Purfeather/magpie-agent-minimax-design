# Compatibility record

## Windows — verified

- Windows 11 (workstation), MiniMax Design 3.0.17, official magpie 0.1.20xx (Oct 2026).
- Verified with real end-to-end use: connect writes `config.customModels.user-custom-magpie` into `hub-config.json` with magpie's full model list; Design's model menu shows the Magpie entry; real inference requests flow through magpie's gateway and are attributed to `minimax-design` in Usage; existing custom-model entries are preserved; disconnect restores the file (keys magpie wrote are removed).
- Magpie's own agent-plugin sandbox checks also passed: dotted nested key paths with intermediate-object creation, object-array values, `$VAR` expansion (`$APPDATA`, `$LOCALAPPDATA`), preservation of unrelated keys, and per-key restore on disconnect.

## macOS — unverified

MiniMax Design ships for macOS 13+, but the userData path differs there (electron default `~/Library/Application Support/@hilo/desktop/hub-config.json`), and magpie's agent-plugin `config` field takes a single path with `~`/`$VAR` expansion. This version therefore targets Windows only. If you can test on macOS, the plugin likely works with `config` changed to the macOS path — please open an issue or PR with the observed path and a verification note.
