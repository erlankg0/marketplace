import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': '/src/components',
            '@hooks': '/src/hooks',
            '@assets': '/src/assets',
            '@layout': '/src/layout',
            '@styles': '/src/styles',
            '@interfaces': '/src/interfaces',
            '@validations': '/src/validations',
        },
    },
});
