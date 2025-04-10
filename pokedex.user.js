// ==UserScript==
// @name        Clean Punctuation
// @namespace   Violentmonkey Scripts
// @match       *://sangtacviet.com/truyen/*
// @match       *://sangtacviet.vip/truyen/*
// @match       *://sangtacviet.app/truyen/*
// @version     1.0
// @author      -
// @description 3/22/2025, 2:37:25 PM
// ==/UserScript==

(function () {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');

        body {
           font-family: "Nunito Sans", sans-serif !important;
        }

        #content-container .contentbox {
           /* font-family: 'Inter' !important; */
	   /* font-family: "Merriweather", serif !important; */
           /* font-family: "Noto Sans", sans-serif !important; */
           /* font-family: "Lora", serif !important; */
           /* font-family: "Work Sans", sans-serif !important; */
           /* font-family: "Lato", sans-serif !important; */
           /* font-family: "Roboto Condensed", sans-serif !important; */
           font-family: "Nunito Sans", sans-serif !important;
        }

    `;
	
	
	document.head.appendChild(style);


    const colors = {
        red50: "oklch(97.1% .013 17.38)",
        red100: "oklch(93.6% .032 17.717)",
        red200: "oklch(88.5% .062 18.334)",
        red300: "oklch(80.8% .114 19.571)",
        red400: "oklch(70.4% .191 22.216)",
        red500: "oklch(63.7% .237 25.331)",
        red600: "oklch(57.7% .245 27.325)",
        red700: "oklch(50.5% .213 27.518)",
        red800: "oklch(44.4% .177 26.899)",
        red900: "oklch(39.6% .141 25.723)",
        red950: "oklch(25.8% .092 26.042)",
        orange50: "oklch(98% .016 73.684)",
        orange100: "oklch(95.4% .038 75.164)",
        orange200: "oklch(90.1% .076 70.697)",
        orange300: "oklch(83.7% .128 66.29)",
        orange400: "oklch(75% .183 55.934)",
        orange500: "oklch(70.5% .213 47.604)",
        orange600: "oklch(64.6% .222 41.116)",
        orange700: "oklch(55.3% .195 38.402)",
        orange800: "oklch(47% .157 37.304)",
        orange900: "oklch(40.8% .123 38.172)",
        orange950: "oklch(26.6% .079 36.259)",
        amber50: "oklch(98.7% .022 95.277)",
        amber100: "oklch(96.2% .059 95.617)",
        amber200: "oklch(92.4% .12 95.746)",
        amber300: "oklch(87.9% .169 91.605)",
        amber400: "oklch(82.8% .189 84.429)",
        amber500: "oklch(76.9% .188 70.08)",
        amber600: "oklch(66.6% .179 58.318)",
        amber700: "oklch(55.5% .163 48.998)",
        amber800: "oklch(47.3% .137 46.201)",
        amber900: "oklch(41.4% .112 45.904)",
        amber950: "oklch(27.9% .077 45.635)",
        yellow50: "oklch(98.7% .026 102.212)",
        yellow100: "oklch(97.3% .071 103.193)",
        yellow200: "oklch(94.5% .129 101.54)",
        yellow300: "oklch(90.5% .182 98.111)",
        yellow400: "oklch(85.2% .199 91.936)",
        yellow500: "oklch(79.5% .184 86.047)",
        yellow600: "oklch(68.1% .162 75.834)",
        yellow700: "oklch(55.4% .135 66.442)",
        yellow800: "oklch(47.6% .114 61.907)",
        yellow900: "oklch(42.1% .095 57.708)",
        yellow950: "oklch(28.6% .066 53.813)",
        lime50: "oklch(98.6% .031 120.757)",
        lime100: "oklch(96.7% .067 122.328)",
        lime200: "oklch(93.8% .127 124.321)",
        lime300: "oklch(89.7% .196 126.665)",
        lime400: "oklch(84.1% .238 128.85)",
        lime500: "oklch(76.8% .233 130.85)",
        lime600: "oklch(64.8% .2 131.684)",
        lime700: "oklch(53.2% .157 131.589)",
        lime800: "oklch(45.3% .124 130.933)",
        lime900: "oklch(40.5% .101 131.063)",
        lime950: "oklch(27.4% .072 132.109)",
        green50: "oklch(98.2% .018 155.826)",
        green100: "oklch(96.2% .044 156.743)",
        green200: "oklch(92.5% .084 155.995)",
        green300: "oklch(87.1% .15 154.449)",
        green400: "oklch(79.2% .209 151.711)",
        green500: "oklch(72.3% .219 149.579)",
        green600: "oklch(62.7% .194 149.214)",
        green700: "oklch(52.7% .154 150.069)",
        green800: "oklch(44.8% .119 151.328)",
        green900: "oklch(39.3% .095 152.535)",
        green950: "oklch(26.6% .065 152.934)",
        emerald50: "oklch(97.9% .021 166.113)",
        emerald100: "oklch(95% .052 163.051)",
        emerald200: "oklch(90.5% .093 164.15)",
        emerald300: "oklch(84.5% .143 164.978)",
        emerald400: "oklch(76.5% .177 163.223)",
        emerald500: "oklch(69.6% .17 162.48)",
        emerald600: "oklch(59.6% .145 163.225)",
        emerald700: "oklch(50.8% .118 165.612)",
        emerald800: "oklch(43.2% .095 166.913)",
        emerald900: "oklch(37.8% .077 168.94)",
        emerald950: "oklch(26.2% .051 172.552)",
        teal50: "oklch(98.4% .014 180.72)",
        teal100: "oklch(95.3% .051 180.801)",
        teal200: "oklch(91% .096 180.426)",
        teal300: "oklch(85.5% .138 181.071)",
        teal400: "oklch(77.7% .152 181.912)",
        teal500: "oklch(70.4% .14 182.503)",
        teal600: "oklch(60% .118 184.704)",
        teal700: "oklch(51.1% .096 186.391)",
        teal800: "oklch(43.7% .078 188.216)",
        teal900: "oklch(38.6% .063 188.416)",
        teal950: "oklch(27.7% .046 192.524)",
        cyan50: "oklch(98.4% .019 200.873)",
        cyan100: "oklch(95.6% .045 203.388)",
        cyan200: "oklch(91.7% .08 205.041)",
        cyan300: "oklch(86.5% .127 207.078)",
        cyan400: "oklch(78.9% .154 211.53)",
        cyan500: "oklch(71.5% .143 215.221)",
        cyan600: "oklch(60.9% .126 221.723)",
        cyan700: "oklch(52% .105 223.128)",
        cyan800: "oklch(45% .085 224.283)",
        cyan900: "oklch(39.8% .07 227.392)",
        cyan950: "oklch(30.2% .056 229.695)",
        sky50: "oklch(97.7% .013 236.62)",
        sky100: "oklch(95.1% .026 236.824)",
        sky200: "oklch(90.1% .058 230.902)",
        sky300: "oklch(82.8% .111 230.318)",
        sky400: "oklch(74.6% .16 232.661)",
        sky500: "oklch(68.5% .169 237.323)",
        sky600: "oklch(58.8% .158 241.966)",
        sky700: "oklch(50% .134 242.749)",
        sky800: "oklch(44.3% .11 240.79)",
        sky900: "oklch(39.1% .09 240.876)",
        sky950: "oklch(29.3% .066 243.157)",
        blue50: "oklch(97% .014 254.604)",
        blue100: "oklch(93.2% .032 255.585)",
        blue200: "oklch(88.2% .059 254.128)",
        blue300: "oklch(80.9% .105 251.813)",
        blue400: "oklch(70.7% .165 254.624)",
        blue500: "oklch(62.3% .214 259.815)",
        blue600: "oklch(54.6% .245 262.881)",
        blue700: "oklch(48.8% .243 264.376)",
        blue800: "oklch(42.4% .199 265.638)",
        blue900: "oklch(37.9% .146 265.522)",
        blue950: "oklch(28.2% .091 267.935)",
        indigo50: "oklch(96.2% .018 272.314)",
        indigo100: "oklch(93% .034 272.788)",
        indigo200: "oklch(87% .065 274.039)",
        indigo300: "oklch(78.5% .115 274.713)",
        indigo400: "oklch(67.3% .182 276.935)",
        indigo500: "oklch(58.5% .233 277.117)",
        indigo600: "oklch(51.1% .262 276.966)",
        indigo700: "oklch(45.7% .24 277.023)",
        indigo800: "oklch(39.8% .195 277.366)",
        indigo900: "oklch(35.9% .144 278.697)",
        indigo950: "oklch(25.7% .09 281.288)",
        violet50: "oklch(96.9% .016 293.756)",
        violet100: "oklch(94.3% .029 294.588)",
        violet200: "oklch(89.4% .057 293.283)",
        violet300: "oklch(81.1% .111 293.571)",
        violet400: "oklch(70.2% .183 293.541)",
        violet500: "oklch(60.6% .25 292.717)",
        violet600: "oklch(54.1% .281 293.009)",
        violet700: "oklch(49.1% .27 292.581)",
        violet800: "oklch(43.2% .232 292.759)",
        violet900: "oklch(38% .189 293.745)",
        violet950: "oklch(28.3% .141 291.089)",
        purple50: "oklch(97.7% .014 308.299)",
        purple100: "oklch(94.6% .033 307.174)",
        purple200: "oklch(90.2% .063 306.703)",
        purple300: "oklch(82.7% .119 306.383)",
        purple400: "oklch(71.4% .203 305.504)",
        purple500: "oklch(62.7% .265 303.9)",
        purple600: "oklch(55.8% .288 302.321)",
        purple700: "oklch(49.6% .265 301.924)",
        purple800: "oklch(43.8% .218 303.724)",
        purple900: "oklch(38.1% .176 304.987)",
        purple950: "oklch(29.1% .149 302.717)",
        fuchsia50: "oklch(97.7% .017 320.058)",
        fuchsia100: "oklch(95.2% .037 318.852)",
        fuchsia200: "oklch(90.3% .076 319.62)",
        fuchsia300: "oklch(83.3% .145 321.434)",
        fuchsia400: "oklch(74% .238 322.16)",
        fuchsia500: "oklch(66.7% .295 322.15)",
        fuchsia600: "oklch(59.1% .293 322.896)",
        fuchsia700: "oklch(51.8% .253 323.949)",
        fuchsia800: "oklch(45.2% .211 324.591)",
        fuchsia900: "oklch(40.1% .17 325.612)",
        fuchsia950: "oklch(29.3% .136 325.661)",
        pink50: "oklch(97.1% .014 343.198)",
        pink100: "oklch(94.8% .028 342.258)",
        pink200: "oklch(89.9% .061 343.231)",
        pink300: "oklch(82.3% .12 346.018)",
        pink400: "oklch(71.8% .202 349.761)",
        pink500: "oklch(65.6% .241 354.308)",
        pink600: "oklch(59.2% .249 .584)",
        pink700: "oklch(52.5% .223 3.958)",
        pink800: "oklch(45.9% .187 3.815)",
        pink900: "oklch(40.8% .153 2.432)",
        pink950: "oklch(28.4% .109 3.907)",
        rose50: "oklch(96.9% .015 12.422)",
        rose100: "oklch(94.1% .03 12.58)",
        rose200: "oklch(89.2% .058 10.001)",
        rose300: "oklch(81% .117 11.638)",
        rose400: "oklch(71.2% .194 13.428)",
        rose500: "oklch(64.5% .246 16.439)",
        rose600: "oklch(58.6% .253 17.585)",
        rose700: "oklch(51.4% .222 16.935)",
        rose800: "oklch(45.5% .188 13.697)",
        rose900: "oklch(41% .159 10.272)",
        rose950: "oklch(27.1% .105 12.094)",
        slate50: "oklch(98.4% .003 247.858)",
        slate100: "oklch(96.8% .007 247.896)",
        slate200: "oklch(92.9% .013 255.508)",
        slate300: "oklch(86.9% .022 252.894)",
        slate400: "oklch(70.4% .04 256.788)",
        slate500: "oklch(55.4% .046 257.417)",
        slate600: "oklch(44.6% .043 257.281)",
        slate700: "oklch(37.2% .044 257.287)",
        slate800: "oklch(27.9% .041 260.031)",
        slate900: "oklch(20.8% .042 265.755)",
        slate950: "oklch(12.9% .042 264.695)",
        gray50: "oklch(98.5% .002 247.839)",
        gray100: "oklch(96.7% .003 264.542)",
        gray200: "oklch(92.8% .006 264.531)",
        gray300: "oklch(87.2% .01 258.338)",
        gray400: "oklch(70.7% .022 261.325)",
        gray500: "oklch(55.1% .027 264.364)",
        gray600: "oklch(44.6% .03 256.802)",
        gray700: "oklch(37.3% .034 259.733)",
        gray800: "oklch(27.8% .033 256.848)",
        gray900: "oklch(21% .034 264.665)",
        gray950: "oklch(13% .028 261.692)",
        zinc50: "oklch(98.5% 0 0)",
        zinc100: "oklch(96.7% .001 286.375)",
        zinc200: "oklch(92% .004 286.32)",
        zinc300: "oklch(87.1% .006 286.286)",
        zinc400: "oklch(70.5% .015 286.067)",
        zinc500: "oklch(55.2% .016 285.938)",
        zinc600: "oklch(44.2% .017 285.786)",
        zinc700: "oklch(37% .013 285.805)",
        zinc800: "oklch(27.4% .006 286.033)",
        zinc900: "oklch(21% .006 285.885)",
        zinc950: "oklch(14.1% .005 285.823)",
        neutral50: "oklch(98.5% 0 0)",
        neutral100: "oklch(97% 0 0)",
        neutral200: "oklch(92.2% 0 0)",
        neutral300: "oklch(87% 0 0)",
        neutral400: "oklch(70.8% 0 0)",
        neutral500: "oklch(55.6% 0 0)",
        neutral600: "oklch(43.9% 0 0)",
        neutral700: "oklch(37.1% 0 0)",
        neutral800: "oklch(26.9% 0 0)",
        neutral900: "oklch(20.5% 0 0)",
        neutral950: "oklch(14.5% 0 0)",
        stone50: "oklch(98.5% .001 106.423)",
        stone100: "oklch(97% .001 106.424)",
        stone200: "oklch(92.3% .003 48.717)",
        stone300: "oklch(86.9% .005 56.366)",
        stone400: "oklch(70.9% .01 56.259)",
        stone500: "oklch(55.3% .013 58.071)",
        stone600: "oklch(44.4% .011 73.639)",
        stone700: "oklch(37.4% .01 67.558)",
        stone800: "oklch(26.8% .007 34.298)",
        stone900: "oklch(21.6% .006 56.043)",
        stone950: "oklch(14.7% .004 49.25)",
    }



    const regex = /\{([a-zA-Z#0-9]+),\s*([^}]+)\}/g;
    const nameInput = document.querySelector('#namewd');
    const contentBox = document.querySelector("#content-container .contentbox");


    const showMsg = (text, duration = 2000) => {
        const msg = document.createElement('div');
        msg.textContent = text;
        Object.assign(msg.style, {
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%) translateY(20px)',
            background: 'linear-gradient(135deg, #5C6BC0, #7986CB)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            zIndex: '1001',
            opacity: '0',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            pointerEvents: 'none',
            backdropFilter: 'blur(6px)',
        });
        document.body.appendChild(msg);
        requestAnimationFrame(() => {
            msg.style.opacity = '1';
            msg.style.transform = 'translateX(-50%) translateY(0)';
        });
        setTimeout(() => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateX(-50%) translateY(20px)';
            msg.addEventListener('transitionend', () => msg.remove());
        }, duration);
    };

    const fixAndClean = () => {
        if (!contentBox) return;
        contentBox.querySelectorAll('i').forEach(el => {
            el.innerHTML = el.innerHTML.replace(regex, (match, color, text) => {
                return `<span style="font-weight: bold; color: ${colors[color] || 'inherit'}">${text}</span>`;
            });

            if (!el.textContent.trim()) {
                el.remove();
            }
        });
        contentBox.normalize();
        const walker = document.createTreeWalker(contentBox, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (!node.nodeValue.trim()) continue;
            node.nodeValue = node.nodeValue
                .replace(/\s+([,.:;!?，。！？、；：])/g, '$1')
                .replace(/([([{‘“'"])\s+/g, '$1')
                .replace(/\s+([)\]}’”'"])/g, '$1')
		        .replace(/\(/g, ' (')
		        .replace(/\B(?=(\d{4})+(?!\d))/g, ",");
        }
        showMsg('🎉 Cleaned & colored!');
    };

    const copyName = async () => {
        try {
            const text = nameInput?.value || '';
            await navigator.clipboard.writeText(text);
            showMsg('📋 Name copied!');
        } catch (err) {
            showMsg('❌ Copy failed!');
        }
    };

    const styleBtn = (btn, bottom) => {
        Object.assign(btn.style, {
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg, #5C6BC0, #7986CB)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
            transition: "all 0.2s ease",
            position: "fixed",
            bottom: `${bottom}px`,
            right: "16px",
            zIndex: "1000",
            userSelect: "none",
            outline: "none",
            touchAction: "manipulation",
        });

        btn.addEventListener('mouseover', () => {
            btn.style.transform = "scale(1.08)";
            btn.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
        });
        btn.addEventListener('mouseout', () => {
            btn.style.transform = "scale(1)";
            btn.style.boxShadow = "0 6px 15px rgba(0,0,0,0.25)";
        });
        btn.addEventListener('mousedown', () => {
            btn.style.transform = "scale(0.95)";
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = "scale(1.08)";
        });

        btn.addEventListener('touchstart', () => {
            btn.style.transform = "scale(0.95)";
        });
        btn.addEventListener('touchend', () => {
            btn.style.transform = "scale(1.08)";
        });
    };

    const createBtn = ({ id, text, onClick, bottom }) => {
        const btn = document.createElement('button');
        btn.id = id;
        btn.textContent = text;
        btn.onclick = onClick;
        styleBtn(btn, bottom);
        document.body.appendChild(btn);
    };

    const updateSettingBtn = () => {
        const configBox = document.querySelector("#configBox");
        const settingBtn = document.querySelector('#btnshowns');

        configBox.style.right = "85px";

        if (settingBtn) {
            styleBtn(settingBtn, 10);

            const icon = settingBtn.querySelector('i');
            if (icon) {
                icon.style.color = 'white';
                icon.style.fontSize = '24px';
            }
        }
    };

     const autoReload = () => {
		const actions = [
			"addSuperName('hv','z')",
			"addSuperName('hv','f')",
			"addSuperName('hv','s')",
			"addSuperName('hv','l')",
			"addSuperName('hv','a')",
			"addSuperName('el')",
			"addSuperName('vp')",
			"addSuperName('kn')",
			'saveNS();excute();',
			'excute()',
		];

		actions.forEach(action => {
			const button = document.querySelector(`[onclick="${action}"]`);
			if (button) {
				button.addEventListener('click', () => {
				  fixAndClean();
				});
			}
		});
	};



    const init = () => {
        createBtn({ id: "fixCleanBtn", text: "Clean", onClick: fixAndClean, bottom: 150 });
        createBtn({ id: "copyBtn", text: "Copy", onClick: copyName, bottom: 80 });
        updateSettingBtn();
	    fixAndClean();
	    autoReload();
    };

    window.addEventListener('load', () => {
        setTimeout(init, 1000);
    });


})();
