package com.fml.FMLportal.repositories;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.fml.FMLportal.models.transaction;


public interface transactionRepository extends MongoRepository<transaction, String> {

	public List<transaction> findBysenderacc(String senderacc);

	
}