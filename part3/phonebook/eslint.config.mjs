import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"], // Define qué archivos se verán afectados por esta configuración
    ignores: [
      "node_modules/**",
      "build/**",
      "build/static/**",
      "/build/static/**",
      "*/static/**",
    ],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: "readonly",
      },
    },
    rules: {
    },
    settings: {
      extends: "eslint:recommended",
      // Puedes agregar configuraciones adicionales aquí si es necesario
    },
  },
  {
    files: [".eslintrc.{js,cjs}"], // Reglas específicas para archivos de configuración de ESLint
    languageOptions: {
      sourceType: "script", // Usa script en lugar de módulo para archivos .cjs o .js
    },
  },
];
