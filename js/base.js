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
        cooktimer()();  //时间提醒
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
        var is_complate=[];  //定义一个新的checked数组
        for(var i=0;i<task_list.length;i++)
        {
            if(task_list[i].complate)
            {
                //放到一个新的数组
                is_complate[i]=task_list[i];
                //console.log(is_complate)
            }
            else
            {
                //创建li  这里只循环task_list[i].complate=false
                var $item=task_list_tpl(task_list[i],i);
                $task_listUL.append($item);
            }
        }

        for(var j=0;j<is_complate.length;j++)
        {
            var $item01=task_list_tpl(is_complate[j],j);
            $task_listUL.append($item01);

            if(!$item01) continue;  //跳过
            //console.log($item01);
            $item01.addClass("is_complate")

        }

        delete_event();   //点击删除事件
        detail_list_event();  //详细列表点击事件
        complate_select();  //选中事件
       // cooktimer()();  //时间提醒

    }

    //li的html
    function task_list_tpl(data,index) {
        //task_list[i].content;
        if(!data) return;
        var $str='<li class="task-item" data-index="'+index+'">'+
            '<input type="checkbox" class="complete"'+(data.complate ? "checked" : "")+'>'+
            '<span class="task-content">'+data.content+'</span>'+
            '<div class="fr">'+
            '<span class="action delete">删除</span>'+
            '<span class="action detail">详细</span>'+
            '</div>'+
            '</li>';

        //return $str;    一定要返回jquery对象
        return $($str);
    }


    /*----------删除功能-------------------------*/

    //删除功能
    function delete_task_list(index) {
        $(".alertA").show();  //显示
        $(".primary.confirm").bind("click",function () {

            //delete task_list[index];  //删除
            task_list.splice(index,1);
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

            //删除弹框
            $(".task-detail-mask,.task-detail .close").click(function () {
                /* remove($(".task-detail-mask"));
                 remove($(".task-detail"))*/
                $(".task-detail-mask").remove();
                $(".task-detail").remove()
            });

            up_detailed(index);  //提交
            dbclick(index); //双击修改
            complate_select();  //选中
            datetimerpicker();  //日期插件

        });

    }

    //生成 html
    function detail_task_tpl(data) {
        var $str=
            '<div class="task-detail-mask"></div>'+
            '<div class="task-detail">'+
            '<form class="up_data">'+
            '<h2 class="content">'+data.content+'</h2>'+
            '<div class="input-item dbtext">'+
            '<input type="text">'+
            '</div>'+
            '<div class="input-item">'+
            '<textarea>'+(data.dsk || "") +'</textarea>'+
            '</div>'+
            '<div class="remind input-item">'+
            '<label >提醒时间</label>'+
            '<input type="text" class="datetime datetimepicker " value="'+(data.datetime || "")+'">'+
            '</div>'+
            '<button class="update">更新</button>'+
            '<div class="close">X</div>'+
            '</form>'+
            '</div>';
        return $($str);
    }


    //提交新数据
    //1.新建一个对象newobj
    //2.给对象赋值 newobj.content=.......
    //3.task_list[index]=newobj
    //4. store.set("gg",task_list)   把数据存到浏览器


    //更新
    function up_detailed(index) {
        var $up_data=$(".task-detail .up_data");
        $up_data.on("submit",function (ev) {
            //阻止默认事件
            ev.preventDefault();

            var newObj={};
            newObj.content=$up_data.find(".content").text();
            newObj.dsk=$up_data.find(".input-item textarea").val();
            newObj.datetime=$up_data.find(".input-item .datetime").val();

            up_data(index,newObj);

        })
    }

    //更新数据
    function up_data(index,newObj) {
        //console.log(task_list[index]);
        //task_list[index]=newObj;
        task_list[index]=$.extend({},task_list[index],newObj);  //task_list[index]要放前面
        //console.log(task_list[index]);
        store.set("gg",task_list);
        renew_task_list();
    }
    
/*
    //关闭
    function close_task_detail() {

    }
*/

    //双击事件
    function dbclick(index){

        var $dbclick=$(".task-detail .up_data .content");
        var $dbtext=$(".input-item.dbtext")
        $dbclick.on("dblclick",function () {
            var $that=$(this);
            $that.hide();
            $dbtext.show();
            $dbtext.find("input").focus().val($that.text());   // 获取焦点
            
            $dbtext.find("input").blur(function () {

                $dbtext.hide();
                $that.show();

                if($dbtext.find("input").val()== "")
                {
                    return
                }
                else {
                    $dbclick.text($dbtext.find("input").val());  //赋值
                }
            })
        })
    }


    /*-----------------------详细功能-------------------------------------*/

    //获取 index
    //判断 task_list[index].complate ? 返回一个对象 &&　合并
    //

    //选择事件
    function complate_select() {
        var complate=$(".task-list .complete");  //checkbox的class就是complete

        complate.on("click",function () {
            var index=$(this).parent().data("index");

            if(task_list[index].complate)
            {
                up_data(index,{complate:false})
            }
            else
            {
                up_data(index,{complate:true})
            }

           // console.log(task_list[index])

        })
    }

    //日期插件
    function datetimerpicker() {
        jQuery.datetimepicker.setLocale('zh');  //中文
        $(".datetimepicker").datetimepicker({
            theme:'dark'
        });
    }


/*--------------------------------------------*/

    //时间提醒
    function cooktimer() {
        var timer=null;
        return function () {
            timer=setInterval(function () {
                //获取最新的毫秒数
                var current=new Date().getTime();


                //获取结束时间
                for(var i=0;i< task_list.length;i++)
                {
                    //完成了 || off || 没有时间  continuec
                    if(task_list[i].complate || task_list[i].off || !task_list[i].datetime ) continue;

                    var end_current = (new Date(task_list[i].datetime)).getTime();  //结束时间的毫秒数

                    //结束时间的毫秒数 - 最新时间的毫秒数 < 1 ? 到时间了  要放音乐
                    if(end_current-current < 1)
                    {
                        clearInterval(timer);
                        //console.log("到时间了，放music")


                        //显示 msg
                        showMsg(task_list[i].content);
                        up_data(i,{off:true});

                        //播放music (是一个函数）
                        musicPlay();



                    }
                }
            },1000)
        }
    }


    //播放音乐
    function musicPlay() {
        var music= document.getElementById("music");
        music.play();
    }

    //显示 msg
    function showMsg(content) {
        $(".msg").show();  //显示
        var msgContent=$(".msg-content");
        msgContent.text(content);

        $(".anchor.confirmed").click(function () {
            $(".msg").hide();
            cooktimer()();  //时间提醒
        })
    }


}());


