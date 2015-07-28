# Modulus - ESLint Shareable Config

JavaScript Modulus Style - [ESLint Shareable Config][shareable-configs]

## Install

*TODO*: publish to npm

```bash
cd $PROJECTS
git clone git@github.com:onmodulus/eslint-config.git
cd eslint-config
npm link
```

## Usage

Shareable configs are designed to work with the `extends` feature of `.eslintrc`
files.  You can learn more about [Shareable Configs][shareable-configs] on the
official ESLint website.

To use the JavaScript Modulus Style shareable config, just add this to your
`.eslintrc` file:

```
{
  "extends": "modulus"
}
```

*Note: We omitted the `eslint-config-` prefix since it is automatically assumed
by ESLint.*

You can override settings from the shareable config by adding them directly into
your `.eslintrc` file.

## Learn more

For the full listing of rules, editor plugins, FAQs, and more, visit the main
[JavaScript Modulus Style repo][github].

## License

MIT. Copyright (c) [Modulus](https://modulus.io).

[github]: https://github.com/onmodulus/eslint-config
[shareable-configs]: http://eslint.org/docs/developer-guide/shareable-configs
[badge]: https://cdn.rawgit.com/onmodulus/eslint-config/master/badge.svg
