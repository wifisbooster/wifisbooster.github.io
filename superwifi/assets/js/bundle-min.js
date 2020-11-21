function loadModal(content) {
    //alert('haueha');
    $('.modal__container').scrollTop(0); // Force scroll back to top
    $('.modal__title')
            .text(content)
            .css('textTransform', 'capitalize');
    $('.modal__container .modal__content').load(
            '/sites/' + content + '.php',
            function () {
                MicroModal.show('modal');
            }
    );
}

function updateDiscount(text) {
    $('#payment-step-2').show();
    $('#setDiscount, #setbfDiscount').html(text);
}

function getPreselectedProduct() {
    var urlParams = new URLSearchParams(window.location.search);
    var selectedProductID = urlParams.get('pselectedId');
    return selectedProductID;
}

function updateVisiblePrices() {
    const productQtySel = document.querySelector('.productQty');
    const productQty = productQtySel.options[productQtySel.selectedIndex];
    const data = productQty.dataset;

    const totalSinglePrice = parseFloat(data.singlePrice);
    const totalSubPrice = parseFloat(data.subPrice);

    const qty = parseInt(productQty.value);

    const eachSinglePrice = Math.round((totalSinglePrice / qty) * 100) / 100;
    const eachSubPrice = Math.round((totalSubPrice / qty) * 100) / 100;

    const each = qty > 1 ? '/ea' : '';

    // EA
    $('.pkgPrice.single .pkg-each-price').html(`$${eachSinglePrice}${each}`);
    $('.pkgPrice.subscription .pkg-each-price').html(`$${eachSubPrice}${each}`);

    // TOTAL
    $('.pkgPrice.single .pkg-total-price').html(`($${data.singlePrice})`);
    $('.pkgPrice.subscription .pkg-total-price').html(`($${data.subPrice})`);
}

function updateProductQuantity() {
    const productQty = document.getElementById('product-qty');
    const productInputs = Array.from(
            document.querySelectorAll('.packageOpt input')
            );
    const productIdOptions = Array.from(productQty.querySelectorAll('option'));

    updateVisiblePrices();

    // Dynamic Product ID update: For each product option, change the PID to match the qty PID
    productInputs.map(input => {
        // Loop through each selection option and update the value to represent the selected qty pid
        productIdOptions.forEach(function (option) {
            if (productQty.value === option.value) {
                if (input.dataset.type === 'subscription') {
                    input.value = parseInt(option.dataset.subPid);
                } else if (input.dataset.type === 'single') {
                    input.value = parseInt(option.dataset.singlePid);
                }
            }
        });
    });
}

$(document).ready(function () {
    !(function (e, o) {
        'object' == typeof exports && 'undefined' != typeof module
                ? (module.exports = o())
                : 'function' == typeof define && define.amd
                ? define(o)
                : (e.MicroModal = o());
    })(this, function () {
        'use strict';
        var e = function (e, o) {
            if (!(e instanceof o))
                throw new TypeError('Cannot call a class as a function');
        },
                o = (function () {
                    function e(e, o) {
                        for (var t = 0; t < o.length; t++) {
                            var i = o[t];
                            (i.enumerable = i.enumerable || !1),
                                    (i.configurable = !0),
                                    'value' in i && (i.writable = !0),
                                    Object.defineProperty(e, i.key, i);
                        }
                    }
                    return function (o, t, i) {
                        return t && e(o.prototype, t), i && e(o, i), o;
                    };
                })(),
                t = function (e) {
                    if (Array.isArray(e)) {
                        for (var o = 0, t = Array(e.length); o < e.length; o++)
                            t[o] = e[o];
                        return t;
                    }
                    return Array.from(e);
                };
        return (function () {
            var i = [
                'a[href]',
                'area[href]',
                'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
                'select:not([disabled]):not([aria-hidden])',
                'textarea:not([disabled]):not([aria-hidden])',
                'button:not([disabled]):not([aria-hidden])',
                'iframe',
                'object',
                'embed',
                '[contenteditable]',
                '[tabindex]:not([tabindex^="-"])'
            ],
                    n = (function () {
                        function n(o) {
                            var i = o.targetModal,
                                    a = o.triggers,
                                    r = void 0 === a ? [] : a,
                                    s = o.onShow,
                                    l = void 0 === s ? function () {} : s,
                                    c = o.onClose,
                                    d = void 0 === c ? function () {} : c,
                                    u = o.openTrigger,
                                    f = void 0 === u ? 'data-micromodal-trigger' : u,
                                    h = o.closeTrigger,
                                    v = void 0 === h ? 'data-micromodal-close' : h,
                                    g = o.disableScroll,
                                    m = void 0 !== g && g,
                                    b = o.disableFocus,
                                    y = void 0 !== b && b,
                                    w = o.awaitCloseAnimation,
                                    k = void 0 !== w && w,
                                    p = o.debugMode,
                                    E = void 0 !== p && p;
                            e(this, n),
                                    (this.modal = document.getElementById(i)),
                                    (this.config = {
                                        debugMode: E,
                                        disableScroll: m,
                                        openTrigger: f,
                                        closeTrigger: v,
                                        onShow: l,
                                        onClose: d,
                                        awaitCloseAnimation: k,
                                        disableFocus: y
                                    }),
                                    r.length > 0 && this.registerTriggers.apply(this, t(r)),
                                    (this.onClick = this.onClick.bind(this)),
                                    (this.onKeydown = this.onKeydown.bind(this));
                        }
                        return (
                                o(n, [
                                    {
                                        key: 'registerTriggers',
                                        value: function () {
                                            for (
                                                    var e = this, o = arguments.length, t = Array(o), i = 0;
                                                    i < o;
                                                    i++
                                                    )
                                                t[i] = arguments[i];
                                            t.filter(Boolean).forEach(function (o) {
                                                o.addEventListener('click', function () {
                                                    return e.showModal();
                                                });
                                            });
                                        }
                                    },
                                    {
                                        key: 'showModal',
                                        value: function () {
                                            (this.activeElement = document.activeElement),
                                                    this.modal.setAttribute('aria-hidden', 'false'),
                                                    this.modal.classList.add('is-open'),
                                                    this.setFocusToFirstNode(),
                                                    this.scrollBehaviour('disable'),
                                                    this.addEventListeners(),
                                                    this.config.onShow(this.modal);
                                        }
                                    },
                                    {
                                        key: 'closeModal',
                                        value: function () {
                                            var e = this.modal;
                                            this.modal.setAttribute('aria-hidden', 'true'),
                                                    this.removeEventListeners(),
                                                    this.scrollBehaviour('enable'),
                                                    this.activeElement && this.activeElement.focus(),
                                                    this.config.onClose(this.modal),
                                                    this.config.awaitCloseAnimation
                                                    ? this.modal.addEventListener(
                                                            'animationend',
                                                            function o() {
                                                                e.classList.remove('is-open'),
                                                                        e.removeEventListener('animationend', o, !1);
                                                            },
                                                            !1
                                                            )
                                                    : e.classList.remove('is-open');
                                        }
                                    },
                                    {
                                        key: 'closeModalById',
                                        value: function (e) {
                                            (this.modal = document.getElementById(e)),
                                                    this.modal && this.closeModal();
                                        }
                                    },
                                    {
                                        key: 'scrollBehaviour',
                                        value: function (e) {
                                            if (this.config.disableScroll) {
                                                var o = document.querySelector('body');
                                                switch (e) {
                                                    case 'enable':
                                                        Object.assign(o.style, {overflow: '', height: ''});
                                                        break;
                                                    case 'disable':
                                                        Object.assign(o.style, {
                                                            overflow: 'hidden',
                                                            height: '100vh'
                                                        });
                                                }
                                            }
                                        }
                                    },
                                    {
                                        key: 'addEventListeners',
                                        value: function () {
                                            this.modal.addEventListener('touchstart', this.onClick),
                                                    this.modal.addEventListener('click', this.onClick),
                                                    document.addEventListener('keydown', this.onKeydown);
                                        }
                                    },
                                    {
                                        key: 'removeEventListeners',
                                        value: function () {
                                            this.modal.removeEventListener('touchstart', this.onClick),
                                                    this.modal.removeEventListener('click', this.onClick),
                                                    document.removeEventListener('keydown', this.onKeydown);
                                        }
                                    },
                                    {
                                        key: 'onClick',
                                        value: function (e) {
                                            e.target.hasAttribute(this.config.closeTrigger) &&
                                                    (this.closeModal(), e.preventDefault());
                                        }
                                    },
                                    {
                                        key: 'onKeydown',
                                        value: function (e) {
                                            27 === e.keyCode && this.closeModal(e),
                                                    9 === e.keyCode && this.maintainFocus(e);
                                        }
                                    },
                                    {
                                        key: 'getFocusableNodes',
                                        value: function () {
                                            var e = this.modal.querySelectorAll(i);
                                            return Array.apply(void 0, t(e));
                                        }
                                    },
                                    {
                                        key: 'setFocusToFirstNode',
                                        value: function () {
                                            if (!this.config.disableFocus) {
                                                var e = this.getFocusableNodes();
                                                e.length && e[0].focus();
                                            }
                                        }
                                    },
                                    {
                                        key: 'maintainFocus',
                                        value: function (e) {
                                            var o = this.getFocusableNodes();
                                            if (this.modal.contains(document.activeElement)) {
                                                var t = o.indexOf(document.activeElement);
                                                e.shiftKey &&
                                                        0 === t &&
                                                        (o[o.length - 1].focus(), e.preventDefault()),
                                                        e.shiftKey ||
                                                        t !== o.length - 1 ||
                                                        (o[0].focus(), e.preventDefault());
                                            } else
                                                o[0].focus();
                                        }
                                    }
                                ]),
                                n
                                );
                    })(),
                    a = null,
                    r = function (e, o) {
                        var t = [];
                        return (
                                e.forEach(function (e) {
                                    var i = e.attributes[o].value;
                                    void 0 === t[i] && (t[i] = []), t[i].push(e);
                                }),
                                t
                                );
                    },
                    s = function (e) {
                        if (!document.getElementById(e))
                            return (
                                    console.warn(
                                            "MicroModal v0.3.2: â?—Seems like you have missed %c'" + e + "'",
                                            'background-color: #f8f9fa;color: #50596c;font-weight: bold;',
                                            'ID somewhere in your code. Refer example below to resolve it.'
                                            ),
                                    console.warn(
                                            '%cExample:',
                                            'background-color: #f8f9fa;color: #50596c;font-weight: bold;',
                                            '<div class="modal" id="' + e + '"></div>'
                                            ),
                                    !1
                                    );
                    },
                    l = function (e) {
                        if (e.length <= 0)
                            return (
                                    console.warn(
                                            "MicroModal v0.3.2: â?—Please specify at least one %c'micromodal-trigger'",
                                            'background-color: #f8f9fa;color: #50596c;font-weight: bold;',
                                            'data attribute.'
                                            ),
                                    console.warn(
                                            '%cExample:',
                                            'background-color: #f8f9fa;color: #50596c;font-weight: bold;',
                                            '<a href="#" data-micromodal-trigger="my-modal"></a>'
                                            ),
                                    !1
                                    );
                    },
                    c = function (e, o) {
                        if ((l(e), !o))
                            return !0;
                        for (var t in o)
                            s(t);
                        return !0;
                    };

            return {
                init: function (e) {
                    var o = Object.assign(
                            {},
                            {openTrigger: 'data-micromodal-trigger'},
                            e
                            ),
                            i = [].concat(
                            t(document.querySelectorAll('[' + o.openTrigger + ']'))
                            ),
                            a = r(i, o.openTrigger);
                    if (!0 !== o.debugMode || !1 !== c(i, a))
                        for (var s in a) {
                            var l = a[s];
                            (o.targetModal = s), (o.triggers = [].concat(t(l))), new n(o);
                        }
                },
                show: function (e, o) {
                    var t = o || {};
                    (t.targetModal = e),
                            (!0 === t.debugMode && !1 === s(e)) ||
                            ((a = new n(t)), a.showModal());
                },
                close: function (e) {
                    e ? a.closeModalById(e) : a.closeModal();
                }
            };
        })();
    });
    MicroModal.init();

    var e, t, n, r, o, i, a, s, l, u;
    var maskedCcController;
    var maskedCvvController;
    var ccFirstDigit;
    // Switch class on 'selected' item
    $('.buyOpt-row').click(function (e) {
        $('.buyOpt-row').removeClass('active'), $(this).addClass('active');
        //alert('aaaaaaaaaaaaaaaa');
        var productId = $(this).attr('productid');       
        $("#productId").val(productId);
        if (
                $(this)
                .find('.pkg-shipping')
                .text() !== 'Free Shipping'
                ) {
            $('.shippingText').show('fast');
            // trigger click on specific button
            $('.shippingText a').on('click', function () {
                $('.leftBox')
                        .find('label[data-upsell="true"]')
                        .trigger('click');
            });
        } else {
            $('.shippingText').hide('fast');
        }


        if (productId == 1) {
            var warranyPrice = '6.99';
            var warranyPriceCalu = warranyPrice * 5;
            $('#warranty_price').text(warranyPriceCalu.toFixed(2));

        }
        
        if (productId == 2) {
            var warranyPrice = '6.99';
            var warranyPriceCalu = warranyPrice * 4;
            $('#warranty_price').text(warranyPriceCalu);

        }
        
        if (productId == 3) {
            var warranyPrice = '6.99';
            var warranyPriceCalu = warranyPrice * 3;
            $('#warranty_price').text(warranyPriceCalu);
            
        }
        if (productId == 4) {
            var warranyPrice = '6.99';
            var warranyPriceCalu = warranyPrice * 2;
            $('#warranty_price').text(warranyPriceCalu);
            
        }
        
        if (productId == 5) {
            var warranyPrice = '6.99';
            var warranyPriceCalu = warranyPrice * 1;
            $('#warranty_price').text(warranyPriceCalu);
            
        }

    });

    /* $(".buyOpt-row").click(function(e) {
     $(".buyOpt-row").removeClass("active"), $(this).addClass("active"), $("#setDiscount").html($(this).attr("data-discount") + " Discount"), $("#disc-amount").html($(this).data("discount"))
     }),*/
    $('.buyOpt-row').change(function () {
        get_total();
    }),
            $('#shipping-region').change(function () {
        get_total();
    }),
            $('.step2Btn').on('click', function () {
        get_total();
    });

    // Click listeners for Email first Checkout Flow
    if ($('.email-first-step').length) {
        $('.step1Btn').click(function (e) {
            (function () {
                $('.form-error').hide();
                var e = !0;
                ($('input[name="email"]').val() &&
                        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/.test(
                                $('input[name="email"]').val()
                                )) ||
                        ((e = !1), $('#emailErr').show());
                return !!e;
            })() &&
                    ($.post(
                            '/captureprospect',
                            $('#registration-form').serializeArray(),
                            function (res) {}
                    ),
                            $('#emailInfo').hide(),
                            $('#packageSelect').fadeIn(),
                            $('html, body')
                            .stop()
                            .animate({scrollTop: $('#packageSelect').offset().top}, 1000));
        });

        $('.step2Btn').click(function (e) {

            $("#packageForm").submit();
            //window.location.href = 'payment.php';
            /*$('#shippingInfo').fadeIn(),
             $('html, body')
             .stop()
             .animate({ scrollTop: $('#shippingInfo').offset().top }, 1000);*/
        });

        $('.step3NextBtn').click(function (e) {
            (function () {
                $('.form-error').hide();
                var e = !0;
                var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                var zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/; // US ZIP Code Regex
                if ($('select[name="shippingCountry"]').val() === 'CA') {
                    zipRegex = /[\d\D]/;
                    //zipRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/; // CA Zip Code Regex
                }
                $('input[name="firstName"]').val() ||
                        ((e = !1),
                                $('.firstNameErr')
                                .not('.disabled')
                                .show());
                $('input[name="lastName"]').val() ||
                        ((e = !1), $('#lastNameErr').show());
                ($('input[name="phone"]').val() &&
                        -1 ===
                        $('input[name="phone"]')
                        .val()
                        .indexOf('_') &&
                        phoneRegex.test($('input[name="phone"]').val())) ||
                        ((e = !1), $('#phoneErr').show());
                $('input[name="shippingAddress1"]').val() ||
                        ((e = !1), $('#shippingAddress1Err').show());
                $('input[name="shippingCity"]').val() ||
                        ((e = !1), $('#shippingCityErr').show());
                ($('select[name="shippingCountry"]').val() &&
                        'Country' != $('select[name="shippingCountry"]').val()) ||
                        ((e = !1), $('#shippingCountryErr').show());
                ($('select[name="shippingState"]').val() &&
                        'State' != $('select[name="shippingState"]').val()) ||
                        ((e = !1), $('#shippingStateErr').show());
                ($('input[name="shippingZip"]').val() &&
                        -1 ===
                        $('input[name="shippingZip"]')
                        .val()
                        .indexOf('_') &&
                        zipRegex.test($('input[name="shippingZip"]').val())) ||
                        ((e = !1), $('#shippingZipErr').show());
                return !!e;
            })() &&
                    ($.post(
                            '/captureprospect',
                            $('#registration-form').serializeArray(),
                            function (res) {}
                    ),
                            $('#shippingInfo').hide(),
                            $('#billingInfo').fadeIn(),
                            $('html, body')
                            .stop()
                            .animate({scrollTop: $('#billingInfo').offset().top}, 1000));
        });

        $('#step2Back').click(function (e) {
            window.location.href = 'payment.php';
            $('#emailInfo').fadeIn(),
                    $('html, body')
                    .stop()
                    .animate({scrollTop: $('#emailInfo').offset().top}, 1000);
        });

        $('#step3Back').click(function (e) {
            $('#shippingInfo').hide(),
                    $('#packageSelect').fadeIn(),
                    $('html, body')
                    .stop()
                    .animate({scrollTop: $('#packageSelect').offset().top}, 1000);
        });

        $('#step4Back').click(function (e) {
            $('#billingInfo').hide(),
                    $('#shippingInfo').fadeIn(),
                    $('html, body')
                    .stop()
                    .animate({scrollTop: $('#shippingInfo').offset().top}, 1000);
        });
    } else if ($('.alt-checkout').length) {
        $('.step1Btn').click(function (e) {
            (function () {
                $('.form-error').hide();
                var e = !0;
                var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                var zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/; // US ZIP Code Regex
                if ($('select[name="shippingCountry"]').val() === 'CA') {
                    zipRegex = /[\d\D]/;
                    //zipRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/; // CA Zip Code Regex
                }
                $('input[name="firstName"]').val() ||
                        ((e = !1),
                                $('.firstNameErr')
                                .not('.disabled')
                                .show());
                $('input[name="lastName"]').val() ||
                        ((e = !1), $('#lastNameErr').show());
                ($('input[name="email"]').val() &&
                        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/.test(
                                $('input[name="email"]').val()
                                )) ||
                        ((e = !1), $('#emailErr').show());
                ($('input[name="phone"]').val() &&
                        -1 ===
                        $('input[name="phone"]')
                        .val()
                        .indexOf('_') &&
                        phoneRegex.test($('input[name="phone"]').val())) ||
                        ((e = !1), $('#phoneErr').show());
                $('input[name="shippingAddress1"]').val() ||
                        ((e = !1), $('#shippingAddress1Err').show());
                $('input[name="shippingCity"]').val() ||
                        ((e = !1), $('#shippingCityErr').show());
                ($('select[name="shippingCountry"]').val() &&
                        'Country' != $('select[name="shippingCountry"]').val()) ||
                        ((e = !1), $('#shippingCountryErr').show());
                ($('select[name="shippingState"]').val() &&
                        'State' != $('select[name="shippingState"]').val()) ||
                        ((e = !1), $('#shippingStateErr').show());
                ($('input[name="shippingZip"]').val() &&
                        -1 ===
                        $('input[name="shippingZip"]')
                        .val()
                        .indexOf('_') &&
                        zipRegex.test($('input[name="shippingZip"]').val())) ||
                        ((e = !1), $('#shippingZipErr').show());
                return !!e;
            })() &&
                    ($.post(
                            '/captureprospect',
                            $('#registration-form').serializeArray(),
                            function (res) {}
                    ),
                            $('#shippingInfo').hide(),
                            $('#packageSelect').fadeIn(),
                            $('html, body')
                            .stop()
                            .animate({scrollTop: $('#packageSelect').offset().top}, 1000));
        });

        $('.step2Btn').click(function (e) {
            window.location.href = 'payment.php';
            $('#billingInfo').fadeIn(),
                    $('html, body')
                    .stop()
                    .animate({scrollTop: $('#billingInfo').offset().top}, 1000);
        });

        $('#step2Back').click(function (e) {
            window.location.href = 'payment.php';
            $('#shippingInfo').fadeIn(),
                    $('html, body')
                    .stop()
                    .animate({scrollTop: $('#shippingInfo').offset().top}, 1000);
        });

        $('#step3Back').click(function (e) {
            $('#billingInfo').hide(),
                    $('#packageSelect').fadeIn(),
                    $('html, body')
                    .stop()
                    .animate({scrollTop: $('#packageSelect').offset().top}, 1000);
        });
    } else {
        // Default click listeners
        $('.step1Btn').click(function (e) {
            // window.location.href = 'payment.php';
            $("#packageForm").submit();
        });

        $('.step2Btn').click(function (e) {
            var fields_fullname = $('#fields_fullname').val();
            var fieldsfullname = fields_fullname.split(" ");
            var fields_email = $('#fields_email').val();
            var fields_phone = $('#fields_phone').val();
            var fields_address1 = $('#fields_address1').val();
            var fields_city = $('#fields_city').val();
            var fields_zip = $('#fields_zip').val();
            var count = 0;
            if (fields_fullname == '') {
                //$('input[name=fields_fullname]').removeClass('valid');
                // $('input[name=fields_fullname]').addClass('error');
                $('#fields_fullname_div').addClass('error');
                $('#fields_fullname_div').removeClass('valid');
                count = 1;
            } else if (fieldsfullname[0] == '') {
                //  $('input[name=fields_fullname]').removeClass('valid');
                //  $('input[name=fields_fullname]').addClass('error');
                $('#fields_fullname_div').addClass('error');
                $('#fields_fullname_div').removeClass('valid');
                count = 1;
            } else if (fieldsfullname[1] == '' || fieldsfullname[1] == 'undefined' || fieldsfullname[1] == undefined) {
                // $('input[name=fields_fullname]').removeClass('valid');
                // $('input[name=fields_fullname]').addClass('error');
                $('#fields_fullname_div').addClass('error');
                $('#fields_fullname_div').removeClass('valid');
                count = 1;
            } else {
                // $('input[name=fields_fullname]').removeClass('error');
                // $('input[name=fields_fullname]').addClass('valid');
                $('#fields_fullname_div').addClass('valid');
                $('#fields_fullname_div').removeClass('error');
            }

            if (fields_email == '') {
                // $('input[name=fields_email]').removeClass('valid');
                // $('input[name=fields_email]').addClass('error');
                $('#fields_email_div').addClass('error');
                $('#fields_email_div').removeClass('valid');
                count = 1;
            } else {
                // $('input[name=fields_email]').removeClass('error');
                // $('input[name=fields_email]').addClass('valid');
                $('#fields_email_div').addClass('valid');
                $('#fields_email_div').removeClass('error');
            }

            if (fields_phone == '') {
                //$('input[name=fields_phone]').removeClass('valid');
                //$('input[name=fields_phone]').addClass('error');
                $('#fields_phone_div').addClass('error');
                $('#fields_phone_div').removeClass('valid');
                count = 1;
            } else {
                //$('input[name=fields_phone]').removeClass('error');
                // $('input[name=fields_phone]').addClass('valid');
                $('#fields_phone_div').addClass('valid');
                $('#fields_phone_div').removeClass('error');
            }
            if (fields_address1 == '') {
                //$('input[name=fields_address1]').removeClass('valid');
                //$('input[name=fields_address1]').addClass('error');
                $('#fields_address1_div').addClass('error');
                $('#fields_address1_div').removeClass('valid');
                count = 1;
            } else {
                //$('input[name=fields_address1]').removeClass('error');
                //$('input[name=fields_address1]').addClass('valid');
                $('#fields_address1_div').addClass('valid');
                $('#fields_address1_div').removeClass('error');
            }
            if (fields_city == '') {
                //  $('input[name=fields_city]').removeClass('valid');
                //  $('input[name=fields_city]').addClass('error');
                $('#fields_city_div').addClass('error');
                $('#fields_city_div').removeClass('valid');
                count = 1;
            } else {
                // $('input[name=fields_city]').removeClass('error');
                // $('input[name=fields_city]').addClass('valid');
                $('#fields_city_div').addClass('valid');
                $('#fields_city_div').removeClass('error');
            }

            if (fields_zip == '') {
                // $('input[name=fields_zip]').removeClass('valid');
                //$('input[name=fields_zip]').addClass('error');
                $('#fields_zip_div').addClass('error');
                $('#fields_zip_div').removeClass('valid');
                count = 1;
            } else {
                // $('input[name=fields_zip]').removeClass('error');
                // $('input[name=fields_zip]').addClass('valid');
                $('#fields_zip_div').addClass('valid');
                $('#fields_zip_div').removeClass('error');
            }



            if (count == 1) {
                return false;
            } else {
                $('#shippingInfo').hide();
                $('#billingInfo').fadeIn();
                $('html, body').stop().animate({scrollTop: $('#billingInfo').offset().top}, 1000);
            }
            /*(function() {
             $('.form-error').hide();
             var e = !0;
             var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
             var zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/; // US ZIP Code Regex
             if ($('select[name="shippingCountry"]').val() === 'CA') {
             zipRegex = /[\d\D]/;
             //zipRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/; // CA Zip Code Regex
             }
             $('input[name="firstName"]').val() ||
             ((e = !1),
             $('.firstNameErr')
             .not('.disabled')
             .show());
             $('input[name="lastName"]').val() ||
             ((e = !1), $('#lastNameErr').show());
             ($('input[name="email"]').val() &&
             /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/.test(
             $('input[name="email"]').val()
             )) ||
             ((e = !1), $('#emailErr').show());
             ($('input[name="phone"]').val() &&
             -1 ===
             $('input[name="phone"]')
             .val()
             .indexOf('_') &&
             phoneRegex.test($('input[name="phone"]').val())) ||
             ((e = !1), $('#phoneErr').show());
             $('input[name="shippingAddress1"]').val() ||
             ((e = !1), $('#shippingAddress1Err').show());
             $('input[name="shippingCity"]').val() ||
             ((e = !1), $('#shippingCityErr').show());
             ($('select[name="shippingCountry"]').val() &&
             'Country' != $('select[name="shippingCountry"]').val()) ||
             ((e = !1), $('#shippingCountryErr').show());
             ($('select[name="shippingState"]').val() &&
             'State' != $('select[name="shippingState"]').val()) ||
             ((e = !1), $('#shippingStateErr').show());
             ($('input[name="shippingZip"]').val() &&
             -1 ===
             $('input[name="shippingZip"]')
             .val()
             .indexOf('_') &&
             zipRegex.test($('input[name="shippingZip"]').val())) ||
             ((e = !1), $('#shippingZipErr').show());
             return !!e;
             })() &&
             ($.post(
             '/captureprospect',
             $('#registration-form').serializeArray(),
             function(res) {}
             ),
             $('#shippingInfo').hide(),
             $('#billingInfo').fadeIn(),
             $('html, body')
             .stop()
             .animate({ scrollTop: $('#billingInfo').offset().top }, 1000));*/
        });

        $('#step2Back').click(function (e) {
            $('#shippingInfo').hide(),
                    $('#packageSelect').fadeIn(),
                    $('html, body')
                    .stop()
                    .animate({scrollTop: $('#packageSelect').offset().top}, 1000);
        });

        $('#step3Back').click(function (e) {
            $('#billingInfo').hide(),
                    $('#shippingInfo').fadeIn(),
                    $('html, body')
                    .stop()
                    .animate({scrollTop: $('#shippingInfo').offset().top}, 1000);
        });
    }

    // TODO:: Maybe change the btn to process to .processPmt instead of step3Btn
    $('.step3Btn').click(function (e) {
        //alert('step3Btn');
        e.preventDefault();
        /*var t;
         (function() {
         $('.form-error').hide();
         var e = !0;
         0 == $('#togData').prop('checked') &&
         ($('input[name="billingFirstName"]').val() ||
         ((e = !1),
         $('.billingFirstNameErr')
         .not('.disabled')
         .show()),
         $('input[name="billingLastName"]').val() ||
         ((e = !1), $('#billingLastNameErr').show()),
         $('input[name="billingAddress1"]').val() ||
         ((e = !1), $('#billingAddress1Err').show()),
         ($('select[name="billingCountry"]').val() &&
         'Country' != $('select[name="billingCountry"]').val()) ||
         ((e = !1), $('#billingCountryErr').show()),
         $('input[name="billingCity"]').val() ||
         ((e = !1), $('#billingCityErr').show()),
         ($('select[name="billingState"]').val() &&
         'State' != $('select[name="billingState"]').val()) ||
         ((e = !1),
         $('.billingStateErr')
         .not('.disabled')
         .show()),
         $('input[name="billingZip"]').val() ||
         ((e = !1), $('#billingZipErr').show()));
         ($('input[name="creditCardNumber"]').val() &&
         (function(e) {
         num = e.replace(/[^0-9]/g, '');
         let t = num.length,
         n = 0,
         r = 1;
         for (; t--; ) {
         const e = num.charAt(t) * r;
         (n += e - 9 * (e > 9)), (r ^= 3);
         }
         return n % 10 == 0 && n > 0;
         })($('input[name="creditCardNumber"]').val())) ||
         ((e = !1), $('#creditCardNumberErr').show());
         -1 !==
         $('input[name="creditCardNumber"]')
         .val()
         .indexOf('_') && ((e = !1), $('#creditCardNumberErr').show());
         ($('select[name="expmonth"]').val() &&
         'Exp. Month' != $('select[name="expmonth"]').val()) ||
         ((e = !1),
         $('.expmonthErr')
         .not('.disabled')
         .show());
         ($('select[name="expyear"]').val() &&
         'Exp. Year' != $('select[name="expyear"]').val()) ||
         ((e = !1), $('#expyearErr').show());
         ($('input[name="CVV"]').val() &&
         -1 ===
         $('input[name="CVV"]')
         .val()
         .indexOf('_')) ||
         ((e = !1), $('#CVVErr').show());
         var t = $('select[name="expmonth"]').val(),
         n = $('select[name="expyear"]').val(),
         r = new Date().getMonth() + 1,
         o = new Date()
         .getFullYear()
         .toString()
         .substr(-2);
         ((t < r && n == o) || n < o) &&
         ((e = !1), $('#expmonthErr').show(), $('#expyearErr').show());
         return !!e;
         })()
         ? (1 == $('#togData').prop('checked') && x(),
         (t = (t = $('input[name="phone"]').val()).replace(/[^0-9]/g, '')),
         $('#phoneHidden').val(t),
         (t = (t = $('input[name="creditCardNumber"]').val()).replace(
         /[^0-9]/g,
         ''
         )),
         $('#creditCardNumberHidden').val(t))
         : e.preventDefault();*/
    }),
            $('#togData').click(function () {
        1 == $('#togData').prop('checked')
                ? ($('#billingSameAsShipping').val('yes'), $('.shipaddress').slideUp())
                : 0 == $('#togData').prop('checked') &&
                ($('#billingSameAsShipping').val('no'),
                        $('.shipaddress').slideDown());
        $('#billingSameAsShipping').change();
    }),
            $('input.field-all').keydown(function () {
        $('#' + $(this)[0].name + 'Err').hide(),
                $('.' + $(this)[0].name + 'Err').hide();
    }),
            $('select.field-all').change(function () {
        $('#' + $(this)[0].name + 'Err').hide(),
                $('.' + $(this)[0].name + 'Err').hide();
    }),
            $('.upsell_button').click(function () {
        $('#quantity').val($(this).data('quantity')),
                $('#product-id').val($(this).data('product-id')),
                $('.is-upsell').submit();
    });



    var end_total = 0;
    var get_total = function () {
        var $product_id = $('.package-item')
                .find(':checked')
                .val();
        var $product_type = $('.package-item')
                .find(':checked')
                .data('type');
        var $couponCode = $('#couponCode').val() || '';
        var $prodQty = $('#product-qty').val() || '';
        var $shipping_country = $('#shipping-country')
                .find(':selected')
                .val();
        var $shipping_state = $('#shipping-region')
                .find(':selected')
                .val();
        var $warranty = $('#funnel-warranty').prop('checked');
        var $email_address = $("input[name='email']").val();

        if (!$product_id || !$shipping_state) {
            $('#summary').addClass('d-none');
            $('#summary-div').addClass('d-none');
            $('.subtotal-value span').html('-');
            $('.shipping-value span').html('-');
            $('.tax-value span').html('-');
            $('.total-value span').html('-');
            return;
        }

        const totals = calcTotal({
            id: $product_id,
            shipping_country: $shipping_country,
            shipping_state: $shipping_state,
            warranty: $warranty,
            couponCode: $couponCode,
            productQty: $prodQty,
            type: $product_type,
            email_address: $email_address
        });

        doneCalculating(totals);

        function doneCalculating(response) {
            var data = response;
            var subtotal = data.subtotal;
            var coupons = data.coupons;
            var shipping = data.shipping;
            var tax = data.tax;
            var total = data.grand_total;

            if (total === end_total) {
                return;
            }

            // Display notification in summary block
            if (coupons > 0) {
                $('.coupon').html('( $' + coupons + ' OFF APPLIED )');
            }

            // Display summary block when total is defined
            if (total !== undefined) {
                $('#summary-div').removeClass('d-none');
                $('#summary').removeClass('d-none');
            }

            $('.subtotal-value span').html(subtotal);

            if (shipping < 1) {
                $('.shipping-value').html('<strong>FREE SHIPPING</strong>');
            } else {
                $('.shipping-value').html('<span>$' + shipping + '</span>');
            }

            $('.tax-value span').html(tax);
            $('.total-value span').html(total);

            end_total = total;
        }
    };

    /* nano style urgency total update */
    function update_urgency_qty() {
        //var $product_active = $(".package-item").find(":checked");
        // $product_qty = $product_active.parent().next().data('totalQty');
        //var $starting_qty = $('.urgency__qty-left').data('qtyLeft');

        var $current_qty = $('.urgency__qty-left').html();
        // Reduce by random amount (1-3)
        var $reduce_amt = Math.floor(Math.random() * 3 + 1);
        var $random_timer = Math.floor((25 - 4) * Math.random() + 5) * 1000;
        var $new_qty = $current_qty - $reduce_amt;

        // Never leave negative amount of products
        if ($new_qty <= 1) {
            $new_qty = 1;
        }

        $('.urgency__qty-left').html($new_qty);

        // set timer for update_urgency_qty() with random between 5 and 25 seconds;
        var timer = setTimeout(function () {
            update_urgency_qty();
        }, $random_timer);
    }

    function set_urgency_qty() {
        var $starting_qty = $('.urgency__qty-left').data('qtyLeft');
        $('.urgency__qty-left').html($starting_qty);

        // set timer for update_urgency_qty();
        setTimeout(function () {
            update_urgency_qty();
        }, 5000);
    }

    set_urgency_qty();
    /* end nano dynamic order qty left */

    var phoneMask = [
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];
    var phoneInput = document.querySelector('#phone');


    var ccMask = [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];


    function w() {
        $(window).width() <= 767
                ? ($('.lg-only').addClass('disabled'),
                        $('.sm-only').removeClass('disabled'))
                : ($('.sm-only').addClass('disabled'),
                        $('.lg-only').removeClass('disabled'));
    }

    function x() {
        (e = $('input[name="billingFirstName"]').val()),
                (t = $('input[name="billingLastName"]').val()),
                (n = $('input[name="billingAddress1"]').val()),
                (r = $('#billing-country').val()),
                (o = $('input[name="billingCity"]').val()),
                (i = $('#billing-region').val()),
                (a = $('input[name="billingZip"]').val()),
                $('input[name="billingFirstName"]').val(''),
                $('input[name="billingLastName"]').val(''),
                $('input[name="billingAddress1"]').val(''),
                $('#billing-country').val(''),
                $('input[name="billingCity"]').val(''),
                $('#billing-region').val(''),
                $('input[name="billingZip"]').val('');
    }

    $('#registration-form').on('submit', function (e) {
        e.preventDefault();
        //alert('here we goooo');
        $('#btnSubmit').attr('disabled', 'disabled');

        //set firstName cookie for upsell page
        document.cookie =
                'upsell_user_name=' + $('input[name="firstName"]').val() + '; expires=';
        document.cookie =
                'upsell_user_city=' +
                $('input[name="shippingCity"]').val() +
                '; expires=';
        document.cookie =
                'upsell_user_state=' + $('[name="shippingState"]').val() + '; expires=';
        //alert('button should be disabled');
        document.getElementById('registration-form').submit();
    });

    // Add possibility for timer Time change
    var timeByCheckout = parseInt(timer_time * 1000);

    $(window).resize(function () {
        w();
    }),
            w(),
            (function (e, t) {
                if (document.getElementById(e)) {
                    var n = document.getElementById(e),
                            r = n.querySelector('.hours'),
                            o = n.querySelector('.minutes'),
                            i = n.querySelector('.seconds');

                    function a() {
                        var e = (function (e) {
                            var t = Date.parse(e) - Date.parse(new Date()),
                                    n = Math.floor((t / 1e3) % 60),
                                    r = Math.floor((t / 1e3 / 60) % 60),
                                    o = Math.floor((t / 36e5) % 24);
                            return {
                                total: t,
                                days: Math.floor(t / 864e5),
                                hours: o,
                                minutes: r,
                                seconds: n
                            };
                        })(t);
                        (r.innerHTML = ('0' + e.hours).slice(-2)),
                                (o.innerHTML = ('0' + e.minutes).slice(-2)),
                                (i.innerHTML = ('0' + e.seconds).slice(-2)),
                                e.total <= 0 && clearInterval(s);
                    }
                    a();
                    var s = setInterval(a, 1e3);
                }
            })('clockdiv', new Date(Date.parse(new Date()) + timeByCheckout));

    // make both clocks work TODO: create class based dynamic clock
    if ($('#clockdiv2').length) {
        (function clock2(e, t) {
            var n = document.getElementById(e),
                    r = n.querySelector('.hours'),
                    o = n.querySelector('.minutes'),
                    i = n.querySelector('.seconds');

            function a() {
                var e = (function (e) {
                    var t = Date.parse(e) - Date.parse(new Date()),
                            n = Math.floor((t / 1e3) % 60),
                            r = Math.floor((t / 1e3 / 60) % 60),
                            o = Math.floor((t / 36e5) % 24);
                    return {
                        total: t,
                        days: Math.floor(t / 864e5),
                        hours: o,
                        minutes: r,
                        seconds: n
                    };
                })(t);
                (r.innerHTML = ('0' + e.hours).slice(-2)),
                        (o.innerHTML = ('0' + e.minutes).slice(-2)),
                        (i.innerHTML = ('0' + e.seconds).slice(-2)),
                        e.total <= 0 && clearInterval(s);
            }
            a();
            var s = setInterval(a, 1e3);
        })('clockdiv2', new Date(Date.parse(new Date()) + timeByCheckout));
    }

    /* Preselected Option in Query Param */
    function checkForPreselectedId(preselectedID) {
        // loop through vales && get the one that matches
        const productInputs = [...document.querySelectorAll('.packageOpt input')];
        matchingProductInput = productInputs.filter(
                elem => elem.value === preselectedID
        );

        // Select it on the form
        if (matchingProductInput.length) {
            matchingProductInput[0].click();
            console.log(matchingProductInput[0].checked);
        }
    }

    var preselectedID = getPreselectedProduct();
    if (preselectedID) {
        checkForPreselectedId(preselectedID);
    }
});
