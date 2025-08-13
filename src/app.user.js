// ==UserScript==
// @name         Amazon Package Progress (APP)
// @namespace    Unseeable's Things
// @version      1.0.0-b1r0
// @description  Displays a percentage on the package tracking page that represents the progress into the process of delivering your package (i need help wording this).
// @author       Colton Stone
// @license      GPL-3.0-or-later
// @tag          productivity
// @tag          utilities
// @match        *://*.amazon.com/gp/your-account/ship-track*
// @icon         https://www.google.com/s2/favicons?sz=32&domain=https://amazon.com
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_addElement
// @run-at       document-start
// ==/UserScript==

var uwin = unsafeWindow;
var udoc = uwin.document;
(function () {
  GM_addStyle(`
    .percentageContainer {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 2px;
      background-color: rgb(28, 127, 227);
    }
    .percentage {
      color: #fff;
    }
  `);
  uwin.onload = () => {
    const sections = udoc.querySelector("div.pt-status-milestones").childNodes;
    sections.forEach((section) => {
      const bar = section.querySelector("div.pt-status-milestone-bar-progress");
      var percentage = section.getAttribute("data-percent-complete");
      if (bar != null) {
        const div = udoc.createElement("div");
        const span = udoc.createElement("span");
        div.classList.add("percentageContainer");
        span.classList.add("percentage");
        span.textContent = `${percentage}%`;
        if (percentage != "0") {
          div.appendChild(span);
          bar.appendChild(div);
          // const div = GM_addElement(bar, "div", {
          //   class: "percentageContainer"
          // });
          // const span = GM_addElement(div, "span", {
          //   class: "percentage",
          //   textContent: `${percentage}%`
          // });
        }
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            const attribute = mutation.attributeName;
            if (attribute == "data-percent-complete") {
              percentage = `${mutation.target.getAttribute(attribute)}%`;
              try {
                div.removeChild(span);
                bar.removeChild(div);
              } catch (error) {
                console.warn(error);
              }
              span.textContent = percentage;
              div.appendChild(span);
              bar.appendChild(div);
              // span.remove();
              // div.remove();
              // const div = GM_addElement(bar, "div", {
              //   class: "percentageContainer"
              // });
              // const span = GM_addElement(div, "span", {
              //   class: "percentage",
              //   textContent: `${percentage}%`
              // });
            }
          });
        });
        observer.observe(section, {
          attributes: true
        });
      }
    });
  }
})();
