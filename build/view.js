/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

(function ($) {
  "use strict";

  jQuery(document).ready(function ($) {
    $('.wpbean-vertical-menu-block').each(function () {
      const accordion = $(this).find('.wpbean-vertical-menu-accordion');
      const expandIcon = $(this).data('expandicon');
      const currentExpanded = $(this).data("current") ? !0 : !1;
      const accordionMode = $(this).data("accordion") ? !0 : !1;
      const preserveExpanded = $(this).data("preserve") ? !0 : !1;
      accordion.wpbeannavgoco({
        expandIcon: 'menu-expand-icon dashicons dashicons-' + expandIcon,
        accordion: accordionMode,
        openClass: 'wpb-submenu-opened',
        currentExpanded: currentExpanded,
        currentClasses: ['current-menu-item', 'current-menu-parent', 'current-menu-ancestor'],
        save: preserveExpanded,
        cookie: {
          name: 'wpbean-vertical-menu'
        },
        slide: {
          duration: 400,
          easing: 'swing'
        }
      });
    });
  });
})(jQuery);
/******/ })()
;
//# sourceMappingURL=view.js.map