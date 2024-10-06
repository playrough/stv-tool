// ==UserScript==
// @name           Item STV
// @namespace      sangtaviet
// @version        2.0.5
// @description    Remake item for SangTacViet
// @author         @HyperBeam & @Jann
// @license        GPL-3.0
// @icon64         https://sangtacviet.vip/favicon.png
// @match          *://sangtacviet.vip/*
// @grant          GM_addStyle
// @downloadURL https://update.greasyfork.org/scripts/503629/Item%20STV.user.js
// @updateURL https://update.greasyfork.org/scripts/503629/Item%20STV.meta.js
// ==/UserScript==

(function () {
	'use strict';

	// Image URLs for Items
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

	const css = `
        :root {

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
            --light-hover: rgba(255, 255, 255, .1);
            --light-hover-secondary: rgba(255, 255, 255, .2);
            --black: #000;
            --white: #fff;
            --opacity-black: rgba(255, 255, 255, .1);
            --opacity-black-bold: rgba(0, 0, 0, .8);
            --opacity-white: rgba(255, 255, 255, .5);
            --opacity-white-bold: rgba(255, 255, 255, .8);
            --opacity: #0000;
            --text-black: rgba(18, 18, 23, .9);
            --text-grey: rgba(18, 18, 23, .6);
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

        a.item[ac="true"][onclick="openitem(this)"] {
            outline: 2px dashed var(--red-primary) !important;
            border-width: 3px !important;
            border-style: solid !important;
            border-color: transparent !important;
        }

        a.item[l^="5"]:not([l="5"]):not([tag="1"]):after {
            width: 32px;
            height: 32px;
        }

        a.item[l^="5"]:not([l="5"]):not([tag="1"]):after {
            position: relative;
            top: -3px;
            left: -3px;
        }

        a.item[l^="4"]:not([l="4"]):not([tag="1"]):after,
        a.item[l^="3"]:not([l="3"]):not([tag="1"]):after,
        a.item[l^="2"]:not([l="2"]):not([tag="1"]):after,
        a.item[l^="1"]:not([l="1"]):not([tag="1"]):after {
            width: 30px;
            height: 30px;
            position: relative;
            top: -2px;
            left: -2px;
            border-radius: 50%;
        }

        a.item[l^="4"]:not([l="4"]):not([tag="1"]):after {
            background: radial-gradient(transparent, transparent, var(--orange-primary));
        }

        a.item[l^="3"]:not([l="3"]):not([tag="1"]):after {
            background: radial-gradient(transparent, transparent, var(--violet-primary));
        }

        a.item[l^="2"]:not([l="2"]):not([tag="1"]):after {
            background: radial-gradient(transparent, transparent, var(--yellow-primary));
        }

        a.item[l^="1"]:not([l="1"]):not([tag="1"]):after {
            background: radial-gradient(transparent, transparent, var(--silver-primary));
        }

        .item[l="2"]:not([tag="1"]) {
            outline: 2px solid var(--green-primary) !important;
        }

        .item[l="3"]:not([tag="1"]) {
            outline: 2px solid var(--blue-primary) !important;
        }

        .item[l="4"]:not([tag="1"]) {
            outline: 2px solid var(--violet-primary) !important;
        }

        .item[l="5"]:not([tag="1"]) {
            outline: 2px solid var(--orange-primary) !important;
        }

        .item[l="6"]:not([tag="1"]) {
            outline: 2px solid var(--yellow-primary) !important;
        }

        .item[l="7"]:not([tag="1"]) {
            outline: 2px solid var(--green-primary) !important;
        }

        .item[l="8"]:not([tag="1"]) {
            outline: 2px solid var(--blue-primary) !important;
        }

        .item[l="9"]:not([tag="1"]) {
            outline: 2px solid var(--violet-primary) !important;
        }

        a.item[l^="1"]:not([l="1"]):not([tag="1"]) {
            outline: 2px solid var(--silver-primary) !important;
            border-radius: 0;
        }

        a.item[l^="2"]:not([l="2"]):not([tag="1"]) {
            outline: 2px solid var(--yellow-primary) !important;
        }

        a.item[l^="3"]:not([l="3"]):not([tag="1"]) {
            outline: 2px solid var(--violet-primary) !important;
        }

        a.item[l^="4"]:not([l="4"]):not([tag="1"]) {
            outline: 2px solid var(--orange-primary) !important;
        }

        a.item[l^="5"]:not([l="5"]):not([tag="1"]) {
            outline: 2px solid var(--red-primary) !important;
        }

        .item[style="background-image:url(/game/asset/item/uy-vong-lenh.png)"] {
            background-image: var(--uy-vong-lenh) !important;
        }

        .item[tag="1"] {
            background-image: var(--linh-thach);
        }

        .item[tag="2"] {
            border-width: 4px !important;
        }

        .item[tag="2"][ac="true"][onclick="openitem(this)"] {
            border-width: 4px !important;
        }

        .item[tag="2"][e="1"] {
            background-image: var(--tu-khi-dan);
        }

        .item[tag="2"][e="2"] {
            background-image: var(--tu-linh-dan);
        }

        .item[tag="2"][e="3"] {
            background-image: var(--tay-tuy-dan);
        }

        .item[tag="2"][e="10"] {
            background-image: var(--thien-van-dan);
        }

        .item[tag="3"] {
            background-image: var(--cong-phap);
        }

        .item[tag="3"][l="50"] {
            background-image: var(--cong-phap) !important;
        }

        .item[tag="4"] {
            background-image: var(--vu-ky);
        }

        .item[itn="thiep-bia-2023"] {
            background-image: var(--thiep-bia) !important;
        }

        .item[e="19"] {
            background-image: var(--item-hoa);
            border-width: 0px !important;
        }

        .item[e="20"] {
            background-image: var(--item-thuy);
            border-width: 0px !important;
        }

        .item[e="21"] {
            background-image: var(--item-kim);
            border-width: 0px !important;
        }

        .item[e="22"] {
            background-image: var(--item-moc);
            border-width: 0px !important;
        }

        .item[e="23"] {
            background-image: var(--item-tho);
            border-width: 0px !important;
        }

        .item[e="24"] {
            background-image: var(--item-phong);
            border-width: 0px !important;
        }

        .item[e="25"] {
            background-image: var(--item-loi);
            border-width: 0px !important;
        }

        .item[e="26"] {
            background-image: var(--item-quang);
            border-width: 0px !important;
        }

        .item[e="27"] {
            background-image: var(--item-bang);
            border-width: 0px !important;
        }

        .item[e="28"] {
            background-image: var(--item-am);
            border-width: 0px !important;
        }

        .item[e="19"]:after,
        .item[e="20"]:after,
        .item[e="21"]:after,
        .item[e="22"]:after,
        .item[e="23"]:after,
        .item[e="24"]:after,
        .item[e="25"]:after,
        .item[e="26"]:after,
        .item[e="27"]:after,
        .item[e="28"]:after {
            top: 1px !important;
            left: 1px !important;
        }

        a.item[e="19"][l^="5"]:not([l="5"]):not([tag="1"]):not([tag="3"]):after,
        a.item[e="20"][l^="5"]:not([l="5"]):not([tag="1"]):not([tag="3"]):after,
        a.item[e="21"][l^="5"]:not([l="5"]):not([tag="1"]):not([tag="3"]):after,
        a.item[e="22"][l^="5"]:not([l="5"]):not([tag="1"]):not([tag="3"]):after,
        a.item[e="23"][l^="5"]:not([l="5"]):not([tag="1"]):not([tag="3"]):after,
        a.item[e="24"][l^="5"]:not([l="5"]):not([tag="1"]):not([tag="3"]):after,
        a.item[e="25"][l^="5"]:not([l="5"]):not([tag="1"]):not([tag="3"]):after,
        a.item[e="26"][l^="5"]:not([l="5"]):not([tag="1"]):not([tag="3"]):after,
        a.item[e="27"][l^="5"]:not([l="5"]):not([tag="1"]):not([tag="3"]):after,
        a.item[e="28"][l^="5"]:not([l="5"]):not([tag="1"]):not([tag="3"]):after {
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

        .item[tag="2"] .iinfo {
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

        .activeitem .item[tag="2"] .iinfo {
            top: -5px;
            left: 158%;
        }

        .item[sel="true"]:before {
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

        .item[tag="2"][selected]:before {
            width: unset;
            height: unset;
            text-shadow: none;
            color: var(--danger);
            top: -12% !important;
            left: 14% !important;
        }`;

	GM_addStyle(css);

	// Constants
	const LEVELS = {
		TU_KHI: { 6: 100000, 5: 10000, 4: 1000 },
		TU_LINH: { 6: 64, 5: 32, 4: 16 },
		THIEN_VAN: { 6: 32, 5: 16, 4: 8 },
	};

	// Utility functions
	const formatNumber = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	const calculateTimeToBreakthrough = (valueMax, valueNow, speed) => {
		const totalMinutes = (valueMax - valueNow) / speed;
		const days = Math.floor(totalMinutes / (60 * 24));
		const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
		const minutes = Math.floor(totalMinutes % 60);
		const seconds = Math.round((totalMinutes % 1) * 60);

		return `${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây`;
	};

	// Item calculation functions
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

	// UI update functions
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

	// Main observer function
	const observer = new MutationObserver(() => {
		// Calculate totals
		const totals = {
			linhThach: calculateItems('.item[tag="1"]', calculateLinhThach),
			tuKhi: calculateItems('.item[tag="2"][e="1"]', calculateByLevel(LEVELS.TU_KHI)),
			tuLinh: calculateItems('.item[tag="2"][e="2"]', calculateByLevel(LEVELS.TU_LINH)),
			thienVan: calculateItems('.item[tag="2"][e="10"]', calculateByLevel(LEVELS.THIEN_VAN)),
		};

		// Update UI
		updateStatBox(
			'Đan dược',
			`
      <li>Tụ Khí + <strong style="color: #298dd4">${formatNumber(totals.tuKhi)}</strong> Tu Vi</li>
      <li>Tụ Linh + <strong style="color: #d53f42">${formatNumber(totals.tuLinh)}</strong> % Tốc Độ Hấp Thu</li>
      <li>Thiên Vận + <strong style="color: #fcac05">${formatNumber(totals.thienVan)}</strong> Vận Khí</li>
    `
		);

		updateStatBox('Linh thạch', `<li>Linh Thạch + <strong style="color: #298dd4">${formatNumber(totals.linhThach)}</strong> Tu Vi</li>`);
	});

	// Initialize observer
	observer.observe(document.body, { childList: true, subtree: true });

	// Add styles
	const css2 = `
    .custom-list {
      list-style-type: none;
      padding: 10px 0 0 15px;
    }
    .custom-list li {
      font-size: 16px;
    }
    #content-container {
      max-width: 100%;
    }
  `;
	GM_addStyle(css2);

	// Update cultivation speed display
	const updateCultiSpeed = () => {
		const cultiSpeedElement = document.querySelector('.user-culti-speed');
		const speedMatch = cultiSpeedElement.innerText.match(/\+(\d+)/);
		cultiSpeedElement.innerHTML += `<br><span>${cultiSpeedElement.title.replace(/\*/g, 'x')}</span>`;

		if (!speedMatch) return;

		const speed = parseInt(speedMatch[1]);
		const titles = document.querySelectorAll('.stat-title');

		titles.forEach(title => {
			if (!['Tu vi', 'Căn cơ'].includes(title.innerText.trim())) return;

			const progressDiv = title.closest('.stat-box').querySelector('.progress .progress-bar');
			updateProgressBar(progressDiv);

			if (title.innerText.trim() === 'Tu vi') {
				const valueMax = parseInt(progressDiv.getAttribute('aria-valuemax'));
				const valueNow = parseInt(progressDiv.getAttribute('aria-valuenow'));
				const remaining = valueMax - valueNow;

				cultiSpeedElement.innerHTML += `
          <br><span>Cần: ${formatNumber(remaining)} tu vi để đột phá</span>
          <br><span>Còn lại: ${calculateTimeToBreakthrough(valueMax, valueNow, speed)}</span>
        `;
			}
		});
	};

	// Initialize cultivation speed display
	updateCultiSpeed();
})();
