// Language: ?lang= → saved choice → browser language → Korean.
(function () {
  var langs = ["ko", "en"], titles = window.PAGE_TITLES;
  function saved() { try { return localStorage.getItem("lang"); } catch (e) { return null; } }
  function set(lang, persist) {
    if (langs.indexOf(lang) < 0) lang = "ko";
    document.body.setAttribute("data-lang", lang);
    document.documentElement.lang = lang;
    document.title = titles[lang];
    document.querySelectorAll("[data-set-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.setLang === lang)); });
    document.querySelectorAll("a[data-keep-lang]").forEach(function (a) { a.href = a.getAttribute("href").split("?")[0] + "?lang=" + lang; });
    if (persist) {
      try { localStorage.setItem("lang", lang); } catch (e) {}
      history.replaceState(null, "", "?lang=" + lang);
    }
  }
  var browser = (navigator.language || "").slice(0, 2);
  set(new URLSearchParams(location.search).get("lang") || saved() || (langs.indexOf(browser) >= 0 ? browser : "ko"), false);
  document.querySelectorAll("[data-set-lang]").forEach(function (b) { b.addEventListener("click", function () { set(b.dataset.setLang, true); }); });
})();
