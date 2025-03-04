import { defineConfig } from 'vite';

export default defineConfig({
  // Add your rollupOptions here
  build: {
    rollupOptions: {
      input: 'src/main.js' // Specify your entry point here
    }
  },
  // Add optimizeDeps.include patterns
  optimizeDeps: {
    include: ['some-dependency'] // Replace 'some-dependency' with actual dependencies you want to include
  },
  server: {
    port: 5173,
    host: '0.0.0.0'
  }
});
