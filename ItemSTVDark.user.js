// ==UserScript==
// @name           SangTacViet Producer
// @namespace      sangtacviet
// @version        1.0
// @description    Combines Item STV, Dark STV, and Auto Collect userscripts.
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

	// --- Dark STV Section ---
	const darkCSS = `:root {
	--bg-item: #1d1d1d;
	--bg-dark-darker: #101010;
	--bg-dark: #121212;
	--bg-darker: #1d1d1d;
	--bg-opacity: #00000030;
	--color: #e0e0e0;
	--color-secondary: #b1b1b1;
	--bg-secondary: #7f8c8d;
	--primary-red: #ff5733;
	--primary-red-dark: #432823;
	--border-button: #676767;
}

html.touch *:hover {
	all: unset !important;
}

#dlnametbcontent,
#upnamewd {
	background-color: var(--bg-dark) !important;
}

.dataTables_wrapper .dataTables_length,
.dataTables_wrapper .dataTables_filter,
.dataTables_wrapper .dataTables_info,
.dataTables_wrapper .dataTables_processing,
.dataTables_wrapper .dataTables_paginate {
	color: var(--color) !important;
}

.bg-light {
	background-color: var(--bg-dark) !important;
}

.bg-dark {
	background-color: var(--bg-dark) !important;
}

.table {
	color: var(--color) !important;
	border-collapse: collapse !important;
}

.table-light,
.table-light > td,
.table-light > th {
	background-color: var(--bg-dark) !important;
}

table.dataTable tbody tr {
	background-color: var(--bg-dark) !important;
}

.table-hover tbody tr:hover {
	color: var(--color) !important;
	background-color: var(--bg-darker) !important;
}

.table-light tbody + tbody,
.table-light td,
.table-light th,
.table-light thead th {
	border-color: 1px solid var(--border-button) !important;
}

#share-option {
	color: var(--color) !important;
	background-color: var(--bg-darker) !important;
}

.dropdown-item:focus,
.dropdown-item:hover {
	color: var(--color) !important;
	background-color: var(--bg-dark) !important;
}

.dataTables_wrapper .dataTables_paginate a.paginate_button.current,
.dataTables_wrapper .dataTables_paginate a.paginate_button.current:hover {
	background: var(--bg-dark) !important;
	color: var(--color) !important;
}

.t-blue,
.text-dark {
	color: var(--color) !important;
}

.t-gray {
	color: var(--color-secondary) !important;
}

.badge-secondary {
	color: var(--color) !important;
	background-color: var(--bg-dark) !important;
}

.selected {
	border-color: var(--primary-red) !important;
}

div[style*='color'] {
	color: var(--color) !important;
}

div[style*='background-color: #ffffff;']:not(#thumb-lay) {
	background-color: var(--bg-dark) !important;
	background: var(--bg-dark) !important;
}

#book_name2 {
	text-shadow: none !important;
}

div:has(> a[href*='the-luc']) {
	gap: 1px !important;
}

a[href*='the-luc'],
a[onclick='leavefaction()'] {
	background-color: var(--bg-dark) !important;
	color: var(--color) !important;
	flex-basis: 33% !important;
}

.sticky {
	z-index: 9999 !important;
}

.shadow-lg {
	box-shadow: none !important;
}

.card-header {
	border-bottom: 1px solid var(--border-button) !important;
	background-color: var(--bg-darker) !important;
}

#sidebar #comment-box .card-header {
	border: 1px solid var(--bg-dark) !important;
}

#commentpane > #commentportion {
	background: var(--bg-dark-darker) !important;
}

#commentportion {
	background-color: var(--bg-dark-darker) !important;
	background: var(--bg-dark-darker) !important;
	color: var(--color) !important;
}

#commentportion .sec-bot {
	color: var(--color) !important;
}

#commentportion .sec-top {
	background-color: var(--bg-darker) !important;
	color: var(--color) !important;
}

#commentportion button {
	border: 1px solid #454545 !important;
}

.blk {
	border: 1px solid var(--bg-dark) !important;
	border-color: var(--border-button) !important;
}

.blk-top {
	background: var(--bg-darker) !important;
	color: var(--color) !important;
	border-top: none !important;
}

.blk-body {
	background: var(--bg-darker) !important;
	color: var(--color) !important;
	border: none !important;
}

.blk-body .blk-content {
	color: var(--color) !important;
}

.blk-bot {
	background: var(--bg-darker) !important;
	color: var(--color) !important;
	border: none !important;
	padding-bottom: 5px !important;
}

.blk-arr {
	background: var(--bg-darker) !important;
}

.blk-arr::before {
	border-color: transparent transparent var(--bg-darker) transparent !important;
}

#tm-p-search-top + div {
	background: var(--bg-darker) !important;
}

#tm-p-search-top + div .nb:hover {
	background: var(--bg-dark) !important;
}

.page-link {
	background: var(--bg-dark) !important;
}

.page-item.active .page-link {
	border-color: var(--primary-red) !important;
}

.input-group-text {
	background: var(--bg-dark-darker) !important;
	color: var(--color) !important;
	border: none !important;
}

.seloption:hover {
	background: var(--bg-dark) !important;
}

a {
	color: var(--color) !important;
}

a:hover {
	color: var(--primary-red) !important;
}

a.text-dark:focus,
a.text-dark:hover {
	color: var(--primary-red) !important;
}

#clicktoexp,
div[onclick='renewchapter(true);'] {
	color: var(--color) !important;
	background-color: var(--bg-dark) !important;
}

#commentpagebtn {
	background-color: var(--bg-darker) !important;
}

#tabbar > #bookpagebtn,
#tabbar > #otherpagebtn,
#tabbar > #personpagebtn,
#tabbar > #commentpagebtn {
	border: none !important;
}

#tabbar {
	background-color: transparent !important;
}

#tabbar > div.active {
	color: var(--color) !important;
	border-bottom: 2px solid var(--bg-darker) !important;
}

#tabbar.sticked {
	border: none !important;
}

.chaplastreaded {
	background-color: var(--primary-red-dark) !important;
}

.chapreaded {
	color: var(--color-secondary) !important;
}

#namewdf {
	background-color: var(--bg-dark) !important;
}

.namepack .name {
	color: var(--color) !important;
}

.section {
	background-color: var(--bg-darker) !important;
	border: none !important;
	margin: 2px 0 !important;
}

label.open-modal {
	color: var(--color-secondary) !important;
}

.bkr {
	color: var(--color) !important;
}

.nowr:hover {
	background-color: var(--bg-darker) !important;
}

.slider.round {
	background-color: var(--bg-dark) !important;
	border: 1px solid var(--color-secondary) !important;
}

input:checked + .slider {
	background-color: var(--primary-red-dark) !important;
}
div[style*='background: #f7f7f7;'] {
	background-color: var(--bg-dark) !important;
}

i.section-thumb img {
	border-radius: 0 !important;
}

button,
div[onclick='openfilter()'],
div[channel],
#toolbar button,
a[href='javascript:supernamewindow()'],
a[href='javascript:khonamewindow()'],
a[href='javascript:namepackwindow()'],
a[href='javascript:opensettingwindow()'],
a[href='javascript:openitemwindow()'] {
	color: var(--color) !important;
	background-color: var(--bg-darker) !important;
	color: var(--color) !important;
	border-color: var(--border-button) !important;
}

.rd-tag {
	color: var(--color) !important;
	background-color: var(--bg-dark) !important;
}
.rd-tag[onclick] {
	color: var(--color) !important;
	background-color: var(--bg-darker) !important;
}

#tabbar > div.active {
	background-color: var(--primary-red-dark) !important;
	border-left: 2px solid var(--primary-red) !important;
}

#tabdiv > div > a {
	background-color: var(--bg-dark) !important;
}

.hover-darken.w:hover {
	background-color: var(--primary-red-dark) !important;
}

.hover-darken:hover {
	filter: unset !important;
}

textarea,
input,
select {
	background-color: var(--bg-darker) !important;
	border: 1px solid var(--border-button) !important;
	color: var(--color) !important;
}

textarea::placeholder,
input::placeholder,
select::placeholder {
	color: var(--color-secondary) !important;
}

button,
textarea,
input,
select {
	outline: none !important;
	box-shadow: none !important;
}

::-webkit-scrollbar {
	width: 5px;
}

::-webkit-scrollbar-track {
	background-color: var(--bg-darker) !important;
}

::-webkit-scrollbar-thumb {
	background-color: var(--bg-secondary) !important;
}

#tm-bot-nav::-webkit-scrollbar {
	height: 2px !important;
}

body {
	font-family: nunito !important;
	color: var(--color) !important;
	background-color: var(--bg-dark) !important;
}

#full,
#inner {
	background-color: var(--bg-dark) !important;
	min-height: 100vh;
}

div[style*='background: #f7f7f7'] {
	background-color: var(--bg-dark) !important;
}

#pushbg {
	background: var(--bg-dark) !important;
}

div:has(> #tabdiv) {
	background: var(--bg-dark) !important;
}

#tm-top-nav {
	background-color: var(--bg-dark) !important;
}

#tm-top-nav .container,
#tm-top-nav a {
	color: var(--color) !important;
}

#logo-stv {
	color: var(--color) !important;
	font-weight: bold !important;
	font-size: 50px !important;
	padding-left: 15px !important;
	font-style: italic !important;
}

#notifmarker {
	color: var(--color) !important;
}

#tm-user-avatar {
	box-shadow: none !important;
}

input#id {
	border-radius: 10px !important;
}

input#id:focus {
	background-color: var(--bg-darker) !important;
	border-radius: 10px !important;
}

#searchbox {
	display: none !important;
}

#tm-btn-rescan,
#tm-btn-goto {
	color: var(--color) !important;
	background: transparent !important;
}

#tm-bot-nav {
	background-color: transparent !important;
	box-shadow: none !important;
	text-align: center !important;
}

#naviga a {
	color: var(--color) !important;
}

#inner > div[data-nosnippet].container {
	border-left: 4px solid var(--primary-red) !important;
	color: var(--color) !important;
	background-color: var(--bg-darker) !important;
	border-radius: 0 10px 10px 0 !important;
	text-align: center !important;
}

.tm-reader-top-nav {
	background: transparent !important;
	border: 1px solid var(--border-button) !important;
	border-width: 1px 0 !important;
}

#nsbox {
	background: var(--bg-darker) !important;
	border: 1px solid transparent !important;
}

#nsbox button,
#nsbox input {
	margin: 1px;
}

button[onclick='showAddName()'] {
	flex-grow: 1 !important;
}

#nsbox span[style*='background:green;'] {
	background: var(--bg-darker) !important;
}

a.bg-light:focus,
a.bg-light:hover,
button.bg-light:focus,
button.bg-light:hover {
	background-color: var(--bg-darker) !important;
}

.tusachsearcher {
	border: 1px solid var(--bg-darker) !important;
	background-color: var(--bg-darker) !important;
}

#tusach {
	border: 1px solid var(--bg-darker) !important;
}

.roundblock {
	background-color: var(--bg-darker) !important;
}

.roundblock .title {
	color: var(--color) !important;
}

.roundblock .btngroup .btn {
	background-color: var(--bg-dark) !important;
}

.d-md-block:has(> div > #totrans) {
	display: flex !important;
	max-height: 100% !important;
}

div:has(> #totrans) {
	flex-grow: 1 !important;
	padding-bottom: 8px !important;
	flex-wrap: nowrap !important;
}

#totrans {
	margin-right: 1px !important;
}

#menunavigator2 {
	background-color: var(--bg-dark-darker) !important;
	box-shadow: none !important;
	z-index: 999999999999999;
}

#menunavigator2 a {
	color: var(--color) !important;
	padding: 0 6px !important;
}

#menunavigator2 ul span {
	margin: 0 !important;
}

#menunavigator2 li:hover {
	background-color: var(--bg-dark) !important;
}

#inner .tmc-home-section {
	background: var(--bg-darker) !important;
	margin-top: 20px !important;
	border-radius: 16px;
	color: var(--color) !important;
}

#inner .cap {
	color: var(--color) !important;
	font-family: nunito !important;
}

.bookthumb {
	border: 2px solid transparent !important;
}

#tm-credit-section {
	background-color: var(--bg-dark) !important;
}

#btnshowns {
	background: #00000080 !important;
}

.fa-cogs.fas {
	color: #ffffff80 !important;
}

.modal-content {
	background-color: var(--bg-darker) !important;
}

.modal-header {
	border-bottom: 1px solid var(--color-secondary) !important;
}

.modal-footer {
	border-top: 1px solid var(--color-secondary) !important;
}

.noti {
	border: 1px solid var(--color-secondary) !important;
}

#tm-credit-section {
	height: 100px !important;
}

#tm-credit-text {
	display: none !important;
}

#inner > div:nth-of-type(2) {
	background: var(--bg-dark) !important;
	color: var(--color) !important;
}

.actor .time {
	color: var(--color-secondary) !important;
}

.actor > div:nth-child(3) {
	color: var(--bg-dark) !important;
}

.actor .btag {
	color: var(--bg-dark) !important;
	background: var(--color) !important;
	mix-blend-mode: unset !important;
}

#userpage .anh-bia {
	background: none !important;
}

#userpage .user-home {
	background: var(--bg-darker) !important;
}

#userpage .user-info-text {
	color: var(--color) !important;
}

.user-sign-text.nip {
	background-color: var(--bg-dark-darker) !important;
}

#userpage .user-stat .stat-title {
	color: var(--color) !important;
	font-weight: bold;
}

#userpage .stat-row span:first-child {
	color: #a5a5a5 !important;
}

#userpage .stat-row span:nth-child(2) {
	color: var(--color) !important;
	font-weight: bold;
}

#ctxoverlay .contextmenu {
	background-color: var(--bg-darker) !important;
	color: var(--color) !important;
}

#userpage .tab-nav .tab-item.active {
	background-color: var(--bg-dark-darker) !important;
	color: var(--color) !important;
}

#userpage .tab-nav {
	border: none !important;
}

.progress:has(.progress-bar.progress-bar-striped.bg-success) {
	background-color: var(--bg-dark-darker) !important;
}

.progress-bar.progress-bar-striped.bg-success {
	background-color: #4936ff !important;
	color: var(--color) !important;
}

.progress-bar.progress-bar-striped.bg-success + span {
	color: var(--color) !important;
}

.itemname {
	color: #a096ff !important;
}

#nhunger-page {
	background-color: var(--bg-dark-darker) !important;
}

.nb:hover {
	background-color: var(--bg-darker) !important;
}

#item-page {
	background-color: var(--bg-dark-darker) !important;
}

#item-page ul li {
	color: #a5a5a5 !important;
}

.window {
	font-family: nunito !important;
	color: var(--color) !important;
	background: var(--bg-opacity) !important;
}

.window .head {
	background-color: var(--bg-darker) !important;
}

.window .body {
	background-color: var(--bg-dark-darker) !important;
}

.window button.red {
	background: #832020 !important;
	border: none !important;
}

.window button.green {
	background: #49832e !important;
	border: none !important;
}

.window button {
	background: var(--bg-dark-darker) !important;
	border: none !important;
}

#friendlist-page {
	background-color: var(--bg-dark-darker) !important;
}

#friendlist-page .friend {
	border-bottom: 1px solid var(--bg-darker) !important;
}

#friendlist-page .friend:hover {
	background-color: var(--bg-darker) !important;
}

#friendlist-page .friend img {
	border: none !important;
}

.chat-box {
	height: 460px !important;
}

.chat-msg .chat-msg-content {
	background-color: var(--primary-red-dark) !important;
}

.chat-input-text {
	background-color: var(--bg-dark-darker) !important;
}

#channelsmenu {
	background-color: var(--bg-darker) !important;
}

.sticked {
	border: none !important;
}

#content-container .contentbox {
	background-color: var(--bg-darker) !important;
}

#navprevbot,
#navnextbot,
#navcenterbot {
	padding: 0 !important;
}

#totranslate,
#maincontent {
	background-color: var(--bg-darker) !important;
}
`;

	GM_addStyle(darkCSS);
	document.querySelector('#tm-nav-search-logo').parentElement.innerHTML = `<span id='logo-stv'>STV</span>`;

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
