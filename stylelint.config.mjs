/** @type {import("stylelint").Config} */

export default {
    extends: ["stylelint-config-standard"],

    rules: {
        "selector-max-universal": 1,

        "comment-no-empty": true,

        "no-empty-source": true,

        "font-family-no-duplicate-names": true,

        "color-no-invalid-hex": true,

        "shorthand-property-no-redundant-values": true,
    },
};
