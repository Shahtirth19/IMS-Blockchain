var studId;
window.onload = function() {
    var semail = localStorage.getItem("storageName");
    
    var ref = firebase.firestore().collection("studentDetails");
    ref.where("email", "==", semail).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((res) => {
        studId = res.id,
        getDocs(res.id)
      });
    });
    
}

async function addAssn(docid){

    var dclength = document.getElementById("formFileMultiple").files.length
    const imgurl = [];
        for (
          var i = 0;
          i < document.getElementById("formFileMultiple").files.length;
          i++
        ) {
          var upImg = document.getElementById("formFileMultiple").files[i];
        //   console.log(upImg);
          var storage = firebase.storage();
          var storageRef = storage.ref();
          var uploadTask = storageRef.child("studAssn/" + Date.now()).put(upImg);
          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
            //   console.log(snapshot);
              var progress =
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // setProgress(progress);
            },
            (error) => {
              console.log(error);
              alert(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
                    try {
                        await db.collection("studentDetails").doc(studId).collection("assignments").doc(docid).update({
                            image: url,
                            isSubmitted:true,
                        }).then(function() {
                          alert("Assignment Submitted Successfully");
                          location.reload();
                        }).catch(function(error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                      }catch (error) {
                        console.log(error);
                      }
                      
                
                // setSubmitLoading(false);
                // history.push("/banner");
              });
            }
          );
        }
    
}


async function getDocs(userEmail) {
   
    const snapshot = await db.collection("studentDetails").doc(userEmail).collection("assignments").get();
    return snapshot.docs.map((doc, index) => {
    //   prods.push({ id: doc.id, ...doc.data() });
    
      $("#example")
        .DataTable()
        .row.add([
          doc.data().quest,
          doc.data().isSubmitted == true? `<div></div>`:
          `<div class="btn-group" role="group" aria-label="Basic example">
                <div class="card-body pt-0">
                    <input class="form-control" type="file" id="formFileMultiple">
                </div>
            </div>`,
            doc.data().isSubmitted == true? `<div></div>`:
            `<div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary" onclick="addAssn('${doc.id}')">Upload</button>
            </div>`
        //   doc.data().images.map((sub) => {
        //     return (
        //       `<div>
        //         <button type="button" class="btn btn-primary"><a href="${sub}" id="tgl" target="_blank" style="color: #fff" >View Docs</a></button>
        //       </div>`
        //     );
        //   })
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