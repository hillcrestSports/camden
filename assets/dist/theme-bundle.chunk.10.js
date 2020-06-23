(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var core_js_modules_es6_number_is_nan__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.number.is-nan */ "./node_modules/core-js/modules/es6.number.is-nan.js");
/* harmony import */ var core_js_modules_es6_number_is_nan__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_is_nan__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.number.constructor */ "./node_modules/core-js/modules/es6.number.constructor.js");
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");






function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }








var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);

  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Cart.prototype;

  _proto.onReady = function onReady() {
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    // Classes

    this.classRow = '.cart-item-title';
    this.classResultMessage = '.list-feedback'; // Class names

    this.classNameRowError = 'list-add__row--error'; // Functional assignments

    this.$form = $('.cart-list-form');
    this.$newList = $('.add-new-list');
    this.$addingOverlay = $('.loading-overlay');
    this.$document = $(document);
    this.resetState();
    this.bindEvents();
  };

  _proto.resetState = function resetState() {
    this.items = [];
    this.errors = [];
    this.currentLoop = 0;
  } // Run AJAX calls one by one
  ;

  _proto.handleAjax = function handleAjax() {
    var _this = this;

    if (this.currentLoop < this.items.length) {
      $(this.classResultMessage).html("Saving<br> " + this.items[this.currentLoop].pname + "<br> to your list");
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.getPage(this.items[this.currentLoop].url, {
        template: 'f/b2b/add-to-list-response'
      }, function (err) {
        if (err) {
          throw new Error(err);
        } // Increment 'current' and run AJAX call again


        _this.currentLoop++;

        _this.handleAjax();
      });
    } // Last attempt, redirect only


    if (this.currentLoop === this.items.length) {
      this.$addingOverlay.hide();

      if (this.listTarget !== '' && this.listTarget !== undefined) {
        document.location.href = "/wishlist.php?action=viewwishlistitems" + this.listTarget;
      } else {
        document.location.href = '/wishlist.php';
      } // $('.multi_add__cart-button').css('display', 'inline-block');
      // $('.multi-add__row[data-status=success]').remove();

    }
  };

  _proto.processForm = function processForm(event, form) {
    var _this2 = this;

    event.preventDefault();
    this.$addingOverlay.show();
    var allRows = $(form).find(this.classRow);
    var allMessages = allRows.find(this.classResultMessage);
    this.resetState(); // For each row, add the URL and target to the items array

    allRows.each(function (index, row) {
      var target = $(row);
      var pid = target.find('[data-pid]').val();
      var pname = target.find('.cart-item-name').attr('data-pname');
      _this2.listTarget = $('#list-id').val();

      if (_this2.listTarget !== '' && _this2.listTarget !== undefined) {
        _this2.listTarget = "&wishlistid=" + _this2.listTarget;
      } else {
        _this2.listTarget = '';
      }

      var url = "/wishlist.php?action=add&product_id=" + pid + _this2.listTarget;

      _this2.items.push({
        url: url,
        target: target,
        pname: pname
      });
    }); // To add lang string

    allMessages.text('Saving to list...').show();
    this.handleAjax();
  };

  _proto.openAddList = function openAddList(event) {
    event.preventDefault();
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_9__["defaultModal"])();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.getPage('/cart.php', {
      template: 'f/cart/add-list-form'
    }, function (err, response) {
      if (err) {
        throw new Error(err);
      }

      if (response.length) {
        modal.updateContent(response);
        $('#wishlistname').select();
      }
    });
    modal.open();
  };

  _proto.addNewList = function addNewList(event) {
    event.preventDefault();
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_9__["defaultModal"])();
    var listName = $('#wishlistname').val();
    var sharedList = $('#publicwishlist').val();
    var targetUrl = '/wishlist.php?action=addwishlist&product_id=';
    $.ajax({
      method: 'POST',
      url: targetUrl,
      data: {
        wishlistname: listName,
        publicwishlist: sharedList,
        submit: null
      }
    }).done(function () {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.getPage('/wishlist.php', {
        template: 'f/b2b/list-added-response'
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }

        if (response.length) {
          // replace contents of '.list-selector' with response
          $('.list-selector').html(response);
        }

        modal.close();
      });
    });
  };

  _proto.cartUpdate = function cartUpdate($target) {
    var _this3 = this;

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantity-max'), 10);
    var minQty = parseInt($el.data('quantity-min'), 10);
    var minError = $el.data('quantity-min-error');
    var maxError = $el.data('quantity-max-error');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1; // Does not qualify for min/max quantity

    if (newQty < minQty) {
      return Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
        text: minError,
        type: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
        text: maxError,
        type: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this3.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this3.refreshContent(remove);
      } else {
        $el.val(oldQty);
        Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
          text: response.data.errors.join('\n'),
          type: 'error'
        });
      }
    });
  };

  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this4 = this;

    if (preVal === void 0) {
      preVal = null;
    }

    var itemId = $target.data('cart-itemid');
    var $el = $("#qty-" + itemId);
    var minQty = parseInt($el.data('quantity-min'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry; // Does not quality for min/max quantity

    if (newQty < 0 || Number.isNaN(newQty)) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
        text: invalidEntry + " is not a valid entry",
        type: 'error'
      });
    } else {
      this.$overlay.show();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
        _this4.$overlay.hide();

        if (response.data.status === 'succeed') {
          // if the quantity is changed "1" from "0", we have to remove the row.
          var remove = newQty === 0;

          _this4.refreshContent(remove);
        } else {
          $el.val(oldQty);
          Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
            text: response.data.errors.join('\n'),
            type: 'error'
          });
        }
      });
    }
  };

  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this5 = this;

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this5.refreshContent(true);
      } else {
        Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
          text: response.data.errors.join('\n'),
          type: 'error'
        }).then(function () {
          _this5.refreshContent(true);
        });
      }
    });
  };

  _proto.cartEditOptions = function cartEditOptions(itemId) {
    var _this6 = this;

    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_9__["defaultModal"])();
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);

      _this6.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, option) {
      var $changedOption = $(option);
      var $form = $changedOption.parents('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      var item = $('[name="item_id"]', $form).attr('value');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(item, $form.serialize(), function (err, result) {
        var data = result.data || {};

        if (err) {
          Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
            text: err,
            type: 'error'
          });
          return false;
        }

        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }

        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };

  _proto.refreshContent = function refreshContent(remove) {
    var _this7 = this;

    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages'
      }
    };
    this.$overlay.show(); // Remove last item from cart? Reload

    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this7.$cartContent.html(response.content);

      _this7.$cartTotals.html(response.totals);

      _this7.$cartMessages.html(response.statusMessages);

      $cartPageTitle.replaceWith(response.pageTitle);

      _this7.bindEvents();

      _this7.$overlay.hide();

      var quantity = $('[data-cart-quantity]', _this7.$cartContent).data('cart-quantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
    });
  };

  _proto.bindCartEvents = function bindCartEvents() {
    var _this8 = this;

    var debounceTimeout = 400;

    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_4___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(this.cartUpdate, debounceTimeout), this);

    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_4___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);

    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_4___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(this.cartRemoveItem, debounceTimeout), this);

    var preVal; // cart update

    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdate($target);
    }); // cart qty manually updates

    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();
      event.stopImmediatePropagation(); // update cart quantity

      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      event.stopImmediatePropagation();
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
        text: string,
        type: 'warning',
        showCancelButton: true
      }).then(function () {
        // remove item from cart
        cartRemoveItem(itemId);
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      event.preventDefault(); // edit item in cart

      _this8.cartEditOptions(itemId);
    });
  };

  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this9 = this;

    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault(); // Empty code

      if (!code) {
        return Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
          text: $codeInput.data('error'),
          type: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this9.refreshContent();
        } else {
          Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
            text: response.data.errors.join('\n'),
            type: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this10 = this;

    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();

      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_7__["default"])(code)) {
        return Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
          text: $certInput.data('error'),
          type: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this10.refreshContent();
        } else {
          Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"])({
            text: resp.data.errors.join('\n'),
            type: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this11 = this;

    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_9__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);

        _this11.bindGiftWrappingForm();
      });
    });
  };

  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');

      if (!id) {
        return;
      }

      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();

      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');

    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');

      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }

    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };

  _proto.bindEvents = function bindEvents() {
    var _this12 = this;

    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();
    this.$form.on('click', '[data-save-cart]', function (event) {
      _this12.processForm(event, _this12.$form[0]);
    });
    this.$newList.on('click', function (event) {
      _this12.openAddList(event);
    });
    this.$document.on('click', '.add-new-list-form .button', function (event) {
      _this12.addNewList(event);
    }); // initiate shipping estimator module

    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_8__["default"]($('[data-shipping-estimator]'));
  };

  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_6__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_number_is_nan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.number.is-nan */ "./node_modules/core-js/modules/es6.number.is-nan.js");
/* harmony import */ var core_js_modules_es6_number_is_nan__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_is_nan__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.number.constructor */ "./node_modules/core-js/modules/es6.number.constructor.js");
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_form_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/form-utils */ "./assets/js/theme/common/form-utils.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");









var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }

  var _proto = ShippingEstimator.prototype;

  _proto.initFormValidation = function initFormValidation() {
    var _this = this;

    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_4__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit"
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }

      if (_this.shippingValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };

  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: 'The \'Country\' field cannot be blank.'
    }]);
  };

  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;

    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");

        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }

        cb(result);
      },
      errorMessage: 'The \'State/Province\' field cannot be blank.'
    }]);
  }
  /**
   * Toggle between default shipping and ups shipping rates
   */
  ;

  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };

  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;

    var $last; // Requests the states for a country with AJAX

    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_3__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        Object(_global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"])({
          text: err,
          type: 'error'
        });
        throw new Error(err);
      }

      var $field = $(field);

      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }

      if ($last) {
        _this3.shippingValidator.remove($last);
      }

      if ($field.is('select')) {
        $last = field;

        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_form_utils__WEBPACK_IMPORTED_MODULE_6__["Validators"].cleanUpStateValidation(field);
      } // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us


      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };

  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content); // bind the select button

        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $estimatorContainer.removeClass('u-hiddenVisually');
      $('.shipping-estimate-hide').show();
    });
    $('.shipping-estimate-hide').on('click', function (event) {
      event.preventDefault();
      $estimatorContainer.addClass('u-hiddenVisually');
      $('.shipping-estimate-show').show();
      $('.shipping-estimate-hide').hide();
    });
  };

  return ShippingEstimator;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string') {
    return false;
  } // Add any custom gift certificate validation logic here


  return true;
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvci5qcyJdLCJuYW1lcyI6WyJDYXJ0Iiwib25SZWFkeSIsIiRjYXJ0Q29udGVudCIsIiQiLCIkY2FydE1lc3NhZ2VzIiwiJGNhcnRUb3RhbHMiLCIkb3ZlcmxheSIsImhpZGUiLCJjbGFzc1JvdyIsImNsYXNzUmVzdWx0TWVzc2FnZSIsImNsYXNzTmFtZVJvd0Vycm9yIiwiJGZvcm0iLCIkbmV3TGlzdCIsIiRhZGRpbmdPdmVybGF5IiwiJGRvY3VtZW50IiwiZG9jdW1lbnQiLCJyZXNldFN0YXRlIiwiYmluZEV2ZW50cyIsIml0ZW1zIiwiZXJyb3JzIiwiY3VycmVudExvb3AiLCJoYW5kbGVBamF4IiwibGVuZ3RoIiwiaHRtbCIsInBuYW1lIiwidXRpbHMiLCJhcGkiLCJnZXRQYWdlIiwidXJsIiwidGVtcGxhdGUiLCJlcnIiLCJFcnJvciIsImxpc3RUYXJnZXQiLCJ1bmRlZmluZWQiLCJsb2NhdGlvbiIsImhyZWYiLCJwcm9jZXNzRm9ybSIsImV2ZW50IiwiZm9ybSIsInByZXZlbnREZWZhdWx0Iiwic2hvdyIsImFsbFJvd3MiLCJmaW5kIiwiYWxsTWVzc2FnZXMiLCJlYWNoIiwiaW5kZXgiLCJyb3ciLCJ0YXJnZXQiLCJwaWQiLCJ2YWwiLCJhdHRyIiwicHVzaCIsInRleHQiLCJvcGVuQWRkTGlzdCIsIm1vZGFsIiwiZGVmYXVsdE1vZGFsIiwicmVzcG9uc2UiLCJ1cGRhdGVDb250ZW50Iiwic2VsZWN0Iiwib3BlbiIsImFkZE5ld0xpc3QiLCJsaXN0TmFtZSIsInNoYXJlZExpc3QiLCJ0YXJnZXRVcmwiLCJhamF4IiwibWV0aG9kIiwiZGF0YSIsIndpc2hsaXN0bmFtZSIsInB1YmxpY3dpc2hsaXN0Iiwic3VibWl0IiwiZG9uZSIsImNsb3NlIiwiY2FydFVwZGF0ZSIsIiR0YXJnZXQiLCJpdGVtSWQiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzd2FsIiwidHlwZSIsImNhcnQiLCJpdGVtVXBkYXRlIiwic3RhdHVzIiwicmVtb3ZlIiwicmVmcmVzaENvbnRlbnQiLCJqb2luIiwiY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UiLCJwcmVWYWwiLCJOdW1iZXIiLCJpbnZhbGlkRW50cnkiLCJpc05hTiIsImNhcnRSZW1vdmVJdGVtIiwiaXRlbVJlbW92ZSIsInRoZW4iLCJjYXJ0RWRpdE9wdGlvbnMiLCJvcHRpb25zIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJjb25maWd1cmVJbkNhcnQiLCJjb250ZW50IiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJob29rcyIsIm9uIiwib3B0aW9uIiwiJGNoYW5nZWRPcHRpb24iLCJwYXJlbnRzIiwiJHN1Ym1pdCIsIiRtZXNzYWdlQm94IiwiaXRlbSIsIm9wdGlvbkNoYW5nZSIsInNlcmlhbGl6ZSIsInJlc3VsdCIsInB1cmNoYXNpbmdfbWVzc2FnZSIsInByb3AiLCJwdXJjaGFzYWJsZSIsImluc3RvY2siLCIkY2FydEl0ZW1zUm93cyIsIiRjYXJ0UGFnZVRpdGxlIiwidG90YWxzIiwicGFnZVRpdGxlIiwic3RhdHVzTWVzc2FnZXMiLCJ3aW5kb3ciLCJyZWxvYWQiLCJnZXRDb250ZW50IiwicmVwbGFjZVdpdGgiLCJxdWFudGl0eSIsInRyaWdnZXIiLCJiaW5kQ2FydEV2ZW50cyIsImRlYm91bmNlVGltZW91dCIsImN1cnJlbnRUYXJnZXQiLCJvblF0eUZvY3VzIiwidmFsdWUiLCJjaGFuZ2UiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJzdHJpbmciLCJzaG93Q2FuY2VsQnV0dG9uIiwiYmluZFByb21vQ29kZUV2ZW50cyIsIiRjb3Vwb25Db250YWluZXIiLCIkY291cG9uRm9ybSIsIiRjb2RlSW5wdXQiLCJjb2RlIiwiYXBwbHlDb2RlIiwiYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cyIsIiRjZXJ0Q29udGFpbmVyIiwiJGNlcnRGb3JtIiwiJGNlcnRJbnB1dCIsInRvZ2dsZSIsImdpZnRDZXJ0Q2hlY2siLCJhcHBseUdpZnRDZXJ0aWZpY2F0ZSIsInJlc3AiLCJiaW5kR2lmdFdyYXBwaW5nRXZlbnRzIiwiZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMiLCIkc2VsZWN0IiwiaWQiLCJhbGxvd01lc3NhZ2UiLCJ0b2dnbGVWaWV3cyIsIiRzaW5nbGVGb3JtIiwiJG11bHRpRm9ybSIsInNoaXBwaW5nRXN0aW1hdG9yIiwiU2hpcHBpbmdFc3RpbWF0b3IiLCJQYWdlTWFuYWdlciIsIiRlbGVtZW50IiwiJHN0YXRlIiwiaW5pdEZvcm1WYWxpZGF0aW9uIiwiYmluZFN0YXRlQ291bnRyeUNoYW5nZSIsImJpbmRFc3RpbWF0b3JFdmVudHMiLCJzaGlwcGluZ1ZhbGlkYXRvciIsIm5vZCIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImJpbmRWYWxpZGF0aW9uIiwiYmluZFN0YXRlVmFsaWRhdGlvbiIsImJpbmRVUFNSYXRlcyIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsImNvdW50cnlJZCIsImVycm9yTWVzc2FnZSIsIiRlbGUiLCJlbGVWYWwiLCJVUFNSYXRlVG9nZ2xlIiwiJGVzdGltYXRvckZvcm1VcHMiLCIkZXN0aW1hdG9yRm9ybURlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsIiRsYXN0Iiwic3RhdGVDb3VudHJ5IiwiY29udGV4dCIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCIkZmllbGQiLCJnZXRTdGF0dXMiLCJpcyIsIlZhbGlkYXRvcnMiLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwicmVtb3ZlQ2xhc3MiLCIkZXN0aW1hdG9yQ29udGFpbmVyIiwiJGVzdGltYXRvckZvcm0iLCJwYXJhbXMiLCJjb3VudHJ5X2lkIiwic3RhdGVfaWQiLCJjaXR5IiwiemlwX2NvZGUiLCJnZXRTaGlwcGluZ1F1b3RlcyIsImNsaWNrRXZlbnQiLCJxdW90ZUlkIiwic3VibWl0U2hpcHBpbmdRdW90ZSIsImFkZENsYXNzIiwiY2VydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVxQkEsSTs7Ozs7Ozs7O1NBQ2pCQyxPLEdBQUEsbUJBQVU7QUFDTixTQUFLQyxZQUFMLEdBQW9CQyxDQUFDLENBQUMscUJBQUQsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCRCxDQUFDLENBQUMsb0JBQUQsQ0FBdEI7QUFDQSxTQUFLRSxXQUFMLEdBQW1CRixDQUFDLENBQUMsb0JBQUQsQ0FBcEI7QUFDQSxTQUFLRyxRQUFMLEdBQWdCSCxDQUFDLENBQUMsNkJBQUQsQ0FBRCxDQUNYSSxJQURXLEVBQWhCLENBSk0sQ0FLTztBQUViOztBQUNBLFNBQUtDLFFBQUwsR0FBZ0Isa0JBQWhCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEIsZ0JBQTFCLENBVE0sQ0FXTjs7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QixzQkFBekIsQ0FaTSxDQWNOOztBQUNBLFNBQUtDLEtBQUwsR0FBYVIsQ0FBQyxDQUFDLGlCQUFELENBQWQ7QUFDQSxTQUFLUyxRQUFMLEdBQWdCVCxDQUFDLENBQUMsZUFBRCxDQUFqQjtBQUNBLFNBQUtVLGNBQUwsR0FBc0JWLENBQUMsQ0FBQyxrQkFBRCxDQUF2QjtBQUNBLFNBQUtXLFNBQUwsR0FBaUJYLENBQUMsQ0FBQ1ksUUFBRCxDQUFsQjtBQUVBLFNBQUtDLFVBQUw7QUFFQSxTQUFLQyxVQUFMO0FBQ0gsRzs7U0FFREQsVSxHQUFBLHNCQUFhO0FBQ1QsU0FBS0UsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDSCxHLENBRUQ7OztTQUNBQyxVLEdBQUEsc0JBQWE7QUFBQTs7QUFDVCxRQUFJLEtBQUtELFdBQUwsR0FBbUIsS0FBS0YsS0FBTCxDQUFXSSxNQUFsQyxFQUEwQztBQUN0Q25CLE9BQUMsQ0FBQyxLQUFLTSxrQkFBTixDQUFELENBQTJCYyxJQUEzQixpQkFBOEMsS0FBS0wsS0FBTCxDQUFXLEtBQUtFLFdBQWhCLEVBQTZCSSxLQUEzRTtBQUNBQyx3RUFBSyxDQUFDQyxHQUFOLENBQVVDLE9BQVYsQ0FBa0IsS0FBS1QsS0FBTCxDQUFXLEtBQUtFLFdBQWhCLEVBQTZCUSxHQUEvQyxFQUFvRDtBQUNoREMsZ0JBQVEsRUFBRTtBQURzQyxPQUFwRCxFQUVHLFVBQUNDLEdBQUQsRUFBUztBQUNSLFlBQUlBLEdBQUosRUFBUztBQUNMLGdCQUFNLElBQUlDLEtBQUosQ0FBVUQsR0FBVixDQUFOO0FBQ0gsU0FITyxDQUtSOzs7QUFDQSxhQUFJLENBQUNWLFdBQUw7O0FBQ0EsYUFBSSxDQUFDQyxVQUFMO0FBQ0gsT0FWRDtBQVdILEtBZFEsQ0FnQlQ7OztBQUNBLFFBQUksS0FBS0QsV0FBTCxLQUFxQixLQUFLRixLQUFMLENBQVdJLE1BQXBDLEVBQTRDO0FBQ3hDLFdBQUtULGNBQUwsQ0FBb0JOLElBQXBCOztBQUVBLFVBQUksS0FBS3lCLFVBQUwsS0FBb0IsRUFBcEIsSUFBMEIsS0FBS0EsVUFBTCxLQUFvQkMsU0FBbEQsRUFBNkQ7QUFDekRsQixnQkFBUSxDQUFDbUIsUUFBVCxDQUFrQkMsSUFBbEIsOENBQWtFLEtBQUtILFVBQXZFO0FBQ0gsT0FGRCxNQUVPO0FBQ0hqQixnQkFBUSxDQUFDbUIsUUFBVCxDQUFrQkMsSUFBbEIsR0FBeUIsZUFBekI7QUFDSCxPQVB1QyxDQVF4QztBQUNBOztBQUNIO0FBQ0osRzs7U0FFREMsVyxHQUFBLHFCQUFZQyxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QjtBQUFBOztBQUNyQkQsU0FBSyxDQUFDRSxjQUFOO0FBRUEsU0FBSzFCLGNBQUwsQ0FBb0IyQixJQUFwQjtBQUVBLFFBQU1DLE9BQU8sR0FBR3RDLENBQUMsQ0FBQ21DLElBQUQsQ0FBRCxDQUFRSSxJQUFSLENBQWEsS0FBS2xDLFFBQWxCLENBQWhCO0FBQ0EsUUFBTW1DLFdBQVcsR0FBR0YsT0FBTyxDQUFDQyxJQUFSLENBQWEsS0FBS2pDLGtCQUFsQixDQUFwQjtBQUVBLFNBQUtPLFVBQUwsR0FScUIsQ0FVckI7O0FBQ0F5QixXQUFPLENBQUNHLElBQVIsQ0FBYSxVQUFDQyxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFDekIsVUFBTUMsTUFBTSxHQUFHNUMsQ0FBQyxDQUFDMkMsR0FBRCxDQUFoQjtBQUNBLFVBQU1FLEdBQUcsR0FBR0QsTUFBTSxDQUFDTCxJQUFQLENBQVksWUFBWixFQUEwQk8sR0FBMUIsRUFBWjtBQUNBLFVBQU16QixLQUFLLEdBQUd1QixNQUFNLENBQUNMLElBQVAsQ0FBWSxpQkFBWixFQUErQlEsSUFBL0IsQ0FBb0MsWUFBcEMsQ0FBZDtBQUNBLFlBQUksQ0FBQ2xCLFVBQUwsR0FBa0I3QixDQUFDLENBQUMsVUFBRCxDQUFELENBQWM4QyxHQUFkLEVBQWxCOztBQUVBLFVBQUksTUFBSSxDQUFDakIsVUFBTCxLQUFvQixFQUFwQixJQUEwQixNQUFJLENBQUNBLFVBQUwsS0FBb0JDLFNBQWxELEVBQTZEO0FBQ3pELGNBQUksQ0FBQ0QsVUFBTCxvQkFBaUMsTUFBSSxDQUFDQSxVQUF0QztBQUNILE9BRkQsTUFFTztBQUNILGNBQUksQ0FBQ0EsVUFBTCxHQUFrQixFQUFsQjtBQUNIOztBQUVELFVBQU1KLEdBQUcsNENBQTBDb0IsR0FBMUMsR0FBZ0QsTUFBSSxDQUFDaEIsVUFBOUQ7O0FBQ0EsWUFBSSxDQUFDZCxLQUFMLENBQVdpQyxJQUFYLENBQWdCO0FBQ1p2QixXQUFHLEVBQUhBLEdBRFk7QUFFWm1CLGNBQU0sRUFBTkEsTUFGWTtBQUdadkIsYUFBSyxFQUFMQTtBQUhZLE9BQWhCO0FBS0gsS0FsQkQsRUFYcUIsQ0ErQnJCOztBQUNBbUIsZUFBVyxDQUFDUyxJQUFaLENBQWlCLG1CQUFqQixFQUFzQ1osSUFBdEM7QUFDQSxTQUFLbkIsVUFBTDtBQUNILEc7O1NBRURnQyxXLEdBQUEscUJBQVloQixLQUFaLEVBQW1CO0FBQ2ZBLFNBQUssQ0FBQ0UsY0FBTjtBQUVBLFFBQU1lLEtBQUssR0FBR0Msa0VBQVksRUFBMUI7QUFFQTlCLHNFQUFLLENBQUNDLEdBQU4sQ0FBVUMsT0FBVixDQUFrQixXQUFsQixFQUErQjtBQUMzQkUsY0FBUSxFQUFFO0FBRGlCLEtBQS9CLEVBRUcsVUFBQ0MsR0FBRCxFQUFNMEIsUUFBTixFQUFtQjtBQUNsQixVQUFJMUIsR0FBSixFQUFTO0FBQ0wsY0FBTSxJQUFJQyxLQUFKLENBQVVELEdBQVYsQ0FBTjtBQUNIOztBQUVELFVBQUkwQixRQUFRLENBQUNsQyxNQUFiLEVBQXFCO0FBQ2pCZ0MsYUFBSyxDQUFDRyxhQUFOLENBQW9CRCxRQUFwQjtBQUNBckQsU0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQnVELE1BQW5CO0FBQ0g7QUFDSixLQVhEO0FBYUFKLFNBQUssQ0FBQ0ssSUFBTjtBQUNILEc7O1NBRURDLFUsR0FBQSxvQkFBV3ZCLEtBQVgsRUFBa0I7QUFDZEEsU0FBSyxDQUFDRSxjQUFOO0FBRUEsUUFBTWUsS0FBSyxHQUFHQyxrRUFBWSxFQUExQjtBQUNBLFFBQU1NLFFBQVEsR0FBRzFELENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUI4QyxHQUFuQixFQUFqQjtBQUNBLFFBQU1hLFVBQVUsR0FBRzNELENBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCOEMsR0FBckIsRUFBbkI7QUFDQSxRQUFNYyxTQUFTLEdBQUcsOENBQWxCO0FBRUE1RCxLQUFDLENBQUM2RCxJQUFGLENBQU87QUFDSEMsWUFBTSxFQUFFLE1BREw7QUFFSHJDLFNBQUcsRUFBRW1DLFNBRkY7QUFHSEcsVUFBSSxFQUFFO0FBQ0ZDLG9CQUFZLEVBQUVOLFFBRFo7QUFFRk8sc0JBQWMsRUFBRU4sVUFGZDtBQUdGTyxjQUFNLEVBQUU7QUFITjtBQUhILEtBQVAsRUFRR0MsSUFSSCxDQVFRLFlBQU07QUFDVjdDLHdFQUFLLENBQUNDLEdBQU4sQ0FBVUMsT0FBVixDQUFrQixlQUFsQixFQUFtQztBQUMvQkUsZ0JBQVEsRUFBRTtBQURxQixPQUFuQyxFQUVHLFVBQUNDLEdBQUQsRUFBTTBCLFFBQU4sRUFBbUI7QUFDbEIsWUFBSTFCLEdBQUosRUFBUztBQUNMLGdCQUFNLElBQUlDLEtBQUosQ0FBVUQsR0FBVixDQUFOO0FBQ0g7O0FBRUQsWUFBSTBCLFFBQVEsQ0FBQ2xDLE1BQWIsRUFBcUI7QUFDakI7QUFDQW5CLFdBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9Cb0IsSUFBcEIsQ0FBeUJpQyxRQUF6QjtBQUNIOztBQUVERixhQUFLLENBQUNpQixLQUFOO0FBQ0gsT0FiRDtBQWNILEtBdkJEO0FBd0JILEc7O1NBRURDLFUsR0FBQSxvQkFBV0MsT0FBWCxFQUFvQjtBQUFBOztBQUNoQixRQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBQ1AsSUFBUixDQUFhLFlBQWIsQ0FBZjtBQUNBLFFBQU1TLEdBQUcsR0FBR3hFLENBQUMsV0FBU3VFLE1BQVQsQ0FBYjtBQUNBLFFBQU1FLE1BQU0sR0FBR0MsUUFBUSxDQUFDRixHQUFHLENBQUMxQixHQUFKLEVBQUQsRUFBWSxFQUFaLENBQXZCO0FBQ0EsUUFBTTZCLE1BQU0sR0FBR0QsUUFBUSxDQUFDRixHQUFHLENBQUNULElBQUosQ0FBUyxjQUFULENBQUQsRUFBMkIsRUFBM0IsQ0FBdkI7QUFDQSxRQUFNYSxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0YsR0FBRyxDQUFDVCxJQUFKLENBQVMsY0FBVCxDQUFELEVBQTJCLEVBQTNCLENBQXZCO0FBQ0EsUUFBTWMsUUFBUSxHQUFHTCxHQUFHLENBQUNULElBQUosQ0FBUyxvQkFBVCxDQUFqQjtBQUNBLFFBQU1lLFFBQVEsR0FBR04sR0FBRyxDQUFDVCxJQUFKLENBQVMsb0JBQVQsQ0FBakI7QUFDQSxRQUFNZ0IsTUFBTSxHQUFHVCxPQUFPLENBQUNQLElBQVIsQ0FBYSxRQUFiLE1BQTJCLEtBQTNCLEdBQW1DVSxNQUFNLEdBQUcsQ0FBNUMsR0FBZ0RBLE1BQU0sR0FBRyxDQUF4RSxDQVJnQixDQVNoQjs7QUFDQSxRQUFJTSxNQUFNLEdBQUdILE1BQWIsRUFBcUI7QUFDakIsYUFBT0ksb0VBQUksQ0FBQztBQUNSL0IsWUFBSSxFQUFFNEIsUUFERTtBQUVSSSxZQUFJLEVBQUU7QUFGRSxPQUFELENBQVg7QUFJSCxLQUxELE1BS08sSUFBSU4sTUFBTSxHQUFHLENBQVQsSUFBY0ksTUFBTSxHQUFHSixNQUEzQixFQUFtQztBQUN0QyxhQUFPSyxvRUFBSSxDQUFDO0FBQ1IvQixZQUFJLEVBQUU2QixRQURFO0FBRVJHLFlBQUksRUFBRTtBQUZFLE9BQUQsQ0FBWDtBQUlIOztBQUVELFNBQUs5RSxRQUFMLENBQWNrQyxJQUFkO0FBRUFmLHNFQUFLLENBQUNDLEdBQU4sQ0FBVTJELElBQVYsQ0FBZUMsVUFBZixDQUEwQlosTUFBMUIsRUFBa0NRLE1BQWxDLEVBQTBDLFVBQUNwRCxHQUFELEVBQU0wQixRQUFOLEVBQW1CO0FBQ3pELFlBQUksQ0FBQ2xELFFBQUwsQ0FBY0MsSUFBZDs7QUFFQSxVQUFJaUQsUUFBUSxDQUFDVSxJQUFULENBQWNxQixNQUFkLEtBQXlCLFNBQTdCLEVBQXdDO0FBQ3BDO0FBQ0EsWUFBTUMsTUFBTSxHQUFJTixNQUFNLEtBQUssQ0FBM0I7O0FBRUEsY0FBSSxDQUFDTyxjQUFMLENBQW9CRCxNQUFwQjtBQUNILE9BTEQsTUFLTztBQUNIYixXQUFHLENBQUMxQixHQUFKLENBQVEyQixNQUFSO0FBQ0FPLDRFQUFJLENBQUM7QUFDRC9CLGNBQUksRUFBRUksUUFBUSxDQUFDVSxJQUFULENBQWMvQyxNQUFkLENBQXFCdUUsSUFBckIsQ0FBMEIsSUFBMUIsQ0FETDtBQUVETixjQUFJLEVBQUU7QUFGTCxTQUFELENBQUo7QUFJSDtBQUNKLEtBZkQ7QUFnQkgsRzs7U0FFRE8sdUIsR0FBQSxpQ0FBd0JsQixPQUF4QixFQUFpQ21CLE1BQWpDLEVBQWdEO0FBQUE7O0FBQUEsUUFBZkEsTUFBZTtBQUFmQSxZQUFlLEdBQU4sSUFBTTtBQUFBOztBQUM1QyxRQUFNbEIsTUFBTSxHQUFHRCxPQUFPLENBQUNQLElBQVIsQ0FBYSxhQUFiLENBQWY7QUFDQSxRQUFNUyxHQUFHLEdBQUd4RSxDQUFDLFdBQVN1RSxNQUFULENBQWI7QUFDQSxRQUFNSyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0YsR0FBRyxDQUFDVCxJQUFKLENBQVMsY0FBVCxDQUFELEVBQTJCLEVBQTNCLENBQXZCO0FBQ0EsUUFBTVUsTUFBTSxHQUFHZ0IsTUFBTSxLQUFLLElBQVgsR0FBa0JBLE1BQWxCLEdBQTJCYixNQUExQztBQUNBLFFBQU1HLE1BQU0sR0FBR0wsUUFBUSxDQUFDZ0IsTUFBTSxDQUFDbEIsR0FBRyxDQUFDMUIsR0FBSixFQUFELENBQVAsRUFBb0IsRUFBcEIsQ0FBdkI7QUFFQSxRQUFJNkMsWUFBSixDQVA0QyxDQVE1Qzs7QUFDQSxRQUFJWixNQUFNLEdBQUcsQ0FBVCxJQUFjVyxNQUFNLENBQUNFLEtBQVAsQ0FBYWIsTUFBYixDQUFsQixFQUF3QztBQUNwQ1ksa0JBQVksR0FBR25CLEdBQUcsQ0FBQzFCLEdBQUosRUFBZjtBQUNBMEIsU0FBRyxDQUFDMUIsR0FBSixDQUFRMkIsTUFBUjtBQUNBTywwRUFBSSxDQUFDO0FBQ0QvQixZQUFJLEVBQUswQyxZQUFMLDBCQURIO0FBRURWLFlBQUksRUFBRTtBQUZMLE9BQUQsQ0FBSjtBQUlILEtBUEQsTUFPTztBQUNILFdBQUs5RSxRQUFMLENBQWNrQyxJQUFkO0FBRUFmLHdFQUFLLENBQUNDLEdBQU4sQ0FBVTJELElBQVYsQ0FBZUMsVUFBZixDQUEwQlosTUFBMUIsRUFBa0NRLE1BQWxDLEVBQTBDLFVBQUNwRCxHQUFELEVBQU0wQixRQUFOLEVBQW1CO0FBQ3pELGNBQUksQ0FBQ2xELFFBQUwsQ0FBY0MsSUFBZDs7QUFFQSxZQUFJaUQsUUFBUSxDQUFDVSxJQUFULENBQWNxQixNQUFkLEtBQXlCLFNBQTdCLEVBQXdDO0FBQ3BDO0FBQ0EsY0FBTUMsTUFBTSxHQUFJTixNQUFNLEtBQUssQ0FBM0I7O0FBQ0EsZ0JBQUksQ0FBQ08sY0FBTCxDQUFvQkQsTUFBcEI7QUFDSCxTQUpELE1BSU87QUFDSGIsYUFBRyxDQUFDMUIsR0FBSixDQUFRMkIsTUFBUjtBQUNBTyw4RUFBSSxDQUFDO0FBQ0QvQixnQkFBSSxFQUFFSSxRQUFRLENBQUNVLElBQVQsQ0FBYy9DLE1BQWQsQ0FBcUJ1RSxJQUFyQixDQUEwQixJQUExQixDQURMO0FBRUROLGdCQUFJLEVBQUU7QUFGTCxXQUFELENBQUo7QUFJSDtBQUNKLE9BZEQ7QUFlSDtBQUNKLEc7O1NBRURZLGMsR0FBQSx3QkFBZXRCLE1BQWYsRUFBdUI7QUFBQTs7QUFDbkIsU0FBS3BFLFFBQUwsQ0FBY2tDLElBQWQ7QUFDQWYsc0VBQUssQ0FBQ0MsR0FBTixDQUFVMkQsSUFBVixDQUFlWSxVQUFmLENBQTBCdkIsTUFBMUIsRUFBa0MsVUFBQzVDLEdBQUQsRUFBTTBCLFFBQU4sRUFBbUI7QUFDakQsVUFBSUEsUUFBUSxDQUFDVSxJQUFULENBQWNxQixNQUFkLEtBQXlCLFNBQTdCLEVBQXdDO0FBQ3BDLGNBQUksQ0FBQ0UsY0FBTCxDQUFvQixJQUFwQjtBQUNILE9BRkQsTUFFTztBQUNITiw0RUFBSSxDQUFDO0FBQ0QvQixjQUFJLEVBQUVJLFFBQVEsQ0FBQ1UsSUFBVCxDQUFjL0MsTUFBZCxDQUFxQnVFLElBQXJCLENBQTBCLElBQTFCLENBREw7QUFFRE4sY0FBSSxFQUFFO0FBRkwsU0FBRCxDQUFKLENBR0djLElBSEgsQ0FHUSxZQUFNO0FBQ1YsZ0JBQUksQ0FBQ1QsY0FBTCxDQUFvQixJQUFwQjtBQUNILFNBTEQ7QUFNSDtBQUNKLEtBWEQ7QUFZSCxHOztTQUVEVSxlLEdBQUEseUJBQWdCekIsTUFBaEIsRUFBd0I7QUFBQTs7QUFDcEIsUUFBTXBCLEtBQUssR0FBR0Msa0VBQVksRUFBMUI7QUFDQSxRQUFNNkMsT0FBTyxHQUFHO0FBQ1p2RSxjQUFRLEVBQUU7QUFERSxLQUFoQjtBQUlBeUIsU0FBSyxDQUFDSyxJQUFOO0FBRUFsQyxzRUFBSyxDQUFDQyxHQUFOLENBQVUyRSxpQkFBVixDQUE0QkMsZUFBNUIsQ0FBNEM1QixNQUE1QyxFQUFvRDBCLE9BQXBELEVBQTZELFVBQUN0RSxHQUFELEVBQU0wQixRQUFOLEVBQW1CO0FBQzVFRixXQUFLLENBQUNHLGFBQU4sQ0FBb0JELFFBQVEsQ0FBQytDLE9BQTdCOztBQUVBLFlBQUksQ0FBQ0Msb0JBQUw7QUFDSCxLQUpEO0FBTUEvRSxzRUFBSyxDQUFDZ0YsS0FBTixDQUFZQyxFQUFaLENBQWUsdUJBQWYsRUFBd0MsVUFBQ3JFLEtBQUQsRUFBUXNFLE1BQVIsRUFBbUI7QUFDdkQsVUFBTUMsY0FBYyxHQUFHekcsQ0FBQyxDQUFDd0csTUFBRCxDQUF4QjtBQUNBLFVBQU1oRyxLQUFLLEdBQUdpRyxjQUFjLENBQUNDLE9BQWYsQ0FBdUIsTUFBdkIsQ0FBZDtBQUNBLFVBQU1DLE9BQU8sR0FBRzNHLENBQUMsQ0FBQyxjQUFELEVBQWlCUSxLQUFqQixDQUFqQjtBQUNBLFVBQU1vRyxXQUFXLEdBQUc1RyxDQUFDLENBQUMsa0JBQUQsQ0FBckI7QUFDQSxVQUFNNkcsSUFBSSxHQUFHN0csQ0FBQyxDQUFDLGtCQUFELEVBQXFCUSxLQUFyQixDQUFELENBQTZCdUMsSUFBN0IsQ0FBa0MsT0FBbEMsQ0FBYjtBQUVBekIsd0VBQUssQ0FBQ0MsR0FBTixDQUFVMkUsaUJBQVYsQ0FBNEJZLFlBQTVCLENBQXlDRCxJQUF6QyxFQUErQ3JHLEtBQUssQ0FBQ3VHLFNBQU4sRUFBL0MsRUFBa0UsVUFBQ3BGLEdBQUQsRUFBTXFGLE1BQU4sRUFBaUI7QUFDL0UsWUFBTWpELElBQUksR0FBR2lELE1BQU0sQ0FBQ2pELElBQVAsSUFBZSxFQUE1Qjs7QUFFQSxZQUFJcEMsR0FBSixFQUFTO0FBQ0xxRCw4RUFBSSxDQUFDO0FBQ0QvQixnQkFBSSxFQUFFdEIsR0FETDtBQUVEc0QsZ0JBQUksRUFBRTtBQUZMLFdBQUQsQ0FBSjtBQUlBLGlCQUFPLEtBQVA7QUFDSDs7QUFFRCxZQUFJbEIsSUFBSSxDQUFDa0Qsa0JBQVQsRUFBNkI7QUFDekJqSCxXQUFDLENBQUMsb0JBQUQsRUFBdUI0RyxXQUF2QixDQUFELENBQXFDM0QsSUFBckMsQ0FBMENjLElBQUksQ0FBQ2tELGtCQUEvQztBQUNBTixpQkFBTyxDQUFDTyxJQUFSLENBQWEsVUFBYixFQUF5QixJQUF6QjtBQUNBTixxQkFBVyxDQUFDdkUsSUFBWjtBQUNILFNBSkQsTUFJTztBQUNIc0UsaUJBQU8sQ0FBQ08sSUFBUixDQUFhLFVBQWIsRUFBeUIsS0FBekI7QUFDQU4scUJBQVcsQ0FBQ3hHLElBQVo7QUFDSDs7QUFFRCxZQUFJLENBQUMyRCxJQUFJLENBQUNvRCxXQUFOLElBQXFCLENBQUNwRCxJQUFJLENBQUNxRCxPQUEvQixFQUF3QztBQUNwQ1QsaUJBQU8sQ0FBQ08sSUFBUixDQUFhLFVBQWIsRUFBeUIsSUFBekI7QUFDSCxTQUZELE1BRU87QUFDSFAsaUJBQU8sQ0FBQ08sSUFBUixDQUFhLFVBQWIsRUFBeUIsS0FBekI7QUFDSDtBQUNKLE9BekJEO0FBMEJILEtBakNEO0FBa0NILEc7O1NBRUQ1QixjLEdBQUEsd0JBQWVELE1BQWYsRUFBdUI7QUFBQTs7QUFDbkIsUUFBTWdDLGNBQWMsR0FBR3JILENBQUMsQ0FBQyxpQkFBRCxFQUFvQixLQUFLRCxZQUF6QixDQUF4QjtBQUNBLFFBQU11SCxjQUFjLEdBQUd0SCxDQUFDLENBQUMsd0JBQUQsQ0FBeEI7QUFDQSxRQUFNaUcsT0FBTyxHQUFHO0FBQ1p2RSxjQUFRLEVBQUU7QUFDTjBFLGVBQU8sRUFBRSxjQURIO0FBRU5tQixjQUFNLEVBQUUsYUFGRjtBQUdOQyxpQkFBUyxFQUFFLGlCQUhMO0FBSU5DLHNCQUFjLEVBQUU7QUFKVjtBQURFLEtBQWhCO0FBU0EsU0FBS3RILFFBQUwsQ0FBY2tDLElBQWQsR0FabUIsQ0FjbkI7O0FBQ0EsUUFBSWdELE1BQU0sSUFBSWdDLGNBQWMsQ0FBQ2xHLE1BQWYsS0FBMEIsQ0FBeEMsRUFBMkM7QUFDdkMsYUFBT3VHLE1BQU0sQ0FBQzNGLFFBQVAsQ0FBZ0I0RixNQUFoQixFQUFQO0FBQ0g7O0FBRURyRyxzRUFBSyxDQUFDQyxHQUFOLENBQVUyRCxJQUFWLENBQWUwQyxVQUFmLENBQTBCM0IsT0FBMUIsRUFBbUMsVUFBQ3RFLEdBQUQsRUFBTTBCLFFBQU4sRUFBbUI7QUFDbEQsWUFBSSxDQUFDdEQsWUFBTCxDQUFrQnFCLElBQWxCLENBQXVCaUMsUUFBUSxDQUFDK0MsT0FBaEM7O0FBQ0EsWUFBSSxDQUFDbEcsV0FBTCxDQUFpQmtCLElBQWpCLENBQXNCaUMsUUFBUSxDQUFDa0UsTUFBL0I7O0FBQ0EsWUFBSSxDQUFDdEgsYUFBTCxDQUFtQm1CLElBQW5CLENBQXdCaUMsUUFBUSxDQUFDb0UsY0FBakM7O0FBRUFILG9CQUFjLENBQUNPLFdBQWYsQ0FBMkJ4RSxRQUFRLENBQUNtRSxTQUFwQzs7QUFDQSxZQUFJLENBQUMxRyxVQUFMOztBQUNBLFlBQUksQ0FBQ1gsUUFBTCxDQUFjQyxJQUFkOztBQUVBLFVBQU0wSCxRQUFRLEdBQUc5SCxDQUFDLENBQUMsc0JBQUQsRUFBeUIsTUFBSSxDQUFDRCxZQUE5QixDQUFELENBQTZDZ0UsSUFBN0MsQ0FBa0QsZUFBbEQsS0FBc0UsQ0FBdkY7QUFDQS9ELE9BQUMsQ0FBQyxNQUFELENBQUQsQ0FBVStILE9BQVYsQ0FBa0Isc0JBQWxCLEVBQTBDRCxRQUExQztBQUNILEtBWEQ7QUFZSCxHOztTQUVERSxjLEdBQUEsMEJBQWlCO0FBQUE7O0FBQ2IsUUFBTUMsZUFBZSxHQUFHLEdBQXhCOztBQUNBLFFBQU01RCxVQUFVLEdBQUcsbURBQU8sdURBQVcsS0FBS0EsVUFBaEIsRUFBNEI0RCxlQUE1QixDQUFQLEVBQXFELElBQXJELENBQW5COztBQUNBLFFBQU16Qyx1QkFBdUIsR0FBRyxtREFBTyx1REFBVyxLQUFLQSx1QkFBaEIsRUFBeUN5QyxlQUF6QyxDQUFQLEVBQWtFLElBQWxFLENBQWhDOztBQUNBLFFBQU1wQyxjQUFjLEdBQUcsbURBQU8sdURBQVcsS0FBS0EsY0FBaEIsRUFBZ0NvQyxlQUFoQyxDQUFQLEVBQXlELElBQXpELENBQXZCOztBQUNBLFFBQUl4QyxNQUFKLENBTGEsQ0FPYjs7QUFDQXpGLEtBQUMsQ0FBQyxvQkFBRCxFQUF1QixLQUFLRCxZQUE1QixDQUFELENBQTJDd0csRUFBM0MsQ0FBOEMsT0FBOUMsRUFBdUQsVUFBQXJFLEtBQUssRUFBSTtBQUM1RCxVQUFNb0MsT0FBTyxHQUFHdEUsQ0FBQyxDQUFDa0MsS0FBSyxDQUFDZ0csYUFBUCxDQUFqQjtBQUVBaEcsV0FBSyxDQUFDRSxjQUFOLEdBSDRELENBSzVEOztBQUNBaUMsZ0JBQVUsQ0FBQ0MsT0FBRCxDQUFWO0FBQ0gsS0FQRCxFQVJhLENBaUJiOztBQUNBdEUsS0FBQyxDQUFDLHNCQUFELEVBQXlCLEtBQUtELFlBQTlCLENBQUQsQ0FBNkN3RyxFQUE3QyxDQUFnRCxPQUFoRCxFQUF5RCxTQUFTNEIsVUFBVCxHQUFzQjtBQUMzRTFDLFlBQU0sR0FBRyxLQUFLMkMsS0FBZDtBQUNILEtBRkQsRUFFR0MsTUFGSCxDQUVVLFVBQUFuRyxLQUFLLEVBQUk7QUFDZixVQUFNb0MsT0FBTyxHQUFHdEUsQ0FBQyxDQUFDa0MsS0FBSyxDQUFDZ0csYUFBUCxDQUFqQjtBQUNBaEcsV0FBSyxDQUFDRSxjQUFOO0FBQ0FGLFdBQUssQ0FBQ29HLHdCQUFOLEdBSGUsQ0FLZjs7QUFDQTlDLDZCQUF1QixDQUFDbEIsT0FBRCxFQUFVbUIsTUFBVixDQUF2QjtBQUNILEtBVEQ7QUFXQXpGLEtBQUMsQ0FBQyxjQUFELEVBQWlCLEtBQUtELFlBQXRCLENBQUQsQ0FBcUN3RyxFQUFyQyxDQUF3QyxPQUF4QyxFQUFpRCxVQUFBckUsS0FBSyxFQUFJO0FBQ3REQSxXQUFLLENBQUNvRyx3QkFBTjtBQUNBLFVBQU0vRCxNQUFNLEdBQUd2RSxDQUFDLENBQUNrQyxLQUFLLENBQUNnRyxhQUFQLENBQUQsQ0FBdUJuRSxJQUF2QixDQUE0QixZQUE1QixDQUFmO0FBQ0EsVUFBTXdFLE1BQU0sR0FBR3ZJLENBQUMsQ0FBQ2tDLEtBQUssQ0FBQ2dHLGFBQVAsQ0FBRCxDQUF1Qm5FLElBQXZCLENBQTRCLGVBQTVCLENBQWY7QUFDQWlCLDBFQUFJLENBQUM7QUFDRC9CLFlBQUksRUFBRXNGLE1BREw7QUFFRHRELFlBQUksRUFBRSxTQUZMO0FBR0R1RCx3QkFBZ0IsRUFBRTtBQUhqQixPQUFELENBQUosQ0FJR3pDLElBSkgsQ0FJUSxZQUFNO0FBQ1Y7QUFDQUYsc0JBQWMsQ0FBQ3RCLE1BQUQsQ0FBZDtBQUNILE9BUEQ7QUFRQXJDLFdBQUssQ0FBQ0UsY0FBTjtBQUNILEtBYkQ7QUFlQXBDLEtBQUMsQ0FBQyxrQkFBRCxFQUFxQixLQUFLRCxZQUExQixDQUFELENBQXlDd0csRUFBekMsQ0FBNEMsT0FBNUMsRUFBcUQsVUFBQXJFLEtBQUssRUFBSTtBQUMxRCxVQUFNcUMsTUFBTSxHQUFHdkUsQ0FBQyxDQUFDa0MsS0FBSyxDQUFDZ0csYUFBUCxDQUFELENBQXVCbkUsSUFBdkIsQ0FBNEIsVUFBNUIsQ0FBZjtBQUVBN0IsV0FBSyxDQUFDRSxjQUFOLEdBSDBELENBSTFEOztBQUNBLFlBQUksQ0FBQzRELGVBQUwsQ0FBcUJ6QixNQUFyQjtBQUNILEtBTkQ7QUFPSCxHOztTQUVEa0UsbUIsR0FBQSwrQkFBc0I7QUFBQTs7QUFDbEIsUUFBTUMsZ0JBQWdCLEdBQUcxSSxDQUFDLENBQUMsY0FBRCxDQUExQjtBQUNBLFFBQU0ySSxXQUFXLEdBQUczSSxDQUFDLENBQUMsY0FBRCxDQUFyQjtBQUNBLFFBQU00SSxVQUFVLEdBQUc1SSxDQUFDLENBQUMscUJBQUQsRUFBd0IySSxXQUF4QixDQUFwQjtBQUVBM0ksS0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0J1RyxFQUF0QixDQUF5QixPQUF6QixFQUFrQyxVQUFBckUsS0FBSyxFQUFJO0FBQ3ZDQSxXQUFLLENBQUNFLGNBQU47QUFFQXBDLE9BQUMsQ0FBQ2tDLEtBQUssQ0FBQ2dHLGFBQVAsQ0FBRCxDQUF1QjlILElBQXZCO0FBQ0FzSSxzQkFBZ0IsQ0FBQ3JHLElBQWpCO0FBQ0FyQyxPQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QnFDLElBQXpCO0FBQ0F1RyxnQkFBVSxDQUFDYixPQUFYLENBQW1CLE9BQW5CO0FBQ0gsS0FQRDtBQVNBL0gsS0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUJ1RyxFQUF6QixDQUE0QixPQUE1QixFQUFxQyxVQUFBckUsS0FBSyxFQUFJO0FBQzFDQSxXQUFLLENBQUNFLGNBQU47QUFFQXNHLHNCQUFnQixDQUFDdEksSUFBakI7QUFDQUosT0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUJJLElBQXpCO0FBQ0FKLE9BQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCcUMsSUFBdEI7QUFDSCxLQU5EO0FBUUFzRyxlQUFXLENBQUNwQyxFQUFaLENBQWUsUUFBZixFQUF5QixVQUFBckUsS0FBSyxFQUFJO0FBQzlCLFVBQU0yRyxJQUFJLEdBQUdELFVBQVUsQ0FBQzlGLEdBQVgsRUFBYjtBQUVBWixXQUFLLENBQUNFLGNBQU4sR0FIOEIsQ0FLOUI7O0FBQ0EsVUFBSSxDQUFDeUcsSUFBTCxFQUFXO0FBQ1AsZUFBTzdELG9FQUFJLENBQUM7QUFDUi9CLGNBQUksRUFBRTJGLFVBQVUsQ0FBQzdFLElBQVgsQ0FBZ0IsT0FBaEIsQ0FERTtBQUVSa0IsY0FBSSxFQUFFO0FBRkUsU0FBRCxDQUFYO0FBSUg7O0FBRUQzRCx3RUFBSyxDQUFDQyxHQUFOLENBQVUyRCxJQUFWLENBQWU0RCxTQUFmLENBQXlCRCxJQUF6QixFQUErQixVQUFDbEgsR0FBRCxFQUFNMEIsUUFBTixFQUFtQjtBQUM5QyxZQUFJQSxRQUFRLENBQUNVLElBQVQsQ0FBY3FCLE1BQWQsS0FBeUIsU0FBN0IsRUFBd0M7QUFDcEMsZ0JBQUksQ0FBQ0UsY0FBTDtBQUNILFNBRkQsTUFFTztBQUNITiw4RUFBSSxDQUFDO0FBQ0QvQixnQkFBSSxFQUFFSSxRQUFRLENBQUNVLElBQVQsQ0FBYy9DLE1BQWQsQ0FBcUJ1RSxJQUFyQixDQUEwQixJQUExQixDQURMO0FBRUROLGdCQUFJLEVBQUU7QUFGTCxXQUFELENBQUo7QUFJSDtBQUNKLE9BVEQ7QUFVSCxLQXZCRDtBQXdCSCxHOztTQUVEOEQseUIsR0FBQSxxQ0FBNEI7QUFBQTs7QUFDeEIsUUFBTUMsY0FBYyxHQUFHaEosQ0FBQyxDQUFDLHdCQUFELENBQXhCO0FBQ0EsUUFBTWlKLFNBQVMsR0FBR2pKLENBQUMsQ0FBQyw2QkFBRCxDQUFuQjtBQUNBLFFBQU1rSixVQUFVLEdBQUdsSixDQUFDLENBQUMsbUJBQUQsRUFBc0JpSixTQUF0QixDQUFwQjtBQUVBakosS0FBQyxDQUFDLHVCQUFELENBQUQsQ0FBMkJ1RyxFQUEzQixDQUE4QixPQUE5QixFQUF1QyxVQUFBckUsS0FBSyxFQUFJO0FBQzVDQSxXQUFLLENBQUNFLGNBQU47QUFDQXBDLE9BQUMsQ0FBQ2tDLEtBQUssQ0FBQ2dHLGFBQVAsQ0FBRCxDQUF1QmlCLE1BQXZCO0FBQ0FILG9CQUFjLENBQUNHLE1BQWY7QUFDQW5KLE9BQUMsQ0FBQywwQkFBRCxDQUFELENBQThCbUosTUFBOUI7QUFDSCxLQUxEO0FBT0FuSixLQUFDLENBQUMsMEJBQUQsQ0FBRCxDQUE4QnVHLEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFVBQUFyRSxLQUFLLEVBQUk7QUFDL0NBLFdBQUssQ0FBQ0UsY0FBTjtBQUNBNEcsb0JBQWMsQ0FBQ0csTUFBZjtBQUNBbkosT0FBQyxDQUFDLHVCQUFELENBQUQsQ0FBMkJtSixNQUEzQjtBQUNBbkosT0FBQyxDQUFDLDBCQUFELENBQUQsQ0FBOEJtSixNQUE5QjtBQUNILEtBTEQ7QUFPQUYsYUFBUyxDQUFDMUMsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBQXJFLEtBQUssRUFBSTtBQUM1QixVQUFNMkcsSUFBSSxHQUFHSyxVQUFVLENBQUNwRyxHQUFYLEVBQWI7QUFFQVosV0FBSyxDQUFDRSxjQUFOOztBQUVBLFVBQUksQ0FBQ2dILGtGQUFhLENBQUNQLElBQUQsQ0FBbEIsRUFBMEI7QUFDdEIsZUFBTzdELG9FQUFJLENBQUM7QUFDUi9CLGNBQUksRUFBRWlHLFVBQVUsQ0FBQ25GLElBQVgsQ0FBZ0IsT0FBaEIsQ0FERTtBQUVSa0IsY0FBSSxFQUFFO0FBRkUsU0FBRCxDQUFYO0FBSUg7O0FBRUQzRCx3RUFBSyxDQUFDQyxHQUFOLENBQVUyRCxJQUFWLENBQWVtRSxvQkFBZixDQUFvQ1IsSUFBcEMsRUFBMEMsVUFBQ2xILEdBQUQsRUFBTTJILElBQU4sRUFBZTtBQUNyRCxZQUFJQSxJQUFJLENBQUN2RixJQUFMLENBQVVxQixNQUFWLEtBQXFCLFNBQXpCLEVBQW9DO0FBQ2hDLGlCQUFJLENBQUNFLGNBQUw7QUFDSCxTQUZELE1BRU87QUFDSE4sOEVBQUksQ0FBQztBQUNEL0IsZ0JBQUksRUFBRXFHLElBQUksQ0FBQ3ZGLElBQUwsQ0FBVS9DLE1BQVYsQ0FBaUJ1RSxJQUFqQixDQUFzQixJQUF0QixDQURMO0FBRUROLGdCQUFJLEVBQUU7QUFGTCxXQUFELENBQUo7QUFJSDtBQUNKLE9BVEQ7QUFVSCxLQXRCRDtBQXVCSCxHOztTQUVEc0Usc0IsR0FBQSxrQ0FBeUI7QUFBQTs7QUFDckIsUUFBTXBHLEtBQUssR0FBR0Msa0VBQVksRUFBMUI7QUFFQXBELEtBQUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCdUcsRUFBMUIsQ0FBNkIsT0FBN0IsRUFBc0MsVUFBQXJFLEtBQUssRUFBSTtBQUMzQyxVQUFNcUMsTUFBTSxHQUFHdkUsQ0FBQyxDQUFDa0MsS0FBSyxDQUFDZ0csYUFBUCxDQUFELENBQXVCbkUsSUFBdkIsQ0FBNEIsY0FBNUIsQ0FBZjtBQUNBLFVBQU1rQyxPQUFPLEdBQUc7QUFDWnZFLGdCQUFRLEVBQUU7QUFERSxPQUFoQjtBQUlBUSxXQUFLLENBQUNFLGNBQU47QUFFQWUsV0FBSyxDQUFDSyxJQUFOO0FBRUFsQyx3RUFBSyxDQUFDQyxHQUFOLENBQVUyRCxJQUFWLENBQWVzRSwwQkFBZixDQUEwQ2pGLE1BQTFDLEVBQWtEMEIsT0FBbEQsRUFBMkQsVUFBQ3RFLEdBQUQsRUFBTTBCLFFBQU4sRUFBbUI7QUFDMUVGLGFBQUssQ0FBQ0csYUFBTixDQUFvQkQsUUFBUSxDQUFDK0MsT0FBN0I7O0FBRUEsZUFBSSxDQUFDQyxvQkFBTDtBQUNILE9BSkQ7QUFLSCxLQWZEO0FBZ0JILEc7O1NBRURBLG9CLEdBQUEsZ0NBQXVCO0FBQ25CckcsS0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEJ1RyxFQUExQixDQUE2QixRQUE3QixFQUF1QyxVQUFBckUsS0FBSyxFQUFJO0FBQzVDLFVBQU11SCxPQUFPLEdBQUd6SixDQUFDLENBQUNrQyxLQUFLLENBQUNnRyxhQUFQLENBQWpCO0FBQ0EsVUFBTXdCLEVBQUUsR0FBR0QsT0FBTyxDQUFDM0csR0FBUixFQUFYO0FBQ0EsVUFBTUosS0FBSyxHQUFHK0csT0FBTyxDQUFDMUYsSUFBUixDQUFhLE9BQWIsQ0FBZDs7QUFFQSxVQUFJLENBQUMyRixFQUFMLEVBQVM7QUFDTDtBQUNIOztBQUVELFVBQU1DLFlBQVksR0FBR0YsT0FBTyxDQUFDbEgsSUFBUixtQkFBNkJtSCxFQUE3QixRQUFvQzNGLElBQXBDLENBQXlDLGNBQXpDLENBQXJCO0FBRUEvRCxPQUFDLDBCQUF3QjBDLEtBQXhCLENBQUQsQ0FBa0N0QyxJQUFsQztBQUNBSixPQUFDLDBCQUF3QjBDLEtBQXhCLFNBQWlDZ0gsRUFBakMsQ0FBRCxDQUF3Q3JILElBQXhDOztBQUVBLFVBQUlzSCxZQUFKLEVBQWtCO0FBQ2QzSixTQUFDLDRCQUEwQjBDLEtBQTFCLENBQUQsQ0FBb0NMLElBQXBDO0FBQ0gsT0FGRCxNQUVPO0FBQ0hyQyxTQUFDLDRCQUEwQjBDLEtBQTFCLENBQUQsQ0FBb0N0QyxJQUFwQztBQUNIO0FBQ0osS0FuQkQ7QUFxQkFKLEtBQUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCK0gsT0FBMUIsQ0FBa0MsUUFBbEM7O0FBRUEsYUFBUzZCLFdBQVQsR0FBdUI7QUFDbkIsVUFBTXhCLEtBQUssR0FBR3BJLENBQUMsQ0FBQywyQ0FBRCxDQUFELENBQStDOEMsR0FBL0MsRUFBZDtBQUNBLFVBQU0rRyxXQUFXLEdBQUc3SixDQUFDLENBQUMsc0JBQUQsQ0FBckI7QUFDQSxVQUFNOEosVUFBVSxHQUFHOUosQ0FBQyxDQUFDLHdCQUFELENBQXBCOztBQUVBLFVBQUlvSSxLQUFLLEtBQUssTUFBZCxFQUFzQjtBQUNsQnlCLG1CQUFXLENBQUN4SCxJQUFaO0FBQ0F5SCxrQkFBVSxDQUFDMUosSUFBWDtBQUNILE9BSEQsTUFHTztBQUNIeUosbUJBQVcsQ0FBQ3pKLElBQVo7QUFDQTBKLGtCQUFVLENBQUN6SCxJQUFYO0FBQ0g7QUFDSjs7QUFFRHJDLEtBQUMsQ0FBQyx1QkFBRCxDQUFELENBQTJCdUcsRUFBM0IsQ0FBOEIsT0FBOUIsRUFBdUNxRCxXQUF2QztBQUVBQSxlQUFXO0FBQ2QsRzs7U0FFRDlJLFUsR0FBQSxzQkFBYTtBQUFBOztBQUNULFNBQUtrSCxjQUFMO0FBQ0EsU0FBS1MsbUJBQUw7QUFDQSxTQUFLYyxzQkFBTDtBQUNBLFNBQUtSLHlCQUFMO0FBRUEsU0FBS3ZJLEtBQUwsQ0FBVytGLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLGtCQUF2QixFQUEyQyxVQUFBckUsS0FBSyxFQUFJO0FBQ2hELGFBQUksQ0FBQ0QsV0FBTCxDQUFpQkMsS0FBakIsRUFBd0IsT0FBSSxDQUFDMUIsS0FBTCxDQUFXLENBQVgsQ0FBeEI7QUFDSCxLQUZEO0FBSUEsU0FBS0MsUUFBTCxDQUFjOEYsRUFBZCxDQUFpQixPQUFqQixFQUEwQixVQUFBckUsS0FBSyxFQUFJO0FBQy9CLGFBQUksQ0FBQ2dCLFdBQUwsQ0FBaUJoQixLQUFqQjtBQUNILEtBRkQ7QUFJQSxTQUFLdkIsU0FBTCxDQUFlNEYsRUFBZixDQUFrQixPQUFsQixFQUEyQiw0QkFBM0IsRUFBeUQsVUFBQXJFLEtBQUssRUFBSTtBQUM5RCxhQUFJLENBQUN1QixVQUFMLENBQWdCdkIsS0FBaEI7QUFDSCxLQUZELEVBZFMsQ0FrQlQ7O0FBQ0EsU0FBSzZILGlCQUFMLEdBQXlCLElBQUlDLGdFQUFKLENBQXNCaEssQ0FBQyxDQUFDLDJCQUFELENBQXZCLENBQXpCO0FBQ0gsRzs7O0VBampCNkJpSyxxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVxQkQsaUI7QUFDakIsNkJBQVlFLFFBQVosRUFBc0I7QUFDbEIsU0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFFQSxTQUFLQyxNQUFMLEdBQWNuSyxDQUFDLENBQUMsMkJBQUQsRUFBOEIsS0FBS2tLLFFBQW5DLENBQWY7QUFDQSxTQUFLRSxrQkFBTDtBQUNBLFNBQUtDLHNCQUFMO0FBQ0EsU0FBS0MsbUJBQUw7QUFDSDs7OztTQUVERixrQixHQUFBLDhCQUFxQjtBQUFBOztBQUNqQixTQUFLTCxpQkFBTCxHQUF5QiwrQkFBekI7QUFDQSxTQUFLUSxpQkFBTCxHQUF5QkMsMkRBQUcsQ0FBQztBQUN6QnRHLFlBQU0sRUFBSyxLQUFLNkYsaUJBQVY7QUFEbUIsS0FBRCxDQUE1QjtBQUlBL0osS0FBQyxDQUFDLDJCQUFELEVBQThCLEtBQUtrSyxRQUFuQyxDQUFELENBQThDM0QsRUFBOUMsQ0FBaUQsT0FBakQsRUFBMEQsVUFBQXJFLEtBQUssRUFBSTtBQUMvRDtBQUNBO0FBQ0E7QUFDQSxVQUFJbEMsQ0FBQyxDQUFJLEtBQUksQ0FBQytKLGlCQUFULHdDQUFELENBQStEakgsR0FBL0QsRUFBSixFQUEwRTtBQUN0RSxhQUFJLENBQUN5SCxpQkFBTCxDQUF1QkUsWUFBdkI7QUFDSDs7QUFFRCxVQUFJLEtBQUksQ0FBQ0YsaUJBQUwsQ0FBdUJHLE1BQXZCLENBQThCLE9BQTlCLENBQUosRUFBNEM7QUFDeEM7QUFDSDs7QUFFRHhJLFdBQUssQ0FBQ0UsY0FBTjtBQUNILEtBYkQ7QUFlQSxTQUFLdUksY0FBTDtBQUNBLFNBQUtDLG1CQUFMO0FBQ0EsU0FBS0MsWUFBTDtBQUNILEc7O1NBRURGLGMsR0FBQSwwQkFBaUI7QUFDYixTQUFLSixpQkFBTCxDQUF1Qk8sR0FBdkIsQ0FBMkIsQ0FDdkI7QUFDSUMsY0FBUSxFQUFLLEtBQUtoQixpQkFBVix1Q0FEWjtBQUVJaUIsY0FBUSxFQUFFLGtCQUFDQyxFQUFELEVBQUtuSSxHQUFMLEVBQWE7QUFDbkIsWUFBTW9JLFNBQVMsR0FBR3hGLE1BQU0sQ0FBQzVDLEdBQUQsQ0FBeEI7QUFDQSxZQUFNa0UsTUFBTSxHQUFHa0UsU0FBUyxLQUFLLENBQWQsSUFBbUIsQ0FBQ3hGLE1BQU0sQ0FBQ0UsS0FBUCxDQUFhc0YsU0FBYixDQUFuQztBQUVBRCxVQUFFLENBQUNqRSxNQUFELENBQUY7QUFDSCxPQVBMO0FBUUltRSxrQkFBWSxFQUFFO0FBUmxCLEtBRHVCLENBQTNCO0FBWUgsRzs7U0FFRFAsbUIsR0FBQSwrQkFBc0I7QUFBQTs7QUFDbEIsU0FBS0wsaUJBQUwsQ0FBdUJPLEdBQXZCLENBQTJCLENBQ3ZCO0FBQ0lDLGNBQVEsRUFBRS9LLENBQUMsQ0FBSSxLQUFLK0osaUJBQVQsc0NBRGY7QUFFSWlCLGNBQVEsRUFBRSxrQkFBQ0MsRUFBRCxFQUFRO0FBQ2QsWUFBSWpFLE1BQUo7QUFFQSxZQUFNb0UsSUFBSSxHQUFHcEwsQ0FBQyxDQUFJLE1BQUksQ0FBQytKLGlCQUFULHNDQUFkOztBQUVBLFlBQUlxQixJQUFJLENBQUNqSyxNQUFULEVBQWlCO0FBQ2IsY0FBTWtLLE1BQU0sR0FBR0QsSUFBSSxDQUFDdEksR0FBTCxFQUFmO0FBRUFrRSxnQkFBTSxHQUFHcUUsTUFBTSxJQUFJQSxNQUFNLENBQUNsSyxNQUFqQixJQUEyQmtLLE1BQU0sS0FBSyxnQkFBL0M7QUFDSDs7QUFFREosVUFBRSxDQUFDakUsTUFBRCxDQUFGO0FBQ0gsT0FkTDtBQWVJbUUsa0JBQVksRUFBRTtBQWZsQixLQUR1QixDQUEzQjtBQW1CSDtBQUVEOzs7OztTQUdBTixZLEdBQUEsd0JBQWU7QUFDWCxRQUFNUyxhQUFhLEdBQUcsK0JBQXRCO0FBRUF0TCxLQUFDLENBQUMsTUFBRCxDQUFELENBQVV1RyxFQUFWLENBQWEsT0FBYixFQUFzQitFLGFBQXRCLEVBQXFDLFVBQUNwSixLQUFELEVBQVc7QUFDNUMsVUFBTXFKLGlCQUFpQixHQUFHdkwsQ0FBQyxDQUFDLHNCQUFELENBQTNCO0FBQ0EsVUFBTXdMLHFCQUFxQixHQUFHeEwsQ0FBQyxDQUFDLDBCQUFELENBQS9CO0FBRUFrQyxXQUFLLENBQUNFLGNBQU47QUFFQW1KLHVCQUFpQixDQUFDRSxXQUFsQixDQUE4QixrQkFBOUI7QUFDQUQsMkJBQXFCLENBQUNDLFdBQXRCLENBQWtDLGtCQUFsQztBQUNILEtBUkQ7QUFTSCxHOztTQUVEcEIsc0IsR0FBQSxrQ0FBeUI7QUFBQTs7QUFDckIsUUFBSXFCLEtBQUosQ0FEcUIsQ0FHckI7O0FBQ0FDLHlFQUFZLENBQUMsS0FBS3hCLE1BQU4sRUFBYyxLQUFLeUIsT0FBbkIsRUFBNEI7QUFBRUMsb0JBQWMsRUFBRTtBQUFsQixLQUE1QixFQUFzRCxVQUFDbEssR0FBRCxFQUFNbUssS0FBTixFQUFnQjtBQUM5RSxVQUFJbkssR0FBSixFQUFTO0FBQ0xxRCwyRUFBSSxDQUFDO0FBQ0QvQixjQUFJLEVBQUV0QixHQURMO0FBRURzRCxjQUFJLEVBQUU7QUFGTCxTQUFELENBQUo7QUFLQSxjQUFNLElBQUlyRCxLQUFKLENBQVVELEdBQVYsQ0FBTjtBQUNIOztBQUVELFVBQU1vSyxNQUFNLEdBQUcvTCxDQUFDLENBQUM4TCxLQUFELENBQWhCOztBQUVBLFVBQUksTUFBSSxDQUFDdkIsaUJBQUwsQ0FBdUJ5QixTQUF2QixDQUFpQyxNQUFJLENBQUM3QixNQUF0QyxNQUFrRCxXQUF0RCxFQUFtRTtBQUMvRCxjQUFJLENBQUNJLGlCQUFMLENBQXVCbEYsTUFBdkIsQ0FBOEIsTUFBSSxDQUFDOEUsTUFBbkM7QUFDSDs7QUFFRCxVQUFJdUIsS0FBSixFQUFXO0FBQ1AsY0FBSSxDQUFDbkIsaUJBQUwsQ0FBdUJsRixNQUF2QixDQUE4QnFHLEtBQTlCO0FBQ0g7O0FBRUQsVUFBSUssTUFBTSxDQUFDRSxFQUFQLENBQVUsUUFBVixDQUFKLEVBQXlCO0FBQ3JCUCxhQUFLLEdBQUdJLEtBQVI7O0FBQ0EsY0FBSSxDQUFDbEIsbUJBQUw7QUFDSCxPQUhELE1BR087QUFDSG1CLGNBQU0sQ0FBQ2hKLElBQVAsQ0FBWSxhQUFaLEVBQTJCLGdCQUEzQjtBQUNBbUoscUVBQVUsQ0FBQ0Msc0JBQVgsQ0FBa0NMLEtBQWxDO0FBQ0gsT0ExQjZFLENBNEI5RTtBQUNBO0FBQ0E7OztBQUNBOUwsT0FBQyxDQUFDLE1BQUksQ0FBQytKLGlCQUFOLENBQUQsQ0FBMEJ4SCxJQUExQixDQUErQixzQkFBL0IsRUFBdUQ2SixXQUF2RCxDQUFtRSxxQkFBbkU7QUFDSCxLQWhDVyxDQUFaO0FBaUNILEc7O1NBRUQ5QixtQixHQUFBLCtCQUFzQjtBQUNsQixRQUFNK0IsbUJBQW1CLEdBQUdyTSxDQUFDLENBQUMscUJBQUQsQ0FBN0I7QUFDQSxRQUFNc00sY0FBYyxHQUFHdE0sQ0FBQyxDQUFDLGlCQUFELENBQXhCO0FBRUFzTSxrQkFBYyxDQUFDL0YsRUFBZixDQUFrQixRQUFsQixFQUE0QixVQUFBckUsS0FBSyxFQUFJO0FBQ2pDLFVBQU1xSyxNQUFNLEdBQUc7QUFDWEMsa0JBQVUsRUFBRXhNLENBQUMsQ0FBQywyQkFBRCxFQUE4QnNNLGNBQTlCLENBQUQsQ0FBK0N4SixHQUEvQyxFQUREO0FBRVgySixnQkFBUSxFQUFFek0sQ0FBQyxDQUFDLHlCQUFELEVBQTRCc00sY0FBNUIsQ0FBRCxDQUE2Q3hKLEdBQTdDLEVBRkM7QUFHWDRKLFlBQUksRUFBRTFNLENBQUMsQ0FBQyx3QkFBRCxFQUEyQnNNLGNBQTNCLENBQUQsQ0FBNEN4SixHQUE1QyxFQUhLO0FBSVg2SixnQkFBUSxFQUFFM00sQ0FBQyxDQUFDLHVCQUFELEVBQTBCc00sY0FBMUIsQ0FBRCxDQUEyQ3hKLEdBQTNDO0FBSkMsT0FBZjtBQU9BWixXQUFLLENBQUNFLGNBQU47QUFFQWQsd0VBQUssQ0FBQ0MsR0FBTixDQUFVMkQsSUFBVixDQUFlMEgsaUJBQWYsQ0FBaUNMLE1BQWpDLEVBQXlDLHNCQUF6QyxFQUFpRSxVQUFDNUssR0FBRCxFQUFNMEIsUUFBTixFQUFtQjtBQUNoRnJELFNBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCb0IsSUFBdEIsQ0FBMkJpQyxRQUFRLENBQUMrQyxPQUFwQyxFQURnRixDQUdoRjs7QUFDQXBHLFNBQUMsQ0FBQyx3QkFBRCxDQUFELENBQTRCdUcsRUFBNUIsQ0FBK0IsT0FBL0IsRUFBd0MsVUFBQXNHLFVBQVUsRUFBSTtBQUNsRCxjQUFNQyxPQUFPLEdBQUc5TSxDQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QjhDLEdBQTdCLEVBQWhCO0FBRUErSixvQkFBVSxDQUFDekssY0FBWDtBQUVBZCw0RUFBSyxDQUFDQyxHQUFOLENBQVUyRCxJQUFWLENBQWU2SCxtQkFBZixDQUFtQ0QsT0FBbkMsRUFBNEMsWUFBTTtBQUM5Q3BGLGtCQUFNLENBQUMzRixRQUFQLENBQWdCNEYsTUFBaEI7QUFDSCxXQUZEO0FBR0gsU0FSRDtBQVNILE9BYkQ7QUFjSCxLQXhCRDtBQTBCQTNILEtBQUMsQ0FBQyx5QkFBRCxDQUFELENBQTZCdUcsRUFBN0IsQ0FBZ0MsT0FBaEMsRUFBeUMsVUFBQXJFLEtBQUssRUFBSTtBQUM5Q0EsV0FBSyxDQUFDRSxjQUFOO0FBRUFwQyxPQUFDLENBQUNrQyxLQUFLLENBQUNnRyxhQUFQLENBQUQsQ0FBdUI5SCxJQUF2QjtBQUNBaU0seUJBQW1CLENBQUNELFdBQXBCLENBQWdDLGtCQUFoQztBQUNBcE0sT0FBQyxDQUFDLHlCQUFELENBQUQsQ0FBNkJxQyxJQUE3QjtBQUNILEtBTkQ7QUFTQXJDLEtBQUMsQ0FBQyx5QkFBRCxDQUFELENBQTZCdUcsRUFBN0IsQ0FBZ0MsT0FBaEMsRUFBeUMsVUFBQXJFLEtBQUssRUFBSTtBQUM5Q0EsV0FBSyxDQUFDRSxjQUFOO0FBRUFpSyx5QkFBbUIsQ0FBQ1csUUFBcEIsQ0FBNkIsa0JBQTdCO0FBQ0FoTixPQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QnFDLElBQTdCO0FBQ0FyQyxPQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QkksSUFBN0I7QUFDSCxLQU5EO0FBT0gsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckxMO0FBQWUseUVBQVU2TSxJQUFWLEVBQWdCO0FBQzNCLE1BQUksT0FBT0EsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUMxQixXQUFPLEtBQVA7QUFDSCxHQUgwQixDQUszQjs7O0FBQ0EsU0FBTyxJQUFQO0FBQ0gsQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgZ2lmdENlcnRDaGVjayBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XG5pbXBvcnQgU2hpcHBpbmdFc3RpbWF0b3IgZnJvbSAnLi9jYXJ0L3NoaXBwaW5nLWVzdGltYXRvcic7XG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgc3dhbCBmcm9tICcuL2dsb2JhbC9zd2VldC1hbGVydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy4kY2FydENvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0LWNvbnRlbnRdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcyA9ICQoJ1tkYXRhLWNhcnQtc3RhdHVzXScpO1xuICAgICAgICB0aGlzLiRjYXJ0VG90YWxzID0gJCgnW2RhdGEtY2FydC10b3RhbHNdJyk7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCdbZGF0YS1jYXJ0XSAubG9hZGluZ092ZXJsYXknKVxuICAgICAgICAgICAgLmhpZGUoKTsgLy8gVE9ETzogdGVtcG9yYXJ5IHVudGlsIHJvcGVyIHB1bGxzIGluIGhpcyBjYXJ0IGNvbXBvbmVudHNcblxuICAgICAgICAvLyBDbGFzc2VzXG4gICAgICAgIHRoaXMuY2xhc3NSb3cgPSAnLmNhcnQtaXRlbS10aXRsZSc7XG4gICAgICAgIHRoaXMuY2xhc3NSZXN1bHRNZXNzYWdlID0gJy5saXN0LWZlZWRiYWNrJztcblxuICAgICAgICAvLyBDbGFzcyBuYW1lc1xuICAgICAgICB0aGlzLmNsYXNzTmFtZVJvd0Vycm9yID0gJ2xpc3QtYWRkX19yb3ctLWVycm9yJztcblxuICAgICAgICAvLyBGdW5jdGlvbmFsIGFzc2lnbm1lbnRzXG4gICAgICAgIHRoaXMuJGZvcm0gPSAkKCcuY2FydC1saXN0LWZvcm0nKTtcbiAgICAgICAgdGhpcy4kbmV3TGlzdCA9ICQoJy5hZGQtbmV3LWxpc3QnKTtcbiAgICAgICAgdGhpcy4kYWRkaW5nT3ZlcmxheSA9ICQoJy5sb2FkaW5nLW92ZXJsYXknKTtcbiAgICAgICAgdGhpcy4kZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuICAgICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICByZXNldFN0YXRlKCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudExvb3AgPSAwO1xuICAgIH1cblxuICAgIC8vIFJ1biBBSkFYIGNhbGxzIG9uZSBieSBvbmVcbiAgICBoYW5kbGVBamF4KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50TG9vcCA8IHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKHRoaXMuY2xhc3NSZXN1bHRNZXNzYWdlKS5odG1sKGBTYXZpbmc8YnI+ICR7dGhpcy5pdGVtc1t0aGlzLmN1cnJlbnRMb29wXS5wbmFtZX08YnI+IHRvIHlvdXIgbGlzdGApO1xuICAgICAgICAgICAgdXRpbHMuYXBpLmdldFBhZ2UodGhpcy5pdGVtc1t0aGlzLmN1cnJlbnRMb29wXS51cmwsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2YvYjJiL2FkZC10by1saXN0LXJlc3BvbnNlJyxcbiAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEluY3JlbWVudCAnY3VycmVudCcgYW5kIHJ1biBBSkFYIGNhbGwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMb29wKys7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBamF4KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExhc3QgYXR0ZW1wdCwgcmVkaXJlY3Qgb25seVxuICAgICAgICBpZiAodGhpcy5jdXJyZW50TG9vcCA9PT0gdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuJGFkZGluZ092ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0VGFyZ2V0ICE9PSAnJyAmJiB0aGlzLmxpc3RUYXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBgL3dpc2hsaXN0LnBocD9hY3Rpb249dmlld3dpc2hsaXN0aXRlbXMke3RoaXMubGlzdFRhcmdldH1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJy93aXNobGlzdC5waHAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gJCgnLm11bHRpX2FkZF9fY2FydC1idXR0b24nKS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gICAgICAgICAgICAvLyAkKCcubXVsdGktYWRkX19yb3dbZGF0YS1zdGF0dXM9c3VjY2Vzc10nKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NGb3JtKGV2ZW50LCBmb3JtKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy4kYWRkaW5nT3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgY29uc3QgYWxsUm93cyA9ICQoZm9ybSkuZmluZCh0aGlzLmNsYXNzUm93KTtcbiAgICAgICAgY29uc3QgYWxsTWVzc2FnZXMgPSBhbGxSb3dzLmZpbmQodGhpcy5jbGFzc1Jlc3VsdE1lc3NhZ2UpO1xuXG4gICAgICAgIHRoaXMucmVzZXRTdGF0ZSgpO1xuXG4gICAgICAgIC8vIEZvciBlYWNoIHJvdywgYWRkIHRoZSBVUkwgYW5kIHRhcmdldCB0byB0aGUgaXRlbXMgYXJyYXlcbiAgICAgICAgYWxsUm93cy5lYWNoKChpbmRleCwgcm93KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSAkKHJvdyk7XG4gICAgICAgICAgICBjb25zdCBwaWQgPSB0YXJnZXQuZmluZCgnW2RhdGEtcGlkXScpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgcG5hbWUgPSB0YXJnZXQuZmluZCgnLmNhcnQtaXRlbS1uYW1lJykuYXR0cignZGF0YS1wbmFtZScpO1xuICAgICAgICAgICAgdGhpcy5saXN0VGFyZ2V0ID0gJCgnI2xpc3QtaWQnKS52YWwoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFRhcmdldCAhPT0gJycgJiYgdGhpcy5saXN0VGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RUYXJnZXQgPSBgJndpc2hsaXN0aWQ9JHt0aGlzLmxpc3RUYXJnZXR9YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0VGFyZ2V0ID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGAvd2lzaGxpc3QucGhwP2FjdGlvbj1hZGQmcHJvZHVjdF9pZD0ke3BpZH0ke3RoaXMubGlzdFRhcmdldH1gO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIHBuYW1lLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRvIGFkZCBsYW5nIHN0cmluZ1xuICAgICAgICBhbGxNZXNzYWdlcy50ZXh0KCdTYXZpbmcgdG8gbGlzdC4uLicpLnNob3coKTtcbiAgICAgICAgdGhpcy5oYW5kbGVBamF4KCk7XG4gICAgfVxuXG4gICAgb3BlbkFkZExpc3QoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKCcvY2FydC5waHAnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2YvY2FydC9hZGQtbGlzdC1mb3JtJyxcbiAgICAgICAgfSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICQoJyN3aXNobGlzdG5hbWUnKS5zZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbW9kYWwub3BlbigpO1xuICAgIH1cblxuICAgIGFkZE5ld0xpc3QoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuICAgICAgICBjb25zdCBsaXN0TmFtZSA9ICQoJyN3aXNobGlzdG5hbWUnKS52YWwoKTtcbiAgICAgICAgY29uc3Qgc2hhcmVkTGlzdCA9ICQoJyNwdWJsaWN3aXNobGlzdCcpLnZhbCgpO1xuICAgICAgICBjb25zdCB0YXJnZXRVcmwgPSAnL3dpc2hsaXN0LnBocD9hY3Rpb249YWRkd2lzaGxpc3QmcHJvZHVjdF9pZD0nO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogdGFyZ2V0VXJsLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHdpc2hsaXN0bmFtZTogbGlzdE5hbWUsXG4gICAgICAgICAgICAgICAgcHVibGljd2lzaGxpc3Q6IHNoYXJlZExpc3QsXG4gICAgICAgICAgICAgICAgc3VibWl0OiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XG4gICAgICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSgnL3dpc2hsaXN0LnBocCcsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2YvYjJiL2xpc3QtYWRkZWQtcmVzcG9uc2UnLFxuICAgICAgICAgICAgfSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSBjb250ZW50cyBvZiAnLmxpc3Qtc2VsZWN0b3InIHdpdGggcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgJCgnLmxpc3Qtc2VsZWN0b3InKS5odG1sKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtb2RhbC5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRVcGRhdGUoJHRhcmdldCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcGFyc2VJbnQoJGVsLnZhbCgpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eS1tYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHktbWluJyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHktbWluLWVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5LW1heC1lcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpID09PSAnaW5jJyA/IG9sZFF0eSArIDEgOiBvbGRRdHkgLSAxO1xuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaWZ5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXhFcnJvcixcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsID0gbnVsbCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnQtaXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eS1taW4nKSwgMTApO1xuICAgICAgICBjb25zdCBvbGRRdHkgPSBwcmVWYWwgIT09IG51bGwgPyBwcmVWYWwgOiBtaW5RdHk7XG4gICAgICAgIGNvbnN0IG5ld1F0eSA9IHBhcnNlSW50KE51bWJlcigkZWwudmFsKCkpLCAxMCk7XG5cbiAgICAgICAgbGV0IGludmFsaWRFbnRyeTtcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAobmV3UXR5IDwgMCB8fCBOdW1iZXIuaXNOYU4obmV3UXR5KSkge1xuICAgICAgICAgICAgaW52YWxpZEVudHJ5ID0gJGVsLnZhbCgpO1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICAgICAgdGV4dDogYCR7aW52YWxpZEVudHJ5fSBpcyBub3QgYSB2YWxpZCBlbnRyeWAsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0RWRpdE9wdGlvbnMoaXRlbUlkKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2NvbmZpZ3VyZS1wcm9kdWN0JyxcbiAgICAgICAgfTtcblxuICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLmNvbmZpZ3VyZUluQ2FydChpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxzLmhvb2tzLm9uKCdwcm9kdWN0LW9wdGlvbi1jaGFuZ2UnLCAoZXZlbnQsIG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGNoYW5nZWRPcHRpb24gPSAkKG9wdGlvbik7XG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICRjaGFuZ2VkT3B0aW9uLnBhcmVudHMoJ2Zvcm0nKTtcbiAgICAgICAgICAgIGNvbnN0ICRzdWJtaXQgPSAkKCdpbnB1dC5idXR0b24nLCAkZm9ybSk7XG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZUJveCA9ICQoJy5hbGVydE1lc3NhZ2VCb3gnKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSAkKCdbbmFtZT1cIml0ZW1faWRcIl0nLCAkZm9ybSkuYXR0cigndmFsdWUnKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShpdGVtLCAkZm9ybS5zZXJpYWxpemUoKSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGVycixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ3AuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWZyZXNoQ29udGVudChyZW1vdmUpIHtcbiAgICAgICAgY29uc3QgJGNhcnRJdGVtc1Jvd3MgPSAkKCdbZGF0YS1pdGVtLXJvd10nLCB0aGlzLiRjYXJ0Q29udGVudCk7XG4gICAgICAgIGNvbnN0ICRjYXJ0UGFnZVRpdGxlID0gJCgnW2RhdGEtY2FydC1wYWdlLXRpdGxlXScpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnY2FydC9jb250ZW50JyxcbiAgICAgICAgICAgICAgICB0b3RhbHM6ICdjYXJ0L3RvdGFscycsXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlczogJ2NhcnQvc3RhdHVzLW1lc3NhZ2VzJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGxhc3QgaXRlbSBmcm9tIGNhcnQ/IFJlbG9hZFxuICAgICAgICBpZiAocmVtb3ZlICYmICRjYXJ0SXRlbXNSb3dzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRDb250ZW50Lmh0bWwocmVzcG9uc2UuY29udGVudCk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0VG90YWxzLmh0bWwocmVzcG9uc2UudG90YWxzKTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcy5odG1sKHJlc3BvbnNlLnN0YXR1c01lc3NhZ2VzKTtcblxuICAgICAgICAgICAgJGNhcnRQYWdlVGl0bGUucmVwbGFjZVdpdGgocmVzcG9uc2UucGFnZVRpdGxlKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gJCgnW2RhdGEtY2FydC1xdWFudGl0eV0nLCB0aGlzLiRjYXJ0Q29udGVudCkuZGF0YSgnY2FydC1xdWFudGl0eScpIHx8IDA7XG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRDYXJ0RXZlbnRzKCkge1xuICAgICAgICBjb25zdCBkZWJvdW5jZVRpbWVvdXQgPSA0MDA7XG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGUgPSBfLmJpbmQoXy5kZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGUsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSA9IF8uYmluZChfLmRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IF8uYmluZChfLmRlYm91bmNlKHRoaXMuY2FydFJlbW92ZUl0ZW0sIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBsZXQgcHJlVmFsO1xuXG4gICAgICAgIC8vIGNhcnQgdXBkYXRlXG4gICAgICAgICQoJ1tkYXRhLWNhcnQtdXBkYXRlXScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGUoJHRhcmdldCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNhcnQgcXR5IG1hbnVhbGx5IHVwZGF0ZXNcbiAgICAgICAgJCgnLmNhcnQtaXRlbS1xdHktaW5wdXQnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2ZvY3VzJywgZnVuY3Rpb24gb25RdHlGb2N1cygpIHtcbiAgICAgICAgICAgIHByZVZhbCA9IHRoaXMudmFsdWU7XG4gICAgICAgIH0pLmNoYW5nZShldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jYXJ0LXJlbW92ZScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjb25maXJtRGVsZXRlJyk7XG4gICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNhcnRcbiAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWVkaXRdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIGVkaXQgaXRlbSBpbiBjYXJ0XG4gICAgICAgICAgICB0aGlzLmNhcnRFZGl0T3B0aW9ucyhpdGVtSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kUHJvbW9Db2RlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY291cG9uQ29udGFpbmVyID0gJCgnLmNvdXBvbi1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Gb3JtID0gJCgnLmNvdXBvbi1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjb2RlSW5wdXQgPSAkKCdbbmFtZT1cImNvdXBvbmNvZGVcIl0nLCAkY291cG9uRm9ybSk7XG5cbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuc2hvdygpO1xuICAgICAgICAgICAgJGNvZGVJbnB1dC50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLnNob3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNvdXBvbkZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY29kZUlucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBFbXB0eSBjb2RlXG4gICAgICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICRjb2RlSW5wdXQuZGF0YSgnZXJyb3InKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlDb2RlKGNvZGUsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNlcnRDb250YWluZXIgPSAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0Rm9ybSA9ICQoJy5jYXJ0LWdpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkudG9nZ2xlKCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY2VydEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY2VydElucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoIWdpZnRDZXJ0Q2hlY2soY29kZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICRjZXJ0SW5wdXQuZGF0YSgnZXJyb3InKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlHaWZ0Q2VydGlmaWNhdGUoY29kZSwgKGVyciwgcmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwLmRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcC5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdFdyYXBwaW5nRXZlbnRzKCkge1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuXG4gICAgICAgICQoJ1tkYXRhLWl0ZW0tZ2lmdHdyYXBdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtR2lmdHdyYXAnKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9naWZ0LXdyYXBwaW5nLWZvcm0nLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbW9kYWwub3BlbigpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyhpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdFdyYXBwaW5nRm9ybSgpIHtcbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHNlbGVjdCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9ICRzZWxlY3QudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICRzZWxlY3QuZGF0YSgnaW5kZXgnKTtcblxuICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYWxsb3dNZXNzYWdlID0gJHNlbGVjdC5maW5kKGBvcHRpb25bdmFsdWU9JHtpZH1dYCkuZGF0YSgnYWxsb3dNZXNzYWdlJyk7XG5cbiAgICAgICAgICAgICQoYC5naWZ0V3JhcHBpbmctaW1hZ2UtJHtpbmRleH1gKS5oaWRlKCk7XG4gICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9LSR7aWR9YCkuc2hvdygpO1xuXG4gICAgICAgICAgICBpZiAoYWxsb3dNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLW1lc3NhZ2UtJHtpbmRleH1gKS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0JykudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlVmlld3MoKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICQoJ2lucHV0OnJhZGlvW25hbWUgPVwiZ2lmdHdyYXB0eXBlXCJdOmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0ICRzaW5nbGVGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1zaW5nbGUnKTtcbiAgICAgICAgICAgIGNvbnN0ICRtdWx0aUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLW11bHRpcGxlJyk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3NhbWUnKSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2luZ2xlRm9ybS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKCdbbmFtZT1cImdpZnR3cmFwdHlwZVwiXScpLm9uKCdjbGljaycsIHRvZ2dsZVZpZXdzKTtcblxuICAgICAgICB0b2dnbGVWaWV3cygpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuYmluZENhcnRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kUHJvbW9Db2RlRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMoKTtcblxuICAgICAgICB0aGlzLiRmb3JtLm9uKCdjbGljaycsICdbZGF0YS1zYXZlLWNhcnRdJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzRm9ybShldmVudCwgdGhpcy4kZm9ybVswXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJG5ld0xpc3Qub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcGVuQWRkTGlzdChldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJGRvY3VtZW50Lm9uKCdjbGljaycsICcuYWRkLW5ldy1saXN0LWZvcm0gLmJ1dHRvbicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkTmV3TGlzdChldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGluaXRpYXRlIHNoaXBwaW5nIGVzdGltYXRvciBtb2R1bGVcbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9IG5ldyBTaGlwcGluZ0VzdGltYXRvcigkKCdbZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJykpO1xuICAgIH1cbn1cbiIsImltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi4vY29tbW9uL3N0YXRlLWNvdW50cnknO1xuaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSAnLi4vY29tbW9uL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScsIHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmluaXRGb3JtVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gJ2Zvcm1bZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJztcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0JywgdGhpcy4kZWxlbWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIGEgY2hlY2sgZm9yIGFsbCBmaWVsZHMgd2hlbiBjb3VudHJ5IGhhcyBhIHZhbHVlXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgYXJlQWxsKCd2YWxpZCcpIHdpbGwgY2hlY2sgY291bnRyeSBmb3IgdmFsaWRpdHlcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRVUFNSYXRlcygpO1xuICAgIH1cblxuICAgIGJpbmRWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudHJ5SWQgIT09IDAgJiYgIU51bWJlci5pc05hTihjb3VudHJ5SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdUaGUgXFwnQ291bnRyeVxcJyBmaWVsZCBjYW5ub3QgYmUgYmxhbmsuJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZVZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCksXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRlbGUgPSAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZVZhbCA9ICRlbGUudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVsZVZhbCAmJiBlbGVWYWwubGVuZ3RoICYmIGVsZVZhbCAhPT0gJ1N0YXRlL3Byb3ZpbmNlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdUaGUgXFwnU3RhdGUvUHJvdmluY2VcXCcgZmllbGQgY2Fubm90IGJlIGJsYW5rLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgYmV0d2VlbiBkZWZhdWx0IHNoaXBwaW5nIGFuZCB1cHMgc2hpcHBpbmcgcmF0ZXNcbiAgICAgKi9cbiAgICBiaW5kVVBTUmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IFVQU1JhdGVUb2dnbGUgPSAnLmVzdGltYXRvci1mb3JtLXRvZ2dsZVVQU1JhdGUnO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBVUFNSYXRlVG9nZ2xlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtVXBzID0gJCgnLmVzdGltYXRvci1mb3JtLS11cHMnKTtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtRGVmYXVsdCA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tZGVmYXVsdCcpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybVVwcy50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1EZWZhdWx0LnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKSB7XG4gICAgICAgIGxldCAkbGFzdDtcblxuICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXG4gICAgICAgIHN0YXRlQ291bnRyeSh0aGlzLiRzdGF0ZSwgdGhpcy5jb250ZXh0LCB7IHVzZUlkRm9yU3RhdGVzOiB0cnVlIH0sIChlcnIsIGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGVycixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuZ2V0U3RhdHVzKHRoaXMuJHN0YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSh0aGlzLiRzdGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkbGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAkbGFzdCA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZmllbGQuYXR0cigncGxhY2Vob2xkZXInLCAnU3RhdGUvcHJvdmluY2UnKTtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmNsZWFuVXBTdGF0ZVZhbGlkYXRpb24oZmllbGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBXaGVuIHlvdSBjaGFuZ2UgYSBjb3VudHJ5LCB5b3Ugc3dhcCB0aGUgc3RhdGUvcHJvdmluY2UgYmV0d2VlbiBhbiBpbnB1dCBhbmQgYSBzZWxlY3QgZHJvcGRvd25cbiAgICAgICAgICAgIC8vIE5vdCBhbGwgY291bnRyaWVzIHJlcXVpcmUgdGhlIHByb3ZpbmNlIHRvIGJlIGZpbGxlZFxuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byByZW1vdmUgdGhpcyBjbGFzcyB3aGVuIHdlIHN3YXAgc2luY2Ugbm9kIHZhbGlkYXRpb24gZG9lc24ndCBjbGVhbnVwIGZvciB1c1xuICAgICAgICAgICAgJCh0aGlzLnNoaXBwaW5nRXN0aW1hdG9yKS5maW5kKCcuZm9ybS1maWVsZC0tc3VjY2VzcycpLnJlbW92ZUNsYXNzKCdmb3JtLWZpZWxkLS1zdWNjZXNzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRFc3RpbWF0b3JFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRlc3RpbWF0b3JDb250YWluZXIgPSAkKCcuc2hpcHBpbmctZXN0aW1hdG9yJyk7XG4gICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtID0gJCgnLmVzdGltYXRvci1mb3JtJyk7XG5cbiAgICAgICAgJGVzdGltYXRvckZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgc3RhdGVfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctc3RhdGVcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgY2l0eTogJCgnW25hbWU9XCJzaGlwcGluZy1jaXR5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHppcF9jb2RlOiAkKCdbbmFtZT1cInNoaXBwaW5nLXppcFwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldFNoaXBwaW5nUXVvdGVzKHBhcmFtcywgJ2NhcnQvc2hpcHBpbmctcXVvdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc2hpcHBpbmctcXVvdGVzJykuaHRtbChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIGJpbmQgdGhlIHNlbGVjdCBidXR0b25cbiAgICAgICAgICAgICAgICAkKCcuc2VsZWN0LXNoaXBwaW5nLXF1b3RlJykub24oJ2NsaWNrJywgY2xpY2tFdmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1b3RlSWQgPSAkKCcuc2hpcHBpbmctcXVvdGU6Y2hlY2tlZCcpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkuY2FydC5zdWJtaXRTaGlwcGluZ1F1b3RlKHF1b3RlSWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXNob3cnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmhpZGUoKTtcbiAgICAgICAgICAgICRlc3RpbWF0b3JDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1oaWRlJykuc2hvdygpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1oaWRlJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGVzdGltYXRvckNvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXNob3cnKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtaGlkZScpLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNlcnQpIHtcbiAgICBpZiAodHlwZW9mIGNlcnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxuICAgIHJldHVybiB0cnVlO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==