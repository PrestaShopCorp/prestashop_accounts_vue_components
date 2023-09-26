<template>
  <div id="psaccounts">
    <AlertContextValidator
      v-if="errors.length"
      :errors="errors"
      data-testid="account-context-validator-alert"
    />
    <template v-else>
      <AlertModuleDependencies
        :ps-accounts-is-enabled="context.psAccountsIsEnabled"
        :ps-accounts-enable-link="context.psAccountsEnableLink"
        :ps-accounts-is-installed="context.psAccountsIsInstalled"
        :ps-accounts-install-link="context.psAccountsInstallLink"
        :ps-accounts-is-uptodate="context.psAccountsIsUptodate"
        :ps-accounts-update-link="context.psAccountsUpdateLink"
        :ps-is17="context.psIs17"
      />

      <AlertShopUrlShouldExists
        v-if="shopsWithoutUrl.length"
        class="acc-mb-4"
        :shops-without-url="shopsWithoutUrl"
        data-testid="account-shop-url-should-exists-alert"
      />

      <AlertModuleUpdateInformation
        v-if="isLinkedV4"
        class="acc-mb-4"
        data-testid="account-module-information-alert"
      />

      <AlertUserNotSuperAdmin
        v-if="!context.backendUser.isSuperAdmin"
        class="acc-mb-4"
        :super-admin-email="context.superAdminEmail"
        data-testid="account-user-not-super-admin"
      />

      <AlertShopUnlinked
        v-if="context.currentContext.type === ShopContext.Shop && shopsInContext[0].unlinkedAuto"
        class="acc-mb-4"
      />

      <template v-if="!hasBlockingAlert">
        <InvitationBanner
          :app="context.psxName"
          :accounts-ui-url="context.accountsUiUrl"
          :admin-ajax-link="context.adminAjaxLink"
          :shops="shopsToLink"
          :shops-in-context="shopsInContext"
          :shop-context="context.currentContext ? context.currentContext.type : 4"
          data-testid="invitatiion-banner"
        />
        <AccountPanel
          :accounts-ui-url="context.accountsUiUrl"
          :app="context.psxName"
          :is-super-admin="context.backendUser.isSuperAdmin"
          :shops="shopsToLink"
          :shops-in-context="shopsInContext"
          :shop-context="context.currentContext ? context.currentContext.type : 4"
          :shops-without-url="shopsWithoutUrl"
          data-testid="account-panel"
        >
          <slot
            v-if="hasSlotContent($slots['account-footer']) && !shopsToLink.length"
            name="account-footer"
          />
        </AccountPanel>
        <BaseOverlay
          v-if="hasSlotContent($slots.default)"
          class="acc-mt-4"
          :show="!!shopsToLink.length"
        >
          <slot />
          <slot name="body" />
        </BaseOverlay>
        <div
          v-if="hasSlotContent($slots.customBody)"
          class="acc-mt-4"
        >
          <slot name="customBody" />
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/index.css';
import AlertShopUnlinked from '@/components/alert/AlertShopUnlinked.vue';
import { contextSchema } from '@/lib/ContextValidator';
import { hasSlotContent } from '@/lib/utils';
import { Context, Shop, ShopContext } from '@/types/context';
import { computed, ref } from 'vue';

/**
   * `PsAccounts` will automate pre-requisites checks and will call sub-components directly
   * to ensure each functional case is covered for you. You can use the default slots
   * that will be disabled if the user account is not well linked (you should put your
   * module configuration panel here)
   */
  interface PsAccountsProps {
    /**
    * The whole context object given
    * [by ps\_accounts module presenter function](https://github.com/PrestaShopCorp/prestashop-accounts-installer#register-as-a-service-in-your-psx-container-recommended).
    * If left empty (by default), the context will be retrieved from JS global
    * var window.contextPsAccounts automatically.
    */
    context?: Context;
  }
const props = withDefaults(defineProps<PsAccountsProps>(), {
  context: () => (window.contextPsAccounts ? contextSchema.validate(window.contextPsAccounts).value : {}) as Context
});
const errors = ref<string[]>([]);

const { error } = contextSchema.validate(props.context);

if (error) {
  errors.value = error.details.map(
    (e) => e.message
  );
}

const shops = props.context.shops.reduce<Shop[]>(
  (acc, shopGroup) => [...acc, ...shopGroup.shops],
  []
);
const shopsInContext = computed(() => {
  if (props.context.currentContext.type === ShopContext.All) {
    return shops;
  }

  if (props.context.currentContext.type === ShopContext.Group) {
    return [
      ...(props.context.shops.find(
        (shopGroup) => parseInt(shopGroup.id, 10) === props.context.currentContext?.id
      )?.shops ?? [])
    ];
  }

  // Shop
  const shop = shops.find((shop) => parseInt(shop.id, 10) === props.context.currentContext?.id);

  return shop ? [shop] : [];
});

const shopsToLink = computed(() =>
  shopsInContext.value.map((shop) => ({ ...shop, employeeId: String(props.context.backendUser.employeeId) }))
    .filter((shop) => (!shop.uuid || (shop.uuid && shop.isLinkedV4)) && shop.domain)
);

const hasBlockingAlert = computed(() =>
  !props.context.psAccountsIsInstalled || !props.context.psAccountsIsUptodate || !props.context.psAccountsIsEnabled
);

const isLinkedV4 = computed(() => shopsInContext.value.every((shop) => shop.isLinkedV4));

const shopsWithoutUrl = computed(
  () => shopsInContext.value.filter((shop) => shop.domain === null)
    .map((shop) => shop.name)
);
</script>

<style lang="scss">
@import "@/assets/css/index";
@import "~@prestashopcorp/puik/theme/base";
@import "~@prestashopcorp/puik/theme/puik-button";
@import "~@prestashopcorp/puik/theme/puik-card";
@import "~@prestashopcorp/puik/theme/puik-icon";
@import "~@prestashopcorp/puik/theme/puik-alert";
@import "~@prestashopcorp/puik/theme/puik-link";
</style>
