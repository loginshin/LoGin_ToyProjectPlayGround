package com.enterProject.enterProject.user.service

import com.enterProject.enterProject.user.domain.UserEntity
import com.enterProject.enterProject.user.dto.UserSignUpDTO
import com.enterProject.enterProject.user.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    val userRepository: UserRepository
) {

    /**
     * 회원 가입
     * TODO : 비밀번호 암호화 후 저장
     * TODO : 사용자 key 값 index 난수 지정
     */
    @Transactional
    fun signUp(req : UserSignUpDTO) : UserEntity {

        // 중복 체크
        if (userRepository.existsByUserId(req.userId)) {
            throw IllegalArgumentException("Exist Id")
        }

        val user = UserEntity(
            userId = req.userId,
            userName = req.userName,
            password = req.userPassword
        )

        return userRepository.save(user)
    }

    /**
     * 로그인
     * TODO : 로그인 구현
     */
    fun signIn(req: UserSignUpDTO) {

    }

}
