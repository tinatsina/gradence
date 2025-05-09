package com.gradence.ga.repository;

import com.gradence.ga.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}