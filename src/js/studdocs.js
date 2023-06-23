window.onload = function() {
    var semail = localStorage.getItem("storageName");

    var ref = firebase.firestore().collection("studentDetails");
    ref.where("email", "==", semail).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((res) => {
        getDocs(res.id)
      });
    });
    
}



async function getDocs(userEmail) {
   
    const snapshot = await db.collection("studentDocs").get();
    return snapshot.docs.filter((sub) => sub.data().studentId == userEmail).map((doc, index) => {
    //   prods.push({ id: doc.id, ...doc.data() });
    
      $("#example")
        .DataTable()
        .row.add([
        //   doc.data().studentId,
          doc.data().images.map((sub) => {
            return (
              `<div>
                <button type="button" class="btn btn-primary"><a href="${sub}" id="tgl" target="_blank" style="color: #fff" >View Docs</a></button>
              </div>`
            );
          })
        ])
        .draw();
    });
    
  }

  
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