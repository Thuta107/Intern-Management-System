package com.fml.FMLportal.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fml.FMLportal.models.Users;


public interface UsersRepository extends MongoRepository<Users, String> {

		public Users findByUsername(String username);
}
  