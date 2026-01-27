package com.enterProject.enterProject.common.response

import java.io.Serializable

data class ApiResponseDTO<T>(
    val status: Int,
    val message: String,
    val data: T? = null
) : Serializable {
    companion object {
        fun ok(): ApiResponseDTO<Unit> = ApiResponseDTO(status = 200, message = "OK", data = Unit)
        fun <T> ok(data: T): ApiResponseDTO<T> = ApiResponseDTO(status = 200, message = "OK", data = data)
        fun fail(status: Int = 500, message: String = "ERROR"): ApiResponseDTO<Unit> =
            ApiResponseDTO(status = status, message = message, data = null)
    }
}
