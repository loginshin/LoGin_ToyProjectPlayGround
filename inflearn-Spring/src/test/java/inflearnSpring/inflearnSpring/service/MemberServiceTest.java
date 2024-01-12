package inflearnSpring.inflearnSpring.service;

import inflearnSpring.inflearnSpring.domain.Member;
import inflearnSpring.inflearnSpring.repository.MemberRepository;
import inflearnSpring.inflearnSpring.repository.MemoryMemberRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class MemberServiceTest {

//    MemberService memberService = new MemberService();
//    MemoryMemberRepository memberRepository = new MemoryMemberRepository();

    MemberService memberService;
    MemoryMemberRepository memberRepository;

    @BeforeEach
    public void beforeEach(){
        memberRepository = new MemoryMemberRepository();
        memberService = new MemberService(memberRepository);
    }



    @AfterEach
    public void afterEach(){
        memberRepository.clearStore();
    }


    @Test
    void join() {
        //given : 뭔가 주어졌는데 (데이터)
        Member member = new Member();
        member.setName("hello");

        //when : 이거를 실행했을 때 (검증하는것)
        Long saveId = memberService.join(member);

        //then : 결과가 이게 나와야한다 (결과)
        Member findMember = memberService.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(findMember.getName());
    }
    @Test
    void joinException(){
        //given : 뭔가 주어졌는데 (데이터)
        Member member1 = new Member();
        member1.setName("spring");

        Member member2 = new Member();
        member2.setName("spring");

        //when : 이거를 실행했을 때 (검증하는것)
        memberService.join(member1);
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");

//        try {
//            memberService.join(member2); // "error 이미존재하는 회원입니다."
//            fail();
//        }catch (IllegalStateException e){
//            assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
//        }

    }

    @Test
    void findMember() {
    }

    @Test
    void findOne() {
    }
}