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

	// Configuration object
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
			button85: "button-85"
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
				pattern: /[【〘《.,!?;:`”’"'#$^&\])}>|]+/g,
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
			NUMBER_COMMA: {
				pattern: /\b\d{1,3}(?=(\d{3})+\b)/g,
				replace: "$&,",
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

		// Combined CSS for injection
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

            .button-85:hover {
                transform: scale(1.08);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            }

            .button-85:active {
                transform: scale(0.95);
            }

            @media (hover: none) {
                .button-85:active {
                    transform: scale(0.95);
                }

                .button-85:focus {
                    transform: scale(1.08);
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

	// Main App
	const app = {
		constructor() {
			this.isHighlighted = true;
			this.domCache = {};
		},

		init() {
			// Inject CSS
			GM_addStyle(CONFIG.CSS);

			// Run when DOMLoaded
			window.addEventListener("DOMContentLoaded", () => {
				if (document.querySelector(CONFIG.DOM.contentBox + " i")) {
					setTimeout(() => {
						this.cacheDOMElements();
						this.createUI();
						this.setupAutoFormat();
						this.format();
					}, 2000);
				}
			});
		},

		// Cache DOM elements
		cacheDOMElements() {
			this.domCache = {
				nameInput: document.querySelector(CONFIG.DOM.nameInput),
				contentBox: document.querySelector(CONFIG.DOM.contentBox),
				settingBtn: document.querySelector(CONFIG.DOM.settingBtn)
			};
		},

		// Create UI buttons
		createUI() {
			// Create floating buttons
			this.createButton("fixCleanBtn", "Clean", () => this.format(), 150);
			this.createButton("copyBtn", "Copy", () => this.copyName(), 85);
			this.createButton("highlightBtn", "On", () => this.switchHighlight(), 215);

			// Style the settings button
			if (this.domCache.settingBtn) {
				this.domCache.settingBtn.classList.add(CONFIG.CLASSNAMES.button85);
			}
		},

		// Create floating button helper
		createButton(id, text, onClick, bottom) {
			const btn = document.createElement("button");
			btn.id = id;
			btn.className = `${CONFIG.CLASSNAMES.button85} cp-floating-btn`;
			btn.textContent = text;
			btn.onclick = onClick;
			btn.style.bottom = `${bottom}px`;

			document.body.appendChild(btn);
			return btn;
		},

		// Setup auto format triggers
		setupAutoFormat() {
			CONFIG.ACTIONS_TO_RELOAD.forEach(action => {
				const el = document.querySelector(`[onclick="${action}"]`);
				if (el) {
					// Use a single event listener with a bound method
					el.addEventListener("click", this.format.bind(this));
				}
			});
		},

		// Show notification helper
		showNotify(message, duration = 2000) {
			const el = document.createElement("div");
			el.className = `${CONFIG.CLASSNAMES.button85} cp-notifier`;
			el.textContent = message;

			document.body.appendChild(el);

			// Force reflow to ensure transition works
			void el.offsetWidth;

			el.style.opacity = "1";
			el.style.transform = "translateX(-50%) translateY(0)";

			setTimeout(() => {
				el.style.opacity = "0";
				el.style.transform = "translateX(-50%) translateY(20px)";
				el.addEventListener("transitionend", () => el.remove());
			}, duration);
		},

		// Main formatting function
		format() {
			if (!this.domCache.contentBox) return;

			this.removeEmptyITags();
			this.domCache.contentBox.normalize();

			this.processITags();
			this.processTextNodes();
			this.sort();

			this.showNotify(CONFIG.MESSAGES.CLEANED);
		},

		// Remove empty i tags
		removeEmptyITags() {
			this.domCache.contentBox.querySelectorAll("i").forEach(i => {
				if (!i.textContent.trim()) i.remove();
			});
		},

		// Process i tags
		processITags() {
			this.domCache.contentBox.querySelectorAll("i").forEach(i => {
				this.separatorSigns(i);
				this.formalizeITag(i);
				this.toLowercase(i);
				this.capitalizeStart(i);

				if (!i.textContent.trim()) i.remove();
			});
		},

		// Process text nodes
		processTextNodes() {
			const walker = document.createTreeWalker(
				this.domCache.contentBox,
				NodeFilter.SHOW_TEXT
			);

			while (walker.nextNode()) {
				this.normalizeText(walker.currentNode);
			}
		},

		// Copy name
		copyName() {
			navigator.clipboard.writeText(this.domCache.nameInput?.value || "")
				.then(() => this.showNotify(CONFIG.MESSAGES.COPY_SUCCESS))
				.catch(() => this.showNotify(CONFIG.MESSAGES.COPY_FAILED));
		},

		// Switch highlight mode
		switchHighlight(forceOn = false) {
			if (forceOn) this.isHighlighted = true;

			const btn = document.querySelector(CONFIG.DOM.highlightBtn);
			if (btn) btn.textContent = this.isHighlighted ? "Off" : "On";

			this.domCache.contentBox.querySelectorAll("i").forEach(i => {
				if (i.getAttribute("isname")) {
					i.style.color = this.isHighlighted ? "var(--danger)" : "";
					i.style.fontWeight = this.isHighlighted ? "bold" : "normal";
				}
			});

			this.isHighlighted = !this.isHighlighted;
			this.showNotify(this.isHighlighted ? CONFIG.MESSAGES.MODE_OFF : CONFIG.MESSAGES.MODE_ON);
		},

		// Handle separator signs
		separatorSigns(i) {
			if (!i.id?.startsWith("exran")) return;

			const parent = i.parentNode;
			let textContent = i.textContent;

			const startMatch = textContent.match(CONFIG.REGEX.START_SIGNS.pattern);
			if (startMatch) {
				const prevSibling = i.previousSibling;
				const isPrevTextNode = prevSibling?.nodeType === Node.TEXT_NODE;
				const textStart = startMatch[1];

				if (isPrevTextNode && prevSibling.nodeValue.trim() === "") {
					parent.replaceChild(document.createTextNode(textStart), prevSibling);
				} else if (isPrevTextNode) {
					prevSibling.nodeValue += textStart;
				} else {
					i.insertAdjacentText("beforebegin", textStart);
				}
				i.textContent = startMatch[2];
				textContent = startMatch[2];
			}

			const endMatch = textContent.match(CONFIG.REGEX.END_SIGNS.pattern);
			if (endMatch) {
				const nextSibling = i.nextSibling;
				const isNextTextNode = nextSibling?.nodeType === Node.TEXT_NODE;
				const textEnd = endMatch[2];

				if (isNextTextNode && nextSibling.nodeValue.trim() === "") {
					parent.replaceChild(document.createTextNode(textEnd), nextSibling);
				} else if (isNextTextNode) {
					nextSibling.nodeValue = textEnd + nextSibling.nodeValue;
				} else {
					i.insertAdjacentText("afterend", textEnd);
				}
				i.textContent = endMatch[1];
			}

			if (i.textContent.trim() === "") {
				parent.removeChild(i);
			}

		},

		// Formalize i tag
		formalizeITag(i) {
			if (i) {
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
		},

		// Convert to lowercase
		toLowercase(i) {
			if (!i.hasAttribute("isname") && !i.id?.startsWith("exran")) {
				i.textContent = i.textContent.toLowerCase();
			}
		},

		// Capitalize start
		capitalizeStart(i) {
			const prevEl = i.previousElementSibling;
			const prevNode = i.previousSibling;

			const getText = (dom) => dom?.textContent?.trim() || "";
			if (
				prevEl === null ||
				prevEl.nodeName === "BR" ||
				prevEl.nodeName === "HEADER" ||
				CONFIG.REGEX.ENDS.pattern.test(getText(prevNode))
			) {
				if (i.innerHTML) {
					const txt = i.innerHTML;
					i.innerHTML = txt[0].toUpperCase() + txt.slice(1);
				}
			}
		},

		// Normalize text
		normalizeText(node) {
			if (!node?.nodeValue?.trim()) return;
			let txt = node.nodeValue.trim();

			if (this.isTextNodeOutsideITag(node)) {
				const { pattern, replace } = CONFIG.REGEX.REVERSE_TRIM_TEXT;
				txt = txt.replace(pattern, replace);
			}

			for (let rule in CONFIG.RULES) {
				if (CONFIG.RULES.hasOwnProperty(rule)) {
					const { pattern, replace } = CONFIG.RULES[rule];
					txt = txt.replace(pattern, replace);
				}
			}

			if (txt !== node.nodeValue) node.nodeValue = txt;
		},

		// Check if text node is outside i tag
		isTextNodeOutsideITag(textNode) {
			return textNode.nodeType === Node.TEXT_NODE &&
				textNode.parentElement.tagName !== 'I';
		},

		// Sort names
		sort() {
			const originalText = this.domCache.nameInput.value.trim();
			if (!originalText) {
				console.log("No text found in input field");
				return;
			}

			const sortedText = this.sortNames(originalText);
			this.domCache.nameInput.value = sortedText;
		},

		// Sort names helper
		sortNames(text) {
			// Process and extract items
			const items = text
			.split("\n")
			.filter(line => line.trim() && line.includes("="))
			.map(line => {
				const [keyPart, ...valueParts] = line.split("=");
				const key = keyPart.replace("$", "").trim();
				const value = valueParts.join("=").trim();
				return { key, value };
			});

			// Add stats to items
			const itemsWithStats = items.map(item => {
				const chineseCharCount = (
					item.key.match(
						/[\u4e00-\u9fff\u3400-\u4dbf\u20000-\u2a6df\u2a700-\u2b73f\u2b740-\u2b81f\u2b820-\u2ceaf\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\U0002f800-\U0002fa1f]/g
					) || []
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

			// Sort by Chinese character count and value
			itemsWithStats.sort((a, b) => {
				if (a.chineseCharCount !== b.chineseCharCount) {
					return a.chineseCharCount - b.chineseCharCount;
				}
				return a.value.localeCompare(b.value);
			});

			// Group by case type
			const groupedItems = itemsWithStats.reduce((acc, item) => {
				acc[item.caseType] = acc[item.caseType] || [];
				acc[item.caseType].push(item);
				return acc;
			}, {});

			// Format output
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

	// Initialize the app
	app.init();
})();
