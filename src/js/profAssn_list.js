var profId ;
window.onload = function() {
    var semail = localStorage.getItem("profName");
    
    var ref = firebase.firestore().collection("profDetails");
    ref.where("email", "==", semail).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((res) => {
        profId = res.id;
        getDocs(res.id)
      });
    });
    
}

async function addStud(stdid){
    localStorage.setItem("assnId",stdid);
    window.location.href = "viewSubmission.html";
//    const snapshot = await db.collection("studentDetails").doc(stdid).collection("assignments").get();
//    snapshot.docs.map((doc, index) => {

//    })

    // .then(function() {
    //   alert("Student Added Successfully");
    //   location.reload();
    // }).catch(function(error) {
    //     // The document probably doesn't exist.
    //     console.error("Error updating document: ", error);
    // });
} 

async function getDocs(userEmail) {
//    .filter((sub) => sub.data().studentId == userEmail)
    const snapshot = await db.collection("studentDetails").get();
    return snapshot.docs.filter((sub) => sub.data().profId == profId).map((doc, index) => {
    //   prods.push({ id: doc.id, ...doc.data() });
    
      $("#example")
        .DataTable()
        .row.add([
        //   doc.id,
          doc.data().name,
          doc.data().mobile,
          doc.data().email,
          doc.data().program,
          `<div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary" onclick="addStud('${doc.id}')">View Submission</button>
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