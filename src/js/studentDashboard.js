var details ;
window.onload = function() {
    var semail = localStorage.getItem("storageName");
    // console.log(semail);
    var ref = firebase.firestore().collection("studentDetails");

    ref.where("email", "==", semail).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((res) => {
        details = res
        renderProfile(res);
        
      });
    });
}

function renderProfile(doc) {
    var stud_name = document.getElementById('studName');

    // var tag_id = document.getElementById('sId');
    var tag_id2 = document.getElementById('deptName');

    var tab_id = document.getElementById('name');
    var tab_id2 = document.getElementById('phno');
    var tab_id3 = document.getElementById('email');
    var tab_id4 = document.getElementById('dob');
    var tab_id5 = document.getElementById('prog');
    var tab_id6 = document.getElementById('address');
    var tab_id7 = document.getElementById('profId');

    stud_name.innerHTML = doc.data().name;

    // tag_id.innerHTML = doc.id;
    tag_id2.innerHTML = doc.data().dept;

    tab_id.innerHTML = doc.data().name;
    tab_id2.innerHTML = doc.data().mobile;
    tab_id3.innerHTML = doc.data().email;
    tab_id4.innerHTML = doc.data().dob;
    tab_id5.innerHTML = doc.data().program;
    tab_id6.innerHTML = doc.data().address;
    tab_id7.innerHTML = doc.data().profName
  }
  document.getElementById('button').onclick = () => {
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
          var uploadTask = storageRef.child("studDocs/" + Date.now()).put(upImg);
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
                imgurl.push(url);
                if (imgurl.length == document.getElementById("formFileMultiple").files.length) {
                    try {
                        db.collection("studentDocs").add({
                          images:imgurl,
                          studentId:details.id,
                          studentName:details.data().name
                        }).then(()=>{
                            alert("Documents Added")
                            location.reload()

                        });
                      }catch (error) {
                        console.log(error);
                      }
                      
                }
                
                // setSubmitLoading(false);
                // history.push("/banner");
              });
            }
          );
        }

    
}