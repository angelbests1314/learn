var that;
class Tab {
    constructor(id) {
        that = this;
        //获取主节点
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd')
        this.ul = this.main.querySelector('.fisrstnav ul:first-child')
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        //初始化绑定事件
        this.updateNode();
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    updateNode() {
            //获取主节点下的li节点数组
            this.lis = this.main.querySelectorAll('li')
                //获取section节点下的数组
            this.sections = this.main.querySelectorAll('section')
            this.remove = this.main.querySelectorAll('.icon-guanbi');
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
        }
        //切换功能
    toggleTab() {
        that.clearClass();
        //由于是li执行的此函数，所以此函数的this指向的是li这个对象，所以无法通过this.sctions去获取到对象
        //console.log(this.index);
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }

    clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        //添加
    addTab() {
            that.clearClass();
            var random = Math.random();
            //创建li和section元素
            var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
            var section = '<section class="conactive">新选项卡:' + random + '</section>'
                //追加一个li到ul元素内的子元素的最后一个。
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        //删除
    removeTab(e) {
            e.stopPropagation(); //阻止冒泡
            var index = this.parentNode.index;
            //console.log(index)
            that.lis[index].remove()
            that.sections[index].remove()
            that.init();
            if (document.querySelector('.liactive')) return;
            index--;
            that.lis[index] && that.lis[index].click();
        }
        //编辑
    editTab() {
        //console.log(1);
        //双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        var str = this.innerHTML;
        this.innerHTML = '<input type="text" />'
        var input = this.children[0];
        input.value = str;
        //使文字处于选中状态
        input.select();
        input.onblur = function() {
                this.parentNode.innerHTML = this.value;
            }
            //键盘
        input.onkeyup = function(e) {
            if (e.keyCode == 13) {
                this.blur() //失去焦点
            }
        }
    }

}

new Tab('#tab')