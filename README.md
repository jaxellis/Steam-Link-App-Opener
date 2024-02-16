[![Paypal](https://img.shields.io/badge/Paypal-Donate!-%23003087.svg?logo=paypal&style=flat)](https://paypal.me/JaxEllis)
[![img](https://img.shields.io/github/issues/jaxellis/Steam-Link-App-Opener.svg?style=flat-square&logo=github&logoColor=white)](https://github.com/jaxellis/Steam-Link-App-Opener/issues)
[![CodeFactor](https://www.codefactor.io/repository/github/jaxellis/Steam-Link-App-Opener/badge)](https://www.codefactor.io/repository/github/jaxellis/Steam-Link-App-Opener)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/495373b055e44a97b2af35b38d045af1)](https://www.codacy.com/gh/jaxellis/Steam-Link-App-Opener/dashboard?utm_source=github.com&utm_medium=referral&utm_content=jaxellis/Steam-Link-App-Opener&utm_campaign=Badge_Grade)

# Steam Link App Opener

Open's Steam link's in your installed Steam application. Customizable hoytkey to enable navigating to the Steam website instead. 
<br/><br/>
## Prerequisites

* Userscript Manager: [Tampermonkey](https://www.tampermonkey.net/), [Greasemonkey](https://www.greasespot.net/), or [Violentmonkey](https://violentmonkey.github.io/)
<br/><br/>
## Installation

<!--pages-->
<table>
	<thead>
		<tr>
			<th>Site</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<a href="https://github.com/jaxellis/Steam-Link-App-Opener/raw/main/Steam_Link_App_Opener.user.js">
					<img src="https://www.google.com/s2/favicons?domain=github.com"/>
 Github</a>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://greasyfork.org/en/scripts/436231-steam-link-app-opener">
					<img src="https://www.google.com/s2/favicons?domain=greasyfork.org/"/>
 GreasyFork</a>
			</td>
		</tr>
		<tr></tr>
	</tbody>
</table>
<!--/pages-->

## Configuration

Inside the script you will find two options to customize.

First is the `USECUSTOMKEY` variable. Setting this to false will disable the hotkey functionality at the cost of not being able to open Steam links in the browser and only in the Steam application.

Second is the `CUSTOMKEY` variable. Changing this will allow you to customize which key you want to use to enable opening the Steam link in your browser. You can find the key strings to use here [Keyboard Event Values](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values).
