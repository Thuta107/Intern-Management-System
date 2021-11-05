package com.fml.FMLportal.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.fml.FMLportal.models.userDetails;


public interface userDetailsRepository extends MongoRepository<userDetails, String> {

	public userDetails findByUsername(String username);
}
  