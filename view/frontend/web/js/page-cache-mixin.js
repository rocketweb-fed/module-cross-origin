/**
 * Rocket Web
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * @category  RocketWeb
 * @package   RocketWeb_CrossOrigin
 * @copyright Copyright (c) 2016-2017 RocketWeb (http://rocketweb.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @author    Rocket Web Inc.
 */

/*jshint browser:true jquery:true*/
/*global alert*/
define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * Fix cross origin errors by not mapping the specific nodes.
     */
    return function(originalModule) {
        /**
         * Nodes tree to flat list converter
         * @returns {Array}
         */
        $.fn.comments = function () {
            var elements = [];

            /**
             * @param {jQuery} element - Comment holder
             */
            (function lookup(element) {
                $(element).contents().each(function (index, el) {
                    var thirdPartyUrls = [];
                    if (
                        window.rocketWeb &&
                        window.rocketWeb.crossOriginUrls
                    ) {
                        thirdPartyUrls = window.rocketWeb.crossOriginUrls;
                    }

                    switch (el.nodeType) {
                        case 1: // ELEMENT_NODE
                            // Fix cross origin on 3rd party resources/iframes.
                            var found = false;
                            var patt;
                            for (var i = 0; i < thirdPartyUrls.length; i++) {
                                if (el && el.src) {
                                    if (thirdPartyUrls[i].indexOf("regex::") === 0) {
                                        patt = new RegExp(thirdPartyUrls[i].replace("regex::",""), 'i');
                                        if (patt.test(el.src)) {
                                            found = true;
                                            break;
                                        }
                                    } else if (el.src.indexOf(thirdPartyUrls[i]) === 0) {
                                        found = true;
                                        break;
                                    }
                                }
                            }

                            // Do not process node if it belongs to an external resource
                            if (!found) {
                                try {
                                    lookup(el);
                                } catch (e) {
                                    console.log('Cross Origin page cache:');
                                    if (el && el.src) {
                                        console.log(el.src);
                                    } else {
                                        console.log(el);
                                    }
                                }
                            }

                            break;

                        case 8: // COMMENT_NODE
                            elements.push(el);
                            break;

                        case 9: // DOCUMENT_NODE
                            // Fix error element.prop not found
                            if (element && element.prop) {
                                var hostName = window.location.hostname,
                                    iFrameHostName = $('<a>')
                                        .prop('href', element.prop('src'))
                                        .prop('hostname');

                                if (hostName === iFrameHostName) {
                                    lookup($(el).find('body'));
                                }
                            }
                            break;
                    }
                });
            })(this);

            return elements;
        };

        return originalModule;
    };
});
