// ==UserScript==
// @name         Steam Link App Opener
// @namespace    https://github.com/jaxellis
// @version      1.0.0
// @description  Opens Steam Links in the Steam Application
// @author       Jaxellis
// @include      http://*
// @include      https://*
// @grant        none
// ==/UserScript==

class LinkCollector {
	constructor(domains) {
		this.regex = this.createRegex(domains);
	}

	getLinks() {
		return [...document.querySelectorAll('a[href]')].filter(
			this.isDomain,
			this
		);
	}

	createRegex(domains) {
		let filterRegex = '';
		for (let domain of domains) {
			filterRegex += `${domain.replaceAll('.', '\\.')}\/.\\w*|`;
		}
		return new RegExp(filterRegex.replace(/\|([^\|]*)$/, '$1'));
	}

	isDomain(link) {
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
