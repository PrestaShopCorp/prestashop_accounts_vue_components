# How to contribute

## Pull Request General Guidelines

If you want to contribute to this project, make your PR from a feature branch to the main branch following the GitFlow naming conventions of the repository (ex: `feat/short-desc-of-branch` for new components or feature, `fix/short-desc-of-branch`, etc.)

- Describe what has changed in the pull request
- Explain why this PR exists. Reference issues, Jira tickets, ...
- Make it clear how it does what it sets out to do.

⚠️ We use `commitlint` for conventional commit format. ([How to use](https://github.com/conventional-changelog/commitlint))

## Development

### Prerequisites

- NodeJS >= 18
- [PNPM 8 or higher](https://pnpm.io/)

### Local development

1. Install dependencies

```sh
$ pnpm i
```

2. With this command you can start the storybook dev server

```sh
$ pnpm storybook
```

3. Use storybook to develop your changes or new component

### Unit tests

This project uses [Vitest](https://vitest.dev/) & [Vue Test Utils](https://vue-test-utils.vuejs.org/) for unit testing.  
Every new component or feature should have unit tests (if possible).  
Before creating a PR or marking it ready-to-review be sure that all tests pass by running the following command

Example:

```sh
$ pnpm test
```