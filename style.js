
var nameInput = document.getElementById("name")
var urlInput = document.getElementById("url")
var addBtn = document.getElementById("addBtn")
var tableBody = document.getElementById("tableBody")
var bookMarks;
var mainIndex = 0
// ^firstlock screen
if(localStorage.getItem("bookMarks")==null){
bookMarks=[]
}else{
    bookMarks=JSON.parse( localStorage.getItem("bookMarks"));
    displayBook(bookMarks)
}
// ^Regex ex

var nameRegex =/^[A-Za-z_]{1,}$/
function isNameValid(){
    if(nameRegex.test(nameInput.value)){
        return true
    }else{
        return false
    }
}

var urlRegex =/^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/
function isUrlValid(){
    if(urlRegex.test(urlInput.value)){
        return true
    }else{
        return false
    }
}

nameInput.onkeyup=function(){
    if(isUrlValid() && isNameValid() ){
        addBtn.removeAttribute("disabled")
    }else{
        addBtn.disabled ="true"
    }

}

urlInput.onkeyup=function(){
    if(isUrlValid() && isNameValid()){
        addBtn.removeAttribute("disabled")
    }else{
        addBtn.disabled ="true"
    }

}


// & event sumbit
addBtn.onclick = function(){
    if(addBtn.innerHTML=="Update"){
        addBtn.innerHTML=="Submit"; 
        var bookMark={
            name:nameInput.value,
            url:urlInput.value,
        }
        bookMarks.splice(mainIndex,1,bookMark)
    }else{
        var bookMark={
            name:nameInput.value,
            url:urlInput.value,
        }
    bookMarks.push(bookMark)
    // console.log(bookMarks );
    }
    

localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
displayBook(bookMarks) 
clear()  
}
// * fun display
function displayBook(anyArray){
    marks=''
    for(var i=0 ; i<anyArray.length ; i++){
        marks+=`
        <tr>
        <td>${anyArray[i].name}</td>
        <td><a href="${anyArray[i].url}"><button class="btn btn-primary  ">visit</button></a></td>
        <td><button onclick="updateBook(${i})" class="btn btn-info">Update</button></td>
        <td><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
            </tr>
        `
    }
    tableBody.innerHTML=marks
}
// & fun delete
function deleteBook(index){
    bookMarks.splice(index,1)
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks))
   displayBook(bookMarks)
}
//*fun clear 
function clear(){
    nameInput.value=""
    urlInput.value=""
} 
// ^fun update
function updateBook(index){
    nameInput.value=bookMarks[index].name
    urlInput.value= bookMarks[index].url
    addBtn.innerHTML="Update"
    mainIndex = index;
} 
// ^fun search
function search(term){
 var wantedBook=[]
 for(var i=0 ;i<bookMarks.length;i++){
     if(bookMarks[i].name.toLowerCase().includes(term)){
         wantedBook.push(bookMarks[i])
     }
 }
 displayBook(wantedBook)
}
