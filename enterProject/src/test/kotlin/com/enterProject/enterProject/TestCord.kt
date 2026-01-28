package com.enterProject.enterProject

import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.Test

@SpringBootTest
class TestCord {
    @Test
    fun testMain() {
        print("\n\n\n ===================================\n\n\n")

        var tmp : String
        var arr : Array<Int>

        arr = arrayOf(1,2,3,4,5)

        for (i in arr) {
            print(i * 2)
        }


        print("\n\n\n===================================\n\n\n ")
    }
}