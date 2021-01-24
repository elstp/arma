package com.destiny.dynamicmap.arma.Control;

import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.LinkedHashMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**websocket
 * @author Administrator
 */
@ServerEndpoint("/webSocket")
@Component
@Slf4j
public class WebSocketServer {


    /**
     * 静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
     */
    public static AtomicInteger onlineNum = new AtomicInteger();

    /**
     * concurrent包的线程安全Set，用来存放每个客户端对应的WebSocketServer对象。
     */
    public static ConcurrentHashMap<String, Session> sessionPools = new ConcurrentHashMap<>();

    //发送消息
    public static void sendMessage(Session session, String message) throws IOException {
        if(session != null){
            synchronized (session) {
//                System.out.println("发送数据：" + message);
                session.getBasicRemote().sendText(message);
            }
        }
    }

    /**
     * 给全部用户发消息
     */
    public static void sendAllInfo(String message){
        sessionPools.forEach((K,V)->{
            try {
                sendMessage(V, message);
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        });
    }


    //给指定用户发送信息
    public static  void sendInfo(String userName, String message){
        Session session = sessionPools.get(userName);
        try {
            sendMessage(session, message);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    //建立连接成功调用
    @OnOpen
    public void onOpen(Session session){
        addOnlineCount();
        LinkedHashMap<String,Object> msg = new LinkedHashMap<>();
        msg.put("code",100);
        msg.put("msg","有新成员加入!当前观看人数为: "+onlineNum+" 人");
        String string = JSONObject.toJSONString(msg);
        sendAllInfo(string);
        sessionPools.put(session.getId(), session);
        log.info(session.getId() + "加入webSocket！当前人数为" + onlineNum);
    }



    //关闭连接时调用
    @OnClose
    public void onClose(Session session){
        sessionPools.remove(session.getId());
        subOnlineCount();
        log.info(session.getId() + "断开webSocket连接！当前人数为" + onlineNum);
        LinkedHashMap<String,Object> msg = new LinkedHashMap<>();
        msg.put("code",100);
        msg.put("msg","有成员退出!当前观看人数为: "+onlineNum+" 人");
        String string = JSONObject.toJSONString(msg);
        sendAllInfo(string);
    }

    //收到客户端信息
    @OnMessage
    public void onMessage(String message) throws IOException{
        message = "客户端：" + message + ",已收到";
        System.out.println(message);
        for (Session session: sessionPools.values()) {
            try {
             //   sendMessage(session, message);
            } catch(Exception e){
                e.printStackTrace();
                continue;
            }
        }
    }

    //错误时调用
    @OnError
    public void onError(Session session, Throwable throwable){
        System.out.println("发生错误");
        throwable.printStackTrace();
    }

    public static void addOnlineCount(){
        onlineNum.incrementAndGet();
    }

    public static void subOnlineCount() {
        onlineNum.decrementAndGet();
    }
}
