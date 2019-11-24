# eslint-plugin-styled-components-varname

**Don't use yet! sorry**

[styled-components](https://github.com/styled-components/styled-components) variable names tend to be long like `StyledFooBarAnchor`.

This rule can apply a uniform naming rule by defining prefix or regular expression pattern.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-styled-components-varname`:

```
$ npm install eslint-plugin-styled-components-varname --save-dev
```

## Usage

Add `styled-components-varname` to the plugins section of your `.eslintrc` configuration file.

```json
{
  "plugins": ["styled-components-varname"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "styled-components-varname/varname": 2,
  }
}
```

## Rules

This plugin only supports one rule, `varname`.

Examples of **correct** code for this rule:

```javascript
const _TitleDiv = styled.div`
  height: 32px;
`

const $FooComponent = styled(FooComponent)`
  display: flex;
`
```

Examples of **incorrect** code for this rule:

```javascript
const StyledTitleDiv = styled.div`
  height: 32px;
`

const StyledFooComponent = styled(FooComponent)`
  display: flex;
`
```

## Options
This rule takes one object argument which has `tagStyle` and `extendedStyle`.
If no option is given, it defaults to the following value:

```
"styled-components-varname/varname": [
  2,
  {
    "tagStyle": {
      "prefix": '_',
    },
    "extendedStyle": {
      "prefix": '$',
    },
  },
],

```

tagStyle defines a naming convention that applies to things like `styled.foo`.

extendedStyle defines a naming convention that applies to things like `styled(Foo)`.

tagStyle and extendedStyle have the following properties of the same format:

```
{
  prefix: string, // optional
  suffix: string, // optional
  pattern: string, // optional
}
```

At least one property must be defined.

Examples of **correct** code for the  `{ tagStyle: { prefix: '_' }, extendedStyle: { prefix: '__' } }` option:

```javascript
const _TitleDiv = styled.div`
  height: 32px;
`

const __FooComponent = styled(FooComponent)`
  display: flex;
`
```

Examples of **correct** code for the following option:
```
{
  tagStyle: {
    pattern: '^_[a-z]+[A-Z0-9][a-z0-9]+[A-Za-z0-9]*$', // lower camel case with prefix _
  },
  extendedStyle: {
    pattern: '^_[A-Z][a-z0-9]*[A-Z0-9][a-z0-9]+[A-Za-z0-9]*$', // upper camel case with prefix _
  },
},
```

```javascript
const _titleDiv = styled.div`
  height: 32px;
`

const _FooComponent = styled(FooComponent)`
  display: flex;
`
```

