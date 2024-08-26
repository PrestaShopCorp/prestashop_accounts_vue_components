import { Module, Action } from '@/lib/utils';
import AlertModuleDependencies from '@/components/alert/AlertModuleDependencies.vue';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MountingOptions, VueWrapper, mount, flushPromises } from '@vue/test-utils';
type ComponentProps = InstanceType<typeof AlertModuleDependencies>['$props'];

describe('AlertModuleDependencies component tests', () => {
  // @ts-expect-error SILENCE JSDOM ERRORS ABOUT LOCATION RELOAD
  window.location = vi.fn();
  global.fetch = vi.fn();
  let wrapper: VueWrapper<any>;
  const findDependencyAlert = () => wrapper.find('[data-testid=account-module-dependencies-alert]');
  const findErrorAlert = () => wrapper.find('.puik-alert--danger');
  const findAlertTitle = () => wrapper.find('.puik-alert__title');
  const findAlertDescription = () => wrapper.find('.puik-alert__description');
  const findAlertButton = () => wrapper.find('.puik-button');
  const factory = (props: Partial<ComponentProps>, options?: MountingOptions<any>) => {
    wrapper = mount(AlertModuleDependencies, {
      props: {
        psAccountsEnableLink: '/enable',
        psAccountsInstallLink: '/install',
        psIs17: true,
        ...props
      },
      ...options
    });
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display nothing', () => {
    factory({
      psAccountsIsEnabled: true,
      psAccountsIsInstalled: true
    });
    expect(findDependencyAlert().exists()).toBeFalsy();
  });

  it('should display the Ps Accounts is not installed alert', async () => {
    vi.mocked<any>(global.fetch).mockImplementationOnce(async () => ({
      status: 200,
      ok: true,
      json: async () => ({
        [Module.PsAccounts]: {
          status: true
        }
      })
    }));
    factory({
      psAccountsIsEnabled: false,
      psAccountsIsInstalled: false
    });
    expect(findAlertTitle().text()).toBe(`psaccounts.alert.${Module.PsAccounts}.${Action.Install}.title`);
    expect(findAlertDescription().text()).toBe(`psaccounts.alert.${Module.PsAccounts}.${Action.Install}.message`);
    expect(findAlertButton().text()).toBe(`psaccounts.alert.${Module.PsAccounts}.${Action.Install}.action`);
    await findAlertButton().trigger('click');
    expect(fetch).toHaveBeenCalledWith('/install', {
      method: 'POST'
    });
  });

  it('should display the Ps Accounts is not enabled alert', async () => {
    vi.mocked<any>(global.fetch).mockImplementationOnce(async () => ({
      status: 200,
      ok: true,
      json: async () => ({
        [Module.PsAccounts]: {
          status: true
        }
      })
    }));
    factory({
      psAccountsIsEnabled: false,
      psAccountsIsInstalled: true
    });
    expect(findAlertTitle().text()).toBe(`psaccounts.alert.${Module.PsAccounts}.${Action.Enable}.title`);
    expect(findAlertDescription().text()).toBe(`psaccounts.alert.${Module.PsAccounts}.${Action.Enable}.message`);
    expect(findAlertButton().text()).toBe(`psaccounts.alert.${Module.PsAccounts}.${Action.Enable}.action`);
    await findAlertButton().trigger('click');
    expect(fetch).toHaveBeenCalledWith('/enable', {
      method: 'POST'
    });
  });

  it('should display an error message if alert action fails', async () => {
    vi.mocked<any>(global.fetch).mockImplementationOnce(() => ({
      status: 404
    }));
    factory({
      psAccountsIsEnabled: false,
      psAccountsIsInstalled: false
    });
    await findAlertButton().trigger('click');
    expect(findErrorAlert().exists()).toBeTruthy();
  });

  it('should throw an error if the returned module status is false', async () => {
    vi.mocked<any>(global.fetch).mockImplementationOnce(async () => ({
      status: 200,
      ok: true,
      json: async () => ({
        [Module.PsAccounts]: {
          status: false
        }
      })
    }));
    factory({
      psAccountsIsEnabled: false,
      psAccountsIsInstalled: false
    });
    await findAlertButton().trigger('click');
    await flushPromises();
    expect(findErrorAlert().exists()).toBeTruthy();
  });

  it('should throw an error if fetch returned ok to false', async () => {
    vi.mocked<any>(global.fetch).mockImplementationOnce(async () => ({
      status: 404,
      ok: false
    }));
    factory({
      psAccountsIsEnabled: false,
      psAccountsIsInstalled: false
    });
    await findAlertButton().trigger('click');
    await flushPromises();
    expect(findErrorAlert().exists()).toBeTruthy();
  });
});
