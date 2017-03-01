window.onload = function(){
	var option = {
		'row':3,
		'col':3,
		'wid':180
	},
	oLi = '',
	hnum = '',
	indexs = false,
	clearTime,
	step = 0,
	time = 0,
	clearscoreTime;
	var init = function(){
		var row = option.row,
			col = option.col,
			wid = option.wid,
			pos = [];
								
		var oul = document.getElementsByTagName('ul')[0];	
			oul.style.width = col*wid+'px';
			oul.style.height = row*wid+'px';
		var ulHtml = '';
			for(var i=0; i<row; i++ ){
				for(var j=0; j<col; j++ ){
					ulHtml +='<li></li>';
					pos.push([i*wid,j*wid]);
				}
			}
			oul.innerHTML = ulHtml;
			oLi = oul.getElementsByTagName('li');
			for(var i=0; i<oLi.length; i++){
				oLi[i].style.width = wid+'px';
				oLi[i].style.height = wid+'px';
				oLi[i].style.top = pos[i][0]+'px';
				oLi[i].style.left = pos[i][1]+'px';
				//oLi[i].innerHTML = i+1;
				oLi[i].index = i;
				oLi[i].setAttribute('date',pos[i][0]+','+pos[i][1]);
			}
			setBg();
		var btn = document.getElementById('btn');
			btn.addEventListener('click',start,false);
			
			
			
	}
	var clickfn = function (event){
		var oul = document.getElementsByTagName('ul')[0];	
		var oStep = document.getElementById('step');
			var x  = event.target.index; 
			var ht = parseInt(oLi[hnum].style.top);
			var hl = parseInt(oLi[hnum].style.left);
			var ct = parseInt(oLi[x].style.top);
			var cl = parseInt(oLi[x].style.left);
			step++;
			oStep.innerHTML = '步数:'+step;
				if(ht == ct && option.wid == Math.abs(hl-cl)||hl == cl && option.wid == Math.abs(ht-ct)){
					change(x,ct,cl,ht,hl);
					for(var i=0; i<oLi.length; i++){
							ct = parseInt(oLi[i].style.top);
							cl = parseInt(oLi[i].style.left);
						var date = oLi[i].getAttribute('date');
						if(date !== ct+','+ cl){
							console.log(date == ct+','+ cl);
							return false;
						}
					}
					clearInterval(clearscoreTime);
					oLi[hnum].id = '';
					
					oul.removeEventListener('click',clickfn,false);
					setTimeout(function(){
						alert('恭喜你把鼬复活了！');
					},300)
				}
		}
	var start = function(){
		var _this = this;
		var oul = document.getElementsByTagName('ul')[0];	
		var oTime = document.getElementById('time');	
		var oStep = document.getElementById('step');
		switch(_this.innerHTML){
			case '开始游戏':
					_this.innerHTML ='停止打乱';
					hnum = parseInt(Math.random()*oLi.length);
					oLi[hnum].id = 'hidden';
					clearTime = setInterval(main,200)
					oul.addEventListener('click',clickfn,false);
				break;
			case '停止打乱':
				clearInterval(clearTime);
				_this.innerHTML ='重新开始';
				clearscoreTime = setInterval(function(){
					time++;
					oTime.innerHTML = '时间:'+time+'s';
				},1000)
				break;
			case '重新开始':
				
				_this.innerHTML ='开始游戏';
				oLi[hnum].id = '';
				clearInterval(clearscoreTime);
				time = 0;
				step = 0;
				oTime.innerHTML = '时间:'+time+'s';
				oStep.innerHTML = '步数:'+step;
				oul.addEventListener('click',clickfn,false);
				recovery();
				break;
		}
	}
	//游戏逻辑
	var main = function(){
		var ht =parseInt(oLi[hnum].style.top);
		var hl =parseInt(oLi[hnum].style.left);
		var result = [];
			for(var i=0; i<oLi.length; i++){
				var ct =parseInt(oLi[i].style.top);
				var cl =parseInt(oLi[i].style.left);
				if(ht == ct && option.wid == Math.abs(hl-cl)||hl == cl && option.wid == Math.abs(ht-ct)){
					result.push([oLi[i].index,ct,cl,ht,hl]);
				}
			}
			if(result.length != 0){
				function recursion(){ 
					var num = parseInt(Math.random()*result.length);
					var	index = result[num][0];
						if(indexs == index){
							recursion();
						}else{
							change(index,result[num][1],result[num][2],result[num][3],result[num][4]);
							indexs = index
						}
				}
				recursion();
			}
	}
	//调换位置
	var change = function(currnum,currtop,currleft,htop,hleft){
		oLi[hnum].style.top = currtop+'px';
		oLi[hnum].style.left = currleft+'px';
		oLi[currnum].style.top = htop+'px';
		oLi[currnum].style.left = hleft+'px';
	}
	// 复原
	var recovery = function(){
		for(var i=0; i<oLi.length; i++ ){
			var date = oLi[i].getAttribute('date');
			var xy = date.split(",");
			oLi[i].style.top = xy[0]+'px';
			oLi[i].style.left = xy[1]+'px';
		}
	}
	//设置背景图片
	var setBg = function(){
		for(var i = 0; i<oLi.length; i++){
			oLi[i].style.backgroundImage = 'url(img/game.jpg)';
			var date = oLi[i].getAttribute('date');
			var xy = date.split(",");
			oLi[i].style.backgroundPosition = '-'+xy[1]+'px -'+xy[0]+'px';
		}
	}
	init();
}
