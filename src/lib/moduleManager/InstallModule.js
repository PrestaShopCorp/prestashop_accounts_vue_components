import manageModuleAction from './ManageModuleAction';

export default function installModule(moduleName, actionLink, isPs17) {
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
