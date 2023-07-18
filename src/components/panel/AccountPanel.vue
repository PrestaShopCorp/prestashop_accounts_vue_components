<template>
  <puik-card
    class="acc-p-6"
  >
    <div class="acc-flex acc-flex-row acc-items-center">
      <PuikIcon
        v-if="hasShopsLinked"
        class="acc-text-white acc-bg-green-500 acc-rounded-full acc-p-1 acc-mr-2"
        icon="check"
        data-testid="account-panel-linked-icon"
      />
      <p class="acc-m-0 puik-h5">
        {{ t('psaccounts.account.title', shopsInContext.length) }}
      </p>
    </div>
    <div
      class="acc-flex acc-flex-col acc-items-center md:acc-flex-row"
    >
      <AccountShopLinkMessage
        class="md:acc-mr-2"
        :shops-in-context="shopsInContext"
        :shop-context="shopContext"
      />
      <AccountLinkToUi
        v-if="!shopsWithoutUrl.length"
        class="acc-mt-2 md:acc-mt-0"
        :accounts-ui-url="accountsUiUrl"
        :app="app"
        :is-super-admin="isSuperAdmin"
        :shops="shops"
        :has-shops-linked="hasShopsLinked"
        data-testid="account-link-buttons"
      />
    </div>

    <div
      v-if="hasSlotContent($slots.default)"
      class="acc-mt-6"
      data-testid="account-panel-slot"
    >
      <slot />
    </div>
  </puik-card>
</template>

<script setup lang="ts">
import { Shop } from '@/types/context';
import { hasSlotContent } from '@/lib/utils';
import { computed } from 'vue';
import { useLocale } from '@/composables/useLocale';

/**
   * This sub-component can be used in a custom integration when the `PsAccounts` component
   * does not meets special needs.
   * This part will display a block to let the user link his account through a button.
   */
  interface AccountPanelProps {
    /**
    * URL loaded inside the association workflow modal<br />
    * should be https://accounts.distribution.prestashop.net/en
    */
    accountsUiUrl: string;
    /**
    * Name of the module
    */
    app: string;
    /**
    * User currently logged into the back office is super admin
    */
    isSuperAdmin: boolean;
    /**
    * In multistore context, contains the whole shop tree (all groups and all shops).
    * In single shop context, contains this shop information
    */
    shops?: Shop[];
    shopsInContext: Shop[];
    shopsWithoutUrl?: string[];
    /**
    * Current shop context, possible values :<br />
    * 4 - all shops<br />
    * 2 - group<br />
    * 1 - single shop
    */
    shopContext: number;
  }

const props = withDefaults(defineProps<AccountPanelProps>(), {
  shops: () => [],
  shopsWithoutUrl: () => []
});

const { t } = useLocale();

const hasShopsLinked = computed(() => props.shopsInContext.some((shop) => shop.uuid && !shop.isLinkedV4));
</script>
