window.onload = function() {
    getDocs()
}



async function getDocs() {
    const snapshot = await db.collection("studentDocs").get();
    return snapshot.docs.map((doc, index) => {
    //   prods.push({ id: doc.id, ...doc.data() });
    
      $("#example")
        .DataTable()
        .row.add([
          doc.data().studentId,
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
