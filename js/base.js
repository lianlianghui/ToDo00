/**
 * Created by Administrator on 2017/4/14 0014.
 */
;(function () {

 /*   store.set("ke","888");   //存储
    console.log(store.get("ke")); //获取

    //移除username字段
    store.remove('username')
    store.set('user',{name:'marcus', likes:'javascript'})*/

 /*   var arr=[];
    var task_list={name:1};
    arr.push(task_list);
    store.set("list",arr);*/


    //把值存到对象里面
    // 再把对象push数组
    // 再把数组存到浏览器里面
    var $form_add_task=$('.add-task'),
        task_list=[];
        init();  //初始化

    $form_add_task.on("submit",function (ev) {
        //阻止默认时间
        ev.preventDefault();
        //创一个对象
        var new_task={};

        //添加属性
        new_task.content=$(this).find("input").val();

        if(!new_task.content)  //没有值 返回
        {
            alert("输入不能为空");
            return;
        }
        add_task(new_task);  //把数据存到浏览器
        if(task_list.length)
        {
            renew_task_list() ; //更新li
        }
       $(this).find("input").val("");


    });

    //初始化
    function init() {
        //获取浏览器数据   存到数组     循环li
        //console.log(store.get("gg"))
        task_list=store.get("gg") || [] ;
        renew_task_list() ; //更新li
    }

    function add_task(new_task) {
        //再把对象push数组
        task_list.push(new_task);

        //把数据存到浏览器
        store.set("gg",task_list);
    }

    //刷新数据
    function renew_task_list() {
        var $task_listUL=$(".task-list");
        $task_listUL.html(null);  //清空UL
        for(var i=0;i<task_list.length;i++)
        {

            //创建li
            var $item=task_list_tpl(task_list[i],i);
            $task_listUL.prepend($item);
        }

        delete_event();   //点击删除事件
        detail_list_event();  //详细列表点击事件
    }

    //li的html
    function task_list_tpl(data,index) {
        //task_list[i].content;
        if(!data) return;
        var $str='<li class="task-item" data-index="'+index+'">'+
            '<input type="checkbox" class="complete">'+
            '<span class="task-content">'+data.content+'</span>'+
            '<div class="fr">'+
            '<span class="action delete">删除</span>'+
            '<span class="action detail">详细</span>'+
            '</div>'+
            '</li>';

        return $str;
    }


    /*----------删除功能-------------------------*/

    //删除功能
    function delete_task_list(index) {
        $(".alertA").show();  //显示
        $(".primary.confirm").bind("click",function () {

            delete task_list[index];  //删除
            renew_delete_list(); //更新删除后的li
            $(".alertA").hide();  //隐藏
            $(".primary.confirm").unbind("click");  //解绑
        });
        $(".cancel").on("click",function () {
            $(".alertA").hide();  //隐藏
        });
        /*var off=confirm("你确定删除吗？");
        if(!off) return;*/
        //delete task_list[index];  //删除
       // task_list.splice(index,1);  //index代表位置，1代表删除的个数
       // renew_delete_list(); //更新删除后的li

        /*
        * 1.设置一个 data_index=i;
        *
        * 2.获取 index
        *
        * 3.删除 delete list_task[index]
        *
        * 4.store.set("gg",list_task)  同步浏览器的数据*/
    }


    //点击删除事件
    function delete_event() {
        var $delete=$(".action.delete");

        $delete.on("click",function () {
            //获取 index
            var index=$(this).parent().parent().data("index");
            delete_task_list(index);      //删除功能


        })
    }

    //更新删除后的li
    function renew_delete_list() {
        store.set("gg",task_list);
        renew_task_list();  //刷新数据
    }




/*-----------------详细功能-------------------*/
    
    //详细功能
    /*
    * 1.点击弹出一个框（动态创建dom)
    * 2.remove dom
    * */


    //详细列表点击事件
    function detail_list_event() {
        var $detail=$(".action.detail");

        $detail.on("click",function () {
            var index=$(this).parent().parent().data("index");
            var $item=detail_task_tpl(task_list[index]);
            $(".task-list").after($item) ; //插入html
            
        });
        

    }

    //生成 html
    function detail_task_tpl(data) {
        var $str=
            '<div class="task-detail-mask"></div>'+
            '<div class="task-detail">'+
            '<form>'+
            '<h2 class="content">'+data.content+'</h2>'+
            '<div class="input-item">'+
            '<textarea></textarea>'+
            '</div>'+
            '<div class="remind input-item">'+
            '<label >提醒时间</label>'+
            '<input type="date" class="datetime">'+
            '</div>'+
            '<button class="update">更新</button>'+
            '<div class="close">X</div>'+
            '</form>'+
            '</div>';
        return $str;
    }

    //更新
    function detail_task_update() {
        
    }
    
    //关闭
    function close_task_detail() {

    }

}());


