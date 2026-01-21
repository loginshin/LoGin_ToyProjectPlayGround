package com.enterProject.enterProject.user.domain;

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.io.Serializable

@Entity
@Table(name = "users")
class UserEntity (

    @Id
    @Column(name = "user_key", length = 128, nullable = false)
    var userKey: String,

    @Column(name = "user_id", length = 128, unique = true)
    var userId: String? = null,

    @Column(name = "user_name", length = 128)
    var userName: String? = null,

    @Column(name = "password", length = 128)
    var password: String? = null,
) : Serializable {

}
