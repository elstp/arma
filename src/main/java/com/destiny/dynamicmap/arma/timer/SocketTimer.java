package com.destiny.dynamicmap.arma.timer;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.destiny.dynamicmap.arma.Control.WebSocketServer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

/**定时器
 * @author Administrator
 */

@Slf4j
@Component
public class SocketTimer {
    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Scheduled(fixedRate = 1000)
    public void sendSocketMsgKilled(){
        LinkedHashMap<String,Object> msg = new LinkedHashMap<>();
        List<String> killedMsg = new ArrayList<>();
        try{
            for (int i = 1; i < 10; i++) {
                String data = stringRedisTemplate.opsForValue().get("kill:info:"+i);
                if (data != null){
                    String[] split = data.split("\\|");
                    for (int j = 0; j < split.length; j++) {
                        if(split[j].length()>1){
                            killedMsg.add(split[j].replaceAll("\"",""));
                        }
                    }
                    stringRedisTemplate.delete("kill:info:"+i);
                }
            }
            if (killedMsg.size() ==0){
                return;
            }
            msg.put("code",3);
            msg.put("msg","获取成功!");
            msg.put("data",killedMsg);
            String string = JSONObject.toJSONString(msg);
            System.out.println(string);
            WebSocketServer.sendAllInfo(string);
        }catch (Exception e){
            msg.put("code",0);
            msg.put("msg","获取失败!");
            String string = JSONObject.toJSONString(msg);
            WebSocketServer.sendAllInfo(string);
        }

    }


    @Scheduled(fixedRate = 3000)
    public void sendSocketMsgTask(){
        LinkedHashMap<String,Object> msg = new LinkedHashMap<>();
        try{
        String data = stringRedisTemplate.opsForValue().get("tasks:info");
        if(data==null){
            log.info("空数据!");
            return;
        }
        String[] split = data.split("\\|");
        List<String> list = Arrays.asList(split);
        List<LinkedHashMap<String,Object>> playerData = new ArrayList<>();
        list.forEach(k->{
            k= k.replaceAll("\\[","");
            k= k.replaceAll("\"","").trim();
            k= k.replaceAll("]","");
            LinkedHashMap<String,Object> tempData = new LinkedHashMap<>();
            String[] temp = k.split("#");
            String side = "EAST";
            if ("no".equalsIgnoreCase(temp[0])){
                tempData.put("side","no");
            }else{
                String[] split1 = temp[0].split(",");
                for (String s:split1) {
                    if ("WEST".equalsIgnoreCase(s)){
                        side = "WEST";
                        break;
                    }
                }
            }
            tempData.put("side",side);
            tempData.put("x",temp[1].replaceAll("\"","").trim());
            tempData.put("y",temp[2].replaceAll("\"","").trim());
            tempData.put("progress",temp[3].replaceAll("\"","").trim());
            playerData.add(tempData);
        });


        msg.put("code",2);
        msg.put("msg","获取成功!");
        msg.put("data",playerData);
            String string = JSONObject.toJSONString(msg);
            WebSocketServer.sendAllInfo(string);
        }catch (Exception e){
            e.printStackTrace();
            msg.put("code",0);
            msg.put("msg","获取失败!");
            WebSocketServer.sendAllInfo( JSONObject.toJSONString(msg));
        }

    }

    @Scheduled(fixedRate = 1000)
    public void sendSocketMsg(){
        LinkedHashMap<String,Object> msg = new LinkedHashMap<>();
        try{
            String data = stringRedisTemplate.opsForValue().get("player:info");
            if(data==null){
                log.info("空数据!");
                return;
            }
            data = data.substring(0,data.length()-1);
            String[] split = data.split("\\|");
            List<String> list = Arrays.asList(split);
            List<LinkedHashMap<String,Object>> playerData = new ArrayList<>();
            //############
            list.forEach(k->{
                LinkedHashMap<String,Object> tempData = new LinkedHashMap<>();
                String[] temp = k.split("#");
                tempData.put("nameOfRankAndRank",temp[0].replaceAll("\"","").trim());//军衔等级名称
                tempData.put("vipName",temp[1].replaceAll("\"","").trim());//VIP玩家
                tempData.put("bgmImg",temp[2].replaceAll("\"","").trim());//BGM背景
                tempData.put("bgm",temp[3].replaceAll("\"","").trim());//BGM音乐
                tempData.put("playerName",temp[4].replaceAll("\"","").trim());//玩家昵称
                tempData.put("side",temp[5].replaceAll("\"","").trim());//阵营
                tempData.put("isPlayer",temp[6].replaceAll("\"","").trim());//是否玩家
                tempData.put("x",temp[7].replaceAll("\"","").trim());//X坐标
                tempData.put("y",temp[8].replaceAll("\"","").trim());//Y坐标
                tempData.put("vehicleName",temp[9].replaceAll("\"","").trim());//载具名
                tempData.put("vehicleClass",temp[10].replaceAll("\"","").trim());//载具class
                tempData.put("unitType",temp[11].replaceAll("\"","").trim());//载具类型
                tempData.put("dir",temp[12].replaceAll("\"","").trim());//朝向
                tempData.put("role",temp[13].replaceAll("\"","").trim());//角色
                playerData.add(tempData);
            });
            msg.put("code",1);
            msg.put("msg","获取成功!");
            msg.put("data",playerData);
            String string = JSONObject.toJSONString(msg);
            //System.out.println(string);
            WebSocketServer.sendAllInfo(string);
        }catch (Exception e){
            e.printStackTrace();
            msg.put("code",0);
            msg.put("msg","获取失败!");
            String string = JSONObject.toJSONString(msg);
            WebSocketServer.sendAllInfo(string);
        }
    }
    

}
