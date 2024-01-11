package inflearnSpring.inflearnSpring.repository;

import inflearnSpring.inflearnSpring.domain.Member;

import java.util.*;

public class MemoryMemberRepository implements MemberRepository{
    
    private static Map<Long, Member> store = new HashMap<>();
    private static long sequence = 0L; //key값을 0, 1, 2, ... index가져오는것
    @Override
    public Member save(Member member) {
        // sequence 하나를 더해주고 key value로 store에 put 해주면 저장된다.
        member.setId(++sequence);
        store.put(member.getId(), member); // {0 : {id:"123",name:"345"} }, {1 : ...
        return member; // 저장된 결과를 반환
    }

    @Override
    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<Member> findByName(String name) {
        return store.values().stream()
                .filter(member -> member.getName().equals(name)) // 검색 memberclass를 변수로 보내고 이름 가져와서 name과 같다면
                .findAny(); // 하나라도 찾는것
    }

    @Override
    public List<Member> findAll() {
        return new ArrayList<Member>(store.values());
    }
}
