// ==UserScript==
// @name         Steam Link App Opener
// @namespace    https://github.com/jaxellis
// @version      1.0.0
// @description  Opens Steam Links in the Steam Application
// @author       Jaxellis
// @icon         https://store.steampowered.com/favicon.ico
// @homepage     https://github.com/jaxellis/Steam-Link-App-Opener
// @supportURL   https://github.com/jaxellis/Steam-Link-App-Opener/issues/
// @updateURL    https://github.com/jaxellis/Steam-Link-App-Opener/raw/main/Steam_Link_App_Opener.user.js
// @downloadURL  https://github.com/jaxellis/Steam-Link-App-Opener/raw/main/Steam_Link_App_Opener.user.js
// @include      http://*
// @include      https://*
// @grant        none
// ==/UserScript==

class LinkCollector {
	constructor(domains) {
		this.regex = this.#createRegex(domains);
	}

	getLinks() {
		return [...document.querySelectorAll('a[href]')].filter(
			this.#isDomain,
			this
		);
	}

	#createRegex(domains) {
		let filterRegex = '';
		for (let domain of domains) {
			filterRegex += `${domain.replaceAll('.', '\\.')}\/.\\w*|`;
		}
		return new RegExp(filterRegex.replace(/\|([^\|]*)$/, '$1'));
	}

	#isDomain(link) {
		return link.href.match(this.regex);
	}
}

function main() {
	const pageLinks = new LinkCollector([
		'store.steampowered.com',
		'steamcommunity.com',
	]).getLinks();
	for (let link of pageLinks) {
		link.href = `steam://openurl/${link.href}`;
	}
}

main();
