var profId ;
var profName;
window.onload = function() {
    var semail = localStorage.getItem("profName");
    
    var ref = firebase.firestore().collection("profDetails");
    ref.where("email", "==", semail).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((res) => {
        profId = res.id;
        profName = res.data().name
        getDocs(res.id)
      });
    });
    
}

async function addStud(stdid){
   await db.collection("studentDetails").doc(stdid).update({
        profId: profId,
        profName: profName,
        studAdded:true
    }).then(function() {
      alert("Student Added Successfully");
      location.reload();
    }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
} 

async function getDocs(userEmail) {
//    .filter((sub) => sub.data().studentId == userEmail)
    const snapshot = await db.collection("studentDetails").get();
    return snapshot.docs.map((doc, index) => {
    //   prods.push({ id: doc.id, ...doc.data() });
    
      $("#example")
        .DataTable()
        .row.add([
        //   doc.id,
          doc.data().name,
          doc.data().mobile,
          doc.data().email,
          doc.data().program,
          doc.data().studAdded == true? `<div class="btn-group" role="group" aria-label="Basic example">
        </div>
        `:
          `<div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary" onclick="addStud('${doc.id}')">Add Student</button>
        </div>
        `,
        ])
        .draw();
    });
    
  }

//   doc.data().images.map((sub) => {
//     return (
//       `<div>
//         <button type="button" class="btn btn-primary"><a href="${sub}" id="tgl" target="_blank" style="color: #fff" >View Docs</a></button>
//       </div>`
//     );
//   })
//   `<a href="https://maps.google.com/?q= ${doc.data().latitude},${
//     doc.data().longitude
//   }" id="tgl" target="_blank" >View</a>`,
//   doc.data().paid == false? `<div hidden></div>`:
//   `<div class="btn-group" role="group" aria-label="Basic example">
//   <button type="button" class="btn btn-primary" onclick="exportPDF('${doc.id}')">Invoice</button>
// </div>
// `,
//   `<div class="btn-group" role="group" aria-label="Basic example">
//   <button type="button" class="btn btn-primary" onclick="del3('${doc.id}')"  > View Order </button>
//   <br></br>
 
//   <button type="button" class="btn btn-danger" onclick="del2('${doc.id}')">Cancel</button>
// </div>
// `