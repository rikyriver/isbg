package com.kaliman.dashboard.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

//import com.kaliman.dashboard.model.Users;
//import com.kaliman.dashboard.repository.AdminMenuRepository;
import com.kaliman.dashboard.repository.ChartInfo;

@Controller
public class DashboardController {

//	@Autowired
//	private AdminMenuRepository adminController;
 
//	@RequestMapping(value = "/login", method = RequestMethod.POST)
//	public ModelAndView displayAllUser(HttpServletRequest request) {
//
//		String account = request.getParameter("uname");
//		String password = request.getParameter("psw");
//		ModelAndView mv = new ModelAndView();
//		//System.out.println("User login:" + account + "::password:" + password);
//		Users userCheck = adminController.CheckUsersP (0, account , "", password, "login", "","","");
// 
//		if (userCheck.getId()!=0) {
//			//System.out.println("  getId:" +userCheck.getId());
//			if (userCheck.getId()==6) {
//				 
//				mv.addObject("token", userCheck.getToken());
//				mv.addObject("userId", userCheck.getId());
//				mv.setViewName("accauntList");
//				return mv;
//			} if (userCheck.getId()==100) {
//				 
//					mv.addObject("token", userCheck.getToken());
//					mv.addObject("userId", userCheck.getId());
//					mv.setViewName("accauntList");
//					return mv;
//			} else {
//				mv.addObject("token", userCheck.getToken());
//				mv.addObject("userId", userCheck.getId());
//				mv.addObject("userNameAccount", userCheck.getName());
//				mv.setViewName("userBonusesListTables");
//				return mv;
//			}
//
//		} else {
//			  
//		}
//		mv.setViewName("redirect:/");
//		return mv;
//	}

	@RequestMapping(value = "/usersBetsTimeCharts1")
	public ModelAndView displayAllUserChartBar2(HttpServletRequest request) {
 
		ModelAndView mv = new ModelAndView();
		mv.setViewName("usersBetsTimeCharts1");
		return mv;

	}

	@RequestMapping(value = "/userTimeChart")
	public ModelAndView displayAllUserChartBar(HttpServletRequest request) {

		// String account = request.getParameter("uname");
		// String password = request.getParameter("psw");
		ModelAndView mv = new ModelAndView();
		// System.out.println("User login:" + account + "::password:" + password);
		mv.setViewName("userTimeChart");
		return mv;

	}

}