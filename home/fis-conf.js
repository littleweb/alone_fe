//自定义频道配置
var myConfig = {
	//命名空间
	namespace: "home",
	//模板路径，基于view/
	tplPath: "home"
};

//下面都是统一的，可以无视
fis.config.set('namespace', myConfig.namespace);
fis.config.set('settings.spriter.csssprites.margin', 40);
fis.config.set('modules.optimzier.png', 'png-compressor');
var time = fis.util.md5(Date.now() + '', 9);
var config = new RegExp('(' + myConfig.namespace + '-map.json)',"i");
fis.config.set('roadmap.path', [
	{
		reg : config,
		release : 'config/$1'
	},
	//将压缩后的图像统一发布/static/rongui/images/目录下
    {
	    reg : /^\/css\/(.*\.png)$/i,
	    query : '?t=' + time,
		release : 'images/$1'
	},
   {
       reg: /^\/(.*\.png)$/i,
       useMap: true,
       release: 'images/' + myConfig.namespace + '/$1' //发布到template_dir目录下
   },
   {
       reg: /^\/(.*\.tpl)$/i,
       useMap: true,
       release: '$1' //发布到template_dir目录下
   }
]);

//打包
var myPacks = {};
myPacks['js/' + myConfig.namespace + '.js'] = ['**.js'];
myPacks['css/' + myConfig.namespace + '.css'] = ['**.css'];
fis.config.set('pack', myPacks);

fis.config.set('modules.parser.tpl', 'jsmart');
//*.md will be released as *.html
fis.config.set('roadmap.ext.tpl', 'html');

//配置静态资源域名
/*
fis.config.merge({
    roadmap : {
        domain : 'http://static.rong360.com/rui'
    }
});
*/