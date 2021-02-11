package com.kaliman.dashboard.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import com.kaliman.dashboard.repository.ChartInfo;

@Controller
public class DashboardController {

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
