const html = document.querySelector("html");
const input = document.querySelector("input[type=checkbox");

const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style);

const initialColors = {
    bg: getStyle(html, "--bg"),
    bgPanel: getStyle(html, "--bg-panel"),
    colorHeadings: getStyle(html, "--color-headings"),
    colorText: getStyle(html, "--color-text")
};
const darkMode = {
    bg: "#333333",
    bgPanel: "#434343",
    colorHeadings: "#3664FF",
    colorText: "#B5B5B5"
};

const transform = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const colorsChange = (colors) => {
    Object.keys(colors).map(key => {
        html.style.setProperty(transform(key), colors[key]);
    });
};

input.addEventListener("change", ({target}) => {

    target.checked ? colorsChange(darkMode) : colorsChange(initialColors);

});