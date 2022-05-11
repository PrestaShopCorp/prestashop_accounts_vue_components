export const ScopedCss = (Story, options) => {
    return {
        setup() {
            const { args, parameters } = options;

            return { args, parameters };
        },
      template: `
            <div id="psaccounts" v-if="!parameters.disableScopedCssDecorator">
                <story />
            </div>
            <story v-else />
        `,
    };
};
