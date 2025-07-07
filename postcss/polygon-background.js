/** type {import('postcss').Plugin} */
module.exports = (options = {}) => {
  return {
    postcssPlugin: "polygon-background",
    Rule(rule) {
      if (rule.selector.includes("bg-")) {
        const originalSelector = rule.selector;

        if (
          !rule.selector.includes("polygon-component") &&
          !rule.selector.includes("polygon-background")
        ) {
          const polygonComponentSelector = `${originalSelector}.polygon-component > div[id^="polygon-background"]`;
          const polygonComponentRule = rule.clone({
            selector: polygonComponentSelector,
          });

          const notPolygonComponentSelector = `${originalSelector}:not(.polygon-component)`;
          const notPolygonComponentRule = rule.clone({
            selector: notPolygonComponentSelector,
          });

          rule.after(polygonComponentRule);
          rule.after(notPolygonComponentRule);

          rule.remove();
        }
      }
    },
  };
};

module.exports.postcss = true;
