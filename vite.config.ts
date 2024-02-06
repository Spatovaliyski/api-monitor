import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@base': path.resolve(__dirname, 'src/components/00.base'),
      '@atoms': path.resolve(__dirname, 'src/components/01.atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/02.molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/03.organisms'),
      '@templates': path.resolve(__dirname, 'src/components/04.templates'),
      '@pages': path.resolve(__dirname, 'src/components/05.pages'),
    }
  },
  build:{
    outDir: "build"
  },
  base: './'
})