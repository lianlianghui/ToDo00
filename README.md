# ToDo00
#### 4.2.9  下载 store.js

#### 4.3.0  把数据存到浏览器

    把值存到 对像里面   在把对象push 数组    在把数组存到浏览器里面
    var arr=[];
    var task_list={name:1};

    arr.push(task_list);
     store.set("list",arr)


#### 4.3.1  获到数据更新li

    获取浏览器里面的数据  && 存到数组 && 循环出 li


#### 4.3.2  删除功能

    * 1. 设置一个  data-index=i;
    *
    *  2.获取  index
    *
    *  3. 删除   delete list_task[index]

        var arr=[1,2,3,4];
        arr.splice(0,2)
        console.log(arr)

    *
    *  4. store.set("gg",list_task)   同步 浏览的数据


#### 4.3.3  自定义弹框

        1.点击删除 显示弹框
        2.点击确定  删除 li  && 隐藏弹框   bind
        3.点击取消  隐藏弹框


#### 4.3.3  详细功能

       1.获取index
       1.点击弹出一个框 》 把task_list[index]传出来 》（动态创建dom）
       2.hide(dom)

       //生成 html
       //点击事件


