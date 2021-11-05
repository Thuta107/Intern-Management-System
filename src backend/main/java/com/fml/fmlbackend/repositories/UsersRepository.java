package com.fml.fmlbackend.repositories;

import com.fml.fmlbackend.models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UsersRepository extends MongoRepository<Users, String> {

		public Users findByUsername(String username);
}
  