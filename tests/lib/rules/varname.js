const { RuleTester } = require('eslint')
const rule = require('../../../lib/rules/varname')

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })

ruleTester.run('my-rule', rule, {
  valid: [
    {
      // default option
      code: 'const _TitleDiv = styled.div``; const $FooComponent = styled(FooComponent)``;',
    },
    {
      code: 'const _TitleDiv = styled.div``',
      options: [{ tagStyle: { prefix: '_' } }],
    },
    {
      code: 'const __FooComponent = styled(FooComponent)``',
      options: [{ extendedStyle: { prefix: '__' } }],
    },
    {
      code: 'const TitleDivS = styled.div``',
      options: [{ tagStyle: { suffix: 'S' } }],
    },
    {
      code: 'const FooComponentES = styled(FooComponent)``',
      options: [{ extendedStyle: { suffix: 'ES' } }],
    },
    {
      code: 'const _titleDiv = styled.div``',
      options: [{ tagStyle: { pattern: '^_[a-z]+[A-Z0-9][a-z0-9]+[A-Za-z0-9]*$' } }],
    },
    {
      code: 'const _FooComponent = styled(FooComponent)``',
      options: [{ extendedStyle: { pattern: '^_[A-Z][a-z0-9]*[A-Z0-9][a-z0-9]+[A-Za-z0-9]*$' } }],
    },
  ],
  invalid: [
    {
      // default option
      code:
        'const StyledTitleDiv = styled.div``; const StyledFooComponent = styled(FooComponent)``;',
      errors: [
        { message: "'StyledTitleDiv' must starts with '_'" },
        { message: "'StyledFooComponent' must starts with '$'" },
      ],
    },
    {
      code: 'const StyledTitleDiv = styled.div``',
      errors: [{ message: "'StyledTitleDiv' must starts with '_'" }],
      options: [{ tagStyle: { prefix: '_' } }],
    },
    {
      code: 'const StyledFooComponent = styled(FooComponent)``',
      errors: [{ message: "'StyledFooComponent' must starts with '_'" }],
      options: [{ extendedStyle: { prefix: '_' } }],
    },
    {
      code: 'const StyledTitleDiv = styled.div``',
      errors: [{ message: "'StyledTitleDiv' must ends with 'S'" }],
      options: [{ tagStyle: { suffix: 'S' } }],
    },
    {
      code: 'const StyledFooComponent = styled(FooComponent)``',
      errors: [{ message: "'StyledFooComponent' must ends with 'ES'" }],
      options: [{ extendedStyle: { suffix: 'ES' } }],
    },
    {
      code: 'const _TitleDiv = styled.div``',
      errors: [{ message: "'_TitleDiv' must match '^_[a-z]+[A-Z0-9][a-z0-9]+[A-Za-z0-9]*$'" }],
      options: [{ tagStyle: { pattern: '^_[a-z]+[A-Z0-9][a-z0-9]+[A-Za-z0-9]*$' } }],
    },
    {
      code: 'const _fooComponent = styled(FooComponent)``',
      errors: [
        { message: "'_fooComponent' must match '^_[A-Z][a-z0-9]*[A-Z0-9][a-z0-9]+[A-Za-z0-9]*$'" },
      ],
      options: [{ extendedStyle: { pattern: '^_[A-Z][a-z0-9]*[A-Z0-9][a-z0-9]+[A-Za-z0-9]*$' } }],
    },
  ],
})
