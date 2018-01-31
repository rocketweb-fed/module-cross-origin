<?php
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

namespace RocketWeb\CrossOrigin\Helper;

/**
 * Cross origin helper
 *
 * @SuppressWarnings(PHPMD.LongVariable)
 */
class Data extends \Magento\Framework\App\Helper\AbstractHelper
{
    const XML_PATH_URL_MAP = 'rocketweb_cross_origin/url/map';

    /**
     * Get URIs map
     *
     * @return array
     */
    public function getUrlMap()
    {
        $config = $this->scopeConfig->getValue(self::XML_PATH_URL_MAP, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        return $this->parseUrlMapConfig($config);
    }

    /**
     * Parse configuration string into an array of URIs
     *
     * @param string $config
     * @return array
     */
    public function parseUrlMapConfig($config)
    {
        $map = [];
        $arr = explode("\n", $config);
        foreach ($arr as $key => $url) {
            $url = trim(str_replace("\r", "", $url));
            if (!empty($url)) {
                $map[] = $url;
            }
        }
        return $map;
    }
}
