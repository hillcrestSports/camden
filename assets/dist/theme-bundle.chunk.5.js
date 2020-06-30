(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./assets/js/theme/common/form-utils.js":
/*!**********************************************!*\
  !*** ./assets/js/theme/common/form-utils.js ***!
  \**********************************************/
/*! exports provided: classifyForm, Validators, insertStateHiddenField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classifyForm", function() { return classifyForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertStateHiddenField", function() { return insertStateHiddenField; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ "./node_modules/core-js/modules/es6.object.keys.js");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.regexp.constructor */ "./node_modules/core-js/modules/es6.regexp.constructor.js");
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es6.regexp.match */ "./node_modules/core-js/modules/es6.regexp.match.js");
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/capitalize */ "./node_modules/lodash/capitalize.js");
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_capitalize__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash/camelCase */ "./node_modules/lodash/camelCase.js");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _models_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./models/forms */ "./assets/js/theme/common/models/forms.js");












var inputTagNames = ['input', 'select', 'textarea'];
/**
 * Apply class name to an input element on its type
 * @param {object} input
 * @param {string} formFieldClass
 * @return {object} Element itself
 */

function classifyInput(input, formFieldClass) {
  var $input = $(input);
  var $formField = $input.parent("." + formFieldClass);
  var tagName = $input.prop('tagName').toLowerCase();
  var className = formFieldClass + "--" + tagName;
  var specificClassName; // Input can be text/checkbox/radio etc...

  if (tagName === 'input') {
    var inputType = $input.prop('type');

    if (lodash_includes__WEBPACK_IMPORTED_MODULE_9___default()(['radio', 'checkbox', 'submit'], inputType)) {
      // ie: .form-field--checkbox, .form-field--radio
      className = formFieldClass + "--" + lodash_camelCase__WEBPACK_IMPORTED_MODULE_8___default()(inputType);
    } else {
      // ie: .form-field--input .form-field--inputText
      specificClassName = "" + className + lodash_capitalize__WEBPACK_IMPORTED_MODULE_7___default()(inputType);
    }
  } // Apply class modifier


  return $formField.addClass(className).addClass(specificClassName);
}
/**
 * Apply class name to each input element in a form based on its type
 * @example
 * // Before
 * <form id="form">
 *     <div class="form-field">
 *         <input type="text">
 *     </div>
 *     <div class="form-field">
 *         <select>...</select>
 *     </div>
 * </form>
 *
 * classifyForm('#form', { formFieldClass: 'form-field' });
 *
 * // After
 * <div class="form-field form-field--input form-field--inputText">...</div>
 * <div class="form-field form-field--select">...</div>
 *
 * @param {string|object} formSelector - selector or element
 * @param {object} options
 * @return {jQuery} Element itself
 */


function classifyForm(formSelector, options) {
  if (options === void 0) {
    options = {};
  }

  var $form = $(formSelector);
  var $inputs = $form.find(inputTagNames.join(', ')); // Obtain options

  var _options = options,
      _options$formFieldCla = _options.formFieldClass,
      formFieldClass = _options$formFieldCla === void 0 ? 'form-field' : _options$formFieldCla; // Classify each input in a form

  $inputs.each(function (__, input) {
    classifyInput(input, formFieldClass);
  });
  return $form;
}
/**
 * Get id from given field
 * @param {object} $field JQuery field object
 * @return {string}
 */

function getFieldId($field) {
  var fieldId = $field.prop('name').match(/(\[.*\])/);

  if (fieldId && fieldId.length !== 0) {
    return fieldId[0];
  }

  return '';
}
/**
 * Insert hidden field after State/Province field
 * @param {object} $stateField JQuery field object
 */


function insertStateHiddenField($stateField) {
  var fieldId = getFieldId($stateField);
  var stateFieldAttrs = {
    type: 'hidden',
    name: "FormFieldIsText" + fieldId,
    value: '1'
  };
  $stateField.after($('<input />', stateFieldAttrs));
}

var Validators = {
  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   */
  setEmailValidation: function setEmailValidation(validator, field) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = _models_forms__WEBPACK_IMPORTED_MODULE_11__["default"].email(val);
          cb(result);
        },
        errorMessage: 'You must enter a valid email.'
      });
    }
  },

  /**
   * Validate password fields
   * @param validator
   * @param passwordSelector
   * @param password2Selector
   * @param requirements
   * @param isOptional
   */
  setPasswordValidation: function setPasswordValidation(validator, passwordSelector, password2Selector, requirements, isOptional) {
    var $password = $(passwordSelector);
    var passwordValidations = [{
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.length;

        if (isOptional) {
          return cb(true);
        }

        cb(result);
      },
      errorMessage: 'You must enter a password.'
    }, {
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.match(new RegExp(requirements.alpha)) && val.match(new RegExp(requirements.numeric)) && val.length >= requirements.minlength; // If optional and nothing entered, it is valid

        if (isOptional && val.length === 0) {
          return cb(true);
        }

        cb(result);
      },
      errorMessage: requirements.error
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val.length;

        if (isOptional) {
          return cb(true);
        }

        cb(result);
      },
      errorMessage: 'You must enter a password.'
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val === $password.val();
        cb(result);
      },
      errorMessage: 'Your passwords do not match.'
    }];
    validator.add(passwordValidations);
  },

  /**
   * Validate password fields
   * @param {Nod} validator
   * @param {Object} selectors
   * @param {string} selectors.errorSelector
   * @param {string} selectors.fieldsetSelector
   * @param {string} selectors.formSelector
   * @param {string} selectors.maxPriceSelector
   * @param {string} selectors.minPriceSelector
   */
  setMinMaxPriceValidation: function setMinMaxPriceValidation(validator, selectors) {
    var errorSelector = selectors.errorSelector,
        fieldsetSelector = selectors.fieldsetSelector,
        formSelector = selectors.formSelector,
        maxPriceSelector = selectors.maxPriceSelector,
        minPriceSelector = selectors.minPriceSelector;
    validator.configure({
      form: formSelector,
      preventSubmit: true,
      successClass: '_' // KLUDGE: Don't apply success class

    });
    validator.add({
      errorMessage: 'Min price must be less than max. price.',
      selector: minPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: 'Min price must be less than max. price.',
      selector: maxPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: 'Max. price is required.',
      selector: maxPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: 'Min. price is required.',
      selector: minPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: 'Input must be greater than 0.',
      selector: [minPriceSelector, maxPriceSelector],
      validate: 'min-number:0'
    });
    validator.setMessageOptions({
      selector: [minPriceSelector, maxPriceSelector],
      parent: fieldsetSelector,
      errorSpan: errorSelector
    });
  },

  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   */
  setStateCountryValidation: function setStateCountryValidation(validator, field) {
    if (field) {
      validator.add({
        selector: field,
        validate: 'presence',
        errorMessage: 'The \'State/Province\' field cannot be blank.'
      });
    }
  },

  /**
   * Removes classes from dirty form if previously checked
   * @param field
   */
  cleanUpStateValidation: function cleanUpStateValidation(field) {
    var $fieldClassElement = $("[data-type=\"" + field.data('fieldType') + "\"]");
    Object.keys(_nod__WEBPACK_IMPORTED_MODULE_10__["default"].classes).forEach(function (value) {
      if ($fieldClassElement.hasClass(_nod__WEBPACK_IMPORTED_MODULE_10__["default"].classes[value])) {
        $fieldClassElement.removeClass(_nod__WEBPACK_IMPORTED_MODULE_10__["default"].classes[value]);
      }
    });
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/models/forms.js":
/*!************************************************!*\
  !*** ./assets/js/theme/common/models/forms.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var forms = {
  email: function email(value) {
    var re = /^.+@.+\..+/;
    return re.test(value);
  },

  /**
   * Validates a password field
   * @param value
   * @returns {boolean}
   */
  password: function password(value) {
    return this.notEmpty(value);
  },

  /**
   * validates if a field is empty
   * @param value
   * @returns {boolean}
   *
   */
  notEmpty: function notEmpty(value) {
    return value.length > 0;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./assets/js/theme/f/selected-option.js":
/*!**********************************************!*\
  !*** ./assets/js/theme/f/selected-option.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["default"] = (function () {
  var $src = $('.show-selected-option input');
  var $selected = $('.show-selected-option input[checked]');
  var $selectedOptionLabel;
  var $selectedOption;

  function changeLabel() {
    $selectedOptionLabel = $(this).siblings().children('span[data-option-value]');
    $selectedOption = $(this).attr('data-option-label');
    $selectedOptionLabel.text($selectedOption);
  }

  $selected.each(changeLabel);
  $src.on('click', changeLabel);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/form-utils */ "./assets/js/theme/common/form-utils.js");
/* harmony import */ var _f_selected_option__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./f/selected-option */ "./assets/js/theme/f/selected-option.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 Import all product specific js
 */








var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);

  function Product(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    return _this;
  }

  var _proto = Product.prototype;

  _proto.onReady = function onReady() {
    var _this2 = this;

    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator; // Init collapsible

    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    var $reviewForm = Object(_common_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.writeReview-form');
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]($reviewForm);
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }

      return false;
    });

    if (this.context.enableSelectedOptionLabel) {
      Object(_f_selected_option__WEBPACK_IMPORTED_MODULE_6__["default"])();
    }

    var Sticky = __webpack_require__(/*! sticky-js */ "./node_modules/sticky-js/index.js");

    var sticky = new Sticky('.sticky-product'); // eslint-disable-line no-unused-vars

    this.productReviewHandler();
  };

  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };

  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/reviews.js":
/*!********************************************!*\
  !*** ./assets/js/theme/product/reviews.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");





var _default = /*#__PURE__*/function () {
  function _default($reviewForm) {
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $reviewForm.find('input[type="submit"]')
    });
    this.$reviewsContent = $('#product-reviews');
    this.$collapsible = $('[data-collapsible]', this.$reviewsContent);
    this.initLinkBind();
    this.injectPaginationLink();
    this.collapseReviews();
  }
  /**
   * On initial page load, the user clicks on "(12 Reviews)" link
   * The browser jumps to the review page and should expand the reviews section
   */


  var _proto = _default.prototype;

  _proto.initLinkBind = function initLinkBind() {
    var _this = this;

    var $content = $('#productReviews-content', this.$reviewsContent);
    $('.productView-reviewLink').on('click', function () {
      if (!$content.hasClass('is-open')) {
        _this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["CollapsibleEvents"].click);
      }
    });
  };

  _proto.collapseReviews = function collapseReviews() {
    // We're in paginating state, do not collapse
    if (window.location.hash && window.location.hash.indexOf('#product-reviews') === 0) {
      return;
    } // force collapse on page load


    this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["CollapsibleEvents"].click);
  }
  /**
   * Inject ID into the pagination link
   */
  ;

  _proto.injectPaginationLink = function injectPaginationLink() {
    var $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
    var $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);

    if ($nextLink.length) {
      $nextLink.attr('href', $nextLink.attr('href') + " #product-reviews");
    }

    if ($prevLink.length) {
      $prevLink.attr('href', $prevLink.attr('href') + " #product-reviews");
    }
  };

  _proto.registerValidation = function registerValidation(context) {
    this.context = context;
    this.validator.add([{
      selector: '[name="revrating"]',
      validate: 'presence',
      errorMessage: this.context.reviewRating
    }, {
      selector: '[name="revtitle"]',
      validate: 'presence',
      errorMessage: this.context.reviewSubject
    }, {
      selector: '[name="revtext"]',
      validate: 'presence',
      errorMessage: this.context.reviewComment
    }, {
      selector: '[name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.reviewEmail
    }]);
    return this.validator;
  };

  _proto.validate = function validate() {
    return this.validator.performCheck();
  };

  return _default;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__);

var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }

  var _proto = VideoGallery.prototype;

  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };

  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };

  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };

  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };

  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;

    if (isInitialized) {
      return;
    }

    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2Zvcm0tdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9tb2RlbHMvZm9ybXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2Yvc2VsZWN0ZWQtb3B0aW9uLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3Jldmlld3MuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeS5qcyJdLCJuYW1lcyI6WyJpbnB1dFRhZ05hbWVzIiwiY2xhc3NpZnlJbnB1dCIsImlucHV0IiwiZm9ybUZpZWxkQ2xhc3MiLCIkaW5wdXQiLCIkIiwiJGZvcm1GaWVsZCIsInBhcmVudCIsInRhZ05hbWUiLCJwcm9wIiwidG9Mb3dlckNhc2UiLCJjbGFzc05hbWUiLCJzcGVjaWZpY0NsYXNzTmFtZSIsImlucHV0VHlwZSIsImFkZENsYXNzIiwiY2xhc3NpZnlGb3JtIiwiZm9ybVNlbGVjdG9yIiwib3B0aW9ucyIsIiRmb3JtIiwiJGlucHV0cyIsImZpbmQiLCJqb2luIiwiZWFjaCIsIl9fIiwiZ2V0RmllbGRJZCIsIiRmaWVsZCIsImZpZWxkSWQiLCJtYXRjaCIsImxlbmd0aCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCIkc3RhdGVGaWVsZCIsInN0YXRlRmllbGRBdHRycyIsInR5cGUiLCJuYW1lIiwidmFsdWUiLCJhZnRlciIsIlZhbGlkYXRvcnMiLCJzZXRFbWFpbFZhbGlkYXRpb24iLCJ2YWxpZGF0b3IiLCJmaWVsZCIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsInZhbCIsInJlc3VsdCIsImZvcm1zIiwiZW1haWwiLCJlcnJvck1lc3NhZ2UiLCJzZXRQYXNzd29yZFZhbGlkYXRpb24iLCJwYXNzd29yZFNlbGVjdG9yIiwicGFzc3dvcmQyU2VsZWN0b3IiLCJyZXF1aXJlbWVudHMiLCJpc09wdGlvbmFsIiwiJHBhc3N3b3JkIiwicGFzc3dvcmRWYWxpZGF0aW9ucyIsIlJlZ0V4cCIsImFscGhhIiwibnVtZXJpYyIsIm1pbmxlbmd0aCIsImVycm9yIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwic2VsZWN0b3JzIiwiZXJyb3JTZWxlY3RvciIsImZpZWxkc2V0U2VsZWN0b3IiLCJtYXhQcmljZVNlbGVjdG9yIiwibWluUHJpY2VTZWxlY3RvciIsImNvbmZpZ3VyZSIsImZvcm0iLCJwcmV2ZW50U3VibWl0Iiwic3VjY2Vzc0NsYXNzIiwic2V0TWVzc2FnZU9wdGlvbnMiLCJlcnJvclNwYW4iLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsIiRmaWVsZENsYXNzRWxlbWVudCIsImRhdGEiLCJPYmplY3QiLCJrZXlzIiwibm9kIiwiY2xhc3NlcyIsImZvckVhY2giLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwicmUiLCJ0ZXN0IiwicGFzc3dvcmQiLCJub3RFbXB0eSIsIiRzcmMiLCIkc2VsZWN0ZWQiLCIkc2VsZWN0ZWRPcHRpb25MYWJlbCIsIiRzZWxlY3RlZE9wdGlvbiIsImNoYW5nZUxhYmVsIiwic2libGluZ3MiLCJjaGlsZHJlbiIsImF0dHIiLCJ0ZXh0Iiwib24iLCJQcm9kdWN0IiwiY29udGV4dCIsInVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIiRyZXZpZXdMaW5rIiwib25SZWFkeSIsImRvY3VtZW50IiwiaW5kZXhPZiIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInBhdGhuYW1lIiwiY29sbGFwc2libGVGYWN0b3J5IiwicHJvZHVjdERldGFpbHMiLCJQcm9kdWN0RGV0YWlscyIsIkJDRGF0YSIsInByb2R1Y3RfYXR0cmlidXRlcyIsInNldFByb2R1Y3RWYXJpYW50IiwidmlkZW9HYWxsZXJ5IiwiJHJldmlld0Zvcm0iLCJyZXZpZXciLCJSZXZpZXciLCJyZWdpc3RlclZhbGlkYXRpb24iLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJlbmFibGVTZWxlY3RlZE9wdGlvbkxhYmVsIiwic2VsZWN0ZWRPcHRpb24iLCJTdGlja3kiLCJyZXF1aXJlIiwic3RpY2t5IiwicHJvZHVjdFJldmlld0hhbmRsZXIiLCJ0cmlnZ2VyIiwiUGFnZU1hbmFnZXIiLCJzdWJtaXQiLCIkcmV2aWV3c0NvbnRlbnQiLCIkY29sbGFwc2libGUiLCJpbml0TGlua0JpbmQiLCJpbmplY3RQYWdpbmF0aW9uTGluayIsImNvbGxhcHNlUmV2aWV3cyIsIiRjb250ZW50IiwiQ29sbGFwc2libGVFdmVudHMiLCJjbGljayIsImhhc2giLCIkbmV4dExpbmsiLCIkcHJldkxpbmsiLCJyZXZpZXdSYXRpbmciLCJyZXZpZXdTdWJqZWN0IiwicmV2aWV3Q29tbWVudCIsInJldmlld0VtYWlsIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCIkc2VsZWN0ZWRUaHVtYiIsInNldE1haW5WaWRlbyIsInNldEFjdGl2ZVRodW1iIiwiYmluZCIsInBsdWdpbktleSIsIiR2aWRlb0dhbGxlcnkiLCJpbmRleCIsImVsZW1lbnQiLCIkZWwiLCJpc0luaXRpYWxpemVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUVBLElBQU1BLGFBQWEsR0FBRyxDQUNsQixPQURrQixFQUVsQixRQUZrQixFQUdsQixVQUhrQixDQUF0QjtBQU1BOzs7Ozs7O0FBTUEsU0FBU0MsYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLGNBQTlCLEVBQThDO0FBQzFDLE1BQU1DLE1BQU0sR0FB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QixLQUFsQiwrQkFBb0QsS0FBSzBELFlBQUwsQ0FBa0JPLEVBQXRFO0FBQ0gsR0F4Qkw7O0FBQUEsU0EwQklHLGNBMUJKLEdBMEJJLDBCQUFpQjtBQUNiLFNBQUtYLE9BQUwsQ0FBYXJFLFdBQWIsQ0FBeUIsV0FBekI7QUFDQSxTQUFLc0UsWUFBTCxDQUFrQlEsY0FBbEIsQ0FBaUNuSixRQUFqQyxDQUEwQyxXQUExQztBQUNILEdBN0JMOztBQUFBLFNBK0JJNEksVUEvQkosR0ErQkksc0JBQWE7QUFDVCxTQUFLRixPQUFMLENBQWF2RCxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLEtBQUswRCxjQUFMLENBQW9CUyxJQUFwQixDQUF5QixJQUF6QixDQUF6QjtBQUNILEdBakNMOztBQUFBO0FBQUE7QUFvQ2UsU0FBUzlDLFlBQVQsR0FBd0I7QUFDbkMsTUFBTStDLFNBQVMsR0FBRyxlQUFsQjtBQUNBLE1BQU1DLGFBQWEsR0FBR2pLLENBQUMsWUFBVWdLLFNBQVYsT0FBdkI7QUFFQUMsZUFBYSxDQUFDaEosSUFBZCxDQUFtQixVQUFDaUosS0FBRCxFQUFRQyxPQUFSLEVBQW9CO0FBQ25DLFFBQU1DLEdBQUcsR0FBR3BLLENBQUMsQ0FBQ21LLE9BQUQsQ0FBYjtBQUNBLFFBQU1FLGFBQWEsR0FBR0QsR0FBRyxDQUFDN0YsSUFBSixDQUFTeUYsU0FBVCxhQUErQmhCLFlBQXJEOztBQUVBLFFBQUlxQixhQUFKLEVBQW1CO0FBQ2Y7QUFDSDs7QUFFREQsT0FBRyxDQUFDN0YsSUFBSixDQUFTeUYsU0FBVCxFQUFvQixJQUFJaEIsWUFBSixDQUFpQm9CLEdBQWpCLENBQXBCO0FBQ0gsR0FURDtBQVVILEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG5vZCBmcm9tICcuL25vZCc7XG5pbXBvcnQgZm9ybXMgZnJvbSAnLi9tb2RlbHMvZm9ybXMnO1xuXG5jb25zdCBpbnB1dFRhZ05hbWVzID0gW1xuICAgICdpbnB1dCcsXG4gICAgJ3NlbGVjdCcsXG4gICAgJ3RleHRhcmVhJyxcbl07XG5cbi8qKlxuICogQXBwbHkgY2xhc3MgbmFtZSB0byBhbiBpbnB1dCBlbGVtZW50IG9uIGl0cyB0eXBlXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRmllbGRDbGFzc1xuICogQHJldHVybiB7b2JqZWN0fSBFbGVtZW50IGl0c2VsZlxuICovXG5mdW5jdGlvbiBjbGFzc2lmeUlucHV0KGlucHV0LCBmb3JtRmllbGRDbGFzcykge1xuICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgIGNvbnN0ICRmb3JtRmllbGQgPSAkaW5wdXQucGFyZW50KGAuJHtmb3JtRmllbGRDbGFzc31gKTtcbiAgICBjb25zdCB0YWdOYW1lID0gJGlucHV0LnByb3AoJ3RhZ05hbWUnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgbGV0IGNsYXNzTmFtZSA9IGAke2Zvcm1GaWVsZENsYXNzfS0tJHt0YWdOYW1lfWA7XG4gICAgbGV0IHNwZWNpZmljQ2xhc3NOYW1lO1xuXG4gICAgLy8gSW5wdXQgY2FuIGJlIHRleHQvY2hlY2tib3gvcmFkaW8gZXRjLi4uXG4gICAgaWYgKHRhZ05hbWUgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgY29uc3QgaW5wdXRUeXBlID0gJGlucHV0LnByb3AoJ3R5cGUnKTtcblxuICAgICAgICBpZiAoXy5pbmNsdWRlcyhbJ3JhZGlvJywgJ2NoZWNrYm94JywgJ3N1Ym1pdCddLCBpbnB1dFR5cGUpKSB7XG4gICAgICAgICAgICAvLyBpZTogLmZvcm0tZmllbGQtLWNoZWNrYm94LCAuZm9ybS1maWVsZC0tcmFkaW9cbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IGAke2Zvcm1GaWVsZENsYXNzfS0tJHtfLmNhbWVsQ2FzZShpbnB1dFR5cGUpfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZTogLmZvcm0tZmllbGQtLWlucHV0IC5mb3JtLWZpZWxkLS1pbnB1dFRleHRcbiAgICAgICAgICAgIHNwZWNpZmljQ2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSR7Xy5jYXBpdGFsaXplKGlucHV0VHlwZSl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFwcGx5IGNsYXNzIG1vZGlmaWVyXG4gICAgcmV0dXJuICRmb3JtRmllbGRcbiAgICAgICAgLmFkZENsYXNzKGNsYXNzTmFtZSlcbiAgICAgICAgLmFkZENsYXNzKHNwZWNpZmljQ2xhc3NOYW1lKTtcbn1cblxuLyoqXG4gKiBBcHBseSBjbGFzcyBuYW1lIHRvIGVhY2ggaW5wdXQgZWxlbWVudCBpbiBhIGZvcm0gYmFzZWQgb24gaXRzIHR5cGVcbiAqIEBleGFtcGxlXG4gKiAvLyBCZWZvcmVcbiAqIDxmb3JtIGlkPVwiZm9ybVwiPlxuICogICAgIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkXCI+XG4gKiAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiPlxuICogICAgIDwvZGl2PlxuICogICAgIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkXCI+XG4gKiAgICAgICAgIDxzZWxlY3Q+Li4uPC9zZWxlY3Q+XG4gKiAgICAgPC9kaXY+XG4gKiA8L2Zvcm0+XG4gKlxuICogY2xhc3NpZnlGb3JtKCcjZm9ybScsIHsgZm9ybUZpZWxkQ2xhc3M6ICdmb3JtLWZpZWxkJyB9KTtcbiAqXG4gKiAvLyBBZnRlclxuICogPGRpdiBjbGFzcz1cImZvcm0tZmllbGQgZm9ybS1maWVsZC0taW5wdXQgZm9ybS1maWVsZC0taW5wdXRUZXh0XCI+Li4uPC9kaXY+XG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1zZWxlY3RcIj4uLi48L2Rpdj5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGZvcm1TZWxlY3RvciAtIHNlbGVjdG9yIG9yIGVsZW1lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtqUXVlcnl9IEVsZW1lbnQgaXRzZWxmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc2lmeUZvcm0oZm9ybVNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCAkZm9ybSA9ICQoZm9ybVNlbGVjdG9yKTtcbiAgICBjb25zdCAkaW5wdXRzID0gJGZvcm0uZmluZChpbnB1dFRhZ05hbWVzLmpvaW4oJywgJykpO1xuXG4gICAgLy8gT2J0YWluIG9wdGlvbnNcbiAgICBjb25zdCB7IGZvcm1GaWVsZENsYXNzID0gJ2Zvcm0tZmllbGQnIH0gPSBvcHRpb25zO1xuXG4gICAgLy8gQ2xhc3NpZnkgZWFjaCBpbnB1dCBpbiBhIGZvcm1cbiAgICAkaW5wdXRzLmVhY2goKF9fLCBpbnB1dCkgPT4ge1xuICAgICAgICBjbGFzc2lmeUlucHV0KGlucHV0LCBmb3JtRmllbGRDbGFzcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gJGZvcm07XG59XG5cbi8qKlxuICogR2V0IGlkIGZyb20gZ2l2ZW4gZmllbGRcbiAqIEBwYXJhbSB7b2JqZWN0fSAkZmllbGQgSlF1ZXJ5IGZpZWxkIG9iamVjdFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRGaWVsZElkKCRmaWVsZCkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSAkZmllbGQucHJvcCgnbmFtZScpLm1hdGNoKC8oXFxbLipcXF0pLyk7XG5cbiAgICBpZiAoZmllbGRJZCAmJiBmaWVsZElkLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gZmllbGRJZFswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogSW5zZXJ0IGhpZGRlbiBmaWVsZCBhZnRlciBTdGF0ZS9Qcm92aW5jZSBmaWVsZFxuICogQHBhcmFtIHtvYmplY3R9ICRzdGF0ZUZpZWxkIEpRdWVyeSBmaWVsZCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCgkc3RhdGVGaWVsZCkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSBnZXRGaWVsZElkKCRzdGF0ZUZpZWxkKTtcbiAgICBjb25zdCBzdGF0ZUZpZWxkQXR0cnMgPSB7XG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgICAgICBuYW1lOiBgRm9ybUZpZWxkSXNUZXh0JHtmaWVsZElkfWAsXG4gICAgICAgIHZhbHVlOiAnMScsXG4gICAgfTtcblxuICAgICRzdGF0ZUZpZWxkLmFmdGVyKCQoJzxpbnB1dCAvPicsIHN0YXRlRmllbGRBdHRycykpO1xufVxuXG5jb25zdCBWYWxpZGF0b3JzID0ge1xuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBuZXcgdmFsaWRhdGlvbiB3aGVuIHRoZSBmb3JtIGlzIGRpcnR5XG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIHNldEVtYWlsVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1lvdSBtdXN0IGVudGVyIGEgdmFsaWQgZW1haWwuJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHBhc3N3b3JkIGZpZWxkc1xuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmRTZWxlY3RvclxuICAgICAqIEBwYXJhbSBwYXNzd29yZDJTZWxlY3RvclxuICAgICAqIEBwYXJhbSByZXF1aXJlbWVudHNcbiAgICAgKiBAcGFyYW0gaXNPcHRpb25hbFxuICAgICAqL1xuICAgIHNldFBhc3N3b3JkVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgcGFzc3dvcmRTZWxlY3RvciwgcGFzc3dvcmQyU2VsZWN0b3IsIHJlcXVpcmVtZW50cywgaXNPcHRpb25hbCkgPT4ge1xuICAgICAgICBjb25zdCAkcGFzc3dvcmQgPSAkKHBhc3N3b3JkU2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBwYXNzd29yZFZhbGlkYXRpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnWW91IG11c3QgZW50ZXIgYSBwYXNzd29yZC4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmRTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLm1hdGNoKG5ldyBSZWdFeHAocmVxdWlyZW1lbnRzLmFscGhhKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbC5tYXRjaChuZXcgUmVnRXhwKHJlcXVpcmVtZW50cy5udW1lcmljKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbC5sZW5ndGggPj0gcmVxdWlyZW1lbnRzLm1pbmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBvcHRpb25hbCBhbmQgbm90aGluZyBlbnRlcmVkLCBpdCBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPcHRpb25hbCAmJiB2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiByZXF1aXJlbWVudHMuZXJyb3IsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZDJTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1lvdSBtdXN0IGVudGVyIGEgcGFzc3dvcmQuJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwgPT09ICRwYXNzd29yZC52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnWW91ciBwYXNzd29yZHMgZG8gbm90IG1hdGNoLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQocGFzc3dvcmRWYWxpZGF0aW9ucyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHBhc3N3b3JkIGZpZWxkc1xuICAgICAqIEBwYXJhbSB7Tm9kfSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0b3JzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5lcnJvclNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5maWVsZHNldFNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5mb3JtU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLm1heFByaWNlU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLm1pblByaWNlU2VsZWN0b3JcbiAgICAgKi9cbiAgICBzZXRNaW5NYXhQcmljZVZhbGlkYXRpb246ICh2YWxpZGF0b3IsIHNlbGVjdG9ycykgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBlcnJvclNlbGVjdG9yLFxuICAgICAgICAgICAgZmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGZvcm1TZWxlY3RvcixcbiAgICAgICAgICAgIG1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICBtaW5QcmljZVNlbGVjdG9yLFxuICAgICAgICB9ID0gc2VsZWN0b3JzO1xuXG4gICAgICAgIHZhbGlkYXRvci5jb25maWd1cmUoe1xuICAgICAgICAgICAgZm9ybTogZm9ybVNlbGVjdG9yLFxuICAgICAgICAgICAgcHJldmVudFN1Ym1pdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3NDbGFzczogJ18nLCAvLyBLTFVER0U6IERvbid0IGFwcGx5IHN1Y2Nlc3MgY2xhc3NcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdNaW4gcHJpY2UgbXVzdCBiZSBsZXNzIHRoYW4gbWF4LiBwcmljZS4nLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogYG1pbi1tYXg6JHttaW5QcmljZVNlbGVjdG9yfToke21heFByaWNlU2VsZWN0b3J9YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdNaW4gcHJpY2UgbXVzdCBiZSBsZXNzIHRoYW4gbWF4LiBwcmljZS4nLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogYG1pbi1tYXg6JHttaW5QcmljZVNlbGVjdG9yfToke21heFByaWNlU2VsZWN0b3J9YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdNYXguIHByaWNlIGlzIHJlcXVpcmVkLicsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ01pbi4gcHJpY2UgaXMgcmVxdWlyZWQuJyxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtaW5QcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnSW5wdXQgbXVzdCBiZSBncmVhdGVyIHRoYW4gMC4nLFxuICAgICAgICAgICAgc2VsZWN0b3I6IFttaW5QcmljZVNlbGVjdG9yLCBtYXhQcmljZVNlbGVjdG9yXSxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAnbWluLW51bWJlcjowJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLnNldE1lc3NhZ2VPcHRpb25zKHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiBbbWluUHJpY2VTZWxlY3RvciwgbWF4UHJpY2VTZWxlY3Rvcl0sXG4gICAgICAgICAgICBwYXJlbnQ6IGZpZWxkc2V0U2VsZWN0b3IsXG4gICAgICAgICAgICBlcnJvclNwYW46IGVycm9yU2VsZWN0b3IsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgbmV3IHZhbGlkYXRpb24gd2hlbiB0aGUgZm9ybSBpcyBkaXJ0eVxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdUaGUgXFwnU3RhdGUvUHJvdmluY2VcXCcgZmllbGQgY2Fubm90IGJlIGJsYW5rLicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGNsYXNzZXMgZnJvbSBkaXJ0eSBmb3JtIGlmIHByZXZpb3VzbHkgY2hlY2tlZFxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIGNsZWFuVXBTdGF0ZVZhbGlkYXRpb246IChmaWVsZCkgPT4ge1xuICAgICAgICBjb25zdCAkZmllbGRDbGFzc0VsZW1lbnQgPSAkKChgW2RhdGEtdHlwZT1cIiR7ZmllbGQuZGF0YSgnZmllbGRUeXBlJyl9XCJdYCkpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKG5vZC5jbGFzc2VzKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCRmaWVsZENsYXNzRWxlbWVudC5oYXNDbGFzcyhub2QuY2xhc3Nlc1t2YWx1ZV0pKSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkQ2xhc3NFbGVtZW50LnJlbW92ZUNsYXNzKG5vZC5jbGFzc2VzW3ZhbHVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuXG5leHBvcnQgeyBWYWxpZGF0b3JzLCBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH07XG4iLCJjb25zdCBmb3JtcyA9IHtcbiAgICBlbWFpbCh2YWx1ZSkge1xuICAgICAgICBjb25zdCByZSA9IC9eLitALitcXC4uKy87XG4gICAgICAgIHJldHVybiByZS50ZXN0KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgcGFzc3dvcmQgZmllbGRcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwYXNzd29yZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3RFbXB0eSh2YWx1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHZhbGlkYXRlcyBpZiBhIGZpZWxkIGlzIGVtcHR5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICpcbiAgICAgKi9cbiAgICBub3RFbXB0eSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9ybXM7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgJHNyYyA9ICQoJy5zaG93LXNlbGVjdGVkLW9wdGlvbiBpbnB1dCcpO1xuICAgIGNvbnN0ICRzZWxlY3RlZCA9ICQoJy5zaG93LXNlbGVjdGVkLW9wdGlvbiBpbnB1dFtjaGVja2VkXScpO1xuICAgIGxldCAkc2VsZWN0ZWRPcHRpb25MYWJlbDtcbiAgICBsZXQgJHNlbGVjdGVkT3B0aW9uO1xuXG4gICAgZnVuY3Rpb24gY2hhbmdlTGFiZWwoKSB7XG4gICAgICAgICRzZWxlY3RlZE9wdGlvbkxhYmVsID0gJCh0aGlzKS5zaWJsaW5ncygpLmNoaWxkcmVuKCdzcGFuW2RhdGEtb3B0aW9uLXZhbHVlXScpO1xuICAgICAgICAkc2VsZWN0ZWRPcHRpb24gPSAkKHRoaXMpLmF0dHIoJ2RhdGEtb3B0aW9uLWxhYmVsJyk7XG5cbiAgICAgICAgJHNlbGVjdGVkT3B0aW9uTGFiZWwudGV4dCgkc2VsZWN0ZWRPcHRpb24pO1xuICAgIH1cblxuICAgICRzZWxlY3RlZC5lYWNoKGNoYW5nZUxhYmVsKTtcbiAgICAkc3JjLm9uKCdjbGljaycsIGNoYW5nZUxhYmVsKTtcbn1cbiIsIi8qXG4gSW1wb3J0IGFsbCBwcm9kdWN0IHNwZWNpZmljIGpzXG4gKi9cbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgUmV2aWV3IGZyb20gJy4vcHJvZHVjdC9yZXZpZXdzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtZGV0YWlscyc7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gJy4vcHJvZHVjdC92aWRlby1nYWxsZXJ5JztcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHNlbGVjdGVkT3B0aW9uIGZyb20gJy4vZi9zZWxlY3RlZC1vcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgZm91bmRhdGlvbiBtb2RhbCBjbG9zZSBldmVudHMgdG8gc2FuaXRpemUgVVJMIGFmdGVyIHJldmlldy5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Nsb3NlLmZuZHRuLnJldmVhbCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCB2YWxpZGF0b3I7XG5cbiAgICAgICAgLy8gSW5pdCBjb2xsYXBzaWJsZVxuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IFByb2R1Y3REZXRhaWxzKCQoJy5wcm9kdWN0VmlldycpLCB0aGlzLmNvbnRleHQsIHdpbmRvdy5CQ0RhdGEucHJvZHVjdF9hdHRyaWJ1dGVzKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscy5zZXRQcm9kdWN0VmFyaWFudCgpO1xuXG4gICAgICAgIHZpZGVvR2FsbGVyeSgpO1xuXG4gICAgICAgIGNvbnN0ICRyZXZpZXdGb3JtID0gY2xhc3NpZnlGb3JtKCcud3JpdGVSZXZpZXctZm9ybScpO1xuICAgICAgICBjb25zdCByZXZpZXcgPSBuZXcgUmV2aWV3KCRyZXZpZXdGb3JtKTtcblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJywgKCkgPT4ge1xuICAgICAgICAgICAgdmFsaWRhdG9yID0gcmV2aWV3LnJlZ2lzdGVyVmFsaWRhdGlvbih0aGlzLmNvbnRleHQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcmV2aWV3Rm9ybS5vbignc3VibWl0JywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5jb250ZXh0LmVuYWJsZVNlbGVjdGVkT3B0aW9uTGFiZWwpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBTdGlja3kgPSByZXF1aXJlKCdzdGlja3ktanMnKTtcbiAgICAgICAgY29uc3Qgc3RpY2t5ID0gbmV3IFN0aWNreSgnLnN0aWNreS1wcm9kdWN0Jyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgICAgICB0aGlzLnByb2R1Y3RSZXZpZXdIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgcHJvZHVjdFJldmlld0hhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLiRyZXZpZXdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xuaW1wb3J0IHsgQ29sbGFwc2libGVFdmVudHMgfSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IGZvcm1zIGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvZm9ybXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoJHJldmlld0Zvcm0pIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkcmV2aWV3Rm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHJldmlld3NDb250ZW50ID0gJCgnI3Byb2R1Y3QtcmV2aWV3cycpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZSA9ICQoJ1tkYXRhLWNvbGxhcHNpYmxlXScsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICB0aGlzLmluaXRMaW5rQmluZCgpO1xuICAgICAgICB0aGlzLmluamVjdFBhZ2luYXRpb25MaW5rKCk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VSZXZpZXdzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdGlhbCBwYWdlIGxvYWQsIHRoZSB1c2VyIGNsaWNrcyBvbiBcIigxMiBSZXZpZXdzKVwiIGxpbmtcbiAgICAgKiBUaGUgYnJvd3NlciBqdW1wcyB0byB0aGUgcmV2aWV3IHBhZ2UgYW5kIHNob3VsZCBleHBhbmQgdGhlIHJldmlld3Mgc2VjdGlvblxuICAgICAqL1xuICAgIGluaXRMaW5rQmluZCgpIHtcbiAgICAgICAgY29uc3QgJGNvbnRlbnQgPSAkKCcjcHJvZHVjdFJldmlld3MtY29udGVudCcsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICAkKCcucHJvZHVjdFZpZXctcmV2aWV3TGluaycpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghJGNvbnRlbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNvbGxhcHNpYmxlLnRyaWdnZXIoQ29sbGFwc2libGVFdmVudHMuY2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZVJldmlld3MoKSB7XG4gICAgICAgIC8vIFdlJ3JlIGluIHBhZ2luYXRpbmcgc3RhdGUsIGRvIG5vdCBjb2xsYXBzZVxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggJiYgd2luZG93LmxvY2F0aW9uLmhhc2guaW5kZXhPZignI3Byb2R1Y3QtcmV2aWV3cycpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3JjZSBjb2xsYXBzZSBvbiBwYWdlIGxvYWRcbiAgICAgICAgdGhpcy4kY29sbGFwc2libGUudHJpZ2dlcihDb2xsYXBzaWJsZUV2ZW50cy5jbGljayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IElEIGludG8gdGhlIHBhZ2luYXRpb24gbGlua1xuICAgICAqL1xuICAgIGluamVjdFBhZ2luYXRpb25MaW5rKCkge1xuICAgICAgICBjb25zdCAkbmV4dExpbmsgPSAkKCcucGFnaW5hdGlvbi1pdGVtLS1uZXh0IC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG4gICAgICAgIGNvbnN0ICRwcmV2TGluayA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLXByZXZpb3VzIC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG5cbiAgICAgICAgaWYgKCRuZXh0TGluay5sZW5ndGgpIHtcbiAgICAgICAgICAgICRuZXh0TGluay5hdHRyKCdocmVmJywgYCR7JG5leHRMaW5rLmF0dHIoJ2hyZWYnKX0gI3Byb2R1Y3QtcmV2aWV3c2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRwcmV2TGluay5sZW5ndGgpIHtcbiAgICAgICAgICAgICRwcmV2TGluay5hdHRyKCdocmVmJywgYCR7JHByZXZMaW5rLmF0dHIoJ2hyZWYnKX0gI3Byb2R1Y3QtcmV2aWV3c2ApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJWYWxpZGF0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IuYWRkKFt7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2cmF0aW5nXCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3UmF0aW5nLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2dGl0bGVcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdTdWJqZWN0LFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2dGV4dFwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld0NvbW1lbnQsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJlbWFpbFwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3Jtcy5lbWFpbCh2YWwpO1xuICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3RW1haWwsXG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3I7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVmlkZW9HYWxsZXJ5IHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1wbGF5ZXJdJyk7XG4gICAgICAgIHRoaXMuJHZpZGVvcyA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLWl0ZW1dJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge307XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNlbGVjdE5ld1ZpZGVvKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7XG4gICAgICAgICAgICBpZDogJHRhcmdldC5kYXRhKCd2aWRlb0lkJyksXG4gICAgICAgICAgICAkc2VsZWN0ZWRUaHVtYjogJHRhcmdldCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNldE1haW5WaWRlbygpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZVRodW1iKCk7XG4gICAgfVxuXG4gICAgc2V0TWFpblZpZGVvKCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIuYXR0cignc3JjJywgYC8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dGhpcy5jdXJyZW50VmlkZW8uaWR9YCk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlVGh1bWIoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvLiRzZWxlY3RlZFRodW1iLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3Mub24oJ2NsaWNrJywgdGhpcy5zZWxlY3ROZXdWaWRlby5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvR2FsbGVyeSgpIHtcbiAgICBjb25zdCBwbHVnaW5LZXkgPSAndmlkZW8tZ2FsbGVyeSc7XG4gICAgY29uc3QgJHZpZGVvR2FsbGVyeSA9ICQoYFtkYXRhLSR7cGx1Z2luS2V5fV1gKTtcblxuICAgICR2aWRlb0dhbGxlcnkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgJGVsID0gJChlbGVtZW50KTtcbiAgICAgICAgY29uc3QgaXNJbml0aWFsaXplZCA9ICRlbC5kYXRhKHBsdWdpbktleSkgaW5zdGFuY2VvZiBWaWRlb0dhbGxlcnk7XG5cbiAgICAgICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRlbC5kYXRhKHBsdWdpbktleSwgbmV3IFZpZGVvR2FsbGVyeSgkZWwpKTtcbiAgICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=