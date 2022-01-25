import manageModuleAction from './ManageModuleAction';

export default function enableModule(moduleName: string, actionLink: string, isPs17: boolean) {
  return manageModuleAction(
    {
      module: moduleName,
      action: 'enable',
      actionLink,
    },
    isPs17,
  ).then(() => {
    window.location.reload();
  });
}
