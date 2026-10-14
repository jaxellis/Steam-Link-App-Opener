[![Paypal](https://img.shields.io/badge/Support_My_Work-%23003087.svg?logo=paypal&style=for-the-badge)](https://paypal.me/JaxEllis)
[![GitHub Issues](https://img.shields.io/github/issues/jaxellis/Steam-Link-App-Opener.svg?style=for-the-badge&logo=github)](https://github.com/jaxellis/Steam-Link-App-Opener/issues)
[![CodeFactor](https://www.codefactor.io/repository/github/jaxellis/steam-link-app-opener/badge?style=for-the-badge)](https://www.codefactor.io/repository/github/jaxellis/steam-link-app-opener)
[![License](https://img.shields.io/github/license/jaxellis/Steam-Link-App-Opener?style=for-the-badge)](https://github.com/jaxellis/Steam-Link-App-Opener/blob/main/LICENSE)

<h1 align="center">
  Steam Link App Opener
</h1>
<p align="center">
  <em>Open Steam store and community links in the Steam app instead of your browser.</em>
</p>

---

## What it does

When you click a link to the Steam store or Steam community on any other website, this script sends it to the Steam desktop app (using `steam://openurl/`) instead of loading it in a browser tab. It matches `steampowered.com`, `steamcommunity.com` and their subdomains, such as `store.steampowered.com` and `help.steampowered.com`. The link is handed over from the tab you're already on, so you don't get an extra tab.

If you'd rather have a link open in the browser for once, hold the bypass key while you click. It's `Control` by default. There's also a setting that lets the browser's own click shortcuts (Ctrl, Shift, Alt or Cmd + click) always go through, see below. If your bypass key has a default browser action, it will use that when opening the link.

The script stays out of the way on Steam's own sites, since there's no point sending you to the app from a page you're already on.

There are no dependencies, it's one file of plain JavaScript.

---

## Installation

You need a userscript manager first:
[<img src="https://www.google.com/s2/favicons?domain=tampermonkey.net" width="16"/> Tampermonkey](https://www.tampermonkey.net/) |
[<img src="https://www.google.com/s2/favicons?domain=violentmonkey.github.io" width="16"/> Violentmonkey](https://violentmonkey.github.io/) |
[<img src="https://www.google.com/s2/favicons?domain=www.greasespot.net" width="16"/> Greasemonkey](https://www.greasespot.net/)

Then install the script from either of these:

| Site                                                                                                                                           | Install                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [<img src="https://www.google.com/s2/favicons?domain=github.com" width="16"/> GitHub](https://github.com/jaxellis/Steam-Link-App-Opener)       | [Install script](https://github.com/jaxellis/Steam-Link-App-Opener/raw/main/Steam_Link_App_Opener.user.js) |
| [<img src="https://www.google.com/s2/favicons?domain=greasyfork.org" width="16"/> GreasyFork](https://greasyfork.org/en/users/845897-jaxellis) | [Install script](https://greasyfork.org/en/scripts/436231-steam-link-app-opener)                           |

---

## Settings

There are two settings. You change them from your userscript manager's menu: click the manager's icon in the toolbar while you're on any page and look under the script's name.

**Bypass key** (default: `Control`)

Choosing this entry opens a prompt where you can type the key you want. The options are `Control`, `Shift`, `Alt`, `Meta`, `AltGraph`, `CapsLock`, `NumLock` and `ScrollLock`. Leave it empty to turn the bypass key off. The lock keys count as on or off rather than held down, so with `CapsLock` as the bypass key, links open normally for as long as Caps Lock is on.

**Browser shortcuts always bypass** (default: off)

When this is on, a click with Ctrl, Shift, Alt or Cmd held does whatever your browser normally does with it (new tab, new window and so on), no matter which bypass key you picked. When it's off, only the bypass key lets a link through, so with the default settings a Shift+click on a Steam link still goes to the app.

The two settings work separately. You can turn the bypass key off and leave browser shortcuts on, or the other way around, or use both.

Your choices are saved by the userscript manager and apply on every site. Some managers can't refresh the menu text after you change something, so if a label still shows the old value, reload the page.

If your manager doesn't show the menu entries, you can set the defaults by editing the `DEFAULTS` block near the top of the script. The script also logs a message to the browser console (prefixed with `SLAO`) when it can't set up the menu or reach storage.

---

## Problems or ideas

Open an [issue](https://github.com/jaxellis/Steam-Link-App-Opener/issues) if something breaks or you'd like a change.

## License

GPL-3.0-or-later. See [LICENSE](https://github.com/jaxellis/Steam-Link-App-Opener/blob/main/LICENSE).
