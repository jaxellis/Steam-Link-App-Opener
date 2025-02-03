[![Paypal](https://img.shields.io/badge/Support_My_Work-%23003087.svg?logo=paypal&style=for-the-badge)](https://paypal.me/JaxEllis)
[![GitHub Issues](https://img.shields.io/github/issues/jaxellis/Steam-Link-App-Opener.svg?style=for-the-badge&logo=github)](https://github.com/jaxellis/Steam-Link-App-Opener/issues)
[![CodeFactor](https://www.codefactor.io/repository/github/jaxellis/steam-link-app-opener/badge?style=for-the-badge)](https://www.codefactor.io/repository/github/jaxellis/steam-link-app-opener)
[![License](https://img.shields.io/github/license/jaxellis/Steam-Link-App-Opener?style=for-the-badge)](https://github.com/jaxellis/Steam-Link-App-Opener/blob/main/LICENSE)

<h1 align="center">
  🎮 Steam Link App Opener
</h1>
<p align="center">
  <em>Instantly open Steam Store/Community links in your Steam desktop app — with a customizable hotkey to bypass!</em>
</p>

---

## 🔧 Features
- **🖱️One-Click Steam App Integration**: Automatically intercepts Steam links.
- **⚙️ Custom Hotkey Bypass**: Hold `Control` (configurable) to open links in your browser instead.
- **🔗 Browser Shortcuts Work**: <kbd>Ctrl+Click</kbd> / <kbd>Shift+Click</kbd> / <kbd>Alt+Click</kbd> behave normally.
- **🪶 Lightweight**: Zero dependencies – just 2KB of vanilla JS.
- **🪟 Transparent Code**: [Code Quality Badges](#-quality) and open-source licensing.

---

## ⚙️ Prerequisites
- A userscript manager:
  [<img src="https://www.google.com/s2/favicons?domain=tampermonkey.net" width="16"/> Tampermonkey](https://www.tampermonkey.net/) |
  [<img src="https://www.google.com/s2/favicons?domain=www.greasespot.net" width="16"/> Greasemonkey](https://www.greasespot.net/) |
  [<img src="https://www.google.com/s2/favicons?domain=violentmonkey.github.io" width="16"/> Violentmonkey](https://violentmonkey.github.io/)

---

## 🚀 Installation

### Direct Install Links:
| Site | Install |
|------|---------|
| [<img src="https://www.google.com/s2/favicons?domain=github.com" width="16"/> **GitHub**](https://github.com/jaxellis/Steam-Link-App-Opener) | [📦 Install Script](https://github.com/jaxellis/Steam-Link-App-Opener/raw/main/Steam_Link_App_Opener.user.js) |
| [<img src="https://www.google.com/s2/favicons?domain=greasyfork.org" width="16"/> **GreasyFork**](https://greasyfork.org/en/users/845897-jaxellis) | [📦 Install Script](https://greasyfork.org/en/scripts/436231-steam-link-app-opener) |

---

## 🛠️ Configuration
Customize the hotkey by editing the `CUSTOMKEY` variable in the script:
```js
const CUSTOMKEY = 'Control'; // Valid keys: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values