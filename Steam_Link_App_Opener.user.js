// ==UserScript==
// @name		Steam Link App Opener
// @namespace	https://github.com/jaxellis
// @version		3.0.0
// @description	Opens Steam Links in the Steam Application
// @author		Jaxellis
// @icon		https://store.steampowered.com/favicon.ico
// @homepage	https://github.com/jaxellis/Steam-Link-App-Opener
// @supportURL	https://github.com/jaxellis/Steam-Link-App-Opener/issues/
// @updateURL	https://github.com/jaxellis/Steam-Link-App-Opener/raw/main/Steam_Link_App_Opener.user.js
// @downloadURL	https://github.com/jaxellis/Steam-Link-App-Opener/raw/main/Steam_Link_App_Opener.user.js
// @match		*://*/*
// @grant		GM.getValue
// @grant		GM.setValue
// @grant		GM.registerMenuCommand
// @grant		GM.unregisterMenuCommand
// @run-at		document-start
// @license		GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

(() => {
	'use strict';

	/* Constants */
	const PREFIX = 'steam://openurl/'; // Default: steam://openurl/
	const STEAM_DOMAINS = ['steampowered.com', 'steamcommunity.com']; // Steam domains to open in app (subdomains are matched automatically)
	// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
	const VALID_KEYS = [
		'Control',
		'Shift',
		'Alt',
		'Meta',
		'AltGraph',
		'CapsLock',
		'NumLock',
		'ScrollLock',
	];

	// True for steampowered.com / steamcommunity.com and any of their subdomains (store., help., etc.)
	const isSteamHost = (host) =>
		STEAM_DOMAINS.some(
			(domain) => host === domain || host.endsWith(`.${domain}`),
		);

	// Return if current page is a Steam domain
	if (isSteamHost(location.hostname)) return;

	// Used on first run, or if nothing has been saved yet
	const DEFAULTS = {
		customKey: 'Control', // Hold key to open link in browser instead ('' = disabled)
		browserShortcutsBypass: false, // true = Ctrl/Shift/Alt/Meta + click always open normally in the browser (new tab, new window, etc.)
	};

	// Keep a copy of current settings in memory so we don't have to read from storage every time a link is clicked
	const settings = { ...DEFAULTS };

	// Use GM.getValue / GM.setValue, fall back to the defaults if user has some niche script manager.
	const getValue = async (key, fallback) => {
		try {
			return await GM.getValue(key, fallback);
		} catch (error) {
			console.error('SLAO || Storage unavailable, Using default value', error);
			return fallback;
		}
	};
	const setValue = async (key, value) => {
		try {
			await GM.setValue(key, value);
		} catch (error) {
			console.error(
				'SLAO || Storage unavailable, the setting only lasts until the page closes',
				error,
			);
		}
	};

	//  GM.registerMenuCommand / GM.unregisterMenuCommand, Tampermonkey and Violentmonkey both support, this is for the random person that uses some niche userscript manager that doesn't support it.
	const registerCommand = (caption, callback) => {
		if (typeof GM.registerMenuCommand === 'function') {
			return GM.registerMenuCommand(caption, callback);
		}
		console.error(
			'SLAO || Unable to register Menu, the settings MUST be changed in the DEFAULTS section of the script.',
		);
		return undefined;
	};
	const unregisterCommand = (id) => {
		if (typeof GM.unregisterMenuCommand === 'function') {
			return GM.unregisterMenuCommand(id);
		}
		console.warn(
			'SLAO || Unable to Unregister Menu. If registering was sucessfull then the menu will show stale values until the page reloads.',
		);
		return undefined;
	};

	// Stored Registered Menu IDs
	let menuIds = [];

	// Ask the user which key should bypass the script
	const promptForKey = async () => {
		const input = window.prompt(
			`Hold this key while clicking to open the link normally.\nOptions: ${VALID_KEYS.join(', ')}\nLeave empty to disable.`,
			settings.customKey,
		);
		if (input === null) return; // User pressed Cancel, change nothing

		const value = input.trim();
		// Match case-insensitively so "control" works as well as "Control"
		const match = VALID_KEYS.find(
			(key) => key.toLowerCase() === value.toLowerCase(),
		);
		if (value && !match) {
			window.alert(
				`"${value}" is not a supported key.\nOptions: ${VALID_KEYS.join(', ')}`,
			);
			return;
		}

		settings.customKey = match || ''; // Empty string means the feature is disabled
		await setValue('customKey', settings.customKey);
		await buildMenu();
	};

	// Flip whether browser shortcuts (Ctrl/Shift/Alt/Meta + click) always bypass the script
	const toggleBrowserShortcuts = async () => {
		settings.browserShortcutsBypass = !settings.browserShortcutsBypass;
		await setValue('browserShortcutsBypass', settings.browserShortcutsBypass);
		await buildMenu();
	};

	// (Re)create the menu entries so their labels show the current values
	const buildMenu = async () => {
		try {
			// Remove the old entries first so we don't end up with duplicates
			for (const id of menuIds) {
				if (id !== undefined) await unregisterCommand(id);
			}
			menuIds = [
				await registerCommand(
					`Bypass key: ${settings.customKey || 'Disabled'}`,
					promptForKey,
				),
				await registerCommand(
					`Browser shortcuts always bypass: ${settings.browserShortcutsBypass ? 'On' : 'Off'}`,
					toggleBrowserShortcuts,
				),
			];
		} catch (error) {
			console.error('SLAO || Unable to build menu commands', error);
		}
	};

	// Load saved settings, then draw the menu
	const initializeSettings = async () => {
		const savedKey = await getValue('customKey', DEFAULTS.customKey);

		// Only accept a known key (or '' for disabled), otherwise fall back to the default
		settings.customKey =
			VALID_KEYS.includes(savedKey) || savedKey === ''
				? savedKey
				: DEFAULTS.customKey;

		const savedShortcuts = await getValue(
			'browserShortcutsBypass',
			DEFAULTS.browserShortcutsBypass,
		);
		// Only accept true/false, otherwise fall back to the default
		settings.browserShortcutsBypass =
			typeof savedShortcuts === 'boolean'
				? savedShortcuts
				: DEFAULTS.browserShortcutsBypass;
		await buildMenu();
	};
	initializeSettings();

	// This event listener is delegated to the document to find all steam links
	document.addEventListener(
		'click',
		(event) => {
			// If the custom key is held, let the browser open the link normally
			if (settings.customKey && event.getModifierState(settings.customKey)) {
				return;
			}

			// If enabled, let the browser handle its own click shortcuts (Ctrl+Click for a new tab, Shift+Click for a new window, etc.)
			if (
				settings.browserShortcutsBypass &&
				(event.ctrlKey || event.shiftKey || event.altKey || event.metaKey)
			) {
				return;
			}

			// Find the closest link to whatever was clicked (guard against targets that can't be searched)
			const target = event.target;
			if (!target || typeof target.closest !== 'function') {
				return;
			}
			const link = target.closest('a[href]');

			// Ensure link is valid
			if (!link || typeof link.href !== 'string') {
				return;
			}

			// Only handle http/https links (ignores mailto:, javascript:, etc.) that point at a Steam domain
			if (!/^https?:$/.test(link.protocol) || !isSteamHost(link.hostname)) {
				return;
			}

			event.preventDefault(); // Prevent the default link behavior

			const url = `${PREFIX}${link.href}`;
			window.open(url, '_self', 'noopener'); // Open steam app link in current tab. No reason to open a new one, noopener to prevent the new page from accessing the opener window (security)
		},
		true,
	);
})();
