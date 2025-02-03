// ==UserScript==
// @name		Steam Link App Opener
// @namespace	https://github.com/jaxellis
// @version		2.0.0
// @description	Opens Steam Links in the Steam Application
// @author		Jaxellis
// @icon		https://store.steampowered.com/favicon.ico
// @homepage	https://github.com/jaxellis/Steam-Link-App-Opener
// @supportURL	https://github.com/jaxellis/Steam-Link-App-Opener/issues/
// @updateURL	https://github.com/jaxellis/Steam-Link-App-Opener/raw/main/Steam_Link_App_Opener.user.js
// @downloadURL	https://github.com/jaxellis/Steam-Link-App-Opener/raw/main/Steam_Link_App_Opener.user.js
// @match		http://*/*
// @match		https://*/*
// @exclude		http://store.steampowered.com/*
// @exclude		https://store.steampowered.com/*
// @exclude		http://steamcommunity.com/*
// @exclude		https://steamcommunity.com/*
// @grant		none
// @run-at      document-start
// @license		GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

/*
List of values you can use for Custom Key.
https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
*/

/* Global Variables and Constants */
const USECUSTOMKEY = true; // Set to false to disable custom key
const CUSTOMKEY = 'Control'; // Default key is 'Control'
const PREFIX = 'steam://openurl/'; // Default steam://openurl/
const STEAM_URLS = ['store.steampowered.com', 'steamcommunity.com']; // List of Steam domains to update
var customKeyPressed = false; // Variable to tell if our custom key is being pressed

// This event listener is delegated to the document to find all steam links
document.addEventListener('click', (event) => {
	// Find the closest link that matches any of the specified steam URLs
	const link = event.target.closest(
		STEAM_URLS.map((domain) => `a[href*="${domain}"]`).join(', ')
	);
	// If no link is found, return early
	if (!link) {
		return;
	}
	// Prevent the default link behavior
	event.preventDefault();
	// If a custom key is pressed, open the default link
	if (customKeyPressed) {
		window.open(link.href);
		customKeyPressed = false;
		return;
	}
	// Otherwise, open the link with a specified prefix
	window.open(`${PREFIX}${link.href}`);
});

/* Update Custom Key Variable */
if (USECUSTOMKEY) {
	// Add event listener to the document for keydown events
	document.addEventListener('keydown', (event) => {
		// Check if the pressed key is the custom key
		if (event.key === CUSTOMKEY) {
			// Check if the custom key is already pressed
			if (customKeyPressed) {
				return; // Exit the function if variable set to true already
			}
			customKeyPressed = true; // Set the custom key as pressed
		}
	});

	// Add event listener to the document for keyup event
	document.addEventListener('keyup', (event) => {
		// Check if the key pressed is the custom key
		if (event.key === CUSTOMKEY) {
			customKeyPressed = false; // Set the custom key as not pressed
		}
	});
}
