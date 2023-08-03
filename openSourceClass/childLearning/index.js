 // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/RlW5Tj1i3/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(500, 500, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);

        labelContainer = document.getElementById("label-container");
        trainer = document.getElementById("img-search");
        trainer1 = document.getElementById("translate");
        for (let i = 0.3; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
            trainer.appendChild(document.createElement("div"));
            trainer1.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }


    //웬만해선 변수를 설정해서 FAQ버튼에 한 함수로 실행할 수 있도록 진행해야한다.

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        console.log(prediction[0].probability);
        
        if(prediction[0].probability.toFixed(2) >= 0.60) {
            console.log('keyboard');
            labelContainer.innerHTML = "keyboard";
            trainer.innerHTML = "사진 더보기";
            trainer1.innerHTML = "한국어는 뭘까요?";
            document.querySelector('#img-search').addEventListener('click',e=>{
                window.location = 'https://www.google.com/search?q=%ED%82%A4%EB%B3%B4%EB%93%9C&sxsrf=APq-WBtKnHHMpGtiPHUWpoSViqk0VFhvQQ:1650450767845&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjU_fGduKL3AhUkK6YKHfLhBHQQ_AUoAXoECAIQAw&biw=1022&bih=1327&dpr=1'
            });
            document.querySelector('#translate').addEventListener('click',e=>{
                window.location = 'https://translate.google.co.kr/?hl=ko&sl=en&tl=ko&text=keyboard&op=translate'
            });

        } else if (prediction[1].probability.toFixed(2) >= 0.60) {
            console.log('person');
            labelContainer.innerHTML = "person";
            trainer.innerHTML = "사진 더보기";
            trainer1.innerHTML = "한국어는 뭘까요?";
            document.querySelector('#img-search').addEventListener('click',e=>{
                window.location = 'https://www.google.com/search?q=%EC%82%AC%EB%9E%8C&sxsrf=APq-WBs7j1QfE1s_AmNm1w4_s90sAUlPLg:1650452228137&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjXlJvWvaL3AhVfqFYBHRaFCFQQ_AUoAXoECAIQAw&biw=1022&bih=1327&dpr=1'
            });
            document.querySelector('#translate').addEventListener('click',e=>{
                window.location = 'https://translate.google.co.kr/?hl=ko&sl=en&tl=ko&text=person&op=translate'
            });


        } else if (prediction[2].probability.toFixed(2) >= 0.60) {
            console.log('sellphone');
            labelContainer.innerHTML = "cellphone";
            trainer.innerHTML = "사진 더보기";
            trainer1.innerHTML = "한국어는 뭘까요?";
            document.querySelector('#img-search').addEventListener('click',e=>{
                window.location = 'https://www.google.com/search?q=cellphone&tbm=isch&ved=2ahUKEwinq_L7vaL3AhXCTPUHHQj7BQMQ2-cCegQIABAA&oq=cellphone&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BwgjEO8DECc6BAgAEB5Q7wZY9gdgtRFoAHAAeACAAWWIAZ0CkgEDMi4xmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=U-dfYue1CcKZ1e8PiPaXGA&bih=1327&biw=1022'
            });
            document.querySelector('#translate').addEventListener('click',e=>{
                window.location = 'https://translate.google.co.kr/?hl=ko&sl=en&tl=ko&text=cellphone&op=translate'
            });

        } else if (prediction[3].probability.toFixed(2) >= 0.60) {
            console.log('laptop');
            labelContainer.innerHTML = "laptop";
            trainer.innerHTML = "사진 더보기";
            trainer1.innerHTML = "한국어는 뭘까요?";
            document.querySelector('#img-search').addEventListener('click',e=>{
                window.location = 'https://www.google.com/search?q=laptop&tbm=isch&ved=2ahUKEwjBr4KdvqL3AhXSzosBHYi2AMkQ2-cCegQIABAA&oq=laptop&gs_lcp=CgNpbWcQAzIICAAQgAQQsQMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BwgjEO8DECc6CAgAELEDEIMBOgsIABCABBCxAxCDAVCGB1j3DGD9DmgAcAB4AIABgAGIAcAFkgEDNS4ymAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=mOdfYsGDJtKdr7wPiO2CyAw&bih=1327&biw=1022'
            });
            document.querySelector('#translate').addEventListener('click',e=>{
                window.location = 'https://translate.google.co.kr/?hl=ko&sl=en&tl=ko&text=laptop&op=translate'
            });

        } else if (prediction[4].probability.toFixed(2) >= 0.60) {
            console.log('cup');
            labelContainer.innerHTML = "cup";
            trainer.innerHTML = "사진 더보기";
            trainer1.innerHTML = "한국어는 뭘까요?";
            document.querySelector('#img-search').addEventListener('click',e=>{
                window.location = 'https://www.google.com/search?q=cup&tbm=isch&ved=2ahUKEwjlhby4vqL3AhXXz4sBHaurDQYQ2-cCegQIABAA&oq=cup&gs_lcp=CgNpbWcQAzIICAAQgAQQsQMyBQgAEIAEMggIABCABBCxAzIICAAQgAQQsQMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BwgjEO8DECc6CAgAELEDEIMBUIoHWOAHYM8JaABwAHgAgAFjiAH8ApIBATSYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=0udfYuXUC9efr7wPq9e2MA&bih=1327&biw=1022'
            });
            document.querySelector('#translate').addEventListener('click',e=>{
                window.location = 'https://translate.google.co.kr/?hl=ko&sl=en&tl=ko&text=cup&op=translate'
            });

        } else if (prediction[5].probability.toFixed(2) >= 0.80) {
            console.log('사물을 보여주세요');
            labelContainer.innerHTML = "선생님도 몰라요~";
            trainer.innerHTML = ">";
            trainer1.innerHTML = "<";
        }
        

        
        // for (let i = 0; i < maxPredictions; i++) {
        //     const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        //     labelContainer.childNodes[i].innerHTML = classPrediction;


        // }
        
    }