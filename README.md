# prestashop_accounts_vue_components

## Community Service & PrestaShop X modules

To work as a Community Service or as PrestaShop X, a module needs three parts:

### [module ps_accounts](http://github.com/PrestaShopCorp/ps_accounts)

* Contains all the controllers

### [library npm](http://github.com/PrestaShopCorp/prestashop_accounts_vue_components)

* Contains all the vuejs components to manage onboarding

### [library composer](http://github.com/PrestaShopCorp/prestashop_accounts_auth)

* Wraps all the calls to ps_accounts
* Contains all the Firebase logic

## Installation

```bash
yarn
```

## Usage

For view storybook run

```bash
yarn start-storybook
```

and go on [local storybook](http://localhost:33199/?path=/docs/introduction--page)
or use online [integration storybook](https://storybook-accounts.distribution.prestashop.net/?path=/docs/introduction--page)

## Storybooks

Storybook integration (trigger on PR labeled 'quality assurance needed'): 

https://storybook-accounts.distribution-integration.prestashop.net/

Storybook production (trigger on push master/main) : 

https://storybook-accounts.distribution.prestashop.net/

## CDN

To load a hosted library, copy and paste the HTML snippet for that library (shown below) in your web page. 

```
# To load version 1.4.2
<script src="https://storage.googleapis.com/prestashop-vuejs-cdn/accounts/1.4.2/prestashop_accounts_vue_components.min.js"></script>

# To load latest patched version 1.4 
<script src="https://storage.googleapis.com/prestashop-vuejs-cdn/accounts/1.4.x/prestashop_accounts_vue_components.min.js"></script>

# To load latest version
<script src="https://storage.googleapis.com/prestashop-vuejs-cdn/accounts/1.x.x/prestashop_accounts_vue_components.min.js"></script>
```
