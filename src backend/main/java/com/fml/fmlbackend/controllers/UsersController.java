package com.fml.fmlbackend.controllers;

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


import com.fml.fmlbackend.models.Users;
import com.fml.fmlbackend.repositories.UsersRepository;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200"})

public class UsersController {
	@Autowired
    UsersRepository UsersRepository;

	@GetMapping("/users")
    public List<Users> getAllUsers() {
        return UsersRepository.findAll();
    }
	
	@PostMapping("/users/create")
    public Users createUsers(@Valid @RequestBody Users users) {
		System.out.println("Create User: " + users.getUsername() + "...");
        return UsersRepository.save(users);
    }
	
	@PostMapping("/users/authenticate")
    public ResponseEntity <Users> authenticateUsers(@Valid @RequestBody Users users) {
		Users userVerify = UsersRepository.findByUsername(users.getUsername());
		System.out.println(users.getUsername());
		System.out.println(userVerify.getUsername());
		if (userVerify.getPassword().equals(users.getPassword())) {
			System.out.println(users.getUsername() + "Authenticated");
			return new ResponseEntity <Users>(users,HttpStatus.OK);
		}
		
		else {
			System.out.println("Authentication Fail");
			return new ResponseEntity <Users>(users,HttpStatus.BAD_REQUEST);
		}
        
    }

}
