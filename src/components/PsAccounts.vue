<template>
  <div>
    <BaseAlert
      variant="danger"
      :show="hasError"
      dismissible
      @dismissed="hasError = false"
    >
      <p>
        {{ $t('psaccounts.accountManager.errorInstallEnable') }}
      </p>
    </BaseAlert>
    <BaseAlert
      v-if="validContext.errors && validContext.errors.length"
      variant="danger"
    >
      <p>
        &lt;PsAccounts&gt; integration: Given context is invalid:
        {{ validContext.errors.join(';') }}
      </p>
    </BaseAlert>

    <template v-else>
      <PsAccountComponentAlertDisplay
        @hasError="hasError = true"
      />
      <template v-if="!hasBlockingAlert">
        <AccountPanel
          class="mb-2"
          :accounts-ui-url="validContext.accountsUiUrl"
          :backend-user="validContext.backendUser"
          :onboarding-link="validContext.onboardingLink"
          :shops="shops"
          :shop-context="validContext.currentContext ? validContext.currentContext.type : 4"
          :sso-resend-verification-email="validContext.ssoResendVerificationEmail"
          :super-admin-email="validContext.superAdminEmail"
        >
          <slot
            v-if="hasAllShopsLinked"
            name="account-footer"
          />
        </AccountPanel>
        <BaseOverlay :show="!hasAllShopsLinked">
          <slot name="body" />
        </BaseOverlay>
        <slot name="customBody" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, PropType, ref,
} from '@vue/composition-api';
import i18n from '@/i18n';
import {Context} from '@/types/context';
import AccountPanel from '@/components/panel/AccountPanel.vue';
import BaseAlert from '@/components/alert/BaseAlert.vue';
import BaseOverlay from '@/components/BaseOverlay.vue';
import PsAccountComponentAlertDisplay from '@/containers/PsAccountComponentAlertDisplay.vue';
import useContext from '@/composables/useContext';
import useSegmentTracking from '@/composables/useSegmentTracking';

/**
   * `PsAccounts` will automate pre-requisites checks and will call sub-components directly
   * to ensure each functional case is covered for you. You can use 3 slots: `v-slot:body`,
   * that will be disabled if the user account is not well linked (you should put your
   * module configuration panel here), `v-slot:account-footer` that will be displayed
   * on the footer of the PsAccount component if the user is validated and logged,
   * and a special `v-slot:customBody` that will always be
   * displayed (you have to manage display condition by yourself).
   */
export default defineComponent({
  name: 'PsAccounts',
  i18n,
  components: {
    AccountPanel,
    BaseAlert,
    BaseOverlay,
    PsAccountComponentAlertDisplay,
  },
  props: {
    /**
         * The whole context object given
         * [by ps\_accounts module presenter function](https://github.com/PrestaShopCorp/prestashop-accounts-installer#register-as-a-service-in-your-psx-container-recommended).
         * If left empty (by default), the context will be retrieved from JS global
         * var window.contextPsAccounts automatically.
         */
    context: {
      type: Object as PropType<Context>,
      required: false,
      default: () => window.contextPsAccounts || {},
    },
  },
  setup(props) {
    const {
      context,
      setContext,
      shopsInContext,
    } = useContext();
    const {identify, trackAccountComponentViewed} = useSegmentTracking();
    const hasError = ref(false);

    const hasAllShopsLinked = computed(() => shopsWithUrl.value.every((shop) => shop.uuid));

    const hasBlockingAlert = computed(() => !context.value.psAccountsIsInstalled
          || !context.value.psAccountsIsUptodate
          || !context.value.psAccountsIsEnabled);

    const shopsWithUrl = computed(() => shopsInContext.value?.filter((shop) => shop.domain) || []);

    onMounted(() => {
      setContext(props.context);

      if (context.value.psAccountsIsInstalled && context.value.psAccountsIsEnabled) {
        identify();
        trackAccountComponentViewed();
      }
    });

    return {
      validContext: context,
      hasAllShopsLinked,
      hasBlockingAlert,
      hasError,
      shops: shopsInContext,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep {
  @import '~prestakit/scss/application';
}
</style>
