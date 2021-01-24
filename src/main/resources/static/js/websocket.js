
var socket;
var ListData = [];
var TaskListData = [];
function openSocket() {
    if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    }else{
        console.log("您的浏览器支持WebSocket");
        var socketUrl="ws://127.0.0.1:8080/webSocket";
        if(socket!=null){
            socket.close();
            socket=null;
        }
        socket = new WebSocket(socketUrl);
        //打开事件
        socket.onopen = function() {
            console.log("websocket已连接");
            Qmsg['success']("欢迎您访问娱乐至上实时服务器信息展示!已成功连接服务器!");
            //socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        //获得消息事件
        socket.onmessage = function(msg) {
          //  console.log(msg);
         let JsonObject = JSON.parse(msg.data);
            if (JsonObject.code == 0){
                console.log("数据错误");
                return;
            }else if (JsonObject.code == 1){
                ListData.forEach(d =>{
                    map.removeLayer(d);
                })
                let index;
                let playerSum = 0;
                let aiSum = 0;
                if (index!=undefined){
                    map.removeLayer(index);
                }

                JsonObject.data.forEach(tempData=>{

                    if (tempData.isPlayer == "ai"){
                        aiSum = aiSum+1;
                        let icon;
                        let name;
                        if (tempData.unitType == "StaticWeapon"){
                            icon = tempData.side=="WEST"?west_other:tempData.side=="EAST"?east_other:tempData.side=="civ"?civ_other:aaf_other;
                            name = '固定武器:'+tempData.vehicleName;
                        }else{
                            if (tempData.vehicleName == "no"){
                                name = tempData.playerName;
                                icon = side(tempData.role,tempData.side);

                            }else{
                                icon =  new aiImgIcon({iconUrl: '/aa3icon/'+tempData.vehicleClass+'.png'});
                                name = '载具:'+tempData.vehicleName +'<br/>乘员:'+ tempData.playerName;
                            }
                        }
                        let tempMarker1 = L.marker([tempData.y,tempData.x], {icon: icon}).addTo(map).bindPopup(name);
                        ListData.push(tempMarker1);
                        tempMarker1.on("mouseover",function (e){
                            this.bindPopup(e.target._popup._content).openPopup();
                        })
                    }else{
                        playerSum= playerSum +1;
                        if (tempData.vehicleName == "no"){
                            name = '玩家:'+tempData.playerName+'<br/>军衔:'+tempData.nameOfRankAndRank+'<br/>VIP:'+tempData.vipName;
                            icon = playerWest;
                        }else{
                            icon = new playerImgIcon({iconUrl: '/aa3icon/'+tempData.vehicleClass+'.png'});
                            name = '载具:'+tempData.vehicleName +'<br/>驾驶员:'+ tempData.playerName +'<br/>军衔:'+tempData.nameOfRankAndRank+'<br/>VIP:'+tempData.vipName;
                        }
                        let tempMarker1 = L.marker([tempData.y,tempData.x], {icon: icon}).addTo(map).bindPopup(name);
                        ListData.push(tempMarker1);
                        tempMarker1.on("mouseover",function (e){
                            this.bindPopup(e.target._popup._content).openPopup();
                        })
                    }

                })
            }else if (JsonObject.code == 2){
                TaskListData.forEach(d =>{
                    map.removeLayer(d);
                })
                let taskID = ["A","B","C"];
                let tid = 0;
                JsonObject.data.forEach(tempData=>{
					if(tempData.side !="no"){
						
                    var circle = L.circle([tempData.y, tempData.x], {
                        color: tempData.side=='EAST'?'red':'blue',
                        fillColor: tempData.side=='EAST'?'red':'blue',
                        fillOpacity: 0.5,
                        radius: 300
                    }).addTo(map).bindTooltip(taskID[tid]+'<br/>夺取进度:'+tempData.progress+'%',
                        {permanent: true, direction:"center"}
                    ).openTooltip();

                    TaskListData.push(circle)
                    tid=tid+1;
					}
                });
            }else if(JsonObject.code == 100){
                Qmsg.config({
                    position:'center',
                    timeout: 6000
                })
                Qmsg.info(JsonObject.msg,{
                    html:true
                })
            }else if(JsonObject.code == 3){
                JsonObject.data.forEach(tempData=>{
                    Qmsg.config({
                        position:'left',
                        timeout: 6000
                    })
                    Qmsg.info(tempData,{
                        html:true
                    })
                });


            }

          //  index = L.marker([17069.558221, 15268.588244]).addTo(map).bindPopup("在线玩家:<b>"+playerSum+"</b>人<br/>总AI数:<b>"+aiSum+"</b>个").openPopup();

        };




        //关闭事件
        socket.onclose = function() {
            console.log("websocket已关闭");
            Qmsg['warning']("websocket已关闭");
          //  openSocket();
        };
        //发生了错误事件
        socket.onerror = function() {
            console.log("websocket发生了错误");
            Qmsg['error']("websocket发生了错误");
           // openSocket();
        }
    }
}

function side(role,side){
    var icon;
    switch (role) {
        case "AT":
            icon = side=="WEST"?west_AT:side=="EAST"?east_AT:side=="civ"?civ_AT:aaf_AT;
            break;
        case "Civilian":
            icon = side=="WEST"?west:side=="EAST"?east:side=="civ"?civ:aaf;
            break;
        case "Diver":
            icon = side=="WEST"?west:side=="EAST"?east:side=="civ"?civ:aaf;
            break;
        case "Infantry":
            icon = side=="WEST"?west:side=="EAST"?east:side=="civ"?civ:aaf;
            break;
        case "Medic":
            icon = side=="WEST"?west_Medic:side=="EAST"?east_Medic:side=="civ"?civ_Medic:aaf_Medic;
            break;
        case "MG":
            icon = side=="WEST"?west_MG:side=="EAST"?east_MG:side=="civ"?civ_MG:aaf_MG;
            break;
        case "Officer":
            icon = side=="WEST"?west:side=="EAST"?east:side=="civ"?civ:aaf;
            break;
        case "Pilot":
            icon = side=="WEST"?west:side=="EAST"?east:side=="civ"?civ:aaf;
            break;
        case "Sniper":
            icon = side=="WEST"?west:side=="EAST"?east:side=="civ"?civ:aaf;
            break;
        case "SpecialForces":
            icon = side=="WEST"?west:side=="EAST"?east:side=="civ"?civ:aaf;
            break;
        case "UAVPilot":
            icon = side=="WEST"?west:side=="EAST"?east:side=="civ"?civ:aaf;
            break;
        default:
            icon = side=="WEST"?west:side=="EAST"?east:side=="civ"?civ:aaf;
    }
    return icon;
}


function sendMessage() {
    if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    }else {
        // console.log("您的浏览器支持WebSocket");
        var toUserId = document.getElementById('toUserId').value;
        var contentText = document.getElementById('contentText').value;
        var msg = '{"toUserId":"'+toUserId+'","contentText":"'+contentText+'"}';
        console.log(msg);
        socket.send(msg);
    }
}