(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./assets/js/theme/f/multiadd.js":
/*!***************************************!*\
  !*** ./assets/js/theme/f/multiadd.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.regexp.replace */ "./node_modules/core-js/modules/es6.regexp.replace.js");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_4__);



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var Page = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Page, _PageManager);

  function Page() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Page.prototype;

  _proto.onReady = function onReady() {
    // Classes
    this.classRow = '.multi-add__row';
    this.classResultMessage = '.multi-add__result';
    this.classAddButton = '.multi-add__add-button';
    this.classRemoveButton = '.multi-add__remove-button'; // Class names

    this.classNameRowError = 'multi-add__row--error'; // Functional assignments

    this.$form = $('.multi-add');
    this.$file = $('.csv-file');
    this.snippet = $(this.classRow)[0].outerHTML;
    this.lines = 1;
    this.searchTerms = [];
    this.resetState();
    this.bindEvents();
  };

  _proto.resetState = function resetState() {
    this.items = [];
    this.errors = [];
    this.currentLoop = 0;
  } // Loop errors, add class and change text
  ;

  _proto.handleErrors = function handleErrors() {
    var _this2 = this;

    $(this.errors).each(function (i, element) {
      element.addClass(_this2.classNameRowError); // To add lang string

      element.children(_this2.classResultMessage).text('Please complete the SKU and Quantity fields');
    });
  } // Run AJAX calls one by one
  ;

  _proto.handleAjax = function handleAjax() {
    var _this3 = this;

    if (this.currentLoop < this.items.length) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.getPage(this.items[this.currentLoop].url, {
        template: 'f/b2b/quick-add-response'
      }, function (err, response) {
        var scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        var cleanResponse = response.replace(scriptRegex, '').trim();

        if (err) {
          throw new Error(err);
        }

        if (cleanResponse.length) {
          _this3.items[_this3.currentLoop].target.children(_this3.classResultMessage).text(cleanResponse);

          $(_this3.items[_this3.currentLoop].target).addClass('multi-add__row--advisory');
        } else {
          _this3.items[_this3.currentLoop].target.children(_this3.classResultMessage).text($('.multi-add__submit-button').data('message'));

          $(_this3.items[_this3.currentLoop].target).attr('data-status', 'success').addClass('multi-add__row--success');
        } // Increment 'current' and run AJAX call again


        _this3.currentLoop++;

        _this3.handleErrors();

        _this3.handleAjax();
      });
    } // Last attempt, redirect only


    if (this.currentLoop === this.items.length) {
      // document.location.href = '/cart.php';
      this.fetchCounter();
      $('.multi_add__cart-button').css('display', 'inline-block');
    }
  };

  _proto.fetchCounter = function fetchCounter() {
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.cart.getContent({
      template: 'f/cart/item-count'
    }, function (err, response) {
      if (response > 0) {
        $('body').trigger('cart-quantity-update', response);
      }
    });
  };

  _proto.handleButtonDisplay = function handleButtonDisplay() {
    var rows = this.$form.children(this.classRow);
    var removeButtons = rows.find(this.classRemoveButton);
    var addButtons = rows.find(this.classAddButton);
    var lastAddButton = $(rows[this.lines - 1]).find(this.classAddButton);

    if (this.lines > 1) {
      removeButtons.removeClass('multi-add__remove-button--last').removeAttr('disabled');
      addButtons.removeClass('multi-add__add-button--disabled').removeAttr('disabled', 'disabled');
      addButtons.not(lastAddButton).addClass('multi-add__add-button--disabled').attr('disabled', 'disabled');
    } else {
      removeButtons.addClass('multi-add__remove-button--last').attr('disabled', 'disabled');
      addButtons.removeClass('multi-add__add-button--disabled').removeAttr('disabled');
    }
  };

  _proto.handleAddLine = function handleAddLine(sku, qty) {
    var newLine = $(this.snippet).clone();

    if (sku && qty) {
      $(newLine[0].children[0]).val(sku);
      $(newLine[0].children[1]).val(qty);
    }

    $('.multi-add__submit-button').before(newLine);
    this.lines++;
    this.handleButtonDisplay();
  };

  _proto.handleRemoveLine = function handleRemoveLine(line) {
    if (line.is(':only-of-type')) {
      return;
    }

    line.remove();
    this.lines--;
    this.handleButtonDisplay();
  };

  _proto.handleItemSelect = function handleItemSelect(event, override) {
    var self = event ? $(event.target) : override;
    var relativeRow = self.parents('.multi-add__row');
    var rowIndex = relativeRow.index() - 1;
    var selectedSku = $.trim(self.text());
    var relativeInput = relativeRow.find('[data-multi-sku]');
    relativeInput[0].value = selectedSku;
    this.searchTerms[rowIndex] = selectedSku;
  };

  _proto.processForm = function processForm(event, form) {
    var _this4 = this;

    event.preventDefault();
    var allRows = $(form).children(this.classRow);
    var allMessages = allRows.find(this.classResultMessage);
    this.resetState(); // For each row, add the URL and target to the items array

    allRows.each(function (index, row) {
      var target = $(row);
      var sku = target.find('[data-multi-sku]').val();
      var qty = target.find('[data-multi-qty]').val();

      if (!sku || !qty) {
        _this4.errors.push(target);

        return;
      }

      var url = "/cart.php?action=add&sku=" + sku + "&qty=" + qty;

      _this4.items.push({
        url: url,
        target: target
      });
    }); // To add lang string

    allMessages.text('Adding to basket');
    this.handleAjax();
  };

  _proto.parseCSV = function parseCSV(event, _this) {
    $('.alertBox-message span').text('');
    $('.alertBox').hide();
    var file = event.target.files[0];
    var noSku;
    var noQty;
    Object(papaparse__WEBPACK_IMPORTED_MODULE_4__["parse"])(file, {
      preview: 1,
      complete: function complete(results) {
        if (results.data[0].indexOf('sku') === -1) {
          noSku = true;
        }

        if (results.data[0].indexOf('qty') === -1) {
          noQty = true;
        }

        if (noQty || noSku) {
          if (noSku) {
            $('.alertBox-message span').append(' Please ensure you have a heading labeled "sku" in row 1.');
          }

          if (noQty) {
            $('.alertBox-message span').append(' Please ensure you have a heading labeled "qty" in row 1.');
          }

          $('.alertBox').show();
        } else {
          Object(papaparse__WEBPACK_IMPORTED_MODULE_4__["parse"])(file, {
            header: true,
            dynamicTyping: false,
            skipEmptyLines: true,
            step: function step(row) {
              var sku = row.data[0].sku;
              var qty = row.data[0].qty;

              _this.handleAddLine(sku, qty);
            }
          });
        }
      }
    });
  } // Bind event handlers
  ;

  _proto.bindEvents = function bindEvents() {
    var _this5 = this;

    this.$form.on('click', this.classAddButton, function () {
      _this5.handleAddLine();
    });
    this.$form.on('click', this.classRemoveButton, function (event) {
      _this5.handleRemoveLine($(event.target).parent());
    });
    this.$form.on('change', '[data-multi-sku]', function (event) {
      var self = $(event.target);

      if (self.val()) {
        self.siblings(_this5.classResultMessage).text('');
        self.parent().removeClass(_this5.classNameRowError);
      }
    });
    this.$form.on('submit', function (event) {
      _this5.processForm(event, _this5.$form[0]);
    });
    this.$file.on('change', function (event) {
      _this5.parseCSV(event, _this5);
    });
  };

  return Page;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvZi9tdWx0aWFkZC5qcyJdLCJuYW1lcyI6WyJQYWdlIiwib25SZWFkeSIsImNsYXNzUm93IiwiY2xhc3NSZXN1bHRNZXNzYWdlIiwiY2xhc3NBZGRCdXR0b24iLCJjbGFzc1JlbW92ZUJ1dHRvbiIsImNsYXNzTmFtZVJvd0Vycm9yIiwiJGZvcm0iLCIkIiwiJGZpbGUiLCJzbmlwcGV0Iiwib3V0ZXJIVE1MIiwibGluZXMiLCJzZWFyY2hUZXJtcyIsInJlc2V0U3RhdGUiLCJiaW5kRXZlbnRzIiwiaXRlbXMiLCJlcnJvcnMiLCJjdXJyZW50TG9vcCIsImhhbmRsZUVycm9ycyIsImVhY2giLCJpIiwiZWxlbWVudCIsImFkZENsYXNzIiwiY2hpbGRyZW4iLCJ0ZXh0IiwiaGFuZGxlQWpheCIsImxlbmd0aCIsInV0aWxzIiwiYXBpIiwiZ2V0UGFnZSIsInVybCIsInRlbXBsYXRlIiwiZXJyIiwicmVzcG9uc2UiLCJzY3JpcHRSZWdleCIsImNsZWFuUmVzcG9uc2UiLCJyZXBsYWNlIiwidHJpbSIsIkVycm9yIiwidGFyZ2V0IiwiZGF0YSIsImF0dHIiLCJmZXRjaENvdW50ZXIiLCJjc3MiLCJjYXJ0IiwiZ2V0Q29udGVudCIsInRyaWdnZXIiLCJoYW5kbGVCdXR0b25EaXNwbGF5Iiwicm93cyIsInJlbW92ZUJ1dHRvbnMiLCJmaW5kIiwiYWRkQnV0dG9ucyIsImxhc3RBZGRCdXR0b24iLCJyZW1vdmVDbGFzcyIsInJlbW92ZUF0dHIiLCJub3QiLCJoYW5kbGVBZGRMaW5lIiwic2t1IiwicXR5IiwibmV3TGluZSIsImNsb25lIiwidmFsIiwiYmVmb3JlIiwiaGFuZGxlUmVtb3ZlTGluZSIsImxpbmUiLCJpcyIsInJlbW92ZSIsImhhbmRsZUl0ZW1TZWxlY3QiLCJldmVudCIsIm92ZXJyaWRlIiwic2VsZiIsInJlbGF0aXZlUm93IiwicGFyZW50cyIsInJvd0luZGV4IiwiaW5kZXgiLCJzZWxlY3RlZFNrdSIsInJlbGF0aXZlSW5wdXQiLCJ2YWx1ZSIsInByb2Nlc3NGb3JtIiwiZm9ybSIsInByZXZlbnREZWZhdWx0IiwiYWxsUm93cyIsImFsbE1lc3NhZ2VzIiwicm93IiwicHVzaCIsInBhcnNlQ1NWIiwiX3RoaXMiLCJoaWRlIiwiZmlsZSIsImZpbGVzIiwibm9Ta3UiLCJub1F0eSIsInBhcnNlIiwicHJldmlldyIsImNvbXBsZXRlIiwicmVzdWx0cyIsImluZGV4T2YiLCJhcHBlbmQiLCJzaG93IiwiaGVhZGVyIiwiZHluYW1pY1R5cGluZyIsInNraXBFbXB0eUxpbmVzIiwic3RlcCIsIm9uIiwicGFyZW50Iiwic2libGluZ3MiLCJQYWdlTWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7SUFFcUJBLEk7Ozs7Ozs7OztTQUNqQkMsTyxHQUFBLG1CQUFVO0FBQ047QUFDQSxTQUFLQyxRQUFMLEdBQWdCLGlCQUFoQjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCLG9CQUExQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0Isd0JBQXRCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUIsMkJBQXpCLENBTE0sQ0FPTjs7QUFDQSxTQUFLQyxpQkFBTCxHQUF5Qix1QkFBekIsQ0FSTSxDQVVOOztBQUNBLFNBQUtDLEtBQUwsR0FBYUMsQ0FBQyxDQUFDLFlBQUQsQ0FBZDtBQUNBLFNBQUtDLEtBQUwsR0FBYUQsQ0FBQyxDQUFDLFdBQUQsQ0FBZDtBQUNBLFNBQUtFLE9BQUwsR0FBZUYsQ0FBQyxDQUFDLEtBQUtOLFFBQU4sQ0FBRCxDQUFpQixDQUFqQixFQUFvQlMsU0FBbkM7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFFQSxTQUFLQyxVQUFMO0FBQ0EsU0FBS0MsVUFBTDtBQUNILEc7O1NBRURELFUsR0FBQSxzQkFBYTtBQUNULFNBQUtFLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxT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S0MsS0FBTCxDQUFXaUcsRUFBWCxDQUFjLFFBQWQsRUFBd0IsVUFBQW5DLEtBQUssRUFBSTtBQUM3QixZQUFJLENBQUNVLFdBQUwsQ0FBaUJWLEtBQWpCLEVBQXdCLE1BQUksQ0FBQzlELEtBQUwsQ0FBVyxDQUFYLENBQXhCO0FBQ0gsS0FGRDtBQUlBLFNBQUtFLEtBQUwsQ0FBVytGLEVBQVgsQ0FBYyxRQUFkLEVBQXdCLFVBQUFuQyxLQUFLLEVBQUk7QUFDN0IsWUFBSSxDQUFDaUIsUUFBTCxDQUFjakIsS0FBZCxFQUFxQixNQUFyQjtBQUNILEtBRkQ7QUFHSCxHOzs7RUExTzZCc0MscUQiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjE1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4uL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXBhcGFyc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIC8vIENsYXNzZXNcbiAgICAgICAgdGhpcy5jbGFzc1JvdyA9ICcubXVsdGktYWRkX19yb3cnO1xuICAgICAgICB0aGlzLmNsYXNzUmVzdWx0TWVzc2FnZSA9ICcubXVsdGktYWRkX19yZXN1bHQnO1xuICAgICAgICB0aGlzLmNsYXNzQWRkQnV0dG9uID0gJy5tdWx0aS1hZGRfX2FkZC1idXR0b24nO1xuICAgICAgICB0aGlzLmNsYXNzUmVtb3ZlQnV0dG9uID0gJy5tdWx0aS1hZGRfX3JlbW92ZS1idXR0b24nO1xuXG4gICAgICAgIC8vIENsYXNzIG5hbWVzXG4gICAgICAgIHRoaXMuY2xhc3NOYW1lUm93RXJyb3IgPSAnbXVsdGktYWRkX19yb3ctLWVycm9yJztcblxuICAgICAgICAvLyBGdW5jdGlvbmFsIGFzc2lnbm1lbnRzXG4gICAgICAgIHRoaXMuJGZvcm0gPSAkKCcubXVsdGktYWRkJyk7XG4gICAgICAgIHRoaXMuJGZpbGUgPSAkKCcuY3N2LWZpbGUnKTtcbiAgICAgICAgdGhpcy5zbmlwcGV0ID0gJCh0aGlzLmNsYXNzUm93KVswXS5vdXRlckhUTUw7XG4gICAgICAgIHRoaXMubGluZXMgPSAxO1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XG5cbiAgICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHJlc2V0U3RhdGUoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcbiAgICAgICAgdGhpcy5jdXJyZW50TG9vcCA9IDA7XG4gICAgfVxuXG4gICAgLy8gTG9vcCBlcnJvcnMsIGFkZCBjbGFzcyBhbmQgY2hhbmdlIHRleHRcbiAgICBoYW5kbGVFcnJvcnMoKSB7XG4gICAgICAgICQodGhpcy5lcnJvcnMpLmVhY2goKGksIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5jbGFzc05hbWVSb3dFcnJvcik7XG4gICAgICAgICAgICAvLyBUbyBhZGQgbGFuZyBzdHJpbmdcbiAgICAgICAgICAgIGVsZW1lbnQuY2hpbGRyZW4odGhpcy5jbGFzc1Jlc3VsdE1lc3NhZ2UpLnRleHQoJ1BsZWFzZSBjb21wbGV0ZSB0aGUgU0tVIGFuZCBRdWFudGl0eSBmaWVsZHMnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUnVuIEFKQVggY2FsbHMgb25lIGJ5IG9uZVxuICAgIGhhbmRsZUFqYXgoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRMb29wIDwgdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKHRoaXMuaXRlbXNbdGhpcy5jdXJyZW50TG9vcF0udXJsLCB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdmL2IyYi9xdWljay1hZGQtcmVzcG9uc2UnLFxuICAgICAgICAgICAgfSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHRSZWdleCA9IC88c2NyaXB0XFxiW148XSooPzooPyE8XFwvc2NyaXB0Pik8W148XSopKjxcXC9zY3JpcHQ+L2dpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFuUmVzcG9uc2UgPSByZXNwb25zZS5yZXBsYWNlKHNjcmlwdFJlZ2V4LCAnJykudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2xlYW5SZXNwb25zZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtc1t0aGlzLmN1cnJlbnRMb29wXS50YXJnZXQuY2hpbGRyZW4odGhpcy5jbGFzc1Jlc3VsdE1lc3NhZ2UpLnRleHQoY2xlYW5SZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcy5pdGVtc1t0aGlzLmN1cnJlbnRMb29wXS50YXJnZXQpLmFkZENsYXNzKCdtdWx0aS1hZGRfX3Jvdy0tYWR2aXNvcnknKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW3RoaXMuY3VycmVudExvb3BdLnRhcmdldC5jaGlsZHJlbih0aGlzLmNsYXNzUmVzdWx0TWVzc2FnZSkudGV4dCgkKCcubXVsdGktYWRkX19zdWJtaXQtYnV0dG9uJykuZGF0YSgnbWVzc2FnZScpKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzLml0ZW1zW3RoaXMuY3VycmVudExvb3BdLnRhcmdldCkuYXR0cignZGF0YS1zdGF0dXMnLCAnc3VjY2VzcycpLmFkZENsYXNzKCdtdWx0aS1hZGRfX3Jvdy0tc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEluY3JlbWVudCAnY3VycmVudCcgYW5kIHJ1biBBSkFYIGNhbGwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMb29wKys7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFqYXgoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGFzdCBhdHRlbXB0LCByZWRpcmVjdCBvbmx5XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRMb29wID09PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvY2FydC5waHAnO1xuICAgICAgICAgICAgdGhpcy5mZXRjaENvdW50ZXIoKTtcbiAgICAgICAgICAgICQoJy5tdWx0aV9hZGRfX2NhcnQtYnV0dG9uJykuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmV0Y2hDb3VudGVyKCkge1xuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KHsgdGVtcGxhdGU6ICdmL2NhcnQvaXRlbS1jb3VudCcgfSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSA+IDApIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUJ1dHRvbkRpc3BsYXkoKSB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSB0aGlzLiRmb3JtLmNoaWxkcmVuKHRoaXMuY2xhc3NSb3cpO1xuICAgICAgICBjb25zdCByZW1vdmVCdXR0b25zID0gcm93cy5maW5kKHRoaXMuY2xhc3NSZW1vdmVCdXR0b24pO1xuICAgICAgICBjb25zdCBhZGRCdXR0b25zID0gcm93cy5maW5kKHRoaXMuY2xhc3NBZGRCdXR0b24pO1xuICAgICAgICBjb25zdCBsYXN0QWRkQnV0dG9uID0gJChyb3dzW3RoaXMubGluZXMgLSAxXSkuZmluZCh0aGlzLmNsYXNzQWRkQnV0dG9uKTtcblxuICAgICAgICBpZiAodGhpcy5saW5lcyA+IDEpIHtcbiAgICAgICAgICAgIHJlbW92ZUJ1dHRvbnMucmVtb3ZlQ2xhc3MoJ211bHRpLWFkZF9fcmVtb3ZlLWJ1dHRvbi0tbGFzdCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBhZGRCdXR0b25zLnJlbW92ZUNsYXNzKCdtdWx0aS1hZGRfX2FkZC1idXR0b24tLWRpc2FibGVkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGFkZEJ1dHRvbnMubm90KGxhc3RBZGRCdXR0b24pLmFkZENsYXNzKCdtdWx0aS1hZGRfX2FkZC1idXR0b24tLWRpc2FibGVkJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZUJ1dHRvbnMuYWRkQ2xhc3MoJ211bHRpLWFkZF9fcmVtb3ZlLWJ1dHRvbi0tbGFzdCcpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBhZGRCdXR0b25zLnJlbW92ZUNsYXNzKCdtdWx0aS1hZGRfX2FkZC1idXR0b24tLWRpc2FibGVkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUFkZExpbmUoc2t1LCBxdHkpIHtcbiAgICAgICAgY29uc3QgbmV3TGluZSA9ICQodGhpcy5zbmlwcGV0KS5jbG9uZSgpO1xuXG4gICAgICAgIGlmIChza3UgJiYgcXR5KSB7XG4gICAgICAgICAgICAkKG5ld0xpbmVbMF0uY2hpbGRyZW5bMF0pLnZhbChza3UpO1xuICAgICAgICAgICAgJChuZXdMaW5lWzBdLmNoaWxkcmVuWzFdKS52YWwocXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJy5tdWx0aS1hZGRfX3N1Ym1pdC1idXR0b24nKS5iZWZvcmUobmV3TGluZSk7XG4gICAgICAgIHRoaXMubGluZXMrKztcblxuICAgICAgICB0aGlzLmhhbmRsZUJ1dHRvbkRpc3BsYXkoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZW1vdmVMaW5lKGxpbmUpIHtcbiAgICAgICAgaWYgKGxpbmUuaXMoJzpvbmx5LW9mLXR5cGUnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGluZS5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5saW5lcy0tO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQnV0dG9uRGlzcGxheSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUl0ZW1TZWxlY3QoZXZlbnQsIG92ZXJyaWRlKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSAoZXZlbnQpID8gJChldmVudC50YXJnZXQpIDogb3ZlcnJpZGU7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlUm93ID0gc2VsZi5wYXJlbnRzKCcubXVsdGktYWRkX19yb3cnKTtcbiAgICAgICAgY29uc3Qgcm93SW5kZXggPSByZWxhdGl2ZVJvdy5pbmRleCgpIC0gMTtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZFNrdSA9ICQudHJpbShzZWxmLnRleHQoKSk7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlSW5wdXQgPSByZWxhdGl2ZVJvdy5maW5kKCdbZGF0YS1tdWx0aS1za3VdJyk7XG5cbiAgICAgICAgcmVsYXRpdmVJbnB1dFswXS52YWx1ZSA9IHNlbGVjdGVkU2t1O1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm1zW3Jvd0luZGV4XSA9IHNlbGVjdGVkU2t1O1xuICAgIH1cblxuICAgIHByb2Nlc3NGb3JtKGV2ZW50LCBmb3JtKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgYWxsUm93cyA9ICQoZm9ybSkuY2hpbGRyZW4odGhpcy5jbGFzc1Jvdyk7XG4gICAgICAgIGNvbnN0IGFsbE1lc3NhZ2VzID0gYWxsUm93cy5maW5kKHRoaXMuY2xhc3NSZXN1bHRNZXNzYWdlKTtcblxuICAgICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcblxuICAgICAgICAvLyBGb3IgZWFjaCByb3csIGFkZCB0aGUgVVJMIGFuZCB0YXJnZXQgdG8gdGhlIGl0ZW1zIGFycmF5XG4gICAgICAgIGFsbFJvd3MuZWFjaCgoaW5kZXgsIHJvdykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gJChyb3cpO1xuICAgICAgICAgICAgY29uc3Qgc2t1ID0gdGFyZ2V0LmZpbmQoJ1tkYXRhLW11bHRpLXNrdV0nKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHF0eSA9IHRhcmdldC5maW5kKCdbZGF0YS1tdWx0aS1xdHldJykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmICghc2t1IHx8ICFxdHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBgL2NhcnQucGhwP2FjdGlvbj1hZGQmc2t1PSR7c2t1fSZxdHk9JHtxdHl9YDtcblxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRvIGFkZCBsYW5nIHN0cmluZ1xuICAgICAgICBhbGxNZXNzYWdlcy50ZXh0KCdBZGRpbmcgdG8gYmFza2V0Jyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQWpheCgpO1xuICAgIH1cblxuICAgIHBhcnNlQ1NWKGV2ZW50LCBfdGhpcykge1xuICAgICAgICAkKCcuYWxlcnRCb3gtbWVzc2FnZSBzcGFuJykudGV4dCgnJyk7XG4gICAgICAgICQoJy5hbGVydEJveCcpLmhpZGUoKTtcbiAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXTtcbiAgICAgICAgbGV0IG5vU2t1O1xuICAgICAgICBsZXQgbm9RdHk7XG5cbiAgICAgICAgcGFyc2UoZmlsZSwge1xuICAgICAgICAgICAgcHJldmlldzogMSxcbiAgICAgICAgICAgIGNvbXBsZXRlKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5kYXRhWzBdLmluZGV4T2YoJ3NrdScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBub1NrdSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMuZGF0YVswXS5pbmRleE9mKCdxdHknKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9RdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChub1F0eSB8fCBub1NrdSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9Ta3UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5hbGVydEJveC1tZXNzYWdlIHNwYW4nKS5hcHBlbmQoJyBQbGVhc2UgZW5zdXJlIHlvdSBoYXZlIGEgaGVhZGluZyBsYWJlbGVkIFwic2t1XCIgaW4gcm93IDEuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vUXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuYWxlcnRCb3gtbWVzc2FnZSBzcGFuJykuYXBwZW5kKCcgUGxlYXNlIGVuc3VyZSB5b3UgaGF2ZSBhIGhlYWRpbmcgbGFiZWxlZCBcInF0eVwiIGluIHJvdyAxLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICQoJy5hbGVydEJveCcpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZShmaWxlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkeW5hbWljVHlwaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBFbXB0eUxpbmVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcChyb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBza3UgPSByb3cuZGF0YVswXS5za3U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXR5ID0gcm93LmRhdGFbMF0ucXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhhbmRsZUFkZExpbmUoc2t1LCBxdHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQmluZCBldmVudCBoYW5kbGVyc1xuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJGZvcm0ub24oJ2NsaWNrJywgdGhpcy5jbGFzc0FkZEJ1dHRvbiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVBZGRMaW5lKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJGZvcm0ub24oJ2NsaWNrJywgdGhpcy5jbGFzc1JlbW92ZUJ1dHRvbiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVSZW1vdmVMaW5lKCQoZXZlbnQudGFyZ2V0KS5wYXJlbnQoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJGZvcm0ub24oJ2NoYW5nZScsICdbZGF0YS1tdWx0aS1za3VdJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9ICQoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICAgICAgaWYgKHNlbGYudmFsKCkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNpYmxpbmdzKHRoaXMuY2xhc3NSZXN1bHRNZXNzYWdlKS50ZXh0KCcnKTtcbiAgICAgICAgICAgICAgICBzZWxmLnBhcmVudCgpLnJlbW92ZUNsYXNzKHRoaXMuY2xhc3NOYW1lUm93RXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRmb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NGb3JtKGV2ZW50LCB0aGlzLiRmb3JtWzBdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kZmlsZS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXJzZUNTVihldmVudCwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=