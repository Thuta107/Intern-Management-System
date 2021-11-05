package com.fml.FMLportal.controllers;

import java.util.List;

import javax.validation.Valid;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.fml.FMLportal.models.userDetails;

import com.fml.FMLportal.repositories.userDetailsRepository;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")

public class UsersDetailsController {
	
	@Autowired
    userDetailsRepository userDetailsRepository;

	@GetMapping("/userDetails")
    public List<userDetails> getAllUsers() {
        return userDetailsRepository.findAll();
    }
	
	@PostMapping("/userDetails/create")
    public userDetails createUsers(@Valid @RequestBody userDetails userDetails) {
		
		System.out.println("Adding User Details: " + userDetails.getUsername() + "...");
        return userDetailsRepository.save(userDetails);
    }

 

}
