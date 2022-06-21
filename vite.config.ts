import { defineConfig } from 'vitest/config'; 
import react from '@vitejs/plugin-react' 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { 
    globals: true, 
    setupFiles: './src/test/setup.ts',
    environment: "jsdom", 
    exclude: ["src/__visual_tests__", '**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**'] 
},
})
