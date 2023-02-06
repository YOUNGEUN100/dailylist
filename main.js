// (v) 유저는 할일을 추가할 수 있다.
// (v) 각 할일에 삭제와 체크버튼이 있다.
// (v) 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// (v) 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// (v) 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs button");
let taskList = [];
let filterList = [];
let mode = 'all';


//'+' 버튼을 누르면 addTask 함수 이벤트 발생
// 혼자하면서 유의사항: addEventListener 에서 함수를 부를 때는 => 함수 O 함수() X
addButton.addEventListener("click",addTask);

// 키보드 'Enter'를 누르면 addTask 함수 발생 
// html input태크에 onkeyup 으로 직접줌
function enterkey() {
	if (window.event.keyCode == 13) {
    	addTask();
    }
}

// 각각 탭을 클릭하면 이벤트 발생
for(let i=0;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event) {filter(event)});
}


// 할일추가 함수: 리스트에 할일 추가/렌더 실행 / 입력창 비우기
function addTask() {
    let task = {
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
   
    taskList.push(task);
    console.log(taskList);
    render();
    
    taskInput.value = "";
    }

// 랜덤 id 생성 함수
function randomIDGenerate() {
    return Math.random().toString(36).substr(2, 16);
}

// 렌더 함수 : UI 업데이트
function render() {
    let resultHTML = "";
    let list = [];
    
    if (mode == 'all') {
        list = taskList;
    } else if (mode=='ongoing'|| mode=='done') {
        list = filterList;
    }

    for(i=0;i<list.length;i++) {
        // 일을 완료 했을 때
        if (list[i].isComplete) {
            resultHTML += 
                `<div class="board">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="completeTask('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
                </div>`
        // 일을 못 끝냈을 때
         } else {
            resultHTML += 
                `<div class="board">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="completeTask('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
                </div>`
         }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}


function completeTask(id) {
    for (i=0; i<taskList.length;i++) {
        if (taskList[i].id==id) {
            // 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id) {
    for (i=0;i<taskList.length;i++) {
        if (taskList[i].id==id) {
            taskList.splice(i,1);
            break;
        }
    }
    for (i=0;i<filterList.length;i++){
        if (filterList[i].id==id) {
            filterList.splice(i,1);
        }
    }
    render();
    console.log(taskList);
}

function filter(event) {

    mode = event.target.id
    filterList = []; 
    // filterList가 계속 덮어쓰지 않도록 비워주기

    if (mode == 'all') {
        render();
        console.log(taskList);
    } else if (mode == 'ongoing') {
        for (i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
                console.log(filterList);
            }
        }
        render();
    } else if (mode == 'done') {
        for (i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
                console.log(filterList);
            }
        }
        render();
    }  
}