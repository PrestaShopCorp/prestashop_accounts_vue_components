import manageModuleAction from './ManageModuleAction';

export default function installModule(moduleName: string, actionLink: string, isPs17: boolean) {
  return manageModuleAction({
    module: moduleName,
    action: 'install',
    actionLink,
  },
  isPs17,
  ).then(() => {
    window.location.reload();
  });
}
