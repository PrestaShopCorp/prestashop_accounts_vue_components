<template>
  <div id="psaccounts">
    <puik-alert
      v-show="hasError"
      variant="danger"
      @dismissed="hasError = false"
    >
      <p class="acc-text-sm acc-leading-6">
        {{ $t('psaccounts.accountManager.errorInstallEnable') }}
      </p>
    </puik-alert>

    <puik-alert
      v-if="context.errors && context.errors.length"
      :class="{'acc-mt-4': hasError}"
      variant="danger"
    >
      <p class="acc-text-sm acc-leading-6">
        &lt;PsAccounts&gt; integration: Given context is invalid:
        {{ context.errors.join(';') }}
      </p>
    </puik-alert>
    <template v-else>
      <PsAccountComponentAlertDisplay
        class="acc-mb-4"
        @hasError="hasError = true"
      />
      <template v-if="!hasBlockingAlert">
        <AccountPanel
          :accounts-ui-url="context.accountsUiUrl"
          :app="context.psxName"
          :backend-user="context.backendUser"
          :onboarding-link="context.onboardingLink"
          :shops="shopsInContext"
          :shop-context="context.currentContext ? context.currentContext.type : 4"
          :sso-resend-verification-email="context.ssoResendVerificationEmail"
          :super-admin-email="context.superAdminEmail"
        >
          <slot
            v-if="hasAllShopsLinked"
            name="account-footer"
          />
        </AccountPanel>
        <BaseOverlay
          class="acc-mt-4"
          :show="!hasAllShopsLinked"
        >
          <slot />
          <slot name="body" />
        </BaseOverlay>
        <div class="acc-mt-4">
          <slot name="customBody" />
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  computed, onMounted, ref
} from 'vue';
import { Context } from '@/types/context';
import AccountPanel from '@/components/panel/AccountPanel.vue';
import BaseOverlay from '@/components/BaseOverlay.vue';
import PsAccountComponentAlertDisplay from '@/containers/PsAccountComponentAlertDisplay.vue';
import usePSAccountsContext from '@/composables/usePSAccountsContext';
import '@/assets/css/index.css';

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
  context: () => window.contextPsAccounts || {}
});

const {
  context,
  setContext,
  shopsInContext
} = usePSAccountsContext();
const hasError = ref(false);

const shopsWithUrl = computed(() => shopsInContext.value?.filter((shop) => shop.domain) || []);

const hasAllShopsLinked = computed(() => shopsWithUrl.value.every((shop) => shop.uuid));

const hasBlockingAlert = computed(() => !context.value.psAccountsIsInstalled ||
          !context.value.psAccountsIsUptodate ||
          !context.value.psAccountsIsEnabled);

onMounted(() => {
  setContext(props.context);
});
</script>
