// vite.config.ts
import legacy from "file:///c:/Users/Tim/Documents/GitHub/planet-go/app/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import react from "file:///c:/Users/Tim/Documents/GitHub/planet-go/app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///c:/Users/Tim/Documents/GitHub/planet-go/app/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    legacy()
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts"
  },
  resolve: {
    alias: {
      "@src": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@theme": "/src/theme",
      "@lib": "/src/lib",
      "@assets": "/src/assets",
      "@core": "/src/core",
      "@types": "/src/types"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJjOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxwbGFuZXQtZ29cXFxcYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJjOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxwbGFuZXQtZ29cXFxcYXBwXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9jOi9Vc2Vycy9UaW0vRG9jdW1lbnRzL0dpdEh1Yi9wbGFuZXQtZ28vYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IGxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIGxlZ2FjeSgpXHJcbiAgXSxcclxuICB0ZXN0OiB7XHJcbiAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXHJcbiAgICBzZXR1cEZpbGVzOiAnLi9zcmMvc2V0dXBUZXN0cy50cycsXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQHNyYyc6ICcvc3JjJyxcclxuICAgICAgJ0Bjb21wb25lbnRzJzogJy9zcmMvY29tcG9uZW50cycsXHJcbiAgICAgICdAcGFnZXMnOiAnL3NyYy9wYWdlcycsXHJcbiAgICAgICdAdGhlbWUnOiAnL3NyYy90aGVtZScsXHJcbiAgICAgICdAbGliJzogJy9zcmMvbGliJyxcclxuICAgICAgJ0Bhc3NldHMnOiAnL3NyYy9hc3NldHMnLFxyXG4gICAgICAnQGNvcmUnOiAnL3NyYy9jb3JlJyxcclxuICAgICAgJ0B0eXBlcyc6ICcvc3JjL3R5cGVzJ1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVSxPQUFPLFlBQVk7QUFDcFYsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBRzdCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsZUFBZTtBQUFBLE1BQ2YsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
