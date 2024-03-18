var Productnameinput = document.getElementById("Productname");
var Productpriceinput = document.getElementById("Productprice");
var productcategoryinput = document.getElementById("productcategory");
var Productdescriptioninput = document.getElementById("Productdescription");
var Productimageinput = document.getElementById("Productimage");
var productscontainerelement = document.getElementById("product");
var addbtn = document.getElementById("addbtn");
var updatebtn = document.getElementById("updatebtn");
var pindex = 0;
 var errorinput = document.getElementById("error");
 var errorpriceinput = document.getElementById("errorprice");
 var errorcategory = document.getElementById("errorcategory");
 var errordes = document.getElementById("errordes");
resetproductinput();
var productlist = [];
if (localStorage.length > 0) {
    productlist = JSON.parse(localStorage.getItem("listproduct"));
    displayelemnt(productlist);
}
function addproduct() {

    var product =
    {
        productname: Productnameinput.value,
        productprice: Productpriceinput.value,
        productcategory: productcategoryinput.value,
        Productdescription: Productdescriptioninput.value,
        Productimage: Productimageinput.files[0].name,


    }

    productlist.push(product);
    localStorage.setItem("listproduct", JSON.stringify(productlist))

    displayelemnt(productlist);
    resetproductinput();
}


function resetproductinput() {

    Productnameinput.value = null;
    Productpriceinput.value = null;
    productcategoryinput.value = "Choose Product Category";
    Productdescriptioninput.value = null;
    Productimageinput.value = null;
   
}

function displayelemnt(arr) {
    var displayelemntcontainer = ``;
    for (i = 0; i < arr.length; i++) {
        displayelemntcontainer += ` <div class="col ">
        <div class="p-2 border shadow-sm my-2 ">

            <div class="product-image-container mb-5">
                <img src="./images/${arr[i].Productimage}" class="w-100 h-100 object-fit-contain">
            </div>
            <h3> ${arr[i].productname} </h3>
            <p class="text-secondary">${arr[i].Productdescription}</p>
            <p><span class="fw-semibold">category:</span> ${arr[i].productcategory}</p>
            <div class="d-flex justify-content-between pe-2">
                <p class="fw-semibold"> ${arr[i].productprice}EGP </p>
            <div>
                <i class="fa-solid fa-trash-can fs-5 text-danger " onclick="deleteproduct(${i})" ></i>
                <i class="fa-solid fa-pen-to-square fs-5 text-success" onclick = "letupdate(${i})"></i>
              
            </div>
            </div>




        </div>
    </div>`
    }




    productscontainerelement.innerHTML = displayelemntcontainer;

}




function deleteproduct(index) {

    let sure = confirm("are u sure ?");
    if (sure === true) {

        productlist.splice(index, 1);
        localStorage.setItem("listproduct", JSON.stringify(productlist));
        displayelemnt(productlist);
    }

}









function searchproduct(searchkey) {
    var SearchArr = [];
    for (i = 0; i < productlist.length; i++) {
        if (productlist[i].productname.toLowerCase().includes(searchkey.toLowerCase())) {
            SearchArr.push(productlist[i]);

        }
    }
    displayelemnt(SearchArr);
}



function letupdate(index) {

    console.log(index);

    pindex = index;

    Productnameinput.value = productlist[index].productname;
    Productpriceinput.value = productlist[index].productprice;
    productcategoryinput.value = productlist[index].productcategory;
    Productdescriptioninput.value = productlist[index].Productdescription;
    //Productimagesinput.value = productlist[index].Productimage;



    addbtn.classList.replace('d-block', 'd-none');
    updatebtn.classList.replace('d-none', 'd-block');

}

function updateproduct() {

    var product =
    {
        productname: Productnameinput.value,
        productprice: Productpriceinput.value,
        productcategory: productcategoryinput.value,
        Productdescription: Productdescriptioninput.value,
        Productimage: Productimageinput.files[0].name,
    }
    productlist.splice(pindex, 1, product);
    localStorage.setItem("listproduct", JSON.stringify(productlist));
    displayelemnt(productlist);
    resetproductinput();
    updatebtn.classList.replace('d-block', 'd-none');
    addbtn.classList.replace('d-none', 'd-block');

}


function productnamevalidation(){
    var regex =/[A-Z][!-}]{4,12}$/;
    if(regex.test(Productnameinput.value)){
        Productnameinput.classList.add("is-valid");
        Productnameinput.classList.remove("is-invalid");
        return true;
    }else 
    Productnameinput.classList.add("is-invalid");
    Productnameinput.classList.remove("is-valid");
    errorinput.classList.replace("d-none","d-block");
    return false;

}


function productpricevalidation(){
    var regex =/([1-9][0-9][0-9][0-9]|10000)$/;
    if(regex.test(Productpriceinput.value)){
        Productpriceinput.classList.add("is-valid");
        Productpriceinput.classList.remove("is-invalid");
        return true;
    }else 
    Productpriceinput.classList.add("is-invalid");
    Productpriceinput.classList.remove("is-valid");
    errorpriceinput.classList.replace("d-none","d-block");
    return false;

}


function productcategoryvalidation(){
    var regex =/(Printer|Camera|TV|Lab Top|Mobile Phone)$/;
    if(regex.test(productcategoryinput.value)){
        productcategoryinput.classList.add("is-valid");
        productcategoryinput.classList.remove("is-invalid");
        return true;
    }else 
    productcategoryinput.classList.add("is-invalid");
    productcategoryinput.classList.remove("is-valid");
    errorcategory.classList.replace("d-none","d-block");
    return false;

}







function productdescriptionvalidation(){
    var regex =/[!-}]{5,45}$/;
    if(regex.test(Productdescriptioninput.value)){
        Productdescriptioninput.classList.add("is-valid");
        Productdescriptioninput.classList.remove("is-invalid");
        return true;
    }else 
    Productdescriptioninput.classList.add("is-invalid");
    Productdescriptioninput.classList.remove("is-valid");
    errordes.classList.replace("d-none","d-block");
    return false;

}