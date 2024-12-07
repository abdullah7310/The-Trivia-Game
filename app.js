let form = document.getElementById('submitForm')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    // console.log(player1);
    showCategories(player1, player2)
})
let categoryData
let selectedCategories = []
let selectedCategoriesIndex = 0
function showCategories(player1, player2) {
    
      categoryData = ['music', 'sport_and_leisure']
    // categoryData = ['music','sport_and_leisure''film_and_tv', 'arts_and_literature', 'history', 'society_and_culture', 'science', 'geography', 'food_and_drink', 'general_knowledge']
    // if(selectedCategoriesIndex<categoryData.length){
    let container = document.querySelector('.container')
    container.innerHTML = ''
    let h2 = document.createElement('h2')
    h2.classList.add('h2-heading')
    h2.textContent = "Choose Categories"
    container.appendChild(h2)
        for (let category of categoryData) {
            console.log(category);
            let categoryButton = document.createElement('button')
            categoryButton.classList.add('category-heading')
            categoryButton.textContent = category
            container.appendChild(categoryButton)
            
            categoryButton.addEventListener('click', () => {
                if(selectedCategories.includes(category)){
                    console.log('yes it is in selected category array',category)
                    alert(`Ooops! You alreade played this category \n Choose another category...`)
                }else{
                    // console.log("nahi hai ");
                    selectedCategories.push(category)
                    selectedCategoriesIndex += 1
                    categoryQuestions(category, player1, player2)
                    
                    
                }
                
                
            })
    
        }
    // }else{
    //     alert("category Over")
    //     let p = document.createElement('p')
    //     document.body.append(p)
    //     p.textContent = 'Game Over'
    //     // = `<h2>Game Over!</h2>`;
    // }

}
let scoreObj = { player1: 0, player2: 0 }
let swap;
let quesForPlayer = player1
async function categoryQuestions(data, player1, player2) {
    console.log("button was clicked", data);

    let easyQuesAPi = await fetch(`https://the-trivia-api.com/v2/questions?categories=${data}&difficulties=easy&limit=2`)
    let easyQuesData = await easyQuesAPi.json()
    console.log(easyQuesData);
    let container = document.querySelector('.container')
    container.innerHTML = " "
    console.log(player1);   
    console.log(player2);
    
    let allQuestions = []

    easyQuesData.forEach(ques => {
        allQuestions.push(ques)
    })
    let mediumQuesAPi = await fetch(`https://the-trivia-api.com/v2/questions?categories=${data}&difficulties=medium&limit=2`)
    let mediumQuesData = await mediumQuesAPi.json()
    console.log(mediumQuesData);
    mediumQuesData.forEach(ques => {
        allQuestions.push(ques)
    })

    let hardQuesAPi = await fetch(`https://the-trivia-api.com/v2/questions?categories=${data}&difficulties=hard&limit=2`)
    let hardQuesData = await hardQuesAPi.json()
    console.log(hardQuesData);
    hardQuesData.forEach(ques => {
        allQuestions.push(ques)
    })

    console.log("all question array", allQuestions);

    let h2 = document.createElement('h2')
    h2.classList.add('quesHeading')
    h2.textContent = "Play the Game!"
    container.appendChild(h2)
    let questionDiv = document.createElement('div')
    questionDiv.classList.add('questionDiv')
    let divForNames = document.createElement('div')
    divForNames.classList.add('divForNames')
    divForNames.innerHTML = `<p>Player 1: <span><strong>${player1}</strong></span><p>Score: ${scoreObj.player1}</p> <p>Player 2: <span><strong>${player2}</strong></span> <p>Score: ${scoreObj.player2}</p></p>`
    questionDiv.appendChild(divForNames)
    let divForQues = document.createElement('div')
    divForQues.classList.add('divForQues')
    questionDiv.appendChild(divForQues)
    container.appendChild(questionDiv)
    
    let index = 0
    quesForPlayer = player1 
    // scoreObj = { player1: 10, player2: 0 }
    showQues(allQuestions,index,quesForPlayer)
    function showQues(data,index,quesForPlayer){
        let quesInd = data[index]
        console.log(quesInd,"this is quesInd");
        let allOptions = [quesInd.correctAnswer]
        console.log("correct answer",allOptions);
        
        quesInd.incorrectAnswers.forEach((el)=>{
            allOptions.push(el)
        })
        console.log("before random allOptions",allOptions);
        
        for(let i = allOptions.length - 1; i > 0; i--){
            swap = Math.floor(Math.random() * (i+1))
            console.log("this is swap",swap);   

            [allOptions[i], allOptions[swap]] = [allOptions[swap], allOptions[i]]
        }
        console.log("after random all optionn wala arrar",allOptions);
        
        document.querySelector('.divForQues').innerHTML = " "
        
        // console.log('this is showQues data',data[0]);
        let question = document.createElement('p')
        question.textContent = quesInd.question.text
        divForQues.appendChild(question)
        allOptions.forEach((el)=>{
            let correctBtn = document.createElement('button')
            correctBtn.classList.add('optionBtn')
            correctBtn.textContent = `${el}`
            divForQues.append(correctBtn)
            correctBtn.addEventListener('click', () => {
                increasePoint(scoreObj,correctBtn.textContent,quesInd,quesForPlayer)


                nextquestion(data,index+1,categoryData)
        
        
            })
            
        })

    }

    function increasePoint(obj,btn,QuesData,playername){
        if(playername===player1){
            if(btn===QuesData.correctAnswer){
                if(QuesData.difficulty ==="easy"){
                    
                        obj.player1 += 10
                        console.log("this is index",index);
                    }else if(QuesData.difficulty==="medium"){
                        obj.player1 +=15
                    }else{
                        obj.player1 +=20
                    }
                }else{
                    alert('this is wrong answer no points will increase')
        
                }
            quesForPlayer = player2
        }else{
            if(btn===QuesData.correctAnswer){
                if(QuesData.difficulty ==="easy"){
                    
                        obj.player2 += 10
                        console.log("this is index",index);
                    }else if(QuesData.difficulty==="medium"){
                        obj.player2 +=15
                    }else{
                        obj.player2 +=20
                    }
                }else{
                    alert('this is wrong answer no points will increase')
        
                }
            quesForPlayer = player1
        }
      
        
        divForNames.innerHTML = `<p>Player 1: <span><strong>${player1}</strong></span><p>Score: ${scoreObj.player1}</p> <p>Player 2: <span><strong>${player2}</strong></span> <p>Score: ${scoreObj.player2}</p></p>`
        
    }

    function nextquestion(data,index,category){
        console.log("this is catgory of next Question",category);
        console.log("this is data",data);
        console.log("this is main index",index);
        
        
        
        if (index < data.length) {
            showQues(data, index,quesForPlayer);
        } else {
            divForQues.innerHTML = `<h2>Game Over!</h2>`;
            let playAgain = document.createElement('p')
            playAgain.textContent = "Do you want to play again?"
            divForQues.append(playAgain)
            let playAgainBtn = document.createElement('button')
            playAgainBtn.textContent = "Yes!"
            playAgainBtn.classList.add('exitBtn')
            divForQues.append(playAgainBtn)
            let exitBtn = document.createElement('button')
            exitBtn.textContent = "Exit"
            playAgainBtn.classList.add('exitBtn')
            divForQues.append(exitBtn)

            playAgainBtn.addEventListener('click',()=>{
                console.log("play again is clicked")
                console.log("INDEX",index);
                console.log("I wanna check",data);
                console.log("this is our category data of playAgain btn",category);
                
                if(selectedCategoriesIndex<category.length){

                    showCategories(player1, player2)
                }else{
                    questionDiv.innerHTML = " "
                    let h2 = document.createElement('h2')
                    h2.textContent = `Game Over!! \n ${player1} score is :> ${scoreObj.player1} \n ${player2} score is ${scoreObj.player2}`
                    questionDiv.append(h2)
                    if(scoreObj.player1>scoreObj.player2){
                        let h1 = document.createElement('h1')
                        h1.textContent = `So ${player1} won the GAME!!!!!`
                        questionDiv.append(h1)
                    }else{
                        let h1 = document.createElement('h1')
                        h1.textContent = `So ${player2} won the GAME!!!!!`
                        questionDiv.append(h1)
                    }
                    
                }
                
                
            })
            exitBtn.addEventListener('click',()=>{
                divForQues.innerHTML = " "
                let gameOver = document.createElement('h2')
                gameOver.textContent = `score of Player 1 ${player1} ${scoreObj.player1} \n score of player 2 ${player2} ${scoreObj.player2}`
                divForQues.append(gameOver)
                divForNames.innerHTML = `<p>Player 1: <span><strong>${player1}</strong></span><p>Score: ${scoreObj.player1}</p> <p>Player 2: <span><strong>${player2}</strong></span> <p>Score: ${scoreObj.player2}</p></p>`
            })

        } 
    }



}