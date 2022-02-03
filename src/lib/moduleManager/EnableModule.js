import manageModuleAction from './ManageModuleAction';

export default function enableModule(moduleName, actionLink, isPs17) {
  return manageModuleAction({
    module: moduleName,
    action: 'enable',
    actionLink,
  },
  isPs17,
  ).then(() => {
    window.location.reload();
  });
}
