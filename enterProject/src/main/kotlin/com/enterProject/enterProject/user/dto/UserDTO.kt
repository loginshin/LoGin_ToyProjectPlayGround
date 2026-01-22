package com.enterProject.enterProject.user.dto

import java.io.Serializable

data class UserDTO(
    val userKey: String,
    val userId: String? = null,
    val userName: String? = null,
    val userPassword: String? = null
) : Serializable

data class UserSignUpDTO(
    val userId: String,
    val userName: String,
    val userPassword: String? = null
) : Serializable