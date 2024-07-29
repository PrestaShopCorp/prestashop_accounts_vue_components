<template>
  <puik-alert
    v-if="!loading && firstInvitation"
    class="acc-p-6 acc-mb-4"
    :title="t('psaccounts.account.invitationBanner.title', { count: invitations.length })"
    variant="warning"
    :disabled-borders="true"
    :button-label="t('psaccounts.account.invitationBanner.button', invitations.length)"
    @click="openInvitationsModal()"
  >
    <div>
      {{ t(`psaccounts.account.invitationBanner.messageStart`) }}
      <b>{{ firstInvitation.from.companyName }}</b>
      {{ t(`psaccounts.account.invitationBanner.messageEnd`) }}
    </div>
  </puik-alert>
</template>

<script setup lang="ts">
import { Shop } from '@/types/context';
import { useLocale } from '@/composables/useLocale';
import { ref, onMounted, computed, ComputedRef } from 'vue';
import { useLinkShopCrossDomain } from '@/composables/useLinkShopCrossDomain';
const loading = ref(true);
const invitations = ref([] as Invitation[]);

/**
   * This sub-component can be used in a custom integration when the `PsAccounts` component
   * does not meets special needs.
   * This part will display a block to let the user link his account through a button.
   */
interface InvitationBannerProps {
  accountsUiUrl: string;
  adminAjaxLink: string;
  app: string;
  /**
  * In multistore context, contains the whole shop tree (all groups and all shops).
  * In single shop context, contains this shop information
  */
  shops: Shop[];
  shopsInContext: Shop[];
  /**
  * Current shop context, possible values :<br />
  * 4 - all shops<br />
  * 2 - group<br />
  * 1 - single shop
  */
  shopContext: number;
}

interface Invitation {
  from: {
    userId: string;
    userEmail: string;
    userName: string;
    companyName: string;
  };
  to: {
    shopUrl: string;
    shopId: string;
  };
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
const props = withDefaults(defineProps<InvitationBannerProps>(), {
  shops: () => []
});

const { t } = useLocale();

const { open, state } = useLinkShopCrossDomain({
  accountsUiUrl: props.accountsUiUrl,
  app: props.app,
  shops: props.shops
});

const openInvitationsModal = () => {
  state.specificUiUrl = '/invitation';
  open();
};

const firstInvitation: ComputedRef<Invitation | undefined> = computed(() => {
  if (invitations.value.length !== 0) {
    return invitations.value[0];
  }
  return undefined;
});

onMounted(async () => {
  if (props.shopContext !== 1 || props.shopsInContext.length !== 1 || !props.shopsInContext[0].uuid) {
    return;
  }
  /*
  invitations.value = [
    {
      from: {
        userId: '1',
        userEmail: 'Expert email',
        userName: 'expert name',
        companyName: 'Expert company'
      },
      to: {
        shopUrl: '',
        shopId: ''
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      status: InvitationStatus.PENDING
    }
  ];
  loading.value = false;
  */

  try {
    loading.value = true;
    const response = await fetch(props.adminAjaxLink + '&action=getInvitations', { method: 'GET' });
    if (!response.ok) {
      throw new Error(`An error has occured: ${response.status}`);
    }
    const data = await response.json();

    if (data.invitations.length > 0) {
      invitations.value = data.invitations as Invitation[];
    }
  } catch (e) {
    loading.value = false;
  }
  loading.value = false;
});

</script>
