package com.enterProject.enterProject.common.response

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity

object ApiResponse {

    private fun headers() : HttpHeaders =
        HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }

    fun <T> ok(data: T? = null, message: String? = null): ResponseEntity<ApiResponseDTO<T>> =
        ResponseEntity(ApiResponseDTO(
            success = true,
            message = message,
            data = data
        ),
        headers(),
        HttpStatus.OK
        )

}
