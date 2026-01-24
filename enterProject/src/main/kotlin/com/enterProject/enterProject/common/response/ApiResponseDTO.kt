package com.enterProject.enterProject.common.response

import java.time.OffsetDateTime

/**
 * @return success : 성공/실패
 * @return message : 안내 메시지
 * @return data : 실제 데이터
 * @timestamp : 디버깅/로그 확인 편하게 (선택 : 개발 편의)
 */
data class ApiResponseDTO<T>(
    val success: Boolean,
    val message: String? = null,
    val data: T? = null,
    val timestamp: String = OffsetDateTime.now().toString()
)
