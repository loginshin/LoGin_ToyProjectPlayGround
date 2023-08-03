//함수화 해서 바디에 사용onload
async function init() {
  
  
  //아이디 가지고 와서 변수선언
  const video = document.getElementById("video");
  const predictions = document.getElementById("predictions");
  //모델 선언에 모바일넷 로드하기
    const model = await mobilenet.load();
  
  //구글 이미지 검색  


  
  //비디오 사용자 허용 후 켜기
  video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
  await video.play();

  
  
  let searchUrl;
  let keywords;
  let translateUrl;
  setInterval(async () => {
    
    const results = await model.classify(video);
    
    
    //console에 출력
    console.log(results[0].className);
    console.log((results[0].probability * 100).toFixed(2) +'%');

        // 계속 바뀌는 결과값을 키워드 변수로 따로 담음
        keywords = results[0].className;

        // 구글 이미지 검색 url
        searchUrl = "https://www.google.co.kr/search?q=" + keywords + "&hl=ko&tbm=isch&sxsrf=ALiCzsar-qb-vPCrsE53_sAalkC-OOlJhw%3A1654697949209&source=hp&biw=1536&bih=760&ei=3a-gYqXnCqWy2roP98CHUA&iflsig=AJiK0e8AAAAAYqC97fW14BBnY1Rga2LZFaz3ZIzb4vgj&ved=0ahUKEwjlyeKbhp74AhUlmVYBHXfgAQoQ4dUDCAc&uact=5&oq=god&gs_lcp=CgNpbWcQAzIICAAQgAQQsQMyBQgAEIAEMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzIICAAQgAQQsQMyBQgAEIAEMggIABCABBCxAzIFCAAQgAQ6BwgjEOoCECc6CAgAELEDEIMBOgsIABCABBCxAxCDAToECCMQJzoECAAQA1AAWJ0jYKMkaANwAHgAgAFuiAHqBJIBAzEuNZgBAKABAaoBC2d3cy13aXotaW1nsAEK&sclient=img";
        // 구글 번역 url
        translateUrl = "https://translate.google.co.kr/?hl=ko&tab=rT&sl=en&tl=ko&text=" + keywords + "&op=translate";

        // 클릭 -> 구글 이미지 검색(기존 창에서 바뀜)
        var search = document.getElementById('search');
        search.innerText=keywords + " 사진 "
        search.onclick = function(){
          location.href = searchUrl;
        };
        // 클릭 -> 구글 번역(기존 창에서 바뀜)
        var translate = document.getElementById('translate');
        translate.innerText=keywords + " 번역 "
        translate.onclick = function(){
          location.href = translateUrl;
        }
        
        var timeleft = 3;
        var downloadTimer = setInterval(function(){
          if(timeleft <= 0){
            clearInterval(downloadTimer);
          }
          document.getElementById("progressBar").value = 3 - timeleft;
          timeleft -= 1;
        }, 1000);
        

      }, 4000);


      
      

      
      
  














};