package com.destiny.dynamicmap.arma.Control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * @author Administrator
 */
@Controller
public class Index {

    @GetMapping("index")
    public String index(HttpSession httpSession){
        return "altis";
    }

}
