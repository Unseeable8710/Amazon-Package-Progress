// ==UserScript==
// @name         Amazon Package Progress (APP)
// @namespace    Unseeable's Things
// @version      1.0.0
// @description  Displays a percentage on the package tracking page that represents the progress into the process of delivering your package (i need help wording this).
// @author       Colton Stone
// @license      GPL-3.0-or-later
// @tag          productivity
// @tag          utilities
// @match        https://www.amazon.com/gp/your-account/ship-track
// @icon         https://www.google.com/s2/favicons?sz=32&domain=https://amazon.com
// @grant        unsafeWindow
// ==/UserScript==

(function() {
  const progressBars = document.querySelector("div.pt-status-milestones").childNodes;
  const bar1 = progressBars[0];
  const bar2 = progressBars[1];
  const bar3 = progressBars[2];
  const bar4 = progressBars[3];
  bar1.classList.add("");
})();
