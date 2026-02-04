package com.enterProject.enterProject

import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.Test

@SpringBootTest
class TestCord {
    @Test
    fun testMain() {
        print("\n\n\n =============[ 함수형 프로그래밍 ]==============\n\n\n")

        println(pureFuntion(10, 20)) // 30
        println(impureFuntion(10, 20)) // 50
        println(impureFuntionWithSideEffect(10, 20)) //50

        print("\n\n\n===================================\n\n\n ")
    }

    var z: Int = 10 // 가변
    val x: Int = 10 // 불변

    // 순수 함수
    fun pureFuntion(x: Int, y: Int): Int {
        return x + y
    }

    // 불순 함수
    fun impureFuntion(x: Int, y: Int): Int {
        z = 20

        return x + y + z
    }

    // 부수 효과 있는 불순 함수
    fun impureFuntionWithSideEffect(x: Int, y: Int): Int {
        z = y

        return x + y + z
    }

    fun doSomething(func: (Int) -> String): String {

        return func(z)
    }
}

/**
 * 클래스
 */
class User {
    val data5: Int = 10
}