## 说明

此项目为博客系统的后台管理系统，暂时没有对外开放提供测试功能（后续根据情况和个人时间来看是否需要提供专门的测试页面）。有兴趣的可以先自己在本地部署查看。



## 如何使用

```
git clone https://github.com/XNAL/don-blog-backManage.git

// 需要先安装MySQL，并创建数据库，可参考源码中的`don_blog.sql`
// 同时需要安装Redis，配置参数可参考/server/config/environment/development.js中的配置

cd don-blog-backManage
npm install

// 开启后台服务(功能比较简单，所以暂时没使用gulp等构建工具，有兴趣可自行实现)
node server/app.js

// 本地运行需另开一个终端框口并执行以下命令，然后访问`http://localhost:8080/`
npm run dev

测试账号：admin 
测试密码：123456
```



## 已实现功能和效果图

1. 登录页面

   ![登录页面](https://github.com/XNAL/don-blog-backManage/blob/master/screenshorts/login.png)

2. 文章列表，包括文章编辑、发布和下线

   ![文章列表](https://github.com/XNAL/don-blog-backManage/blob/master/screenshorts/post.png)

3. 新增和编辑文章功能

   ![新增文章](https://github.com/XNAL/don-blog-backManage/blob/master/screenshorts/new-post.png)

4. 分类列表，包括分类的新增、编辑和删除

   ![分类列表](https://github.com/XNAL/don-blog-backManage/blob/master/screenshorts/category.png)

5. 标签列表，包括标签的新增、编辑和删除

   ![标签列表](https://github.com/XNAL/don-blog-backManage/blob/master/screenshorts/tag.png)

6. 实验室项目列表，包括项目的新增、编辑和删除

   ![项目列表](https://github.com/XNAL/don-blog-backManage/blob/master/screenshorts/laboratory.png)

   ![添加项目](https://github.com/XNAL/don-blog-backManage/blob/master/screenshorts/add-laboratory.png)

## 待实现功能

1. 首页统计图表的开发
2. 评论管理的开发
3. 编辑文章时MarkDown编辑器的完善开发
4. 以及其他细节开发
