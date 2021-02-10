package com.kaliman.dashboard.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.kaliman.dashboard.model.Users;
import com.kaliman.dashboard.repository.ChartInfo;
 
@RestController
public class RestChartController {

	@Autowired
	private ChartInfo ChartInfo;

	@RequestMapping(value = "/getRestChart", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Users>  getRestChart(	@RequestHeader(value = "userName") String userName ) {
		return ChartInfo.getUsers(userName);
	}
	
	@RequestMapping(value = "/saveUserInfo", method = RequestMethod.POST)
	@ResponseBody
	public String saveUsesrInfo (@RequestBody  List<Users>  modelToChange ,	HttpServletRequest request ) {
        return ChartInfo.updateUsers(modelToChange);
	}
	
	@RequestMapping(value = "/deleteUsesrInfo", method = RequestMethod.POST)
	@ResponseBody
	public String deleteUsesrInfo (@RequestBody int  modelToChange ,	HttpServletRequest request ) {
        return ChartInfo.deleteUser(modelToChange);
	}
	
	@RequestMapping(value = "/saveUser", method = RequestMethod.POST)
	@ResponseBody
	public String saveUser (@RequestBody  List<Users>   modelToChange ,	HttpServletRequest request ) {
        return  ChartInfo.saveUser(modelToChange);
	}
 
}