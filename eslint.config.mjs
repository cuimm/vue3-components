import globals from 'globals' // 常见全局变量的库（如 window、document 等）
import pluginJs from '@eslint/js' // ESLint 官方提供的 JavaScript 规则插件
import tseslint from 'typescript-eslint' // TypeScript ESLint 插件，允许解析和检查 TypeScript 代码
import pluginVue from 'eslint-plugin-vue' // Vue.js 的 ESLint 插件，用于解析和检查 Vue 文件

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'] // 指定 ESLint 要检查的文件类型，包括 JS、MJS、CJS、TS 和 Vue 文件
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      } // 为浏览器环境设置全局变量选项，允许代码中使用这些全局变量而不会触发 ESLint 警告
    }
  },
  pluginJs.configs.recommended, // 使用 ESLint 官方推荐的 JavaScript 规则配置
  ...tseslint.configs.recommended, // 使用 TypeScript ESLint 推荐的规则配置
  // ...tseslint.configs.stylistic,
  ...pluginVue.configs['flat/essential'], // 使用 Vue.js 插件提供的基本规则配置
  {
    files: ['**/*.vue'], // 针对 Vue 文件做特殊配置
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser // 指定 TypeScript ESLint 解析器来解析 Vue 文件中的 `<script>` 块
      }
    },
    rules: {
      'vue/html-self-closing': 'off',
      // 'vue/singleline-html-element-content-newline': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/prefer-import-from-vue': 'off',
      'vue/max-attributes-per-line': 2
    }
  },
  {
    rules: {
      'no-var': 2,
      '@typescript-eslint/prefer-for-of': 'off',
      '@typescript-eslint/no-inferrable-types': 2,
      'typescript-eslint/no-explicit-any': 2
    }
  }
]
