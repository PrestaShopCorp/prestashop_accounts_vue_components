<template>
  <div>
    <b-alert
      :show="hasError"
      @dismissed="hasError = false"
      variant="danger"
      dismissible
    >
      <p>
        {{ t('psaccounts.accountManager.errorInstallEnable') }}
      </p>
    </b-alert>

    <b-alert
      v-if="validContext.errors && validContext.errors.length"
      variant="danger"
      show
    >
      <p>
        &lt;PsAccounts&gt; integration: Given context is invalid:
        {{ validContext.errors.join(';') }}
      </p>
    </b-alert>

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
        <b-overlay
          :show="!hasAllShopsLinked"
          variant="white"
          spinner-type="null"
          :opacity="0.70"
          blur="0px"
        >
          <slot name="body" />
        </b-overlay>
        <slot name="customBody" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref,
} from '@vue/composition-api';
import {BAlert, BOverlay} from 'bootstrap-vue';
import useContext from '@/composables/useContext';
import PsAccountComponentAlertDisplay from '@/containers/PsAccountComponentAlertDisplay.vue';
import AccountPanel from '@/components/panel/AccountPanel.vue';
import Locale from '@/mixins/locale';
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
  components: {
    PsAccountComponentAlertDisplay,
    AccountPanel,
    BOverlay,
    BAlert,
  },
  mixins: [Locale],
  props: {
    /**
       * The whole context object given
       * [by ps\_accounts module presenter function](https://github.com/PrestaShopCorp/prestashop-accounts-installer#register-as-a-service-in-your-psx-container-recommended).
       * If left empty (by default), the context will be retrieved from JS global
       * var window.contextPsAccounts automatically.
       */
    context: {
      type: Object,
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

    const shopsWithUrl = computed(() => shopsInContext.value.filter((shop) => shop.domain));

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

<style>
@import '~bootstrap-vue/dist/bootstrap-vue.css';
@import '~prestakit/dist/css/bootstrap-prestashop-ui-kit.css';
</style>
