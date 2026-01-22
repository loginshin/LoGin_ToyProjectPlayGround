package com.enterProject.enterProject.user.repository

import com.enterProject.enterProject.user.domain.UserEntity
import com.enterProject.enterProject.user.dto.UserDTO
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<UserEntity, String> {
    fun findByUserId(UserId: String): UserEntity
    fun existsByUserId(userId: String): Boolean
}
