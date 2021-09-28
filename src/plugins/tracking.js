function Tracking(Vue, options = {}) {
  this.Vue = Vue;
  this.superProperties = options.superProperties || [];

  this.properties = JSON.parse(localStorage.getItem('tracking' || '{}')) || {};
}

/**
 * @param {string=} userId
 * @param {object=} traits
 */
Tracking.prototype.identify = function identify(...args) {
  let traits = {};
  if (args.length === 1 && typeof args[0] === 'object') {
    args[0] = JSON.parse(JSON.stringify(args[0]));
    traits = args[0];
  } else if (args.length >= 2 && typeof args[1] === 'object') {
    args[1] = JSON.parse(JSON.stringify(args[1]));
    traits = args[1];
  }
  // eslint-disable-next-line no-unused-expressions
  this.Vue.prototype.$segment?.identify(...args);

  this.setSuperProperties(traits);
};

/**
 * @param {string} event
 * @param {object=} properties
 */
Tracking.prototype.track = function track(event, properties = {}) {
  const propertiesObject = JSON.parse(JSON.stringify(properties));
  // eslint-disable-next-line no-unused-expressions
  this.Vue.prototype.$segment?.track(event, {...this.properties, ...propertiesObject});

  this.setSuperProperties(propertiesObject);
};

/**
 */
Tracking.prototype.reset = function reset() {
  // eslint-disable-next-line no-unused-expressions
  this.Vue.prototype.$segment?.reset();

  // this.properties = {};
  // localStorage.setItem('tracking', JSON.stringify({}));
};

Tracking.prototype.setSuperProperties = function setSuperProperties(propertiesObject) {
  Object.keys(propertiesObject).forEach((key) => {
    if (this.superProperties.some((superProperty) => key.startsWith(superProperty))) {
      this.properties[key] = propertiesObject[key];
    }
  });

  localStorage.setItem('tracking', JSON.stringify(this.properties));
};

Plugin.install = (Vue, options = {}) => {
  Vue.prototype.$tracking = new Tracking(Vue, options);
};

export default Plugin;
