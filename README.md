# Prestashop Accounts Vue Components

## Usage

We recommend using the Web component by loading the library through CDN to receive the latest components updates
### CDN (Recommended)

#### Web Component (Recommended)

To load a hosted library, copy and paste the HTML snippet for that library (shown below) in your web page.

```html
# To load latest minor version 5
<script src="https://unpkg.com/prestashop_accounts_vue_components@5" defer></script>

# To load latest version
<script src="https://unpkg.com/prestashop_accounts_vue_components" defer></script>
```

To use the prestashop_accounts_vue_components, you need a prestashop-accounts html tag, when it's in the page
you can then call the init function of psaccountsVue

```html
<prestashop-accounts></prestashop-accounts>

<script>
  window.psaccountsVue.init();
</script>
```

#### Vue component

If you want to use the component in VueJS you will need to load VueJS through cdn too 

```html
<div id="app"></div>

<script src="https://unpkg.com/prestashop_accounts_vue_components@5/psaccountsVue.umd.js" defer></script>

<script type="module">
  import { createApp } from "https://unpkg.com/vue@3.2.26/dist/vue.esm-browser.js";

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
    },
  };

  createApp(App).mount("#app");
</script>
```

### Local install

First you need to install the package using your package manager
```sh
# chose your favorite package manager
# NPM
$ npm install prestashop_accounts_vue_components --save

# Yarn
$ yarn add prestashop_accounts_vue_components

# pnpm
$ pnpm install prestashop_accounts_vue_components
```

Then you need to choose a way to integrate your component

#### Web component (recommended)
```html
<template>
  <div>
    <prestashop-accounts></prestashop-accounts>
  </div>
</template>
<script>
import PsAccounts from "prestashop_accounts_vue_components"

PsAccounts.init();
// OR if you want to use a custom name for the tag
import { PsAccountsWebComponent } from "prestashop_accounts_vue_components"

customElements.define('your-tag-name', PsAccountsWebComponent)
</script>
```

#### Vue component

```html
<template>
  <div>
    <PsAccounts />
  </div>
</template>
<script setup>
import { PsAccounts } from "prestashop_accounts_vue_components";
</script>
```

## Compatibility

Compatible version of prestashop_accounts_vue_components with PsAccounts  

| Ps Accounts Module | Vue Components minimum version | Vue components maximum version |
|--------------------|--------------------------------|--------------------------------|
| 5.0                | 2.0.0                          | 2.0.4                          |
| 5.0.2              | 2.0.0                          | 2.0.4                          |
| 5.0.3              | 2.0.0                          | 2.0.4                          |
| >=5.1.0            | 3.0.0                          | 3.0.4                          |
