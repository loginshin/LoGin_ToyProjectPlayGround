package com.enterProject.enterProject.user.controller

import com.enterProject.enterProject.user.dto.UserSignUpDTO
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/users")
class UserRestController {

    @PostMapping("/signup")
    fun signUp(@RequestBody req: UserSignUpDTO): ResponseEntity<Map<String, Any?>> {

        return ResponseEntity.ok(
            mapOf(
                "ok" to true,
                "userName" to req.userName,
                "userPassword" to req.userPassword,
                "userId" to req.userId
            )
        )
    }
}
