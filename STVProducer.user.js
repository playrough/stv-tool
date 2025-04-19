// ==UserScript==
// @name           SangTacViet Producer No Darkmode
// @namespace      sangtacviet
// @version        2.0
// @description    Combines Item STV, Dark STV, and Auto Collect userscripts.
// @author         @Undefined & @Yuusei
// @license        GPL-3.0
// @icon           https://sangtacviet.vip/favicon.png
// @match          *://sangtacviet.vip/truyen/*
// @match          *://sangtacviet.pro/truyen/*
// @match          *://sangtacviet.com/truyen/*
// @match          *://sangtacviet.xyz/truyen/*
// @match          *://14.225.254.182/truyen/*
// @exclude        *://sangtacviet.vip/surf.php
// @exclude        *://sangtacviet.pro/surf.php
// @exclude        *://sangtacviet.com/surf.php
// @exclude        *://sangtacviet.xyz/surf.php
// @exclude        *://14.225.254.182/surf.php
// @grant          GM_addStyle
// ==/UserScript==

!(function() {
    GM_addStyle(`:root {\n\t/* Item Settings */\n\t--uy-vong-lenh: url(${"'https://i.postimg.cc/PJbWFB2r/lenhbai.png'"});\n\t--cong-phap: url(${"'https://i.postimg.cc/y6RvZGhG/bachquyen.png'"});\n\t--vu-ky: url(${"'https://i.postimg.cc/T3t9xvGK/lamquyen.png'"});\n\t--linh-thach: url(${"'https://i.postimg.cc/zvYw7Jwc/linhthach.png'"});\n\t--tu-khi-dan: url(${"'https://i.postimg.cc/8kdLDgmT/tukhi.png'"});\n\t--tu-linh-dan: url(${"'https://i.postimg.cc/xT0M1p6M/tulinh.png'"});\n\t--tay-tuy-dan: url(${"'https://i.postimg.cc/50LL6hcq/taytuy.png'"});\n\t--thien-van-dan: url(${"'https://i.postimg.cc/yxK99Lsq/thienvan.png'"});\n\t--thiep-bia: url(${"'https://i.postimg.cc/2yxWxnS1/thiep.png'"});\n\n\t--item-kim: url(${"'https://i.postimg.cc/wxDQvmg8/kim.png'"});\n\t--item-moc: url(${"'https://i.postimg.cc/4x2zMvbt/moc.png'"});\n\t--item-thuy: url(${"'https://i.postimg.cc/7ZhzgG8L/thuy.png'"});\n\t--item-hoa: url(${"'https://i.postimg.cc/Qd8bvdLL/hoa.png'"});\n\t--item-tho: url(${"'https://i.postimg.cc/9FJTRPkS/tho.png'"});\n\t--item-phong: url(${"'https://i.postimg.cc/s2BpRBwL/phong.png'"});\n\t--item-loi: url(${"'https://i.postimg.cc/Z558Vs34/loi.png'"});\n\t--item-bang: url(${"'https://i.postimg.cc/SN7dZzv7/bang.png'"});\n\t--item-quang: url(${"'https://i.postimg.cc/q792BkFv/quang.png'"});\n\t--item-am: url(${"'https://i.postimg.cc/VLc4BFDk/am.png'"});\n\n\t/* Predefined Colors */\n\t--silver-primary: #c0c2cc;\n\t--grey-primary: #83848f;\n\t--blue-primary: #557ffc;\n\t--red-primary: #eb1551;\n\t--red-secondary: #af2a2a;\n\t--yellow-primary: #ffc152;\n\t--orange-primary: #ff7329;\n\t--green-primary: #39cca0;\n\t--violet-primary: #6a4ce2;\n\t--light-hover: rgba(255, 255, 255, 0.1);\n\t--light-hover-secondary: rgba(255, 255, 255, 0.2);\n\t--black: #000;\n\t--white: #fff;\n\t--opacity-black: rgba(255, 255, 255, 0.1);\n\t--opacity-black-bold: rgba(0, 0, 0, 0.8);\n\t--opacity-white: rgba(255, 255, 255, 0.5);\n\t--opacity-white-bold: rgba(255, 255, 255, 0.8);\n\t--opacity: #0000;\n\t--text-black: rgba(18, 18, 23, 0.9);\n\t--text-grey: rgba(18, 18, 23, 0.6);\n\t--bg-item: #383e4d;\n}\n\n/*user item */\n.item {\n\tmargin: 3px;\n\tborder-width: 3px !important;\n\tborder-style: solid !important;\n\tborder-color: transparent !important;\n\tbackground-size: contain !important;\n\tbackground-repeat: no-repeat !important;\n\tbackground-position: center !important;\n\tbackground-color: var(--bg-item);\n\toutline: 2px solid var(--grey-primary) !important;\n}\n\n.item[n]:after {\n\tcontent: attr(n);\n\tposition: absolute;\n\tright: -2px;\n\tbottom: -3px;\n\tfont-size: 12px;\n\tline-height: 12px;\n\ttext-shadow: 1px 1px 1px var(--black);\n\tcolor: var(--white);\n}\n\na.item[ac='true'][onclick='openitem(this)'] {\n\toutline: 2px dashed var(--red-primary) !important;\n\tborder-width: 3px !important;\n\tborder-style: solid !important;\n\tborder-color: transparent !important;\n}\n\na.item[l^='5']:not([l='5']):not([tag='1']):after {\n\twidth: 32px;\n\theight: 32px;\n}\n\na.item[l^='5']:not([l='5']):not([tag='1']):after {\n\tposition: relative;\n\ttop: -3px;\n\tleft: -3px;\n}\n\na.item[l^='4']:not([l='4']):not([tag='1']):after,\na.item[l^='3']:not([l='3']):not([tag='1']):after,\na.item[l^='2']:not([l='2']):not([tag='1']):after,\na.item[l^='1']:not([l='1']):not([tag='1']):after {\n\twidth: 30px;\n\theight: 30px;\n\tposition: relative;\n\ttop: -2px;\n\tleft: -2px;\n\tborder-radius: 50%;\n}\n\na.item[l^='4']:not([l='4']):not([tag='1']):after {\n\tbackground: radial-gradient(transparent, transparent, var(--orange-primary));\n}\n\na.item[l^='3']:not([l='3']):not([tag='1']):after {\n\tbackground: radial-gradient(transparent, transparent, var(--violet-primary));\n}\n\na.item[l^='2']:not([l='2']):not([tag='1']):after {\n\tbackground: radial-gradient(transparent, transparent, var(--yellow-primary));\n}\n\na.item[l^='1']:not([l='1']):not([tag='1']):after {\n\tbackground: radial-gradient(transparent, transparent, var(--silver-primary));\n}\n\n.item[l='2']:not([tag='1']) {\n\toutline: 2px solid var(--green-primary) !important;\n}\n\n.item[l='3']:not([tag='1']) {\n\toutline: 2px solid var(--blue-primary) !important;\n}\n\n.item[l='4']:not([tag='1']) {\n\toutline: 2px solid var(--violet-primary) !important;\n}\n\n.item[l='5']:not([tag='1']) {\n\toutline: 2px solid var(--orange-primary) !important;\n}\n\n.item[l='6']:not([tag='1']) {\n\toutline: 2px solid var(--yellow-primary) !important;\n}\n\n.item[l='7']:not([tag='1']) {\n\toutline: 2px solid var(--green-primary) !important;\n}\n\n.item[l='8']:not([tag='1']) {\n\toutline: 2px solid var(--blue-primary) !important;\n}\n\n.item[l='9']:not([tag='1']) {\n\toutline: 2px solid var(--violet-primary) !important;\n}\n\na.item[l^='1']:not([l='1']):not([tag='1']) {\n\toutline: 2px solid var(--silver-primary) !important;\n\tborder-radius: 0;\n}\n\na.item[l^='2']:not([l='2']):not([tag='1']) {\n\toutline: 2px solid var(--yellow-primary) !important;\n}\n\na.item[l^='3']:not([l='3']):not([tag='1']) {\n\toutline: 2px solid var(--violet-primary) !important;\n}\n\na.item[l^='4']:not([l='4']):not([tag='1']) {\n\toutline: 2px solid var(--orange-primary) !important;\n}\n\na.item[l^='5']:not([l='5']):not([tag='1']) {\n\toutline: 2px solid var(--red-primary) !important;\n}\n\n.item[style='background-image:url(/game/asset/item/uy-vong-lenh.png)'] {\n\tbackground-image: var(--uy-vong-lenh) !important;\n}\n\n.item[tag='1'] {\n\tbackground-image: var(--linh-thach);\n}\n\n.item[tag='2'] {\n\tborder-width: 4px !important;\n}\n\n.item[tag='2'][ac='true'][onclick='openitem(this)'] {\n\tborder-width: 4px !important;\n}\n\n.item[tag='2'][e='1'] {\n\tbackground-image: var(--tu-khi-dan);\n}\n\n.item[tag='2'][e='2'] {\n\tbackground-image: var(--tu-linh-dan);\n}\n\n.item[tag='2'][e='3'] {\n\tbackground-image: var(--tay-tuy-dan);\n}\n\n.item[tag='2'][e='10'] {\n\tbackground-image: var(--thien-van-dan);\n}\n\n.item[tag='3'] {\n\tbackground-image: var(--cong-phap);\n}\n\n.item[tag='3'][l='50'] {\n\tbackground-image: var(--cong-phap) !important;\n}\n\n.item[tag='4'] {\n\tbackground-image: var(--vu-ky);\n}\n\n.item[itn='thiep-bia-2023'] {\n\tbackground-image: var(--thiep-bia) !important;\n}\n\n.item[e='19'] {\n\tbackground-image: var(--item-hoa);\n\tborder-width: 0px !important;\n}\n\n.item[e='20'] {\n\tbackground-image: var(--item-thuy);\n\tborder-width: 0px !important;\n}\n\n.item[e='21'] {\n\tbackground-image: var(--item-kim);\n\tborder-width: 0px !important;\n}\n\n.item[e='22'] {\n\tbackground-image: var(--item-moc);\n\tborder-width: 0px !important;\n}\n\n.item[e='23'] {\n\tbackground-image: var(--item-tho);\n\tborder-width: 0px !important;\n}\n\n.item[e='24'] {\n\tbackground-image: var(--item-phong);\n\tborder-width: 0px !important;\n}\n\n.item[e='25'] {\n\tbackground-image: var(--item-loi);\n\tborder-width: 0px !important;\n}\n\n.item[e='26'] {\n\tbackground-image: var(--item-quang);\n\tborder-width: 0px !important;\n}\n\n.item[e='27'] {\n\tbackground-image: var(--item-bang);\n\tborder-width: 0px !important;\n}\n\n.item[e='28'] {\n\tbackground-image: var(--item-am);\n\tborder-width: 0px !important;\n}\n\n.item[e='19']:after,\n.item[e='20']:after,\n.item[e='21']:after,\n.item[e='22']:after,\n.item[e='23']:after,\n.item[e='24']:after,\n.item[e='25']:after,\n.item[e='26']:after,\n.item[e='27']:after,\n.item[e='28']:after {\n\ttop: 1px !important;\n\tleft: 1px !important;\n}\n\na.item[e='19'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,\na.item[e='20'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,\na.item[e='21'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,\na.item[e='22'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,\na.item[e='23'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,\na.item[e='24'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,\na.item[e='25'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,\na.item[e='26'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,\na.item[e='27'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after,\na.item[e='28'][l^='5']:not([l='5']):not([tag='1']):not([tag='3']):after {\n\ttop: 0 !important;\n\tleft: 0 !important;\n}\n\n.item .iinfo {\n\ttop: 125%;\n\tleft: -3px;\n\tbackground-color: var(--opacity-black-bold);\n\tborder-radius: 5px;\n\tpadding: 5px;\n\tcolor: var(--opacity-white-bold);\n\tanimation: fadeIn 0.2s ease-out;\n}\n\n@keyframes fadeIn {\n\t0% {\n\t\topacity: 0;\n\t}\n\n\t100% {\n\t\topacity: 1;\n\t}\n}\n\n.item[tag='2'] .iinfo {\n\ttop: 133%;\n}\n\n.activeitem {\n\tmargin: 10px 0;\n}\n\n.activeitem .item {\n\tmargin-right: 10px !important;\n}\n\n.activeitem .item .iinfo {\n\ttop: -5px;\n\tleft: 145%;\n}\n\n.activeitem .item[tag='2'] .iinfo {\n\ttop: -5px;\n\tleft: 158%;\n}\n\n.item[sel='true']:before {\n\twidth: unset;\n\theight: unset;\n\ttext-shadow: none;\n\tcolor: var(--danger);\n\ttop: 50%;\n\tright: 50%;\n\ttransform: translate(50%, -50%);\n}\n\n[selected] {\n\toutline: 2px solid var(--red-primary) !important;\n}\n\n[selected]:before {\n\twidth: unset;\n\theight: unset;\n\ttext-shadow: none;\n\tcolor: var(--danger);\n\ttop: -7% !important;\n\tleft: 17% !important;\n}\n\n.item[tag='2'][selected]:before {\n\twidth: unset;\n\theight: unset;\n\ttext-shadow: none;\n\tcolor: var(--danger);\n\ttop: -12% !important;\n\tleft: 14% !important;\n}\n`);
    const n = {
            6: 1e5,
            5: 1e4,
            4: 1e3,
        },
        t = {
            6: 64,
            5: 32,
            4: 16,
        },
        r = {
            6: 32,
            5: 16,
            4: 8,
        },
        o = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        a = n => document.querySelectorAll(`#tuitruvat ${n}`).length,
        e = (n, t) => {
            const r = document.querySelectorAll(`#tuitruvat ${n}`);
            return Array.from(r).reduce((n, r) => {
                const o = parseInt(r.getAttribute('l')),
                    a = parseInt(r.getAttribute('n')) || 1;
                return n + t(o, a);
            }, 0);
        },
        i = n => (t, r) => r * (n[t] || 0),
        p = (n, t) => t * n * 50,
        d = (n, t) => {
            const r = Array.from(document.querySelectorAll('div[style="font-size: 20px; margin: 10px 0px;"]')).find(t => t.textContent.trim() === n);
            r && (r.innerHTML += `\n                <ul class="custom-list">\n                    ${t}\n                </ul>\n            `);
        };
    new MutationObserver(() => {
        const c = {
            linhThach: e('.item[tag="1"]', p),
            tuKhi: e('.item[tag="2"][e="1"]', i(n)),
            tuLinh: e('.item[tag="2"][e="2"]', i(t)),
            thienVan: e('.item[tag="2"][e="10"]', i(r)),
            cp: a('.item[tag="3"][ac="false"]'),
            vk: a('.item[tag="4"][ac="false"]'),
        };
        d('Công pháp', `<li>Tổng + <strong>${o(c.cp)}</strong></li>`), d('Võ kỹ', `<li>Tổng + <strong>${o(c.vk)}</strong></li>`), d('Đan dược', `\n            <li>Tu Vi + <strong style="color: #298dd4">${o(c.tuKhi)}</strong></li>\n            <li>Buff + <strong style="color: #d53f42">${o(c.tuLinh / 100)}</strong></li>\n            <li>Vận Khí + <strong style="color: #fcac05">${o(c.thienVan)}</strong></li>\n        `), d('Linh thạch', `<li>Tu Vi + <strong style="color: #298dd4">${o(c.linhThach)}</strong></li>`);
    }).observe(document.body, {
        childList: !0,
        subtree: !0,
    });
    (() => {
        const n = document.querySelector('.user-culti-speed');
        if (!n) return;
        const t = n.title.match(/\d+\.?\d*/g),
            r = n.innerText.match(/\+(\d+)/),
            a = parseInt(r ? r[1] : 0);
        n.innerHTML = `<span>Tốc độ tu luyện: <b style="color: #298dd4">${o(a)}</b> tu vi/phút</span>\n                                       <br><span>Cơ bản: <b style="color: #298dd4">${t ? t[0] : 0}</b></span>\n                                       <br><span>Buff: x <b style="color: #d53f42">${t ? t[1] : 0}</b></span>\n                                       <br><span>Căn cơ: x <b style="color: #53bd5a">${t ? t[2] : 0}</b></span>\n                                       `;
        document.querySelectorAll('.stat-title').forEach(t => {
            if (!['Tu vi', 'Căn cơ'].includes(t.innerText.trim())) return;
            const r = t.closest('.stat-box').querySelector('.progress .progress-bar');
            if (
                r &&
                ((n => {
                        const t = o(n.innerText);
                        (n.innerText = ''), (n.parentElement.style.position = 'relative'), (n.parentElement.innerHTML += `\n            <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; text-align: center">\n                ${t}\n            </span>\n        `);
                    })(r),
                    'Tu vi' === t.innerText.trim())
            ) {
                const t = parseInt(r.getAttribute('aria-valuemax')),
                    e = parseInt(r.getAttribute('aria-valuenow')),
                    i = t - e;
                n.innerHTML += `\n                        <br><span>Đột phá cần: <b style="color: #298dd4">${o(i)}</b></span>\n                        <br><span>Thời gian đột phá: ${((n, t, r) => {
					const o = (n - t) / r;
					return `${Math.floor(o / 1440)} ngày, ${Math.floor((o % 1440) / 60)} giờ, ${Math.floor(o % 60)} phút, ${Math.round((o % 1) * 60)} giây`;
				})(t, e, a)}</span>\n                    `;
            }
        });
    })();

    (() => {
        const n = document.createElement('div');
        Object.assign(n.style, {
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
            }),
            document.body.appendChild(n),
            document.addEventListener('click', t => {
                n && n.classList.contains('show') && !n.contains(t.target) && (n.style.display = 'none');
            });
    })();
    const c = [
            {
                name: 'Yuusei & Undefined',
                info: 'Yuusei & Undefined',
			},
            {
                name: 'Yuusei & Undefined',
                info: 'Yuusei & Undefined',
			},
            {
                name: 'Yuusei & Undefined',
                info: 'Yuusei & Undefined',
			},
		],
        l = [
            {
                name: 'Yuusei & Undefined',
                info: 'Yuusei & Undefined',
			},
            {
                name: 'Yuusei & Undefined',
                info: 'Yuusei & Undefined',
			},
            {
                name: 'Yuusei & Undefined',
                info: 'Yuusei & Undefined',
			},
		];
    async function m(n, t = '/index.php', r = 0) {
        try {
            const o = await fetch(t, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                body: n,
                method: 'POST',
            });
            if (!o.ok) return 502 === o.status && r < 3 ? (console.log(`Error ${o.status}, retrying...`), await new Promise(n => setTimeout(n, 2e3)), m(n, t, r + 1)) : (console.error(`Fetch error: ${o.status} ${o.statusText}`), null);
            return await o.json();
        } catch (n) {
            return console.error('Fetch error:', n), null;
        }
    }
    window.setInterval(async function() {
            try {
                const n = await m('ngmar=tcollect&ajax=trycollect', '/index.php?ngmar=iscollectable');
                if (!n || 1 !== n.code) return;
                const t = await m('ngmar=collect&ajax=collect');
                if (!t) return;
                const r = await (function(n) {
                    const t = '/index.php?ngmar=fcl';
                    let r = 'ajax=fcollect';
                    const o = {
                        3: c,
                        4: l,
                    };
                    if (o[n.type]) {
                        const t = Math.floor(Math.random() * o[n.type].length),
                            a = o[n.type][t];
                        r += '&newname=' + encodeURIComponent(a.name) + '&newinfo=' + encodeURIComponent(a.info);
                    }
                    return m(r, t);
                })(t);
                r && 1 === r.code ? console.log('Collected:', t.name) : r && 0 === r.code && console.log('Failed to collect:', t.name, r.message);
            } catch (n) {
                console.error('Collection error:', n);
            }
        }, 5e3),
        setInterval(async function n(t = '/index.php', r = 0) {
            const o = document.querySelectorAll('.item[ac="false"][tag="2"][e="3"]');
            if (o.length > 0) {
                const a = Array.from(o).map(n => n.getAttribute('i')),
                    e = new URLSearchParams();
                e.append('ajax', 'dungnhieu'), e.append('consume', a.join(','));
                try {
                    const o = await fetch(t, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        },
                        body: e.toString(),
                        credentials: 'include',
                    });
                    if (!o.ok) return 502 === o.status && r < 3 ? (console.log(`Error ${o.status}, retrying in 2 seconds...`), await new Promise(n => setTimeout(n, 2e3)), n(t, r + 1)) : void console.error(`Error consuming Tẩy Tủy Đan: ${o.status} ${o.statusText}`);
                    const a = await o.text();
                    return console.log('Successfully consumed Tẩy Tủy Đan:', a), a;
                } catch (n) {
                    console.error('Error consuming Tẩy Tủy Đan:', n);
                }
            } else console.log('No Tẩy Tủy Đan found to consume.');
        }, 3e5);
})();
