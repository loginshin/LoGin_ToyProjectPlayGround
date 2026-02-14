package com.enterProject.enterProject

import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.Test

@SpringBootTest
class TestCord {
    @Test
    fun testMain() {
        print("\n\n\n =================================\n\n\n")
        val solution = Solution()
        print(solution.solution(2,1,1))
        print("\n\n\n===================================\n\n\n ")
    }
}

/**
 * 프로그래머스 클래스
 *  - n : 택배 박스 총 갯수
 *  - w : 최대 width (줄) 값
 *  - num : 꺼낼 상자 번호
 *
 *  @Solution : 각 택배 박스에 층수를 지정 후 지정된 택배박스 번호보다 높으면서 같은 width위치에 있는 택배 박스의 갯수를 추출
 */
class Solution {
    fun solution(n: Int, w: Int, num: Int): Int {
        var answer: Int = 0

        if (w == 1) return n - num + 1 // 한 줄일 경우
        answer = pickUpBoxCount(putDownBox(n, w), num)

        return answer
    }

    /**
     * 택배 쌓기
     *  - 박스들의 위치를 선정합니다.
     *  - boxNumber: 택배 번호 / h: 층
     *  boxLocation: ex) (13[1,3]): 13번째 박스 1번째 3층
     */
    fun putDownBox(boxNumber: Int, maxWidth: Int): HashMap<Int, List<Int>> {
        val boxLocation = HashMap<Int, List<Int>>()
        var floor: Int = 0 // X층
        var floorCount: Int = 0 // X층 N개
        var maxFloorBool: Boolean = false // 다음층 쌓을지 여부

        for (i in 0 until boxNumber) {
            // 상자 위치 지정
            boxLocation[i] = listOf(floor, floorCount)

            // 다음 층 올릴지 여부
            if (maxFloorBool) {
                floor++
                maxFloorBool = false
                continue
            }

            // 다음 층 부터는 반대로 쌓기
            if (floor % 2 == 0) {
                floorCount++
            } else {
                floorCount--
            }

            // 다음 층 여부
            if ((maxFloorBool == false && floorCount >= maxWidth - 1) || floorCount == 0) {
                maxFloorBool = true
            }

        }

        return boxLocation
    }

    /**
     * - 선택한 박스보다 다음 순번이면서
     * - 같은 width 순서를 가져야 한다.
     */
    fun pickUpBoxCount(boxLocationMap: HashMap<Int, List<Int>>, pickUpBoxNum: Int): Int {
        var count: Int = 0

        // 선택한 박스의 위치
        val chooseBoxFloor: Int = boxLocationMap[pickUpBoxNum - 1]?.get(0) ?: return 0
        val chooseBoxWidth: Int = boxLocationMap[pickUpBoxNum - 1]?.get(1) ?: return 0

        // 선택한 박스 포함 다음 순서의 같은 순서 갯수
        count = boxLocationMap.filter { entry ->
            entry.value[1] == chooseBoxWidth &&
            entry.value[0] > chooseBoxFloor
        }.size + 1

        return count
    }
}