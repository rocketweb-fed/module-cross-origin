# RocketWeb_CrossOrigin
Fixes cross origin JavaScript error on 3rd party iframes and other.

## Installation
Install using Composer
```
$ composer require rocketweb/module-cross-origin
```
To install manually download the module contents into app/code/RocketWeb/CrossOrigin

Once installed enable module and upgrade your magento instance
```
$ bin/magento module:enable RocketWeb_CrossOrigin
$ bin/magento setup:upgrade
```

## Usage
To configure go to Admin > Configuration > RocketWeb > CrossOrigin and input 3rd party URIs to exclude.