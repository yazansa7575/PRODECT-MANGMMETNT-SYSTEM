let dark = document.getElementById("black");
let defulte = document.getElementById("white");
let titleinput= document.getElementById("titleinput");
let priceinput= document.getElementById("priceinput");
let taxesinput= document.getElementById("taxesinput");
let adsinput= document.getElementById("adsinput");
let discountinput= document.getElementById("discountinput");
let total= document.getElementById("total");
let countinput= document.getElementById("countinput");
let category= document.getElementById("categoryinput");
let sub= document.getElementById("sub");
let search= document.getElementById("search");
let wmoo= document.querySelectorAll(".wmoo");


let mood = 'create';
let tmp ;



//thems

dark.onclick = function(){
    document.body.style.backgroundColor = "black";
    priceinput.classList.remove("wmo")
    titleinput.classList.remove("wmo")
    taxesinput.classList.remove("wmo")
    adsinput.classList.remove("wmo")
    discountinput.classList.remove("wmo")
    countinput.classList.remove("wmo")
    category.classList.remove("wmo")
    search.classList.remove("wmo")
   




}
defulte.onclick = function(){
    
    document.body.style.backgroundColor = "#F582A7";
    titleinput.classList.add("wmo")
    priceinput.classList.add("wmo")
    taxesinput.classList.add("wmo")
    adsinput.classList.add("wmo")
    discountinput.classList.add("wmo")
    countinput.classList.add("wmo")
    category.classList.add("wmo")
    search.classList.add("wmo")
} 



//get total


function gettotal(){

   if (priceinput.value != "")
   {
       let resulte = (+priceinput.value + +taxesinput.value + +adsinput.value ) - + discountinput.value ;
       total.innerHTML = resulte;
       total.style.backgroundColor="green";

  
    }
    else
    {
        total.style.backgroundColor="red";
        total.innerHTML= "";

    }

}



//creat data

let datapro;
if (localStorage.prodcet != null)
{
    datapro = JSON.parse(localStorage.prodcet)
}
else
{
  datapro = [];
}

sub.onclick=function()
{
    
    countinput.style.display="block";
    sub.innerHTML="Create";
   
    let newpro  = {
        title:titleinput.value.toLowerCase(),
        price:priceinput.value,
        taxes:taxesinput.value,
        ads:adsinput.value,
        discount:discountinput.value,
        total:total.innerHTML,
        count:countinput.value,
        category:category.value.toLowerCase(),
    }

    if (titleinput.value !="" && priceinput.value !="" && category.value !="")
    {
        if (mood ==='create')
        {
             if (countinput.value < 101) 
             {
                if (newpro.count > 1)
                {
                    for(let i = 0 ; i < newpro.count ; i++)
                    {
                      datapro.push(newpro)
                    }
        
                }
                else
                {
                    datapro.push(newpro)
                    
                }
                        
                cleardata();    

             }
        }
        else
        {
           datapro[tmp] = newpro
        }   
    }
    


  
        
         
    localStorage.setItem("prodcet", JSON.stringify (datapro)   )
    
    reddata()
    gettotal();
  

}



//clear data

function cleardata ()
{
    titleinput.value ="";
    priceinput.value ="";
    taxesinput.value ="";
    adsinput.value ="";
    discountinput.value ="";
    total.innerHTML ="";
    countinput.value ="";
    category.value ="";


}


//read data 
function reddata()
{
    let table= "";
    for(let i = 0; i < datapro.length ; i++)
    {
        

        table +=`
         <tr>
            <td>${i +1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button  onclick=" Update(${i})" id="btn-update">Update</button></td>
            <td><button  onclick=" Delete(${i})" id="btn-Remove">Delete</button></td> 
    
         </tr>
         `
          
          
    }
    let tbody = document.getElementById("tbody").innerHTML = table ;

    if (datapro.length > 0 )
    {
    let deletall = document.getElementById("deletall");
    deletall.innerHTML=
    `
    <button onclick="DeleteAll()"  id="btn-del"> Delete All (${datapro.length})</button>
    `
    
    } 
    else{
        deletall.innerHTML="";
        
    }
  

}
reddata()


//delete

function Delete(i)
{
    datapro.splice(i,1);
    localStorage.prodcet = JSON.stringify (datapro);
    reddata()
}

//Delete All



function DeleteAll()
{
    localStorage.clear();
    datapro.splice(0);
    reddata();
}

function Update(i)
{
   
    mood= 'update'
   countinput.style.display="none";
   sub.innerHTML="Update";
   titleinput.value=datapro[i].title;
   taxesinput.value=datapro[i].taxes;
   adsinput.value=datapro[i].ads;
   discountinput.value=datapro[i].discount;
   priceinput.value=datapro[i].price;
   category.value=datapro[i].category;
    scroll({
        top:0,
        behavior:"smooth",
    })
   gettotal(); 
   tmp = i;
   
}

//searsh
let MoodSearsh = "title" ;
function clicksearsh(id)
{
   if (id==="title")
   {
     MoodSearsh="title";
     

    }
   else 
   {

     MoodSearsh="gategroy"

   }
    search.value=""
    search.focus();
    search.placeholder ="sersh by "+id;
    reddata();

}
function searsharray (value)
{
    let table="";
    if (MoodSearsh =="title")
    {
       for (let i = 0; i < datapro.length ; i++) 
       {
           if (datapro[i].title.includes(value.toLowerCase()))
           {
                table +=`
                <tr>
                <td>${i +1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button  onclick=" Update(${i})" id="btn-update">Update</button></td>
                <td><button  onclick=" Delete(${i})" id="btn-Remove">Delete</button></td> 
        
                </tr>
                `
            }
          
       }  
        
    }
    else
    {
        for (let i = 0; i < datapro.length ; i++) 
       {
           if (datapro[i].category.includes(value.toLowerCase()))
           {
                table +=`
                <tr>
                <td>${i +1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button  onclick=" Update(${i})" id="btn-update">Update</button></td>
                <td><button  onclick=" Delete(${i})" id="btn-Remove">Delete</button></td> 
        
                </tr>
                `
            }
          
       } 
    }
    let tbody = document.getElementById("tbody").innerHTML = table ;
}

