import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel等のホスティングサービスで、ルートパス以外にデプロイする場合や
  // パスの解決がうまくいかない場合に base を明示します。
  // 通常は '/' で問題ありませんが、状況に応じて './' に変更してください。
  base: '/', 
  build: {
    outDir: 'dist',
  },
});