var details ;
window.onload = function() {
    var semail = localStorage.getItem("profName");
    // console.log(semail);
    var ref = firebase.firestore().collection("profDetails");

    ref.where("email", "==", semail).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((res) => {
        details = res.id
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

    stud_name.innerHTML = doc.data().name;

    // tag_id.innerHTML = doc.id;
    tag_id2.innerHTML = doc.data().dept;

    tab_id.innerHTML = doc.data().name;
    tab_id2.innerHTML = doc.data().mobile;
    tab_id3.innerHTML = doc.data().email;
    tab_id4.innerHTML = doc.data().dob;
    // tab_id5.innerHTML = doc.data().program;
    tab_id6.innerHTML = doc.data().designation;
  }
  document.getElementById('button').onclick = () => {
    console.log(details);
    const assn = document.getElementById("floatingTextarea2").value;

    try {
        var ref = firebase.firestore().collection("studentDetails");

        ref.where("profId", "==", details).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((res) => {
            firebase.firestore().collection("studentDetails").doc(res.id).collection("assignments").add({
                        quest:assn,
                        isSubmitted:false
                    }).then(()=>{
                            alert("Assignment Assigned To Students")
                            location.reload()
                
                        });
            
        });
        });
      }catch (error) {
        console.log(error);
      }
    
                
                // setSubmitLoading(false);
                // history.push("/banner");

    
}