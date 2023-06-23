function validateadmin()
{
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    //var chck_email=new String("parthasarkar589@outlook.com");
    //var chck_password=new String("Balurghat@12");
    if((email=="admin@gmail.com") && (password=="123456"))
    {
        window.open("admin_control.html");
    }
    else
    {
        alert("Wrong Credentials");
    }
}