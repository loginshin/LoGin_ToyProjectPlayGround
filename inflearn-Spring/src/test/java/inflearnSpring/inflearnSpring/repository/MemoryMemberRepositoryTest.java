package inflearnSpring.inflearnSpring.repository;

import inflearnSpring.inflearnSpring.domain.Member;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class MemoryMemberRepositoryTest {
    MemberRepository repository = new MemoryMemberRepository() ;

    //테스트가 끝날때마다 실행되는 어노테이션 AfterEach => 데이터를 지워준다.
    @AfterEach
    public void afterEach(){
        repository.clearStore();
    }

        @Test
        public void save(){
            Member member = new Member();
            member.setName("spring");

            repository.save(member);

            Member result = repository.findById(member.getId()).get();
//            System.out.println(result == member );
//            Assertions.assertEquals(member,result);
            assertThat(member).isEqualTo(result);
        }

        @Test
        public void findByName(){
            //회원 두명 가입시키기
            Member member1 = new Member();
            member1.setName("spring1");
            repository.save(member1);

            Member member2 = new Member();
            member2.setName("spring2");
            repository.save(member2);
            
            //repository에서 이름 가져와서 assertThat으로 비교해보기
            Member result = repository.findByName("spring1").get();
            assertThat(result).isEqualTo(member1); //result의 값이 member1과 같은지 체크
        }
        
        @Test
        public void findAll(){
            Member member1 = new Member();
            member1.setName("spring1");
            repository.save(member1);

            Member member2 = new Member();
            member2.setName("spring2");
            repository.save(member2);

            List<Member> result = repository.findAll();
            assertThat(result.size()).isEqualTo(2);

        } 
}
