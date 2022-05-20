
// this line for table view by bootstrap and Jquery */
$(document).ready(function () {
    $('#example').DataTable();
});

/******************************************** */
function edit(i){

    document.getElementById(`save${i}`).classList.remove("d-none");
    document.getElementById(`calDateInput${i}`).removeAttribute("disabled");
  //  document.getElementById(`saveForm${i}`).classList.add("bg-dark");
    $('.edit-btn').hide();
}

function getID(id){
    console.log(id);
    document.getElementById("hiddenIDinput").value=id

}
function saveAndDisabled()
{
    document.getElementById(`noteArea`).addAttribute("disabled");

}
function enableToEdit()
{
    document.getElementById(`noteArea`).removeAttribute("disabled");


}

