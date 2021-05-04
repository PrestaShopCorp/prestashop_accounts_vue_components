function manageModuleAction17(action) {
  return fetch(action.actionLink, {
    method: 'POST',
  }).then((response) => response.json(),
  ).then((json) => {
    if (json[action.module].status === false) {
      throw new Error(`Cannot ${action.action} ${action.module} module.`);
    }
    return json;
  });
}

function manageModuleAction16(action) {
  window.location.href = action.actionLink;
}

export default function (action, isPs17) {
  // if on ps before 1.7.3 just reload the page
  if (!isPs17) {
    return manageModuleAction16(action);
  }
  return manageModuleAction17(action);
}
