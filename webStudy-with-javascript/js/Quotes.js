const quotes = [
    {
        quote: "내일도 할 수 있는 일을 굳이 오늘 할 필요없다",
        author: "이재문",
    },
    {
        quote: "감 다죽었네 민석, 다른거 죽는거보단 낫잖아 ㅋㅋ",
        author: "이승찬 and 조민석",
    },
    {
        quote: "후회할걸 알면서도 포기하면 힘들던거 싹 잊고 후회만 남는다. 그렇다 나는 지금 그 과거에 서 있다.",
        author: "Shin LoGin",
    },
    {
        quote: "아님말고",
        author: "Aristotle",
    },
    {
        quote: "참을 인 세번이면 호구",
        author: "이재문",
    },
    {
        quote: "흘러간 시간은 되돌아오지 않는다",
        author: "Stella",
    },
    {
        quote: "남들 신경쓸 정신으로 자기 자신이나 신경쓰면 세계정복",
        author: "Shin LoGin",
    },
    {
        quote: "나눈 모르는 일",
        author: "신시환",
    },
    {
        quote: "고기와 밀가루를 멀리 하면 오래 살 수 있지만, 그렇다면 오래 살 필요가 없어",
        author: "한승헌",
    },
    {
        quote: "간절하면 그야말로 최고의 충동이 나온다",
        author: "Shin LoGin",
    }

];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;