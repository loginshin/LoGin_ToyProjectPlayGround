package com.enterProject.enterProject.user.controller

import com.enterProject.enterProject.common.response.ApiResponseDTO
import com.enterProject.enterProject.common.response.ApiResponses
import com.enterProject.enterProject.user.dto.UserSignUpDTO
import com.enterProject.enterProject.user.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/users")
class UserRestController(
    val userService: UserService
) {

    // 회원 가입
    @PostMapping("/signup")
    fun signUp(@RequestBody req: UserSignUpDTO) : ResponseEntity<ApiResponseDTO<Unit>> {
        userService.signUp(req)
        return ApiResponses.ok()
    }
}
