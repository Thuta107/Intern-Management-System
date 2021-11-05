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


import com.fml.FMLportal.models.Users;
import com.fml.FMLportal.repositories.UsersRepository;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UsersController {
	@Autowired
    UsersRepository UsersRepository;
//	transactionRepository transactionRepository;

	@GetMapping("/users")
    public List<Users> getAllUsers() {
        return UsersRepository.findAll();
    }
	
	@PostMapping("/users/create")
    public ResponseEntity createUsers(@Valid @RequestBody Users users) {
		Users userVerify = UsersRepository.findByUsername(users.getUsername());
		if (userVerify != null) {
			//System.out.println(users.getUsername() + "Authenticated");
			System.out.println("Duplicated username");
			return new ResponseEntity <Users>(users,HttpStatus.BAD_REQUEST);
		}
		
		else {
			UsersRepository.save(users);
			System.out.println("User" + users.getUsername() + "successfully created");
			
			return new ResponseEntity <Users>(users,HttpStatus.OK);
		}
		//System.out.println(users.getUserType());
		//System.out.println("Create User: " + users.getUsername() + "...");
        //return UsersRepository.save(users);
    }
	
	@PostMapping("/users/authenticate")
    public ResponseEntity <Users> authenticateUsers(@Valid @RequestBody Users users) {
		Users userVerify = UsersRepository.findByUsername(users.getUsername());
		System.out.println(users.getUsername());
		System.out.println(userVerify.getUsername());
		System.out.println(userVerify.getUserType());
		if (userVerify.getPassword().equals(users.getPassword())) {
			System.out.println(users.getUsername() + "Authenticated");
			return new ResponseEntity <Users>(userVerify,HttpStatus.OK);
		}
		
		else {
			System.out.println("Authentication Fail");
			return new ResponseEntity <Users>(users,HttpStatus.BAD_REQUEST);
		}
        
    }
	
	
        
    

}
