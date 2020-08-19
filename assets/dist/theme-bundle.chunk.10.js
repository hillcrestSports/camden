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

    var preVal; // DYLAN

    console.log('cart events have been bound'); // cart update

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
      var itemId = $(event.currentTarget).data('cartItemid'); // const string = $(event.currentTarget).data('confirmDelete');
      // swal({
      //     text: string,
      //     type: 'warning',
      //     showCancelButton: true,
      // }).then(() => {
      //     cartRemoveItem(itemId);
      // });
      // remove item from cart
      // DYLAN 8-10-20

      cartRemoveItem(itemId);
      console.log('cartRemoveItem function called');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvci5qcyJdLCJuYW1lcyI6WyJDYXJ0Iiwib25SZWFkeSIsIiRjYXJ0Q29udGVudCIsIiQiLCIkY2FydE1lc3NhZ2VzIiwiJGNhcnRUb3RhbHMiLCIkb3ZlcmxheSIsImhpZGUiLCJjbGFzc1JvdyIsImNsYXNzUmVzdWx0TWVzc2FnZSIsImNsYXNzTmFtZVJvd0Vycm9yIiwiJGZvcm0iLCIkbmV3TGlzdCIsIiRhZGRpbmdPdmVybGF5IiwiJGRvY3VtZW50IiwiZG9jdW1lbnQiLCJyZXNldFN0YXRlIiwiYmluZEV2ZW50cyIsIml0ZW1zIiwiZXJyb3JzIiwiY3VycmVudExvb3AiLCJoYW5kbGVBamF4IiwibGVuZ3RoIiwiaHRtbCIsInBuYW1lIiwidXRpbHMiLCJhcGkiLCJnZXRQYWdlIiwidXJsIiwidGVtcGxhdGUiLCJlcnIiLCJFcnJvciIsImxpc3RUYXJnZXQiLCJ1bmRlZmluZWQiLCJsb2NhdGlvbiIsImhyZWYiLCJwcm9jZXNzRm9ybSIsImV2ZW50IiwiZm9ybSIsInByZXZlbnREZWZhdWx0Iiwic2hvdyIsImFsbFJvd3MiLCJmaW5kIiwiYWxsTWVzc2FnZXMiLCJlYWNoIiwiaW5kZXgiLCJyb3ciLCJ0YXJnZXQiLCJwaWQiLCJ2YWwiLCJhdHRyIiwicHVzaCIsInRleHQiLCJvcGVuQWRkTGlzdCIsIm1vZGFsIiwiZGVmYXVsdE1vZGFsIiwicmVzcG9uc2UiLCJ1cGRhdGVDb250ZW50Iiwic2VsZWN0Iiwib3BlbiIsImFkZE5ld0xpc3QiLCJsaXN0TmFtZSIsInNoYXJlZExpc3QiLCJ0YXJnZXRVcmwiLCJhamF4IiwibWV0aG9kIiwiZGF0YSIsIndpc2hsaXN0bmFtZSIsInB1YmxpY3dpc2hsaXN0Iiwic3VibWl0IiwiZG9uZSIsImNsb3NlIiwiY2FydFVwZGF0ZSIsIiR0YXJnZXQiLCJpdGVtSWQiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzd2FsIiwidHlwZSIsImNhcnQiLCJpdGVtVXBkYXRlIiwic3RhdHVzIiwicmVtb3ZlIiwicmVmcmVzaENvbnRlbnQiLCJqb2luIiwiY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UiLCJwcmVWYWwiLCJOdW1iZXIiLCJpbnZhbGlkRW50cnkiLCJpc05hTiIsImNhcnRSZW1vdmVJdGVtIiwiaXRlbVJlbW92ZSIsInRoZW4iLCJjYXJ0RWRpdE9wdGlvbnMiLCJvcHRpb25zIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJjb25maWd1cmVJbkNhcnQiLCJjb250ZW50IiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJob29rcyIsIm9uIiwib3B0aW9uIiwiJGNoYW5nZWRPcHRpb24iLCJwYXJlbnRzIiwiJHN1Ym1pdCIsIiRtZXNzYWdlQm94IiwiaXRlbSIsIm9wdGlvbkNoYW5nZSIsInNlcmlhbGl6ZSIsInJlc3VsdCIsInB1cmNoYXNpbmdfbWVzc2FnZSIsInByb3AiLCJwdXJjaGFzYWJsZSIsImluc3RvY2siLCIkY2FydEl0ZW1zUm93cyIsIiRjYXJ0UGFnZVRpdGxlIiwidG90YWxzIiwicGFnZVRpdGxlIiwic3RhdHVzTWVzc2FnZXMiLCJ3aW5kb3ciLCJyZWxvYWQiLCJnZXRDb250ZW50IiwicmVwbGFjZVdpdGgiLCJxdWFudGl0eSIsInRyaWdnZXIiLCJiaW5kQ2FydEV2ZW50cyIsImRlYm91bmNlVGltZW91dCIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50VGFyZ2V0Iiwib25RdHlGb2N1cyIsInZhbHVlIiwiY2hhbmdlIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiYmluZFByb21vQ29kZUV2ZW50cyIsIiRjb3Vwb25Db250YWluZXIiLCIkY291cG9uRm9ybSIsIiRjb2RlSW5wdXQiLCJjb2RlIiwiYXBwbHlDb2RlIiwiYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cyIsIiRjZXJ0Q29udGFpbmVyIiwiJGNlcnRGb3JtIiwiJGNlcnRJbnB1dCIsInRvZ2dsZSIsImdpZnRDZXJ0Q2hlY2siLCJhcHBseUdpZnRDZXJ0aWZpY2F0ZSIsInJlc3AiLCJiaW5kR2lmdFdyYXBwaW5nRXZlbnRzIiwiZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMiLCIkc2VsZWN0IiwiaWQiLCJhbGxvd01lc3NhZ2UiLCJ0b2dnbGVWaWV3cyIsIiRzaW5nbGVGb3JtIiwiJG11bHRpRm9ybSIsInNoaXBwaW5nRXN0aW1hdG9yIiwiU2hpcHBpbmdFc3RpbWF0b3IiLCJQYWdlTWFuYWdlciIsIiRlbGVtZW50IiwiJHN0YXRlIiwiaW5pdEZvcm1WYWxpZGF0aW9uIiwiYmluZFN0YXRlQ291bnRyeUNoYW5nZSIsImJpbmRFc3RpbWF0b3JFdmVudHMiLCJzaGlwcGluZ1ZhbGlkYXRvciIsIm5vZCIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImJpbmRWYWxpZGF0aW9uIiwiYmluZFN0YXRlVmFsaWRhdGlvbiIsImJpbmRVUFNSYXRlcyIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsImNvdW50cnlJZCIsImVycm9yTWVzc2FnZSIsIiRlbGUiLCJlbGVWYWwiLCJVUFNSYXRlVG9nZ2xlIiwiJGVzdGltYXRvckZvcm1VcHMiLCIkZXN0aW1hdG9yRm9ybURlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsIiRsYXN0Iiwic3RhdGVDb3VudHJ5IiwiY29udGV4dCIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCIkZmllbGQiLCJnZXRTdGF0dXMiLCJpcyIsIlZhbGlkYXRvcnMiLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwicmVtb3ZlQ2xhc3MiLCIkZXN0aW1hdG9yQ29udGFpbmVyIiwiJGVzdGltYXRvckZvcm0iLCJwYXJhbXMiLCJjb3VudHJ5X2lkIiwic3RhdGVfaWQiLCJjaXR5IiwiemlwX2NvZGUiLCJnZXRTaGlwcGluZ1F1b3RlcyIsImNsaWNrRXZlbnQiLCJxdW90ZUlkIiwic3VibWl0U2hpcHBpbmdRdW90ZSIsImFkZENsYXNzIiwiY2VydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVxQkEsSTs7Ozs7Ozs7O1NBQ2pCQyxPLEdBQUEsbUJBQVU7QUFDTixTQUFLQyxZQUFMLEdBQW9CQyxDQUFDLENBQUMscUJBQUQsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCRCxDQUFDLENBQUMsb0JBQUQsQ0FBdEI7QUFDQSxTQUFLRSxXQUFMLEdBQW1CRixDQUFDLENBQUMsb0JBQUQsQ0FBcEI7QUFDQSxTQUFLRyxRQUFMLEdBQWdCSCxDQUFDLENBQUMsNkJBQUQsQ0FBRCxDQUNYSSxJQURXLEVBQWhCLENBSk0sQ0FLTztBQUViOztBQUNBLFNBQUtDLFFBQUwsR0FBZ0Isa0JBQWhCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEIsZ0JBQTFCLENBVE0sQ0FXTjs7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QixzQkFBekIsQ0FaTSxDQWNOOztBQUNBLFNBQUtDLEtBQUwsR0FBYVIsQ0FBQyxDQUFDLGlCQUFELENBQWQ7QUFDQSxTQUFLUyxRQUFMLEdBQWdCVCxDQUFDLENBQUMsZUFBRCxDQUFqQjtBQUNBLFNBQUtVLGNBQUwsR0FBc0JWLENBQUMsQ0FBQyxrQkFBRCxDQUF2QjtBQUNBLFNBQUtXLFNBQUwsR0FBaUJYLENBQUMsQ0FBQ1ksUUFBRCxDQUFsQjtBQUVBLFNBQUtDLFVBQUw7QUFFQSxTQUFLQyxVQUFMO0FBQ0gsRzs7U0FFREQsVSxHQUFBLHNCQUFhO0FBQ1QsU0FBS0UsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDSCxHLENBRUQ7OztTQUNBQyxVLEdBQUEsc0JBQWE7QUFBQTs7QUFDVCxR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RixrQkFBTSxDQUFDM0YsUUFBUCxDQUFnQjRGLE1BQWhCO0FBQ0gsV0FGRDtBQUdILFNBUkQ7QUFTSCxPQWJEO0FBY0gsS0F4QkQ7QUEwQkEzSCxLQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QnVHLEVBQTdCLENBQWdDLE9BQWhDLEVBQXlDLFVBQUFyRSxLQUFLLEVBQUk7QUFDOUNBLFdBQUssQ0FBQ0UsY0FBTjtBQUVBcEMsT0FBQyxDQUFDa0MsS0FBSyxDQUFDa0csYUFBUCxDQUFELENBQXVCaEksSUFBdkI7QUFDQWlNLHlCQUFtQixDQUFDRCxXQUFwQixDQUFnQyxrQkFBaEM7QUFDQXBNLE9BQUMsQ0FBQyx5QkFBRCxDQUFELENBQTZCcUMsSUFBN0I7QUFDSCxLQU5EO0FBU0FyQyxLQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QnVHLEVBQTdCLENBQWdDLE9BQWhDLEVBQXlDLFVBQUFyRSxLQUFLLEVBQUk7QUFDOUNBLFdBQUssQ0FBQ0UsY0FBTjtBQUVBaUsseUJBQW1CLENBQUNXLFFBQXBCLENBQTZCLGtCQUE3QjtBQUNBaE4sT0FBQyxDQUFDLHlCQUFELENBQUQsQ0FBNkJxQyxJQUE3QjtBQUNBckMsT0FBQyxDQUFDLHlCQUFELENBQUQsQ0FBNkJJLElBQTdCO0FBQ0gsS0FORDtBQU9ILEc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JMTDtBQUFlLHlFQUFVNk0sSUFBVixFQUFnQjtBQUMzQixNQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDMUIsV0FBTyxLQUFQO0FBQ0gsR0FIMEIsQ0FLM0I7OztBQUNBLFNBQU8sSUFBUDtBQUNILEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IGdpZnRDZXJ0Q2hlY2sgZnJvbSAnLi9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3InO1xuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuJGNhcnRDb250ZW50ID0gJCgnW2RhdGEtY2FydC1jb250ZW50XScpO1xuICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMgPSAkKCdbZGF0YS1jYXJ0LXN0YXR1c10nKTtcbiAgICAgICAgdGhpcy4kY2FydFRvdGFscyA9ICQoJ1tkYXRhLWNhcnQtdG90YWxzXScpO1xuICAgICAgICB0aGlzLiRvdmVybGF5ID0gJCgnW2RhdGEtY2FydF0gLmxvYWRpbmdPdmVybGF5JylcbiAgICAgICAgICAgIC5oaWRlKCk7IC8vIFRPRE86IHRlbXBvcmFyeSB1bnRpbCByb3BlciBwdWxscyBpbiBoaXMgY2FydCBjb21wb25lbnRzXG5cbiAgICAgICAgLy8gQ2xhc3Nlc1xuICAgICAgICB0aGlzLmNsYXNzUm93ID0gJy5jYXJ0LWl0ZW0tdGl0bGUnO1xuICAgICAgICB0aGlzLmNsYXNzUmVzdWx0TWVzc2FnZSA9ICcubGlzdC1mZWVkYmFjayc7XG5cbiAgICAgICAgLy8gQ2xhc3MgbmFtZXNcbiAgICAgICAgdGhpcy5jbGFzc05hbWVSb3dFcnJvciA9ICdsaXN0LWFkZF9fcm93LS1lcnJvcic7XG5cbiAgICAgICAgLy8gRnVuY3Rpb25hbCBhc3NpZ25tZW50c1xuICAgICAgICB0aGlzLiRmb3JtID0gJCgnLmNhcnQtbGlzdC1mb3JtJyk7XG4gICAgICAgIHRoaXMuJG5ld0xpc3QgPSAkKCcuYWRkLW5ldy1saXN0Jyk7XG4gICAgICAgIHRoaXMuJGFkZGluZ092ZXJsYXkgPSAkKCcubG9hZGluZy1vdmVybGF5Jyk7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cbiAgICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcmVzZXRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xuICAgICAgICB0aGlzLmN1cnJlbnRMb29wID0gMDtcbiAgICB9XG5cbiAgICAvLyBSdW4gQUpBWCBjYWxscyBvbmUgYnkgb25lXG4gICAgaGFuZGxlQWpheCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudExvb3AgPCB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgJCh0aGlzLmNsYXNzUmVzdWx0TWVzc2FnZSkuaHRtbChgU2F2aW5nPGJyPiAke3RoaXMuaXRlbXNbdGhpcy5jdXJyZW50TG9vcF0ucG5hbWV9PGJyPiB0byB5b3VyIGxpc3RgKTtcbiAgICAgICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKHRoaXMuaXRlbXNbdGhpcy5jdXJyZW50TG9vcF0udXJsLCB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdmL2IyYi9hZGQtdG8tbGlzdC1yZXNwb25zZScsXG4gICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJbmNyZW1lbnQgJ2N1cnJlbnQnIGFuZCBydW4gQUpBWCBjYWxsIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TG9vcCsrO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWpheCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMYXN0IGF0dGVtcHQsIHJlZGlyZWN0IG9ubHlcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudExvb3AgPT09IHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLiRhZGRpbmdPdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFRhcmdldCAhPT0gJycgJiYgdGhpcy5saXN0VGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gYC93aXNobGlzdC5waHA/YWN0aW9uPXZpZXd3aXNobGlzdGl0ZW1zJHt0aGlzLmxpc3RUYXJnZXR9YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvd2lzaGxpc3QucGhwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICQoJy5tdWx0aV9hZGRfX2NhcnQtYnV0dG9uJykuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgICAgICAgICAgLy8gJCgnLm11bHRpLWFkZF9fcm93W2RhdGEtc3RhdHVzPXN1Y2Nlc3NdJykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzRm9ybShldmVudCwgZm9ybSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuJGFkZGluZ092ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIGNvbnN0IGFsbFJvd3MgPSAkKGZvcm0pLmZpbmQodGhpcy5jbGFzc1Jvdyk7XG4gICAgICAgIGNvbnN0IGFsbE1lc3NhZ2VzID0gYWxsUm93cy5maW5kKHRoaXMuY2xhc3NSZXN1bHRNZXNzYWdlKTtcblxuICAgICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcblxuICAgICAgICAvLyBGb3IgZWFjaCByb3csIGFkZCB0aGUgVVJMIGFuZCB0YXJnZXQgdG8gdGhlIGl0ZW1zIGFycmF5XG4gICAgICAgIGFsbFJvd3MuZWFjaCgoaW5kZXgsIHJvdykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gJChyb3cpO1xuICAgICAgICAgICAgY29uc3QgcGlkID0gdGFyZ2V0LmZpbmQoJ1tkYXRhLXBpZF0nKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHBuYW1lID0gdGFyZ2V0LmZpbmQoJy5jYXJ0LWl0ZW0tbmFtZScpLmF0dHIoJ2RhdGEtcG5hbWUnKTtcbiAgICAgICAgICAgIHRoaXMubGlzdFRhcmdldCA9ICQoJyNsaXN0LWlkJykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RUYXJnZXQgIT09ICcnICYmIHRoaXMubGlzdFRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0VGFyZ2V0ID0gYCZ3aXNobGlzdGlkPSR7dGhpcy5saXN0VGFyZ2V0fWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdFRhcmdldCA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBgL3dpc2hsaXN0LnBocD9hY3Rpb249YWRkJnByb2R1Y3RfaWQ9JHtwaWR9JHt0aGlzLmxpc3RUYXJnZXR9YDtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICBwbmFtZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUbyBhZGQgbGFuZyBzdHJpbmdcbiAgICAgICAgYWxsTWVzc2FnZXMudGV4dCgnU2F2aW5nIHRvIGxpc3QuLi4nKS5zaG93KCk7XG4gICAgICAgIHRoaXMuaGFuZGxlQWpheCgpO1xuICAgIH1cblxuICAgIG9wZW5BZGRMaXN0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSgnL2NhcnQucGhwJywge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICdmL2NhcnQvYWRkLWxpc3QtZm9ybScsXG4gICAgICAgIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkKCcjd2lzaGxpc3RuYW1lJykuc2VsZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1vZGFsLm9wZW4oKTtcbiAgICB9XG5cbiAgICBhZGROZXdMaXN0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcbiAgICAgICAgY29uc3QgbGlzdE5hbWUgPSAkKCcjd2lzaGxpc3RuYW1lJykudmFsKCk7XG4gICAgICAgIGNvbnN0IHNoYXJlZExpc3QgPSAkKCcjcHVibGljd2lzaGxpc3QnKS52YWwoKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0VXJsID0gJy93aXNobGlzdC5waHA/YWN0aW9uPWFkZHdpc2hsaXN0JnByb2R1Y3RfaWQ9JztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6IHRhcmdldFVybCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICB3aXNobGlzdG5hbWU6IGxpc3ROYW1lLFxuICAgICAgICAgICAgICAgIHB1YmxpY3dpc2hsaXN0OiBzaGFyZWRMaXN0LFxuICAgICAgICAgICAgICAgIHN1Ym1pdDogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xuICAgICAgICAgICAgdXRpbHMuYXBpLmdldFBhZ2UoJy93aXNobGlzdC5waHAnLCB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdmL2IyYi9saXN0LWFkZGVkLXJlc3BvbnNlJyxcbiAgICAgICAgICAgIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgY29udGVudHMgb2YgJy5saXN0LXNlbGVjdG9yJyB3aXRoIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgICAgICQoJy5saXN0LXNlbGVjdG9yJykuaHRtbChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbW9kYWwuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHBhcnNlSW50KCRlbC52YWwoKSwgMTApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHktbWF4JyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5LW1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5LW1pbi1lcnJvcicpO1xuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eS1tYXgtZXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKSA9PT0gJ2luYycgPyBvbGRRdHkgKyAxIDogb2xkUXR5IC0gMTtcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGlmeSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbCh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWluRXJyb3IsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbCh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWF4RXJyb3IsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCA9IG51bGwpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0LWl0ZW1pZCcpO1xuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHktbWluJyksIDEwKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcHJlVmFsICE9PSBudWxsID8gcHJlVmFsIDogbWluUXR5O1xuICAgICAgICBjb25zdCBuZXdRdHkgPSBwYXJzZUludChOdW1iZXIoJGVsLnZhbCgpKSwgMTApO1xuXG4gICAgICAgIGxldCBpbnZhbGlkRW50cnk7XG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcbiAgICAgICAgaWYgKG5ld1F0eSA8IDAgfHwgTnVtYmVyLmlzTmFOKG5ld1F0eSkpIHtcbiAgICAgICAgICAgIGludmFsaWRFbnRyeSA9ICRlbC52YWwoKTtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgIHRleHQ6IGAke2ludmFsaWRFbnRyeX0gaXMgbm90IGEgdmFsaWQgZW50cnlgLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhcnRSZW1vdmVJdGVtKGl0ZW1JZCkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVJlbW92ZShpdGVtSWQsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydEVkaXRPcHRpb25zKGl0ZW1JZCkge1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9jb25maWd1cmUtcHJvZHVjdCcsXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLmNvbmZpZ3VyZUluQ2FydChpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxzLmhvb2tzLm9uKCdwcm9kdWN0LW9wdGlvbi1jaGFuZ2UnLCAoZXZlbnQsIG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGNoYW5nZWRPcHRpb24gPSAkKG9wdGlvbik7XG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICRjaGFuZ2VkT3B0aW9uLnBhcmVudHMoJ2Zvcm0nKTtcbiAgICAgICAgICAgIGNvbnN0ICRzdWJtaXQgPSAkKCdpbnB1dC5idXR0b24nLCAkZm9ybSk7XG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZUJveCA9ICQoJy5hbGVydE1lc3NhZ2VCb3gnKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSAkKCdbbmFtZT1cIml0ZW1faWRcIl0nLCAkZm9ybSkuYXR0cigndmFsdWUnKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShpdGVtLCAkZm9ybS5zZXJpYWxpemUoKSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGVycixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ3AuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWZyZXNoQ29udGVudChyZW1vdmUpIHtcbiAgICAgICAgY29uc3QgJGNhcnRJdGVtc1Jvd3MgPSAkKCdbZGF0YS1pdGVtLXJvd10nLCB0aGlzLiRjYXJ0Q29udGVudCk7XG4gICAgICAgIGNvbnN0ICRjYXJ0UGFnZVRpdGxlID0gJCgnW2RhdGEtY2FydC1wYWdlLXRpdGxlXScpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnY2FydC9jb250ZW50JyxcbiAgICAgICAgICAgICAgICB0b3RhbHM6ICdjYXJ0L3RvdGFscycsXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlczogJ2NhcnQvc3RhdHVzLW1lc3NhZ2VzJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGxhc3QgaXRlbSBmcm9tIGNhcnQ/IFJlbG9hZFxuICAgICAgICBpZiAocmVtb3ZlICYmICRjYXJ0SXRlbXNSb3dzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRDb250ZW50Lmh0bWwocmVzcG9uc2UuY29udGVudCk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0VG90YWxzLmh0bWwocmVzcG9uc2UudG90YWxzKTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcy5odG1sKHJlc3BvbnNlLnN0YXR1c01lc3NhZ2VzKTtcblxuICAgICAgICAgICAgJGNhcnRQYWdlVGl0bGUucmVwbGFjZVdpdGgocmVzcG9uc2UucGFnZVRpdGxlKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gJCgnW2RhdGEtY2FydC1xdWFudGl0eV0nLCB0aGlzLiRjYXJ0Q29udGVudCkuZGF0YSgnY2FydC1xdWFudGl0eScpIHx8IDA7XG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRDYXJ0RXZlbnRzKCkge1xuICAgICAgICBjb25zdCBkZWJvdW5jZVRpbWVvdXQgPSA0MDA7XG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGUgPSBfLmJpbmQoXy5kZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGUsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSA9IF8uYmluZChfLmRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IF8uYmluZChfLmRlYm91bmNlKHRoaXMuY2FydFJlbW92ZUl0ZW0sIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBsZXQgcHJlVmFsO1xuICAgICAgICAvLyBEWUxBTlxuICAgICAgICBjb25zb2xlLmxvZygnY2FydCBldmVudHMgaGF2ZSBiZWVuIGJvdW5kJylcblxuICAgICAgICAvLyBjYXJ0IHVwZGF0ZVxuICAgICAgICAkKCdbZGF0YS1jYXJ0LXVwZGF0ZV0nLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XG4gICAgICAgICAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYXJ0IHF0eSBtYW51YWxseSB1cGRhdGVzXG4gICAgICAgICQoJy5jYXJ0LWl0ZW0tcXR5LWlucHV0JywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdmb2N1cycsIGZ1bmN0aW9uIG9uUXR5Rm9jdXMoKSB7XG4gICAgICAgICAgICBwcmVWYWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICB9KS5jaGFuZ2UoZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XG4gICAgICAgICAgICBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSgkdGFyZ2V0LCBwcmVWYWwpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY2FydC1yZW1vdmUnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgICAgIC8vIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xuICAgICAgICAgICAgLy8gc3dhbCh7XG4gICAgICAgICAgICAvLyAgICAgdGV4dDogc3RyaW5nLFxuICAgICAgICAgICAgLy8gICAgIHR5cGU6ICd3YXJuaW5nJyxcbiAgICAgICAgICAgIC8vICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgLy8gfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gY2FydFxuICAgICAgICAgICAgLy8gRFlMQU4gOC0xMC0yMFxuICAgICAgICAgICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYXJ0UmVtb3ZlSXRlbSBmdW5jdGlvbiBjYWxsZWQnKVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1lZGl0XScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1FZGl0Jyk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyBlZGl0IGl0ZW0gaW4gY2FydFxuICAgICAgICAgICAgdGhpcy5jYXJ0RWRpdE9wdGlvbnMoaXRlbUlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFByb21vQ29kZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNvdXBvbkNvbnRhaW5lciA9ICQoJy5jb3Vwb24tY29kZScpO1xuICAgICAgICBjb25zdCAkY291cG9uRm9ybSA9ICQoJy5jb3Vwb24tZm9ybScpO1xuICAgICAgICBjb25zdCAkY29kZUlucHV0ID0gJCgnW25hbWU9XCJjb3Vwb25jb2RlXCJdJywgJGNvdXBvbkZvcm0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmhpZGUoKTtcbiAgICAgICAgICAgICRjb3Vwb25Db250YWluZXIuc2hvdygpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLnNob3coKTtcbiAgICAgICAgICAgICRjb2RlSW5wdXQudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRjb3Vwb25Db250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjb3Vwb25Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNvZGVJbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gRW1wdHkgY29kZVxuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY29kZUlucHV0LmRhdGEoJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5Q29kZShjb2RlLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjZXJ0Q29udGFpbmVyID0gJCgnLmdpZnQtY2VydGlmaWNhdGUtY29kZScpO1xuICAgICAgICBjb25zdCAkY2VydEZvcm0gPSAkKCcuY2FydC1naWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNlcnRJbnB1dCA9ICQoJ1tuYW1lPVwiY2VydGNvZGVcIl0nLCAkY2VydEZvcm0pO1xuXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNlcnRGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNlcnRJbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKCFnaWZ0Q2VydENoZWNrKGNvZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY2VydElucHV0LmRhdGEoJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5R2lmdENlcnRpZmljYXRlKGNvZGUsIChlcnIsIHJlc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3AuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUdpZnR3cmFwJyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xuXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICBjb25zdCAkc2luZ2xlRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctc2luZ2xlJyk7XG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdzYW1lJykge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnW25hbWU9XCJnaWZ0d3JhcHR5cGVcIl0nKS5vbignY2xpY2snLCB0b2dnbGVWaWV3cyk7XG5cbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmJpbmRDYXJ0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy4kZm9ybS5vbignY2xpY2snLCAnW2RhdGEtc2F2ZS1jYXJ0XScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0Zvcm0oZXZlbnQsIHRoaXMuJGZvcm1bMF0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRuZXdMaXN0Lm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMub3BlbkFkZExpc3QoZXZlbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRkb2N1bWVudC5vbignY2xpY2snLCAnLmFkZC1uZXctbGlzdC1mb3JtIC5idXR0b24nLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZE5ld0xpc3QoZXZlbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpbml0aWF0ZSBzaGlwcGluZyBlc3RpbWF0b3IgbW9kdWxlXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSBuZXcgU2hpcHBpbmdFc3RpbWF0b3IoJCgnW2RhdGEtc2hpcHBpbmctZXN0aW1hdG9yXScpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgc3RhdGVDb3VudHJ5IGZyb20gJy4uL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcbmltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJy4uL2NvbW1vbi9mb3JtLXV0aWxzJztcbmltcG9ydCBzd2FsIGZyb20gJy4uL2dsb2JhbC9zd2VldC1hbGVydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXBwaW5nRXN0aW1hdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy4kc3RhdGUgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nLCB0aGlzLiRlbGVtZW50KTtcbiAgICAgICAgdGhpcy5pbml0Rm9ybVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMuYmluZEVzdGltYXRvckV2ZW50cygpO1xuICAgIH1cblxuICAgIGluaXRGb3JtVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9ICdmb3JtW2RhdGEtc2hpcHBpbmctZXN0aW1hdG9yXSc7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSAuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXN1Ym1pdCcsIHRoaXMuJGVsZW1lbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vIFdoZW4gc3dpdGNoaW5nIGJldHdlZW4gY291bnRyaWVzLCB0aGUgc3RhdGUvcmVnaW9uIGlzIGR5bmFtaWNcbiAgICAgICAgICAgIC8vIE9ubHkgcGVyZm9ybSBhIGNoZWNrIGZvciBhbGwgZmllbGRzIHdoZW4gY291bnRyeSBoYXMgYSB2YWx1ZVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFyZUFsbCgndmFsaWQnKSB3aWxsIGNoZWNrIGNvdW50cnkgZm9yIHZhbGlkaXR5XG4gICAgICAgICAgICBpZiAoJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gKS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kVVBTUmF0ZXMoKTtcbiAgICB9XG5cbiAgICBiaW5kVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudHJ5SWQgPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY291bnRyeUlkICE9PSAwICYmICFOdW1iZXIuaXNOYU4oY291bnRyeUlkKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnVGhlIFxcJ0NvdW50cnlcXCcgZmllbGQgY2Fubm90IGJlIGJsYW5rLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkZWxlID0gJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVWYWwgPSAkZWxlLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBlbGVWYWwgJiYgZWxlVmFsLmxlbmd0aCAmJiBlbGVWYWwgIT09ICdTdGF0ZS9wcm92aW5jZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnVGhlIFxcJ1N0YXRlL1Byb3ZpbmNlXFwnIGZpZWxkIGNhbm5vdCBiZSBibGFuay4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIGJldHdlZW4gZGVmYXVsdCBzaGlwcGluZyBhbmQgdXBzIHNoaXBwaW5nIHJhdGVzXG4gICAgICovXG4gICAgYmluZFVQU1JhdGVzKCkge1xuICAgICAgICBjb25zdCBVUFNSYXRlVG9nZ2xlID0gJy5lc3RpbWF0b3ItZm9ybS10b2dnbGVVUFNSYXRlJztcblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgVVBTUmF0ZVRvZ2dsZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybVVwcyA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tdXBzJyk7XG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybURlZmF1bHQgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLWRlZmF1bHQnKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1VcHMudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtRGVmYXVsdC50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCkge1xuICAgICAgICBsZXQgJGxhc3Q7XG5cbiAgICAgICAgLy8gUmVxdWVzdHMgdGhlIHN0YXRlcyBmb3IgYSBjb3VudHJ5IHdpdGggQUpBWFxuICAgICAgICBzdGF0ZUNvdW50cnkodGhpcy4kc3RhdGUsIHRoaXMuY29udGV4dCwgeyB1c2VJZEZvclN0YXRlczogdHJ1ZSB9LCAoZXJyLCBmaWVsZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlcnIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmdldFN0YXR1cyh0aGlzLiRzdGF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUodGhpcy4kc3RhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZmllbGQuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkLmF0dHIoJ3BsYWNlaG9sZGVyJywgJ1N0YXRlL3Byb3ZpbmNlJyk7XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXG4gICAgICAgICAgICAvLyBOb3QgYWxsIGNvdW50cmllcyByZXF1aXJlIHRoZSBwcm92aW5jZSB0byBiZSBmaWxsZWRcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVtb3ZlIHRoaXMgY2xhc3Mgd2hlbiB3ZSBzd2FwIHNpbmNlIG5vZCB2YWxpZGF0aW9uIGRvZXNuJ3QgY2xlYW51cCBmb3IgdXNcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kRXN0aW1hdG9yRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkZXN0aW1hdG9yQ29udGFpbmVyID0gJCgnLnNoaXBwaW5nLWVzdGltYXRvcicpO1xuICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybSA9ICQoJy5lc3RpbWF0b3ItZm9ybScpO1xuXG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY291bnRyeV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNpdHk6ICQoJ1tuYW1lPVwic2hpcHBpbmctY2l0eVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICB6aXBfY29kZTogJCgnW25hbWU9XCJzaGlwcGluZy16aXBcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRTaGlwcGluZ1F1b3RlcyhwYXJhbXMsICdjYXJ0L3NoaXBwaW5nLXF1b3RlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNoaXBwaW5nLXF1b3RlcycpLmh0bWwocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBiaW5kIHRoZSBzZWxlY3QgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCgnLnNlbGVjdC1zaGlwcGluZy1xdW90ZScpLm9uKCdjbGljaycsIGNsaWNrRXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUlkID0gJCgnLnNoaXBwaW5nLXF1b3RlOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuc3VibWl0U2hpcHBpbmdRdW90ZShxdW90ZUlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93Jykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5oaWRlKCk7XG4gICAgICAgICAgICAkZXN0aW1hdG9yQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtaGlkZScpLnNob3coKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtaGlkZScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRlc3RpbWF0b3JDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93Jykuc2hvdygpO1xuICAgICAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLWhpZGUnKS5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjZXJ0KSB7XG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFueSBjdXN0b20gZ2lmdCBjZXJ0aWZpY2F0ZSB2YWxpZGF0aW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=