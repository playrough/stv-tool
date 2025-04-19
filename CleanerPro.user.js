// ==UserScript==
// @name        Cleaner Pro
// @namespace   Violentmonkey Scripts
// @match       *://sangtacviet.com/truyen/*
// @match       *://sangtacviet.vip/truyen/*
// @match       *://sangtacviet.app/truyen/*
// @icon        https://i.ibb.co/mVNM0Ms4/419660.png
// @version     1.5
// @author      playrough
// @description Clean and format text
// @grant       GM_addStyle
// @run-at      document-start
// ==/UserScript==

(function () {
    "use strict";

    // ==================== 📁 CONFIG ====================
    class Config {
        static UI = {
            button: { position: 'fixed', right: '16px', zIndex: '1000' },
            notifier: {
                position: "fixed",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%) translateY(20px)",
                width: "auto",
                height: "auto",
                padding: "10px 20px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "500",
                opacity: "0",
                pointerEvents: "none",
                backdropFilter: "blur(6px)",
                zIndex: "1001",
            },
            colors: {
                highlight: "oklch(70.7% .165 254.624)"
            }
        };

        static DOM = {
            nameInput: "#namewd",
            nameSettingBox: "#nsbox",
            contentBox: "#content-container .contentbox",
            configBox: "#configBox",
            settingBtn: "#btnshowns",
            highlightBtn: "#highlightBtn",
            settingIcon: ".fa-cogs.fas"
        };

        static CLASSNAME = {
            button85: "button-85"
        };

        static FONTS = {
            nunitoSans: {
                name: "Nunito Sans",
                import: "Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000"
            }
        };

        static ACTIONS_TO_RELOAD = [
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
        ];

        static TEXT = {
            BREAKS: ["【", ":【", "“", "‘", "“‘", "『", "——"],
            ENDS: [".", "。", "！", "!", "?", ": “", ": ‘"],

            SPAN_STYLE: {
                fontWeight: "bold",

            },

            getColoredSpan: (color, text) => {
                return `<span style="font-weight: ${Config.TEXT.SPAN_STYLE.fontWeight};
                            color: ${color || "inherit"}">${text}
                        </span>`;
            }
        };

        static REGEX = {
            PUNCT_BRACKET: /([,.:;!?，。！？、；：])([([{‘“'"])/g,
            OPEN_PAREN: /\(/g,
            SPACE_BEFORE_PUNCT: /\s+([,.:;!?，。！？、；：])/g,
            SPACE_AFTER_OPEN: /([([{‘“'"])\s+/g,
            SPACE_BEFORE_CLOSE: /\s+([)\]}’”'"])/g,
            NUMBER_COMMA: /\b\d{1,3}(?=(\d{3})+\b)/g,
            OPEN_BRACKET: /【/g,
            CLOSE_BRACKET: /】/g,

            START_PUNCT: /^([,\.\!\?:;“])\s*(.*)$/,
            END_PUNCT: /^(.*?)([,\.\!\?:;“])$/,

            COLOR_TAG: /\{([a-zA-Z#0-9]+),\s*([^}]+)\}/g
        };

        static CLEAN_RULES = [
            [Config.REGEX.PUNCT_BRACKET, "$1 $2"],
            [Config.REGEX.OPEN_PAREN, " ("],
            [Config.REGEX.SPACE_BEFORE_PUNCT, "$1"],
            [Config.REGEX.SPACE_AFTER_OPEN, "$1"],
            [Config.REGEX.SPACE_BEFORE_CLOSE, "$1"],
            [Config.REGEX.NUMBER_COMMA, "$&,"],
            [Config.REGEX.OPEN_BRACKET, "『 "],
            [Config.REGEX.CLOSE_BRACKET, " 』"],
        ];

        static MESSAGE = {
            CLEANED: "🎊 Cleaned & colored!",
            COPY_SUCCESS: "📋 Name copied!",
            COPY_FAILED: "❌ Copy failed!",
            MODE_ON: "☕️ Highlight mode: On",
            MODE_OFF: "🍵 Highlight mode: Off",
        }
    }

    // ==================== 🧰 DOM HELPER ====================
    class DomHelper {
        static create(tag, props = {}, styles = {}) {
            const el = document.createElement(tag);
            Object.assign(el, props);
            Object.assign(el.style, styles);
            return el;
        }

        static animate(el, props, duration = "0.4s", easing = "ease") {
            el.style.transition = props.map(p => `${p} ${duration} ${easing}`).join(", ");
        }
    }

    // ==================== 🎨 STYLE MANAGER ====================
    class StyleManager {
        constructor(fonts) {
            this.font = fonts.nunitoSans;
        }

        inject() {
            this.injectFont();
            this.injectLayout();
            this.injectButtons();
            this.injectSettingButtonFix();
        }

        injectFont() {
            const url = `https://fonts.googleapis.com/css2?family=${this.font.import}&display=swap`;
            GM_addStyle(`
                @import url('${url}');
                body, ${Config.DOM.contentBox} {
                    font-family: "${this.font.name}", sans-serif !important;
                }
            `);
        }

        injectLayout() {
            GM_addStyle(`
                ${Config.DOM.nameInput} {
                    padding: 15px;
                    line-height: 1.8;
                }

                ${Config.DOM.settingIcon} {
                    color: #ffffff !important;
                }

                /* ${Config.DOM.nameSettingBox} {
                      position: absolute !important;
                      left: 50% !important;
                      transform: translateX(-50%) !important;
                } */
            `);
        }

        injectButtons() {
            GM_addStyle(`
                .${Config.CLASSNAME.button85}:before {
                    content: "";
                    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    background-size: 400%;
                    z-index: -1;
                    filter: blur(5px);
                    -webkit-filter: blur(5px);
                    width: calc(100% + 2px);
                    height: calc(100% + 2px);
                    animation: glowing-button-85 20s linear infinite;
                    transition: opacity 0.3s ease-in-out;
                    border-radius: 10px;
                }

                .${Config.CLASSNAME.button85} {
                    font-size: 12px;
                    padding: 0.6em;
                    width: 50px;
                    height: 50px;
                    border: none;
                    outline: none !important;
                    color: rgb(255, 255, 255);
                    background: #111;
                    cursor: pointer;
                    z-index: 0;
                    border-radius: 10px;
                    user-select: none;
                    -webkit-user-select: none;
                    touch-action: manipulation;
                }

                .${Config.CLASSNAME.button85}:after {
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

                @keyframes glowing-button-85 {
                    0% { background-position: 0 0; }
                    50% { background-position: 400% 0; }
                    100% { background-position: 0 0; }
                }

                .${Config.CLASSNAME.button85} {
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
                }

                .${Config.CLASSNAME.button85}:hover {
                    transform: scale(1.08);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                }

                .${Config.CLASSNAME.button85}:active {
                    transform: scale(0.95);
                }

                @media (hover: none) {
                    .${Config.CLASSNAME.button85}:active {
                        transform: scale(0.95);
                    }

                    .${Config.CLASSNAME.button85}:focus {
                        transform: scale(1.08);
                    }
                }
            `);
        }

        injectSettingButtonFix() {
            GM_addStyle(`
                ${Config.DOM.configBox} {
                    right: 85px !important;
                }

                ${Config.DOM.settingBtn} ${Config.DOM.settingIcon} {
                    color: white !important;
                    font-size: 24px !important;
                }
            `);
        }
    }

    // ==================== 🪄 TEXT FORMATTER ====================
    class TextFormatter {
        constructor(dom, colorMap) {
            this.dom = dom;
            this.colors = colorMap;
            this.isHighlighted = true;
            this.nameInput = document.querySelector(dom.nameInput);
            this.contentBox = document.querySelector(dom.contentBox);
        }

        format() {
            if (!this.contentBox) return;
            this.contentBox.normalize();
            this.contentBox.querySelectorAll("i").forEach(el => {
                this.normalizePunctuation(el);
                this.toLowerCase(el);
                this.capitalizeStart(el);
                this.convertColor(el);
                if (!el.textContent.trim()) el.remove();
            });

            const walker = document.createTreeWalker(this.contentBox, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) this.cleanTextNode(walker.currentNode);

            UIManager.showNotify(Config.MESSAGE.CLEANED);
        }

        copyName() {
            navigator.clipboard.writeText(this.nameInput?.value || "")
                .then(() => UIManager.showNotify(Config.MESSAGE.COPY_SUCCESS))
                .catch(() => UIManager.showNotify(Config.MESSAGE.COPY_FAILED));
        }

        switchHighlight(forceOn = false) {
            if (forceOn) this.isHighlighted = true;

            const btn = document.querySelector(Config.DOM.highlightBtn);
            if (btn) btn.textContent = this.isHighlighted ? "Off" : "On";

            this.contentBox.querySelectorAll("i").forEach(el => {
                if (el.getAttribute("isname")) {
                    el.style.color = this.isHighlighted ? Config.UI.colors.highlight : "";
                    el.style.fontWeight = this.isHighlighted ? "bold" : "normal";
                }
            });

            this.isHighlighted = !this.isHighlighted;
            UIManager.showNotify(this.isHighlighted ? Config.MESSAGE.MODE_OFF : Config.MESSAGE.MODE_ON);
        }

        normalizePunctuation(el) {
            const txt = el.textContent;
            const start = txt.match(Config.REGEX.START_PUNCT);
            if (start) { el.textContent = start[2]; el.insertAdjacentText("beforebegin", start[1] + " "); return; }
            const end = txt.match(Config.REGEX.END_PUNCT);
            if (end) { el.textContent = end[1]; el.insertAdjacentText("afterend", end[2]); }
            if (el.textContent.trim() === "") el.remove();
        }

        toLowerCase(el) {
            if (!el.hasAttribute("isname") && !el.id?.startsWith("exran")) el.textContent = el.textContent.toLowerCase();
        }

        capitalizeStart(el) {
            const prevEl = el.previousElementSibling;
            const prevNode = el.previousSibling;
            if (!prevEl || !prevNode) return;

            const getText = (dom) => dom?.textContent?.trim() || "";
            if (prevEl.nodeName === "BR" ||
                Config.TEXT.BREAKS.includes(getText(prevEl)) ||
                Config.TEXT.ENDS.includes(getText(prevNode))) {
                const txt = el.innerHTML;
                el.innerHTML = txt[0].toUpperCase() + txt.slice(1);
            }
        }

        convertColor(el) {
            el.innerHTML = el.innerHTML.replace(Config.REGEX.COLOR_TAG, (_, color, text) =>
                Config.TEXT.getColoredSpan(this.colors[color] || "inherit", text));
        }

        cleanTextNode(node) {
            if (!node?.nodeValue?.trim()) return;
            let txt = node.nodeValue;
            Config.CLEAN_RULES.forEach(([pat, rep]) => { txt = txt.replace(pat, rep); });
            if (txt !== node.nodeValue) node.nodeValue = txt;
        }
    }

    // ==================== 🧪 UI MANAGER ====================
    class UIManager {
        static showNotify(message, duration = 2000) {
            const el = DomHelper.create("div", { className: Config.CLASSNAME.button85, textContent: message }, Config.UI.notifier);
            DomHelper.animate(el, ["opacity", "transform"]);
            document.body.appendChild(el);
            requestAnimationFrame(() => {
                el.style.opacity = "1";
                el.style.transform = "translateX(-50%) translateY(0)";
            });
            setTimeout(() => {
                el.style.opacity = "0";
                el.style.transform = "translateX(-50%) translateY(20px)";
                el.addEventListener("transitionend", () => el.remove());
            }, duration);
        }

        static createFloatingButton({ id, text, onClick, bottom }) {
            const btn = DomHelper.create("button", {
                id,
                className: Config.CLASSNAME.button85,
                textContent: text,
                onclick: onClick
            }, { ...Config.UI.button, bottom: `${bottom}px` });

            DomHelper.animate(btn, ["transform"]);
            document.body.appendChild(btn);
        }

        static addClassSettingButton() {
            const settingBtn = document.querySelector(Config.DOM.settingBtn);
            if (settingBtn) {
                settingBtn.classList.add(Config.CLASSNAME.button85);
            }
        }
    }

    // ==================== 🚀 APPLICATION ====================
    class App {
        constructor() {
            this.style = new StyleManager(Config.FONTS);
            this.formatter = new TextFormatter(Config.DOM, {});
        }

        init() {
            this.style.inject();
            this.createUI();
            this.setupAutoFormat();
            this.formatter.format();
        }

        createUI() {
            const makeBtn = (id, text, onClick, bottom) => UIManager.createFloatingButton({ id, text, onClick, bottom });

            makeBtn("fixCleanBtn", "Clean", () => this.formatter.format(), 150);
            makeBtn("copyBtn", "Copy", () => this.formatter.copyName(), 85);
            makeBtn("highlightBtn", "On", () => this.formatter.switchHighlight(), 215);

            UIManager.addClassSettingButton();
        }

        setupAutoFormat() {
            Config.ACTIONS_TO_RELOAD.forEach(action => {
                const el = document.querySelector(`[onclick="${action}"]`);
                if (el) el.addEventListener("click", () => this.formatter.format());
            });
        }

        static start() {
            const app = new App();
            app.init();
        }
    }

    // ==================== 🧼 AUTO INIT ====================
    window.addEventListener("DOMContentLoaded", () => {
        if (document.querySelector(Config.DOM.contentBox + " i")) {
            requestIdleCallback(() => App.start(), { timeout: 2000 });
        }
    });

})();
