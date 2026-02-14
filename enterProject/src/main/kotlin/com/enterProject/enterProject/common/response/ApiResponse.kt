package com.enterProject.enterProject.common.response

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity

object ApiResponses {

    private fun headers(): HttpHeaders =
        HttpHeaders().apply {
            date = System.currentTimeMillis()
            contentType = MediaType.APPLICATION_JSON
        }

    fun ok(): ResponseEntity<ApiResponseDTO<Unit>> =
        ResponseEntity(ApiResponseDTO.ok(), headers(), HttpStatus.OK)

    fun <T> ok(data: T): ResponseEntity<ApiResponseDTO<T>> =
        ResponseEntity(ApiResponseDTO.ok(data), headers(), HttpStatus.OK)

    fun fail(status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR, message: String = "ERROR")
            : ResponseEntity<ApiResponseDTO<Unit>> =
        ResponseEntity(ApiResponseDTO.fail(status.value(), message), headers(), status)
}
