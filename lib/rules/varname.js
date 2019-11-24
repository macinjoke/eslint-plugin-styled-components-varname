function checkValuableName(context, node, name, styleOption) {
  const { pattern, prefix, suffix } = styleOption
  if (pattern) {
    if (name.match(new RegExp(pattern))) return
    context.report({ node, message: `'${name}' must match '${pattern}'` })
  }
  if (prefix && !name.startsWith(prefix)) {
    context.report({ node, message: `'${name}' must starts with '${prefix}'` })
  }
  if (suffix && !name.endsWith(suffix)) {
    context.report({ node, message: `'${name}' must ends with '${suffix}'` })
  }
}

function handleTagStyle(context, node, tag) {
  const objectIdentifier = tag.object
  if (objectIdentifier.type !== 'Identifier') return
  if (objectIdentifier.name !== 'styled') return
  const idIdentifier = node.id
  if (idIdentifier.type !== 'Identifier') return
  const option = context.options[0]
  checkValuableName(context, node, idIdentifier.name, option.tagStyle)
}

function handleExtendedStyle(context, node, tag) {
  const identifier = tag.callee
  if (identifier.type !== 'Identifier') return
  if (identifier.name !== 'styled') return
  const idIdentifier = node.id
  if (idIdentifier.type !== 'Identifier') return
  const option = context.options[0]
  checkValuableName(context, node, idIdentifier.name, option.extendedStyle)
}

function create(context) {
  if (!context.options[0]) {
    throw Error('must set tagStyle and extendedStyle option.')
  }
  return {
    VariableDeclarator: node => {
      if (!node.init) return
      const taggedTemplateExpression = node.init
      if (taggedTemplateExpression.type !== 'TaggedTemplateExpression') return
      const tag = taggedTemplateExpression.tag
      if (tag.type === 'MemberExpression') {
        handleTagStyle(context, node, tag)
        return
      }
      if (tag.type === 'CallExpression') {
        handleExtendedStyle(context, node, tag)
      }
    },
  }
}

const styleSchema = {
  type: 'object',
  properties: {
    prefix: { type: 'string' },
    suffix: { type: 'string' },
    pattern: { type: 'string' },
  },
  additionalProperties: false,
}

const rule = {
  meta: {
    type: 'layout',
    docs: {
      description: 'set a rule of styled-components variable name',
      category: 'Stylistic Issues',
      recommended: false,
      url: 'https://github.com/macinjoke/eslint-plugin-styled-components-varname',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          tagStyle: styleSchema,
          extendedStyle: styleSchema,
        },
        additionalProperties: false,
      },
    ],
  },
  create,
}

module.exports = rule
