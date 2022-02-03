# Prestashop Accounts Vue Components

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
yarn install
```

## Usage

### Storybook

#### Local

```bash
yarn storybook
```

#### Integration / Production

[Storybook integration](https://storybook-accounts.distribution-integration.prestashop.net/) (trigger on PR labeled 'quality assurance needed')

[Storybook production](https://storybook-accounts.distribution.prestashop.net/) (trigger on push master/main)

### CDN

To load a hosted library, copy and paste the HTML snippet for that library (shown below) in your web page.

To load a hosted library, copy and paste the HTML snippet for that library (shown below) in your web page. 

```html
# To load version 4.0.0
<script src="https://unpkg.com/prestashop_accounts_vue_components@4.0.0"></script>

# To load latest patched version 4.0
<script src="https://unpkg.com/prestashop_accounts_vue_components@4.0"></script>

# To load latest version
<script src="https://unpkg.com/prestashop_accounts_vue_components"></script>
```

To use the prestashop_accounts_vue_components, you need a prestashop-accounts html tag, when it's in the page
you can then call the init function of psaccountsVue

```html
<prestashop-accounts></prestashop-accounts>

<script>
    window.psaccountsVue.init();
</script>
```

If you need to use the vue cdn for your app, please create your app with the vue esm-browser as follow

```html
<div id="app"></div>

<script src="https://unpkg.com/prestashop_accounts_vue_components@4.0.0"></script>

<script type="module">
    import { createApp } from 'https://unpkg.com/vue@3.2.26/dist/vue.esm-browser.js';

    const App = {
        data() {
            return {
                name: "John",
            };
        },
        template: `<div>
			<h1>Hello {{ name }}</h1>
			<prestashop-accounts></prestashop-accounts>
		</div>`,
		mounted() {
			window.psaccountsVue.init();
		}

    };

    createApp(App).mount("#app");
</script>
```