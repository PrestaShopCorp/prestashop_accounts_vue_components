interface Action {
  module: string;
  action: string;
  actionLink: string;
}

function manageModuleAction17(action: Action) {
  return fetch(action.actionLink, {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((json) => {
      if (json[action.module].status === false) {
        throw new Error(`Cannot ${action.action} ${action.module} module.`);
      }
      return json;
    });
}

function manageModuleAction16(action: Action) {
  return fetch(action.actionLink, {
    method: 'POST',
  });
}

export default function manageModuleAction(action: Action, isPs17: boolean) {
  // if on ps before 1.7.3 just reload the page
  if (!isPs17) {
    return manageModuleAction16(action);
  }
  return manageModuleAction17(action);
}
