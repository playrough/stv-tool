// ==UserScript==
// @name           SangTacViet Producer
// @namespace      sangtacviet
// @version        1.0
// @description    Combines Item STV, and Auto Collect userscripts.
// @author         @Undefined & @Yuusei
// @license        GPL-3.0
// @icon           https://sangtacviet.vip/favicon.png
// @match          *://sangtacviet.vip/*
// @exclude        *://sangtacviet.vip/surf.php
// @exclude        *://sangtacviet.vip/writer.php
// @grant          GM_addStyle
// ==/UserScript==

(function () {
	'use strict';
	// --- Item STV Section ---
	const imageURLs = {
		bachQuyen: "'https://i.postimg.cc/y6RvZGhG/bachquyen.png'",
		lamQuyen: "'https://i.postimg.cc/T3t9xvGK/lamquyen.png'",
		lenhBaiMoc: "'https://i.postimg.cc/PJbWFB2r/lenhbai.png'",
		linhThach: "'https://i.postimg.cc/zvYw7Jwc/linhthach.png'",
		thienVanDan: "'https://i.postimg.cc/yxK99Lsq/thienvan.png'",
		tuLinhDan: "'https://i.postimg.cc/xT0M1p6M/tulinh.png'",
		tuKhiDan: "'https://i.postimg.cc/8kdLDgmT/tukhi.png'",
		tayTuyDan: "'https://i.postimg.cc/50LL6hcq/taytuy.png'",
		thiepBia: "'https://i.postimg.cc/2yxWxnS1/thiep.png'",
		itemKim: "'https://i.postimg.cc/wxDQvmg8/kim.png'",
		itemMoc: "'https://i.postimg.cc/4x2zMvbt/moc.png'",
		itemThuy: "'https://i.postimg.cc/7ZhzgG8L/thuy.png'",
		itemHoa: "'https://i.postimg.cc/Qd8bvdLL/hoa.png'",
		itemTho: "'https://i.postimg.cc/9FJTRPkS/tho.png'",
		itemPhong: "'https://i.postimg.cc/s2BpRBwL/phong.png'",
		itemLoi: "'https://i.postimg.cc/Z558Vs34/loi.png'",
		itemBang: "'https://i.postimg.cc/SN7dZzv7/bang.png'",
		itemQuang: "'https://i.postimg.cc/q792BkFv/quang.png'",
		itemAm: "'https://i.postimg.cc/VLc4BFDk/am.png'",
	};

	const css = `:root {
	/* Item Settings */
	--uy-vong-lenh: url(${imageURLs.lenhBaiMoc});
	--cong-phap: url(${imageURLs.bachQuyen});
	--vu-ky: url(${imageURLs.lamQuyen});
	--linh-thach: url(${imageURLs.linhThach});
	--tu-khi-dan: url(${imageURLs.tuKhiDan});
	--tu-linh-dan: url(${imageURLs.tuLinhDan});
	--tay-tuy-dan: url(${imageURLs.tayTuyDan});
	--thien-van-dan: url(${imageURLs.thienVanDan});
	--thiep-bia: url(${imageURLs.thiepBia});

	--item-kim: url(${imageURLs.itemKim});
	--item-moc: url(${imageURLs.itemMoc});
	--item-thuy: url(${imageURLs.itemThuy});
	--item-hoa: url(${imageURLs.itemHoa});
	--item-tho: url(${imageURLs.itemTho});
	--item-phong: url(${imageURLs.itemPhong});
	--item-loi: url(${imageURLs.itemLoi});
	--item-bang: url(${imageURLs.itemBang});
	--item-quang: url(${imageURLs.itemQuang});
	--item-am: url(${imageURLs.itemAm});

	/* Predefined Colors */
	--silver-primary: #c0c2cc;
	--grey-primary: #83848f;
	--blue-primary: #557ffc;
	--red-primary: #eb1551;
	--red-secondary: #af2a2a;
	--yellow-primary: #ffc152;
	--orange-primary: #ff7329;
	--green-primary: #39cca0;
	--violet-primary: #6a4ce2;
	--light-hover: rgba(255, 255, 255, 0.1);
	--light-hover-secondary: rgba(255, 255, 255, 0.2);
	--black: #000;
	--white: #fff;
	--opacity-black: rgba(255, 255, 255, 0.1);
	--opacity-black-bold: rgba(0, 0, 0, 0.8);
	--opacity-white: rgba(255, 255, 255, 0.5);
	--opacity-white-bold: rgba(255, 255, 255, 0.8);
	--opacity: #0000;
	--text-black: rgba(18, 18, 23, 0.9);
	--text-grey: rgba(18, 18, 23, 0.6);
	--bg-item: #383e4d;
}

/*user item */
.item {
	margin: 3px;
	border-width: 3px !important;
	border-style: solid !important;
	border-color: transparent !important;
	background-size: contain !important;
	background-repeat: no-repeat !important;
	background-position: center !important;
	background-color: var(--bg-item);
	outline: 2px solid var(--grey-primary) !important;
}

.item[n]:after {
	content: attr(n);
	position: absolute;
	right: -2px;
	bottom: -3px;
	font-size: 12px;
	line-height: 12px;
	text-shadow: 1px 1px 1px var(--black);
	color: var(--white);
}

a.item[ac='true'][onclick='openitem(this)'] {
	outline: 2px dashed var(--red-primary) !important;
	border-width: 3px !important;
	border-style: solid !important;
	border-color: transparent !important;
}

a.item[l^='5']:not([l='5']):not([tag='1']):after {
	width: 32px;
	height: 32px;
}

a.item[l^='5']:not([l='5']):not([tag='1']):after {
	position: relative;
	top: -3px;
	left: -3px;
}

a.item[l^='4']:not([l='4']):not([tag='1']):after,
a.item[l^='3']:not([l='3']):not([tag='1']):after,
a.item[l^='2']:not([l='2']):not([tag='1']):after,
a.item[l^='1']:not([l='1']):not([tag='1']):after {
	width: 30px;
	height: 30px;
	position: relative;
	top: -2px;
	left: -2px;
	border-radius: 50%;
}

a.item[l^='4']:not([l='4']):not([tag='1']):after {
	background: radial-gradient(transparent, transparent, var(--orange-primary));
}

a.item[l^='3']:not([l='3']):not([tag='1']):after {
	background: radial-gradient(transparent, transparent, var(--violet-primary));
}

a.item[l^='2']:not([l='2']):not([tag='1']):after {
	background: radial-gradient(transparent, transparent, var(--yellow-primary));
}

a.item[l^='1']:not([l='1']):not([tag='1']):after {
	background: radial-gradient(transparent, transparent, var(--silver-primary));
}

.item[l='2']:not([tag='1']) {
	outline: 2px solid var(--green-primary) !important;
}

.item[l='3']:not([tag='1']) {
	outline: 2px solid var(--blue-primary) !important;
}

.item[l='4']:not([tag='1']) {
	outline: 2px solid var(--violet-primary) !important;
}

.item[l='5']:not([tag='1']) {
	outline: 2px solid var(--orange-primary) !important;
}

.item[l='6']:not([tag='1']) {
	outline: 2px solid var(--yellow-primary) !important;
}

.item[l='7']:not([tag='1']) {
	outline: 2px solid var(--green-primary) !important;
}

.item[l='8']:not([tag='1']) {
	outline: 2px solid var(--blue-primary) !important;
}

.item[l='9']:not([tag='1']) {
	outline: 2px solid var(--violet-primary) !important;
}

a.item[l^='1']:not([l='1']):not([tag='1']) {
	outline: 2px solid var(--silver-primary) !important;
	border-radius: 0;
}

a.item[l^='2']:not([l='2']):not([tag='1']) {
	outline: 2px solid var(--yellow-primary) !important;
}

a.item[l^='3']:not([l='3']):not([tag='1']) {
	outline: 2px solid var(--violet-primary) !important;
}

a.item[l^='4']:not([l='4']):not([tag='1']) {
	outline: 2px solid var(--orange-primary) !important;
}

a.item[l^='5']:not([l='5']):not([tag='1']) {
	outline: 2px solid var(--red-primary) !important;
}

.item[style='background-image:url(/game/asset/item/uy-vong-lenh.png)'] {
	background-image: var(--uy-vong-lenh) !important;
}

.item[tag='1'] {
	background-image: var(--linh-thach);
}

.item[tag='2'] {
	border-width: 4px !important;
}

.item[tag='2'][ac='true'][onclick='openitem(this)'] {
	border-width: 4px !important;
}

.item[tag='2'][e='1'] {
	background-image: var(--tu-khi-dan);
}

.item[tag='2'][e='2'] {
	background-image: var(--tu-linh-dan);
}

.item[tag='2'][e='3'] {
	background-image: var(--tay-tuy-dan);
}

.item[tag='2'][e='10'] {
	background-image: var(--thien-van-dan);
}

.item[tag='3'] {
	background-image: var(--cong-phap);
}

.item[tag='3'][l='50'] {
	background-image: var(--cong-phap) !important;
}

.item[tag='4'] {
	background-image: var(--vu-ky);
}

.item[itn='thiep-bia-2023'] {
	background-image: var(--thiep-bia) !important;
}

.item[e='19'] {
	background-image: var(--item-hoa);
	border-width: 0px !important;
}

.item[e='20'] {
	background-image: var(--item-thuy);
	border-width: 0px !important;
}

.item[e='21'] {
	background-image: var(--item-kim);
	border-width: 0px !important;
}

.item[e='22'] {
	background-image: var(--item-moc);
	border-width: 0px !important;
}

.item[e='23'] {
	background-image: var(--item-tho);
	border-width: 0px !important;
}

.item[e='24'] {
	background-image: var(--item-phong);
	border-width: 0px !important;
}

.item[e='25'] {
	background-image: var(--item-loi);
	border-width: 0px !important;
}

.item[e='26'] {
	background-image: var(--item-quang);
	border-width: 0px !important;
}

.item[e='27'] {
	background-image: var(--item-bang);
	border-width: 0px !important;
}

.item[e='28'] {
	background-image: var(--item-am);
	border-width: 0px !important;
}

.item[e='19']:after,
.item[e='20']:after,
.item[e='21']:after,
.item[e='22']:after,
.item[e='23']:after,
.item[e='24']:after,
.item[e='25']:after,
.item[e='26']:after,
.item[e='27']:after,
.item[e='28']:after {
	top: 1px !important;
	left: 1px !important;
}

a.item[e='19'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,
a.item[e='20'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,
a.item[e='21'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,
a.item[e='22'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,
a.item[e='23'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,
a.item[e='24'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,
a.item[e='25'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,
a.item[e='26'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,
a.item[e='27'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,
a.item[e='28'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after {
	top: 0 !important;
	left: 0 !important;
}

.item .iinfo {
	top: 125%;
	left: -3px;
	background-color: var(--opacity-black-bold);
	border-radius: 5px;
	padding: 5px;
	color: var(--opacity-white-bold);
	animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

.item[tag='2'] .iinfo {
	top: 133%;
}

.activeitem {
	margin: 10px 0;
}

.activeitem .item {
	margin-right: 10px !important;
}

.activeitem .item .iinfo {
	top: -5px;
	left: 145%;
}

.activeitem .item[tag='2'] .iinfo {
	top: -5px;
	left: 158%;
}

.item[sel='true']:before {
	width: unset;
	height: unset;
	text-shadow: none;
	color: var(--danger);
	top: 50%;
	right: 50%;
	transform: translate(50%, -50%);
}

[selected] {
	outline: 2px solid var(--red-primary) !important;
}

[selected]:before {
	width: unset;
	height: unset;
	text-shadow: none;
	color: var(--danger);
	top: -7% !important;
	left: 17% !important;
}

.item[tag='2'][selected]:before {
	width: unset;
	height: unset;
	text-shadow: none;
	color: var(--danger);
	top: -12% !important;
	left: 14% !important;
}
`;

	GM_addStyle(css);

	// --- Calculate Item STV Section ---
	const LEVELS = {
		TU_KHI: { 6: 100000, 5: 10000, 4: 1000 },
		TU_LINH: { 6: 64, 5: 32, 4: 16 },
		THIEN_VAN: { 6: 32, 5: 16, 4: 8 },
	};

	const formatNumber = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	const calculateTimeToBreakthrough = (valueMax, valueNow, speed) => {
		const totalMinutes = (valueMax - valueNow) / speed;
		const days = Math.floor(totalMinutes / (60 * 24));
		const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
		const minutes = Math.floor(totalMinutes % 60);
		const seconds = Math.round((totalMinutes % 1) * 60);
		return `${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây`;
	};

	const countScroll = selector => {
		const items = document.querySelectorAll(`#tuitruvat ${selector}`);
		return items.length;
	};

	const calculateItems = (selector, calculator) => {
		const items = document.querySelectorAll(`#tuitruvat ${selector}`);
		return Array.from(items).reduce((total, item) => {
			const level = parseInt(item.getAttribute('l'));
			const quantity = parseInt(item.getAttribute('n')) || 1;
			return total + calculator(level, quantity);
		}, 0);
	};

	const calculateByLevel = levels => (level, quantity) => quantity * (levels[level] || 0);
	const calculateLinhThach = (level, quantity) => quantity * level * 50;

	const updateStatBox = (title, content) => {
		const targetDiv = Array.from(document.querySelectorAll('div[style="font-size: 20px; margin: 10px 0px;"]')).find(div => div.textContent.trim() === title);
		if (targetDiv) {
			targetDiv.innerHTML += `
                <ul class="custom-list">
                    ${content}
                </ul>
            `;
		}
	};

	const updateProgressBar = progressDiv => {
		const formattedNumber = formatNumber(progressDiv.innerText);
		progressDiv.innerText = '';
		progressDiv.parentElement.style.position = 'relative';
		progressDiv.parentElement.innerHTML += `
            <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; text-align: center">
                ${formattedNumber}
            </span>
        `;
	};

	const observer = new MutationObserver(() => {
		const totals = {
			linhThach: calculateItems('.item[tag="1"]', calculateLinhThach),
			tuKhi: calculateItems('.item[tag="2"][e="1"]', calculateByLevel(LEVELS.TU_KHI)),
			tuLinh: calculateItems('.item[tag="2"][e="2"]', calculateByLevel(LEVELS.TU_LINH)),
			thienVan: calculateItems('.item[tag="2"][e="10"]', calculateByLevel(LEVELS.THIEN_VAN)),
			cp: countScroll('.item[tag="3"][ac="false"]'),
			vk: countScroll('.item[tag="4"][ac="false"]'),
		};

		updateStatBox('Công pháp', `<li>Tổng + <strong>${formatNumber(totals.cp)}</strong></li>`);
		updateStatBox('Võ kỹ', `<li>Tổng + <strong>${formatNumber(totals.vk)}</strong></li>`);
		updateStatBox(
			'Đan dược',
			`
            <li>Tu Vi + <strong style="color: #298dd4">${formatNumber(totals.tuKhi)}</strong></li>
            <li>Buff + <strong style="color: #d53f42">${formatNumber(totals.tuLinh / 100)}</strong></li>
            <li>Vận Khí + <strong style="color: #fcac05">${formatNumber(totals.thienVan)}</strong></li>
        `
		);
		updateStatBox('Linh thạch', `<li>Tu Vi + <strong style="color: #298dd4">${formatNumber(totals.linhThach)}</strong></li>`);
	});

	observer.observe(document.body, { childList: true, subtree: true });

	const updateCultiSpeed = () => {
		const cultiSpeedElement = document.querySelector('.user-culti-speed');
		if (!cultiSpeedElement) return;
		const numbers = cultiSpeedElement.title.match(/\d+\.?\d*/g);
		const speedMatch = cultiSpeedElement.innerText.match(/\+(\d+)/);
		const speed = parseInt(speedMatch ? speedMatch[1] : 0);

		cultiSpeedElement.innerHTML = `<span>Tốc độ tu luyện: <b style="color: #298dd4">${formatNumber(speed)}</b> tu vi/phút</span>
                                       <br><span>Cơ bản: <b style="color: #298dd4">${numbers ? numbers[0] : 0}</b></span>
                                       <br><span>Buff: x <b style="color: #d53f42">${numbers ? numbers[1] : 0}</b></span>
                                       <br><span>Căn cơ: x <b style="color: #53bd5a">${numbers ? numbers[2] : 0}</b></span>
                                       `;

		const titles = document.querySelectorAll('.stat-title');
		titles.forEach(title => {
			if (!['Tu vi', 'Căn cơ'].includes(title.innerText.trim())) return;
			const progressDiv = title.closest('.stat-box').querySelector('.progress .progress-bar');
			if (progressDiv) {
				updateProgressBar(progressDiv);
				if (title.innerText.trim() === 'Tu vi') {
					const valueMax = parseInt(progressDiv.getAttribute('aria-valuemax'));
					const valueNow = parseInt(progressDiv.getAttribute('aria-valuenow'));
					const remaining = valueMax - valueNow;
					cultiSpeedElement.innerHTML += `
                        <br><span>Đột phá cần: <b style="color: #298dd4">${formatNumber(remaining)}</b></span>
                        <br><span>Thời gian đột phá: ${calculateTimeToBreakthrough(valueMax, valueNow, speed)}</span>
                    `;
				}
			}
		});
	};

	updateCultiSpeed();

	// --- Auto Collect Section ---
	const createNotificationBox = () => {
		const notificationBox = document.createElement('div');

		Object.assign(notificationBox.style, {
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
		});

		document.body.appendChild(notificationBox);

		document.addEventListener('click', event => {
			if (notificationBox && notificationBox.classList.contains('show') && !notificationBox.contains(event.target)) {
				notificationBox.style.display = 'none';
			}
		});

		return {
			showNotification: message => {
				notificationBox.innerHTML = message;
				notificationBox.style.display = 'block';
			},
			hideNotification: () => {
				notificationBox.style.display = 'none';
			},
		};
	};

	const notification = createNotificationBox();

	const listCP = [
		{
			name: 'Yuusei & Undefined',
			info: `Yuusei & Undefined`,
		},
		{
			name: 'Yuusei & Undefined',
			info: `Yuusei & Undefined`,
		},
		{
			name: 'Yuusei & Undefined',
			info: `Yuusei & Undefined`,
		},
	];

	const listVK = [
		{
			name: 'Yuusei & Undefined',
			info: `Yuusei & Undefined`,
		},
		{
			name: 'Yuusei & Undefined',
			info: `Yuusei & Undefined`,
		},
		{
			name: 'Yuusei & Undefined',
			info: `Yuusei & Undefined`,
		},
	];

	window.setInterval(() => {
		startCollectItem();
	}, 5 * 1000);

	async function startCollectItem() {
		try {
			const collectStatus = await tryCollect();
			if (collectStatus && collectStatus.code !== 1) return; // Check for null or undefined

			const itemToCollect = await checkItem();
			if (!itemToCollect) return;

			const collectionResult = await collectItem(itemToCollect);
			if (collectionResult && collectionResult.code === 1) {
				// Check for null or undefined
				notification.showNotification(`Thu thập thành công: ${itemToCollect.name}`);
			}
		} catch (error) {
			console.error('Error during item collection:', error);
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
			if (randomMax > 0) {
				//Avoid error if itemList is empty
				const randomIndex = parseInt(Math.random() * (randomMax - randomMin) + randomMin);
				const item = itemList[type][randomIndex];
				params += `&newname=${encodeURIComponent(item.name)}&newinfo=${encodeURIComponent(item.info)}`;
			}
		}

		return request(params, url);
	}

	async function request(params, url = '/index.php', retry = 0) {
		const maxRetries = 3;

		try {
			const response = await fetch(url, {
				headers: {
					'content-type': 'application/x-www-form-urlencoded', //Corrected content-type
				},
				body: params,
				method: 'POST',
				credentials: 'include', // Important for handling cookies
			});

			if (!response.ok && retry < maxRetries) {
				//More robust error handling
				console.warn(`Request failed with status ${response.status}, retrying...`);
				await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1))); //Exponential backoff
				return request(params, url, retry + 1);
			}

			if (response.ok) {
				const contentType = response.headers.get('content-type');
				if (contentType && contentType.includes('application/json')) {
					return await response.json();
				} else {
					console.warn('Response is not JSON');
					return { code: 0 }; // Indicate failure
				}
			} else {
				console.error(`Request failed with status ${response.status}: ${await response.text()}`);
				return { code: 0 }; // Indicate failure
			}
		} catch (error) {
			console.error('Network error:', error);
			return { code: 0 }; // Indicate failure
		}
	}

	// --- Auto Consume Section ---
	async function consumeRequest(url = '/index.php', retry = 0) {
		const maxRetries = 3;
		const retryDelay = 2000; // Delay 2 seconds between retries

		const items = document.querySelectorAll('.item[ac="false"][tag="2"][e="3"]');

		if (items.length > 0) {
			const itemIds = Array.from(items).map(item => item.getAttribute('i'));

			const params = new URLSearchParams();
			params.append('ajax', 'dungnhieu');
			params.append('consume', itemIds.join(','));

			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					},
					body: params.toString(),
					credentials: 'include',
				});

				if (!response.ok) {
					if (response.status === 502 && retry < maxRetries) {
						console.log(`Error ${response.status}, retrying in ${retryDelay / 1000} seconds...`);
						await new Promise(resolve => setTimeout(resolve, retryDelay));
						return consumeRequest(url, retry + 1);
					}
					console.error(`Error consuming Tẩy Tủy Đan: ${response.status} ${response.statusText}`);
					return;
				}

				const result = await response.text();
				console.log('Successfully consumed Tẩy Tủy Đan:', result);

				return result;
			} catch (error) {
				console.error('Error consuming Tẩy Tủy Đan:', error);
			}
		} else {
			console.log('No Tẩy Tủy Đan found to consume.');
		}
	}

	setInterval(consumeRequest, 5 * 60 * 1000);
})();
