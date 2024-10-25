module.exports = {
  locales: ["fr", "en"],
  defaultLocale: "fr",
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
  keySeparator: ":",
  pages: {
    "*": ["common"],
    "/tabs": ["tabs"],
    "/notes": ["notes"],
  },
};
