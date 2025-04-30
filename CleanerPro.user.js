// ==UserScript==
// @name        Cleaner Pro S
// @namespace   Violentmonkey Scripts
// @match       *://sangtacviet.vip/truyen/*
// @match       *://sangtacviet.pro/truyen/*
// @match       *://sangtacviet.com/truyen/*
// @match       *://sangtacviet.xyz/truyen/*
// @match       *://sangtacviet.app/truyen/*
// @match       *://14.225.254.182/truyen/*
// @icon        https://i.ibb.co/mVNM0Ms4/419660.png
// @version     1.6
// @author      @playrough
// @description Clean and format text
// @grant       GM_addStyle
// @run-at      document-start
// ==/UserScript==

(function () {
	"use strict";

	const CONFIG = {
		DOM: {
			nameInput: "#namewd",
			nameSettingBox: "#nsbox",
			contentBox: "#content-container .contentbox",
			configBox: "#configBox",
			settingBtn: "#btnshowns",
			highlightBtn: "#highlightBtn",
			settingIcon: ".fa-cogs.fas",
		},

		CLASSNAMES: {
			button85: "button-85",
			notifier: "cp-notifier",
			button: "cp-floating-btn"
		},

		ATTRIBUTES: {
			IS_NAME: "isname",
			EXTRA_ID_PREFIX: "exran"
		},

		ACTIONS_TO_RELOAD: [
			"addSuperName('hv','z')",
			"addSuperName('hv','f')",
			"addSuperName('hv','s')",
			"addSuperName('hv','l')",
			"addSuperName('hv','a')",
			"addSuperName('el')",
			"addSuperName('vp')",
			"addSuperName('kn')",
			"saveNS();excute();",
			"excute()",
		],

		REGEX: {
			REVERSE_TRIM_TEXT: {
				pattern: /[\w\s\p{L}\p{M}]+/gu,
				replace: " $& ",
			},
			START_SIGNS: {
				pattern: /^\s*([^\w\s\p{L}\p{M}]+(?:\s+[^\w\s\p{L}\p{M}]+)*)(.*)$/u,
				replace: "$2",
			},
			END_SIGNS: {
				pattern: /^(.*?)([^\w\s\p{L}\p{M}]+(?:\s+[^\w\s\p{L}\p{M}]+)*)\s*$/u,
				replace: "$1",
			},
			ENDS: {
				pattern: /[.;:!?“【〘《]$/,
				replace: null,
			},
			CHINESE_UNICODE: {
				pattern: /[\u4e00-\u9fff\u3400-\u4dbf\u20000-\u2a6df\u2a700-\u2b73f\u2b740-\u2b81f\u2b820-\u2ceaf\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\U0002f800-\U0002fa1f]/g,
				replace: null,
			},
			NUMBER_COUNT: {
				pattern: /(?<!\d)\d{5,}(?!\d)/g,
				replace: null,
			},
			NUMBER_COMMA: {
				pattern: /\B(?=(\d{3})+(?!\d))/g,
				replace: ",",
			},
		},

		RULES: {
			STICKY_SIGNS: {
				pattern: /([,.:;!?，。！？、；：])([{‘“'"])/g,
				replace: "$1 $2",
			},
			OPEN_SIGNS: {
				pattern: /[】〙》({\[\<“‘"'`]+/g,
				replace: " $&",
			},
			CLOSE_SIGNS: {
				pattern: /[【〘《.,!?;:`”’"'#$^&\]}>|]+/g, //)
				replace: "$& ",
			},
			MID_SIGNS: {
				pattern: /[\-+*/=~—·]/g,
				replace: " $& ",
			},
			SPACE_BETWEEN_SIGNS: {
				pattern: /([^\w\s\p{L}\p{M}])\s+([^\w\s\p{L}\p{M}])/gu,
				replace: "$1 $2",
			},
			SPACE_BEFORE_SIGNS: {
				pattern: /\s+([,.:;!?，。！？、；：])/g,
				replace: "$1",
			},
			SPACE_AFTER_OPEN: {
				pattern: /([([{‘“'"])\s+/g,
				replace: "$1",
			},
			SPACE_BEFORE_CLOSE: {
				pattern: /\s+([)\]}’”'"])/g,
				replace: "$1",
			},
			NUMBER_SPACE: {
				pattern: /(?<=\d)\s*([,.:])\s*(?=\d)/g,
				replace: "$1",
			},
			OPEN_BRACKET: {
				pattern: /【/g,
				replace: "〘",
			},
			CLOSE_BRACKET: {
				pattern: /】/g,
				replace: "〙",
			},
			OPEN_ARROW: {
				pattern: /《/g,
				replace: "〘",
			},
			CLOSE_ARROW: {
				pattern: /》/g,
				replace: "〙",
			},
		},

		MESSAGES: {
			CLEANED: "🎰 Cleaned & sorted!",
			COPY_SUCCESS: "📋 Name copied!",
			COPY_FAILED: "❌ Copy failed!",
			MODE_ON: "☕️ Highlight mode: On",
			MODE_OFF: "🍵 Highlight mode: Off",
		},

		CSS: `
            #namewd {
                padding: 15px;
                line-height: 1.8;
                height: 500px;
            }

            .fa-cogs.fas {
                color: #ffffff !important;
            }

            #nsbox {
                position: absolute !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
            }

            #configBox {
                right: 85px !important;
            }

            #btnshowns .fa-cogs.fas {
                color: white !important;
                font-size: 24px !important;
            }

            .button-85:before {
                content: "";
                background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
                position: absolute;
                top: -1px;
                left: -1px;
                background-size: 400%;
                z-index: -1;
                width: calc(100% + 2px);
                height: calc(100% + 2px);
                animation: glowing-button-85 20s linear infinite;
                transition: opacity 0.3s ease-in-out;
                border-radius: 10px;
            }

            .button-85 {
                font-size: 12px;
                padding: 0.6em;
                width: 50px;
                height: 50px;
                border: none;
                outline: none !important;
                color: rgb(255, 255, 255);
                background: #111;
                cursor: pointer;
                z-index: 1000;
                border-radius: 10px;
                user-select: none;
                -webkit-user-select: none;
                touch-action: manipulation;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
            }

            .button-85:after {
                z-index: -1;
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                background: #222;
                left: 0;
                top: 0;
                border-radius: 10px;
            }

            .button-85:active {
                transform: scale(0.95);
            }

            @media (hover: none) {
                .button-85:active {
                    transform: scale(0.95);
                }
            }

            .cp-notifier {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(20px);
                width: auto;
                height: auto;
                padding: 10px 20px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
                opacity: 0;
                pointer-events: none;
                backdrop-filter: blur(6px);
                z-index: 1001;
                transition: opacity 0.4s ease, transform 0.4s ease;
            }

            .cp-floating-btn {
                position: fixed;
                right: 16px;
                z-index: 1000;
            }
        `
    };

	const app = {
		isHighlighted: true,
		domCache: {},

		init() {
			GM_addStyle(CONFIG.CSS);

			window.addEventListener("DOMContentLoaded", () => {
				if (!document.querySelector(CONFIG.DOM.contentBox + " i")) return;
				setTimeout(() => { this.run() }, 2000);
			});
		},

		run() {
			this.cacheDOMElements();
			this.createUI();
			this.setupAutoFormat();
			this.format();
		},

		cacheDOMElements() {
			this.domCache = {
				nameInput: document.querySelector(CONFIG.DOM.nameInput),
				contentBox: document.querySelector(CONFIG.DOM.contentBox),
				settingBtn: document.querySelector(CONFIG.DOM.settingBtn)
			};
		},

		createUI() {
			createButton("fixCleanBtn", "Clean", () => this.format(), 150);
			createButton("copyBtn", "Copy", () => this.copyName(), 85);
			createButton("highlightBtn", "On", () => this.switchHighlight(), 215);

			if (!this.domCache.settingBtn) return;
			this.domCache.settingBtn.classList.add(CONFIG.CLASSNAMES.button85);


			function createButton(id, text, onClick, bottom) {
				const btn = document.createElement("button");
				btn.id = id;
				btn.className = `${CONFIG.CLASSNAMES.button85} ${CONFIG.CLASSNAMES.button}`;
				btn.textContent = text;
				btn.onclick = onClick;
				btn.style.bottom = `${bottom}px`;

				document.body.appendChild(btn);
				return btn;
			}
		},

		setupAutoFormat() {
			CONFIG.ACTIONS_TO_RELOAD.forEach(action => {
				const el = document.querySelector(`[onclick="${action}"]`);
				if (!el) return;
				el.addEventListener("click", this.format.bind(this));
			});
		},

		showNotify(message, duration = 2000) {
			const el = document.createElement("div");
			el.className = `${CONFIG.CLASSNAMES.button85} ${CONFIG.CLASSNAMES.notifier}`;
			el.textContent = message;

			document.body.appendChild(el);

			void el.offsetWidth;

			el.style.opacity = "1";
			el.style.transform = "translateX(-50%) translateY(0)";

			setTimeout(() => {
				el.style.opacity = "0";
				el.style.transform = "translateX(-50%) translateY(20px)";
				el.addEventListener("transitionend", () => el.remove());
			}, duration);
		},

		format() {
			if (!this.domCache.contentBox) return;

			this.removeEmptyITags();
			this.domCache.contentBox.normalize();

			this.processITags();
			this.processTextNodes();
			this.sort();

			this.showNotify(CONFIG.MESSAGES.CLEANED);
		},

		removeEmptyITags() {
			this.domCache.contentBox.querySelectorAll("i").forEach(i => {
				if (!i.textContent.trim()) i.remove();
			});
		},

		processITags() {
			this.domCache.contentBox.querySelectorAll("i").forEach(i => {
				separatorSigns(i);
				formalizeITag(i);
				toLowercase(i);
				capitalizeStart(i);

				if (!i.textContent.trim()) i.remove();
			});

			function separatorSigns(i) {
				if (!i.id?.startsWith("exran")) return;

				const parent = i.parentNode;
				let textContent = i.textContent;

				textContent = handleStartSign(i, textContent, parent);
				handleEndSign(i, textContent, parent);

				if (i.textContent.trim() === "") {
					parent.removeChild(i);
				}

			}

			function handleStartSign(i, textContent, parent) {
				const startMatch = textContent.match(CONFIG.REGEX.START_SIGNS.pattern);
				if (!startMatch) return textContent;

				const prevSibling = i.previousSibling;
				const isPrevTextNode = prevSibling?.nodeType === Node.TEXT_NODE;
				const textStart = startMatch[1];
				const remainingText = startMatch[2];

				if (isPrevTextNode && prevSibling.nodeValue.trim() === "") {
					parent.replaceChild(document.createTextNode(textStart), prevSibling);
					i.textContent = remainingText;
					return remainingText;
				}

				if (isPrevTextNode) {
					prevSibling.nodeValue += textStart;
					i.textContent = remainingText;
					return remainingText;
				}

				i.insertAdjacentText("beforebegin", textStart);
				i.textContent = remainingText;
				return remainingText;
			}

			function handleEndSign(i, textContent, parent) {
				const endMatch = textContent.match(CONFIG.REGEX.END_SIGNS.pattern);
				if (!endMatch) return textContent;

				const nextSibling = i.nextSibling;
				const isNextTextNode = nextSibling?.nodeType === Node.TEXT_NODE;
				const textEnd = endMatch[2];
				const remainingText = endMatch[1];

				if(isNextTextNode && nextSibling.nodeValue.trim() === ""){
					parent.replaceChild(document.createTextNode(textEnd), nextSibling);
					i.textContent = remainingText;
					return remainingText;
				}

				if (isNextTextNode){
					nextSibling.nodeValue = textEnd + nextSibling.nodeValue;
					i.textContent = remainingText;
					return remainingText;
				}

				i.insertAdjacentText("afterend", textEnd);
				i.textContent = remainingText;
				return remainingText;
			}

			function formalizeITag(i) {
				if (!i) return;
				const prev = i.previousSibling;
				const next = i.nextSibling;

				i.textContent = i.textContent.trim();

				if (prev && prev.nodeType === 1 && prev.tagName === "I") {
					i.parentNode.insertBefore(document.createTextNode(" "), i);
				}

				if (next && next.nodeType === 1 && next.tagName === "I") {
					i.parentNode.insertBefore(document.createTextNode(" "), next);
				}
			}

			function toLowercase(i) {
				const shouldLowercase = (
					!i.hasAttribute(CONFIG.ATTRIBUTES.IS_NAME) &&
					!i.id?.startsWith(CONFIG.ATTRIBUTES.EXTRA_ID_PREFIX)
				)

				if (shouldLowercase) {
					i.textContent = i.textContent.toLowerCase();
				}
			}

			function capitalizeStart(i) {
				const prevEl = i.previousElementSibling;
				const prevNode = i.previousSibling;

				const getText = (dom) => dom?.textContent?.trim() || "";

				const shouldCapitalize = (
					prevEl === null ||
					prevEl.nodeName === "BR" ||
					prevEl.nodeName === "HEADER" ||
					CONFIG.REGEX.ENDS.pattern.test(getText(prevNode))
				)

				if (!shouldCapitalize || !i.innerHTML) return;

				const txt = i.innerHTML;
				i.innerHTML = txt[0].toUpperCase() + txt.slice(1);
			}
		},

		processTextNodes() {
			const walker = document.createTreeWalker(
				this.domCache.contentBox,
				NodeFilter.SHOW_TEXT
			);

			while (walker.nextNode()) {
				normalizeText(walker.currentNode);
			}

			function normalizeText(node) {
				if (!node?.nodeValue?.trim()) return;

				let txt = node.nodeValue.trim();
				const originalText = node.nodeValue;

				if (isTextNodeOutsideITag(node)) {
					const { pattern, replace } = CONFIG.REGEX.REVERSE_TRIM_TEXT;
					txt = txt.replace(pattern, replace);
				}

				Object.keys(CONFIG.RULES).forEach(rule => {
					const { pattern, replace } = CONFIG.RULES[rule];
					txt = txt.replace(pattern, replace);
				});

				txt = txt.replace(
					CONFIG.REGEX.NUMBER_COUNT.pattern,
					s => s.replace(CONFIG.REGEX.NUMBER_COMMA.pattern, '')
				);

				if (txt !== originalText) {
					node.nodeValue = txt;
				}
			}

			function isTextNodeOutsideITag(textNode) {
				return textNode.nodeType === Node.TEXT_NODE &&
					textNode.parentElement.tagName !== 'I';
			}
		},

		copyName() {
			navigator.clipboard.writeText(this.domCache.nameInput?.value || "")
				.then(() => this.showNotify(CONFIG.MESSAGES.COPY_SUCCESS))
				.catch(() => this.showNotify(CONFIG.MESSAGES.COPY_FAILED));
		},

		switchHighlight(forceOn = false) {
			if (forceOn) this.isHighlighted = true;

			const btn = document.querySelector(CONFIG.DOM.highlightBtn);
			if (btn) btn.textContent = this.isHighlighted ? "Off" : "On";

			const COLOR_DANGER = "var(--danger)";
			const I_NAME = "i[" + CONFIG.ATTRIBUTES.IS_NAME + "]";

			this.domCache.contentBox.querySelectorAll(I_NAME).forEach(i => {
				i.style.color = this.isHighlighted ? COLOR_DANGER : "";
				i.style.fontWeight = this.isHighlighted ? "bold" : "normal";
			});

			this.isHighlighted = !this.isHighlighted;
			this.showNotify(this.isHighlighted ? CONFIG.MESSAGES.MODE_OFF : CONFIG.MESSAGES.MODE_ON);
		},

		sort() {
			const originalText = this.domCache.nameInput.value.trim();
			if (!originalText) {
				console.log("No text found in input field");
				return;
			}

			const sortedText = sortNames(originalText);
			this.domCache.nameInput.value = sortedText;

			function sortNames(text) {
				const items = text
				.split("\n")
				.filter(line => line.trim() && line.includes("="))
				.map(line => {
					const [keyPart, ...valueParts] = line.split("=");
					const key = keyPart.replace("$", "").trim();
					const value = valueParts.join("=").trim();
					return { key, value };
				});

				const itemsWithStats = items.map(item => {
					const chineseCharCount = (
						item.key.match(CONFIG.REGEX.CHINESE_UNICODE.pattern) || []
					).length;

					const firstChar = item.value.charAt(0);
					const isCapitalized =
						  firstChar === firstChar.toUpperCase() &&
						  firstChar !== firstChar.toLowerCase();

					return {
						...item,
						chineseCharCount,
						caseType: isCapitalized ? "capitalized" : "lowercase",
					};
				});

				itemsWithStats.sort((a, b) => {
					if (a.chineseCharCount !== b.chineseCharCount) {
						return a.chineseCharCount - b.chineseCharCount;
					}
					return a.value.localeCompare(b.value);
				});

				const groupedItems = itemsWithStats.reduce((acc, item) => {
					acc[item.caseType] = acc[item.caseType] || [];
					acc[item.caseType].push(item);
					return acc;
				}, {});

				const capitalizedText = (groupedItems.capitalized || [])
				.map(item => `$${item.key}=${item.value}`)
				.join("\n");

				const lowercaseText = (groupedItems.lowercase || [])
				.map(item => `$${item.key}=${item.value}`)
				.join("\n");

				return (
					`@CAPITALIZED\n${capitalizedText}\n\n` +
					`@LOWERCASE\n${lowercaseText}`
				);
			}
		}
	}

	app.init();
})();
