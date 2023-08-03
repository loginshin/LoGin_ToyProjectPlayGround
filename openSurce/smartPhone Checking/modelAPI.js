 // More API functions here:
  
 // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "./my_model/";

    let model, labelContainer, maxPredictions, image;

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

        // html에 webcam-container 생성 생성
       // document.getElementById("webcam-container").appendChild(webcam.canvas); 
            // HTML에 iphone, Galaxy 수치 나타내는 태그
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }


        //  웹캠 루프
        // async function loop() {
        //     webcam.update(); // update the webcam frame 프레임조절
        //     await predict(); // 하나씩 수행
        //     window.requestAnimationFrame(loop); 프레임조절
        // }
        

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        //const prediction = await model.predict(webcam.canvas);

        //이미지로 바꾸심
        var image = document.getElementById("sellPhoneImg");
        const prediction = await model.predict(image, false);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }