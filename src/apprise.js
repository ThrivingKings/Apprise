/**
 * @fileoverview An alert alternative for jQuery that looks good. Apprise is a very simple, fast,
 * attractive, and unobtrusive way to communicate with your users. Also, this gives you complete
 * control over style, content, position, and functionality. Apprise is, more or less, for the
 * developer who wants an attractive alert or dialog box without having to download a massive UI
 * framework.
 *
 * @preserve Apprise 1.5.2 - The attractive alert alternative for jQuery.
 * http://thrivingkings.com/apprise
 *
 * @license Creative Commons Attribution-ShareAlike 2.5 Generic (CC BY-SA 2.5)
 *     <http://creativecommons.org/licenses/by-sa/2.5/>
 * @author Daniel Raftery <info@thrivingkings.com>
 */

(function($, window, document, undefined) {
  /**
   * @param {string} text The text of the alert.
   * @param {Object} args The options of the alert:
   *     {
   *       'confirm': {boolean} Show OK and Cancel buttons (default: false).
   *       'verify': {boolean} Show Yes and No buttons (default: false).
   *       'input': {boolean|string} Show a prompt with a text input (default: false, pass string
   *           to set the default text).
   *       'animate': {boolean|number} Groovy animation (default: 400ms).
   *       'textOk': {string} The OK button's text. (default: 'OK').
   *       'textCancel': {string} The Cancel button's text. (default: 'Cancel').
   *       'textYes': {string} The Yes button's text. (default: 'Yes').
   *       'textNo': {string} The No button's text. (default: 'No').
   *       'position': {boolean} Center the alert on the y-axis (default: false, y-axis = 100px).
   *     }
   * @param {function(string|boolean)} callback The function that will be called after the user
   *     dismisses the alert.
   */
  window['apprise'] = function(text, args, callback) {
    var options = $.extend({
      'textOk': 'OK',
      'textCancel': 'Cancel',
      'textYes': 'Yes',
      'textNo': 'No'
    }, args);

    var $document = $(document),
        $window = $(window),
        apprise = $('<div/>').addClass('appriseOuter'),
        overlay = $('<div/>').addClass('appriseOverlay'),
        inner = $('<div/>').addClass('appriseInner');

    overlay.
        css({height: $document.height(), width: $document.width()}).
        appendTo('body').
        fadeIn(100, function() {
          $(this).css('filter','alpha(opacity=70)');
        });

    inner.append(text).appendTo(apprise);

    apprise.appendTo('body');

    if (options['input']) {
      var textInput = $('<input type="text" class="aTextbox"/>').
          appendTo(inner).
          val(typeof (options['input']) == 'string' ? options['input'] : '').
          wrap('<div class="aInput">');

      window.setTimeout(function() {
        textInput.focus().select();
      }, 0);
    }

    var dismiss = function() {
      (callback || $.noop)(
          this.returnValue && options['input'] ? $('.aTextbox').val() : this.returnValue);
      overlay.remove();
      apprise.remove();
    };

    var approve = $.proxy(dismiss, {'returnValue': true}),
        cancel = $.proxy(dismiss, {'returnValue': false});

    var buttons = $('<div class="aButtons"/>').appendTo(inner),
        okButton = $('<button/>').
            val('ok').
            text(options['verify'] ? options['textYes'] : options['textOk']).
            click(approve).
            appendTo(buttons);

    if (options['confirm'] || options['verify'] || options['input']) {
      $('<button/>').
          val('cancel').
          text(options['verify'] ? options['textNo'] : options['textCancel']).
          click(cancel).
          appendTo(buttons);
    }

    $document.keydown(function (e) {
      if (overlay.is(':visible')) {
        if (e.keyCode === 13) {
          approve();
        } else if (e.keyCode === 27) {
          cancel();
        }
      }
    });

    // Set the position of the alert.
    apprise.css('left', ($window.width() - apprise.width()) / 2 + $window.scrollLeft() + 'px');

    // get center
    var posTop = options['position'] ? ($window.height() - apprise.height()) / 2 : 100;

    var aniSpeed = options['animate'];
    if (aniSpeed) {
      apprise.
          css('top', '-' + (apprise.height() + 10) + 'px').
          show().
          animate({ top: posTop }, isNaN(parseInt(aniSpeed, 10)) ? 400 : aniSpeed);
    } else {
      apprise.css('top', posTop).fadeIn(200);
    }
  };
})(jQuery, window, document);

