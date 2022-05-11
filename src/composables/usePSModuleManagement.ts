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
  async function manageModule(module: Module, action: Action, link: string) {
    try {
      const response = await fetch(link, {method: 'POST'});
      if(isPs17) {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`An error has occured: ${response.status}`);
        }

        if (data[module].status === false) {
          throw new Error(`Cannot ${action} ${module} module.`);
        }

        return data;
      }
    } finally {
      //
    }
  }

  return { manageModule };
}
