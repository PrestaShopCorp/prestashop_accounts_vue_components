export enum Action {
  Enable = 'enable',
  Install = 'install',
  Update = 'update',
}

export enum Module {
  PsEventbus = 'ps_eventbus',
  PsAccounts = 'ps_accounts',
}

export default function usePSModuleManagement(isPs17: boolean) {
  async function manageModulePS17(module: Module, action: Action, link: string) {
    try {
      const response = await fetch(link, {method: 'POST'});
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`An error has occured: ${response.status}`);
      }

      if (data[module].status === false) {
        throw new Error(`Cannot ${action} ${module} module.`);
      }

      return data;
    } finally {
      //
    }
  }

  async function manageModulePS16(link: string) {
    try {
      await fetch(link, {method: 'POST'});
    } finally {
      //
    }
  }

  async function manageModule(module: Module, action: Action, link: string) {
    // if on ps before 1.7.3 just reload the page
    if (!isPs17) {
      return manageModulePS16(link);
    }

    return manageModulePS17(module, action, link);
  }

  return {manageModule};
}
