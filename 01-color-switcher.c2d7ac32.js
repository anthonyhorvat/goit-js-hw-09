!function(){document.getElementsByTagName("body");var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(function(){t.disabled=!0,timerId=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(timerId)}))}();
//# sourceMappingURL=01-color-switcher.c2d7ac32.js.map