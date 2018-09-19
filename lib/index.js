const fs = require('fs');
const path = require('path');

/**
 * @param {object} opts cli 传递过来的参数对象 (在 pipe 中的配置)
 * @return {AsyncFunction} 中间件函数
 */
module.exports = function (opts) {

  // 校验 opts ...

  return async function (next) {
    let { type = 'react', host = 'localhost', port = 6002, config = '.storybook', 
      assets = './assets', output = '.docs' } = opts;
    const { mod, exec, oneport, mkdirp, readFile, writeFile, prompt } = this.utils;

    // 安装 babel-core
    // require.resolve 无效了...
    let babelCorePath = path.resolve(this.cwd, `./node_modules/babel-core`);
    if ( !fs.existsSync(babelCorePath) ){
      await mod.install('babel-core');
    };

    // 安装 @storybook/react 或 @storybook/angular 或 @storybook/vue
    let modPath = path.resolve(this.cwd, `./node_modules/@storybook/${type}`);
    if ( !fs.existsSync(modPath) ){
      await mod.install(`@storybook/${type}`);
    };

    // 安装 addon-actions
    let addonActionsPath = path.resolve(this.cwd, `./node_modules/@storybook/addon-actions`);
    if ( !fs.existsSync(addonActionsPath) ){
      await mod.install(`@storybook/addon-actions`);
    };

    // 安装 addon-links
    let addonLinksPath = path.resolve(this.cwd, `./node_modules/@storybook/addon-links`);
    if ( !fs.existsSync(addonLinksPath) ){
      await mod.install(`@storybook/addon-links`);
    };

    // 端口号，默认自动检测空闲的端口
    port = port || await oneport();
    
    // 生成配置目录
    let cfgDir = path.resolve(this.cwd, `./${config}`);
    if ( !fs.existsSync(cfgDir) ) {
      await mkdirp(cfgDir);
    };

    // 生成配置文件
    let cfgFile = path.resolve(this.cwd, `./${config}/config.js`);
    if ( !fs.existsSync(cfgFile) ){
      let configBuffer = await readFile(path.resolve(__dirname, `../.storybook/${type}.config.js`));
      await writeFile(cfgFile, configBuffer);

      let addonsBuffer = await readFile(path.resolve(__dirname, `../.storybook/addons.js`));
      await writeFile(cfgFile, addonsBuffer);
    };

    // 选择启动或构建命令
    const command = await prompt.pick({
      type: 'list',
      name: 'letter',
      message: "choice command",
      paginated: true,
      choices: [{ 
        name: 'start storybook', value: 'start-storybook' 
      }, {
        name: 'build storybook', value: 'build-storybook'
      }]
    })

    let assetsDir = path.resolve(this.cwd, assets);
    let script;

    if ( command === 'start-storybook' ){
      // 拼接命令
      if ( !fs.existsSync(assetsDir) ){
        script = `${command} -h ${host} -p ${port} -c ${config}`;
      } else {
        script = `${command} -h ${host} -p ${port} -s ${assets} -c ${config}`;
      };
  
      // 启动 storybook
      await exec(script, {
        onStart(){
          // 启动 storybook 会运行 webpack 占用线程，后续中间件得不到执行，所以提前执行中间件
          next();
        }
      });

    } else {
      // 拼接命令
      if ( !fs.existsSync(assetsDir) ){
        script = `${command} -c ${config} -o ${output}`;
      } else {
        script = `${command} -s ${assets} -c ${config} -o ${output}`;
      };

      // 打包 storybook
      await exec(script);
    };
  };

};