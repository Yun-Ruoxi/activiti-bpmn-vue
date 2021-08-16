import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {resolve} from "path";


//直接获取文件的text
function rawTransform(
  fileRegex: Array<RegExp>,
): {
  name: string;
  transform: (src: string, id: string) => string | void;
} {
  return {
    name: 'get-file-raw',
    transform(src, id): string | void {
      if (fileRegex.filter((re) => re.test(id)).length > 0) {
        return `export default ${JSON.stringify(src)}`;
      }
    },
  };
}
export default {
  server: {
    host: '0.0.0.0',
    port: 666,
    // 是否开启 https
    https: false,
  },
  optimizeDeps: {
    //声明深度路径模块
    include: [
      'bpmn-js/lib/Modeler',
      'highlight.js',
      'codemirror',
      'codemirror/mode/xml/xml.js',
      'codemirror/addon/hint/xml-hint.js',
      'bpmn-js/lib/features/label-editing/LabelUtil.js',
    ],
  },
  plugins: [
    vue(),
    rawTransform([/\.bpmn$/]),
    vueJsx()
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  css: {
    // 不用在每一个页面都进行引入样式，就能直接引用。
    loaderOptions: {
      sass: {
        // prependData: `@import '@/assets/scss/variables.scss';`
      }
    }
  }
};
