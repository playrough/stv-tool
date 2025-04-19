// ==UserScript==
// @name         Auto Collect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tự động nhặt bảo trên sangtacviet
// @author       @✦✦
// @icon64       https://sangtacviet.vip/favicon.png
// @match        https://sangtacviet.vip/user/*
// @match        https://sangtacviet.vip/truyen/*
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	function createNotificationBox() {
		const notificationBox = document.createElement('div');
		notificationBox.id = 'notification';
		Object.assign(notificationBox.style, {
			fontFamily: '"Fira Sans", sans-serif',
			display: 'none',
			position: 'fixed',
			top: '0',
			right: '0',
			margin: '10px',
			padding: '10px',
			backgroundColor: '#fff',
			color: '#404040',
			borderRadius: '5px',
			zIndex: '1000',
			cursor: 'pointer',
			boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
		});

		notificationBox.classList.add('notification-pokedex');
		document.body.appendChild(notificationBox);

		function showNotification(message) {
			notificationBox.innerHTML = message;
			notificationBox.style.display = 'block';
		}

		function hideNotification() {
			notificationBox.style.display = 'none';
		}

		function addEvent(event, handler) {
			notificationBox.addEventListener(event, handler);
		}

		notificationBox.addEventListener('click', hideNotification);

		return {
			showNotification,
			hideNotification,
			addEvent,
		};
	}

	const notification = createNotificationBox();

	const listCP = [
		{
			name: 'Hyper Beam',
			info: `Hyper Beam deals damage, but the user must recharge on the next turn (bringing its effective power\
            down to 75 per turn). If the user has the ability Truant, it will recharge in the same turn that it loafs\
            around. Hyper Beam is the Special counterpart to Giga Impact.`,
		},
		{
			name: 'Draco Meteor',
			info: `Draco Meteor deals damage but lowers the user's Special Attack by two stages after attacking.`,
		},
		{
			name: 'Shadow Ball',
			info: `Shadow Ball deals damage and has a 20% chance of lowering the target's Special Defense by one stage.`,
		},
	];

	const listVK = [
		{
			name: 'Hyper Beam',
			info: `Hyper Beam deals damage, but the user must recharge on the next turn (bringing its effective power\
            down to 75 per turn). If the user has the ability Truant, it will recharge in the same turn that it loafs\
            around. Hyper Beam is the Special counterpart to Giga Impact.`,
		},
		{
			name: 'Draco Meteor',
			info: `Draco Meteor deals damage but lowers the user's Special Attack by two stages after attacking.`,
		},
		{
			name: 'Shadow Ball',
			info: `Shadow Ball deals damage and has a 20% chance of lowering the target's Special Defense by one stage.`,
		},
	];

	window.setInterval(() => {
		startCollectItem();
	}, 5 * 1000);

	async function startCollectItem() {
		try {
			const collectStatus = await tryCollect();
			if (collectStatus.code !== 1) return;

			const itemToCollect = await checkItem();
			if (!itemToCollect) return;

			const collectionResult = await collectItem(itemToCollect);
			if (collectionResult.code === 1) {
				notification.showNotification(itemToCollect.name);
			}
		} catch (error) {
			console.log('error: ', error.message);
		}
	}

	function tryCollect() {
		const params = 'ngmar=tcollect&ajax=trycollect&ngmar=iscollectable';
		const url = '/index.php?ngmar=iscollectable';
		return request(params, url);
	}

	function checkItem() {
		const params = 'ngmar=collect&ajax=collect';
		return request(params);
	}

	function collectItem(itemToCollect) {
		const url = '/index.php?ngmar=fcl';
		const type = itemToCollect.type;
		let params = 'ajax=fcollect';

		const itemList = {
			3: listCP,
			4: listVK,
		};

		if (itemList[type]) {
			const randomMin = 0;
			const randomMax = itemList[type].length;
			const item = itemList[type][parseInt(Math.random() * (randomMax - randomMin) + randomMin)];
			params += '&newname=' + encodeURI(item.name) + '&newinfo=' + encodeURI(item.info);
		}

		return request(params, url);
	}

	async function request(params, url = '/index.php', retry = 0) {
		const maxRetries = 3;

		try {
			const response = await fetch(url, {
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				body: params,
				method: 'POST',
			});

			if (response.status === 502 && retry < maxRetries) {
				return request(params, url, retry + 1);
			}

			if (response.status == 200) {
				return await response.json();
			}
		} catch (error) {
			console.error('error: ', error);
		}
	}
})();
