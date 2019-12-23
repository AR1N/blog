## 导出为WORD:

1. 获取要导出的数据；
2. 将获取到的数据渲染到一个容器中`<div id=domHtml></div`,并设置样式属性：`display:none`;
3. 获取容器文档内容`let htmlContent = document.getElementById
('domHtml').innerHTML`；
4. 创建Blob对象:（放入blob对象中，转换类型，创建下载链接并执行）
```javascript
 let blob = new Blob([this.htmlContent ], {
                    type: 'application/msword'
 //word文档为msword,docx为vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8,pdf文档为pdf,msexcel 为excel
                });
                let objectUrl = URL.createObjectURL(blob);
                let link = document.createElement("a");
                let fname = `文件名`; //下载文件的名字
                link.href = objectUrl;
                link.setAttribute("download", fname);
                document.body.appendChild(link);
                link.click();
```
##### PS：过程中遇到的问题:
> 1. 导出后样式不起作用：（必须使用行内样式，或者将样式写到<style></style>中一起以文档流方式传入blob 对象中，而且行内样式使用margin,padding样式属性也是不会起作用的，只能使用table布局）；
> 2. 导出后可能个别字会被加粗：（需要在样式属性中设定统一的字体`font-family`属性）