package com.enterProject.enterProject.user.dto

import java.io.Serializable

data class UserDTO(
    val userKey: String? = "",
    var userId: String? = "",
    var userName: String? = ""
) : Serializable
