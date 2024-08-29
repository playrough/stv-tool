// ==UserScript==
// @name         Image Names
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Load Image Pokemon Name By HyperBeam and RenjiYuusei
// @run-at       document-end
// @author       @HyperBeam & @RenjiYuusei
// @match        *://sangtacviet.vip/truyen/*
// @license      GPL-3.0
// @icon64       https://sangtacviet.vip/favicon.png
// @grant        GM_setValue
// @grant        GM_getValue
// @downloadURL https://update.greasyfork.org/scripts/502509/Image%20Names.user.js
// @updateURL https://update.greasyfork.org/scripts/502509/Image%20Names.meta.js
// ==/UserScript==

(function () {
    "use strict";

    //Chiều rộng bảng edit name STV
    const NAME_EDITOR_MOBILE_WIDTH = "100%";
    const NAME_EDITOR_PC_WIDTH = "50%";

    const TYPE_STYLE = {
        Normal: "#ededed",
        Fire: "#ff6600",
        Water: "#75d0ff",
        Electric: "#ffcd2c",
        Grass: "#70ffa2",
        Ice: "#4dffee",
        Fighting: "#ff4f61",
        Poison: "#ff4ae5",
        Ground: "#ebbb8a",
        Flying: "#c6d7ff",
        Psychic: "#ff9999",
        Bug: "#d7ff71",
        Rock: "#fff7bd",
        Ghost: "#a689ff",
        Dragon: "#6a90ff",
        Dark: "#dfd0ff",
        Steel: "#36c4d3",
        Fairy: "#ffa5e2",
    };

    const BUTTON_STYLES = {
        fontSize: "14px",
        outline: "none",
        borderRadius: "100%",
        height: "50px",
        width: "50px",
        marginBottom: "10px",
        cursor: "pointer",
        border: "1px solid #ccc",
        backgroundColor: "#f0f0f0",
        transition: "background-color 0.3s",
    };

    const IMAGE_STYLES = {
        ".pokemon-image": {
            display: "inline-block",
            margin: "-25px 0 -20px",
            width: "60px",
            height: "60px",
        },
        ".pokemon-type": {
            display: "inline-block",
            margin: "-5px -2px 0px 2px",
            width: "25px",
            height: "25px",
        },
        ".pokemon-ball": {
            display: "inline-block",
            margin: "-5px 0 0 2px",
            width: "35px",
            height: "35px",
        },
        ".type": {
            fontWeight: "bold",
            textShadow: "1px 1px 0 #222, -1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222",
        },
    };

    const DEFAULT_CONFIG = {
        showCopyButton: true,
        showNamesButton: true,
        showReloadButton: true,
    };

    let config = { ...DEFAULT_CONFIG };

    function loadConfig() {
        const savedConfig = GM_getValue("imageNamesConfig");
        if (savedConfig) {
            config = { ...DEFAULT_CONFIG, ...JSON.parse(savedConfig) };
        }
    }

    function saveConfig() {
        GM_setValue("imageNamesConfig", JSON.stringify(config));
    }

    function applyStyles() {
        document.querySelectorAll("i").forEach((tag) => {
            if (/<img|<span/.test(tag.textContent)) {
                tag.style.whiteSpace = "nowrap";
                tag.innerHTML = tag.textContent;
            }
        });

        Object.entries(IMAGE_STYLES).forEach(([selector, styles]) => {
            document.querySelectorAll(selector).forEach((element) => {
                Object.assign(element.style, styles);
            });
        });

        Object.entries(TYPE_STYLE).forEach(([selector, color]) => {
            Array.from(document.getElementsByClassName(selector)).forEach(
                (element) => {
                    element.style.color = color;
                }
            );
        });
    }

    function createButton(text, onClickFunction) {
        const button = document.createElement("button");
        Object.assign(button.style, BUTTON_STYLES);
        button.textContent = text;

        const eventList = {
            mouseover: () => (button.style.backgroundColor = '#e0e0e0'),
            mouseout: () => (button.style.backgroundColor = '#f0f0f0'),
            click: onClickFunction,
        };

        Object.entries(eventList).forEach(([eventName, handler]) => {
            button.addEventListener(eventName, handler);
        });

        return button;
    }

    function setupButtons() {
        const boxMenu = document.createElement("div");
        Object.assign(boxMenu.style, {
            position: "fixed",
            bottom: "100px",
            right: "10px",
            display: "flex",
            flexDirection: "column",
        });

        const buttons = [
            { condition: 'showCopyButton', text: 'Copy', onClick: copyToClipboard },
            { condition: 'showNamesButton', text: 'Names', onClick: () => document.querySelector("button[onclick='showNS()']")?.click() },
            { condition: 'showReloadButton', text: 'Reload', onClick: () => document.querySelector("button[onclick='excute()']")?.click() },
            { condition: true, text: 'Config', onClick: createConfigMenu },
        ];

        buttons.forEach(({ condition, text, onClick }) => {
            if (config[condition] || condition === true) {
                boxMenu.appendChild(createButton(text, onClick));
            }
        });

        document.body.appendChild(boxMenu);
    }

    async function copyToClipboard(e) {
        try {
            const copyText = document.querySelector("#namewd")?.value || "";
            await navigator.clipboard.writeText(copyText);
            e.target.textContent = "Copied!";
        } catch (err) {
            e.target.textContent = "Error!";
        } finally {
            setTimeout(() => {
                e.target.textContent = "Copy";
            }, 2000);
        }
    }

    function createConfigMenu() {
        const modal = document.createElement("div");
        Object.assign(modal.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
        });

        const menuContent = document.createElement("div");
        Object.assign(menuContent.style, {
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "300px",
            width: "90%",
        });

        const title = document.createElement("h2");
        title.textContent = "Configuration";
        title.style.marginTop = "0";
        menuContent.appendChild(title);

        Object.keys(config).forEach((key) => {
            const label = document.createElement("label");
            label.style.display = "block";
            label.style.marginBottom = "10px";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = config[key];
            checkbox.id = key;
            checkbox.style.appearance = "auto";
            checkbox.addEventListener("change", (e) => {
                config[key] = e.target.checked;
            });

            label.appendChild(checkbox);
            label.appendChild(
                document.createTextNode(
                    " " +
                    key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                )
            );
            menuContent.appendChild(label);
        });

        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.justifyContent = "space-between";
        buttonContainer.style.marginTop = "20px";

        const saveButton = createButton("Save", () => {
            saveConfig();
            modal.remove();
            location.reload();
        });
        saveButton.style.borderRadius = "5px";
        saveButton.style.marginRight = "10px";
        saveButton.style.flex = "1";

        const cancelButton = createButton("Cancel", () => modal.remove());
        cancelButton.style.borderRadius = "5px";
        cancelButton.style.flex = "1";

        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(cancelButton);
        menuContent.appendChild(buttonContainer);

        modal.appendChild(menuContent);
        document.body.appendChild(modal);
    }

    function styleNameSettings() {
        const namewdf = document.querySelector("#namewdf");
        const namewd = document.querySelector("#namewd");

        if (window.innerWidth <= 600) {
            // Mobile styles
            namewdf.style.width = NAME_EDITOR_MOBILE_WIDTH;
        } else {
            // PC styles
            namewdf.style.width = NAME_EDITOR_PC_WIDTH;
        }

        Object.assign(namewd.style, {
            fontSize: "12px",
            whiteSpace: "nowrap",
            lineHeight: "1.8",
            padding: "10px",
            outline: "none",
            height: "60vh",
        });
    }

    function init() {
        loadConfig();
        applyStyles();
        setupButtons();
        styleNameSettings();

        const button = document.querySelector('[onclick="excute()"]');
        if (button) {
            button.addEventListener("click", applyStyles);
        }
    }

    requestAnimationFrame(() => {
        setTimeout(init, 2000);
    });
})();