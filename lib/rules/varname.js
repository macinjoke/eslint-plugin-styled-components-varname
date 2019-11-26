function create(context) {
  const defaultOption = {
    tagStyle: { prefix: '_' },
    extendedStyle: { prefix: '$' },
  }
  const option = context.options[0] || defaultOption

  function checkValuableName(node, name, styleOption) {
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

  function handleTagStyle(node, tag) {
    const objectIdentifier = tag.object
    if (objectIdentifier.type !== 'Identifier') return
    if (objectIdentifier.name !== 'styled') return
    const idIdentifier = node.id
    if (idIdentifier.type !== 'Identifier') return
    if (option.tagStyle) {
      checkValuableName(node, idIdentifier.name, option.tagStyle)
    }
  }

  function handleExtendedStyle(node, tag) {
    const identifier = tag.callee
    if (identifier.type !== 'Identifier') return
    if (identifier.name !== 'styled') return
    const idIdentifier = node.id
    if (idIdentifier.type !== 'Identifier') return
    if (option.extendedStyle) {
      checkValuableName(node, idIdentifier.name, option.extendedStyle)
    }
  }

  return {
    VariableDeclarator: node => {
      if (!node.init) return
      const taggedTemplateExpression = node.init
      if (taggedTemplateExpression.type !== 'TaggedTemplateExpression') return
      const tag = taggedTemplateExpression.tag
      if (tag.type === 'MemberExpression') {
        handleTagStyle(node, tag)
        return
      }
      if (tag.type === 'CallExpression') {
        handleExtendedStyle(node, tag)
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
