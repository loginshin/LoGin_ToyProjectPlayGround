package com.enterProject.enterProject

import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.Test

@SpringBootTest
class TestCord {
    @Test
    fun testMain() {
        print("\n\n\n ===================================\n\n\n")

        // map
        var map = mapOf<String, Int>(Pair("J", 29), "K" to 24)

        println(map)

        println(map.size)
        println(map.get("K"))





        print("\n\n\n===================================\n\n\n ")
    }

    /**
     * 지역 함수
     */
    private fun someFun() {
        val data3: Int
        data3 = 10
        println("data3 : $data3")

        val noTemp: Nothing



    }
}

/**
 * 클래스
 */
class User {
    val data5: Int = 10
}