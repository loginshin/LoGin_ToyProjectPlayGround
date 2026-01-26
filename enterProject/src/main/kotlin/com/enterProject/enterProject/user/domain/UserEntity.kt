package com.enterProject.enterProject.user.domain;

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.io.Serializable
import java.util.UUID

@Entity
@Table(name = "users")
class UserEntity (

    @Id
    @Column(name = "user_key", length = 128, nullable = false)
    val userKey: String = UUID.randomUUID().toString(),

    @Column(name = "user_id", length = 128, unique = true)
    var userId: String? = null,

    @Column(name = "user_name", length = 128)
    var userName: String? = null,

    @Column(name = "password", length = 128)
    var password: String? = null,
) : Serializable {

}
