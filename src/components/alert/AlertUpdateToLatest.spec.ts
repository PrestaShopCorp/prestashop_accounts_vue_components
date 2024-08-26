import { describe, it, vi, expect, afterEach } from 'vitest';
import { MountingOptions, VueWrapper, mount } from '@vue/test-utils';
import AlertUpdateToLatest from './AlertUpdateToLatest.vue';
type ComponentProps = InstanceType<typeof AlertUpdateToLatest>['$props'];

describe('AlertUpdateToLatest component tests', () => {
  // @ts-expect-error SILENCE JSDOM ERRORS ABOUT LOCATION RELOAD
  window.location = vi.fn();
  global.fetch = vi.fn();
  let wrapper: VueWrapper<any>;
  const findAlertButton = () => wrapper.find('.puik-button');

  const factory = (props: ComponentProps, options: MountingOptions<any> = {}) => {
    wrapper = mount(AlertUpdateToLatest, {
      props,
      ...options
    });
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call the update route on click', async () => {
    vi.mocked<any>(global.fetch).mockImplementationOnce(async () => ({
      status: 200,
      ok: true,
      json: async () => ({
        ps_accounts: {
          status: true
        }
      })
    }));
    factory({
      enableLink: '/enable'
    });
    expect(findAlertButton());
    await findAlertButton().trigger('click');
    expect(fetch).toHaveBeenCalledWith('/upgrade', {
      method: 'POST'
    });
  });

  it('should not call the update route on click if there is no link passed', async () => {
    vi.mocked<any>(global.fetch).mockImplementationOnce(async () => ({
      status: 200,
      ok: true,
      json: async () => ({
        ps_accounts: {
          status: true
        }
      })
    }));
    factory({
      enableLink: null
    });
    expect(findAlertButton());
    await findAlertButton().trigger('click');
    expect(fetch).not.toBeCalled();
  });
});
