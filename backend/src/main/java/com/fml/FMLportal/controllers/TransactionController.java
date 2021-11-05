package com.fml.FMLportal.controllers;


import java.util.List;

import javax.validation.Valid;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.sql.Timestamp;


import com.fml.FMLportal.models.transaction;
import com.fml.FMLportal.models.Users;
import com.fml.FMLportal.repositories.transactionRepository;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TransactionController {
	@Autowired
	transactionRepository transactionRepository;
	
	
	@PostMapping("/users/transaction")
    public ResponseEntity recordTransaction(@Valid @RequestBody transaction transaction) {
		transactionRepository.save(transaction);
		System.out.println(transaction.getReceiverAcc());
		System.out.println(transaction.getSenderAcc());
		System.out.println(transaction.getAmount());
		Timestamp ts = new Timestamp(System.currentTimeMillis());
		System.out.println(ts);
		Query query = new Query();
		
		 
		return new ResponseEntity <transaction>(transaction, HttpStatus.OK);
	}
	
	@PostMapping("/users/transaction/record")
	public ResponseEntity <List<transaction>> getAllTransactionRecord(@Valid @RequestBody String string) {
		System.out.println(string);
		List<transaction> listOfTransaction = transactionRepository.findBysenderacc(string);
		System.out.println(listOfTransaction);
		return new ResponseEntity <List<transaction>>(listOfTransaction, HttpStatus.OK);
	}
}
