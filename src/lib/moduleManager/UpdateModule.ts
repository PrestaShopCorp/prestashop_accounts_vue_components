import manageModuleAction from './ManageModuleAction';

export default function updateModule(moduleName: string, actionLink: string, isPs17: boolean) {
  return manageModuleAction({
    module: moduleName,
    action: 'update',
    actionLink,
  },
  isPs17,
  ).then(() => {
    window.location.reload();
  });
}
