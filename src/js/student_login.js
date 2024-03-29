App = {
  web3Provider: null,
  contracts: {},

init:async function() {
return  App.initWeb3();
},
  initWeb3: async function() {
   // Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('student.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.student = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.student.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.submit);
    
  },



  submit: function(event) {
    event.preventDefault();
  
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var adoptionInstance;
  
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
  
      var account = accounts[0];
  
      App.contracts.student.deployed().then(function(instance) {
        adoptionInstance = instance;
        console.log(email, password, {from: account});
        // Execute adopt as a transaction by sending account
        return adoptionInstance.validateStudent(email, password, {from: account});
      }).then(function(result) {
        var id1 = result;
        if(id1 != 0) {
          console.log(id1);
          adoptionInstance.getname(1).then(function(value) {
            console.log(value);
            var userid = id1;
            var username = value;
            document.getElementById("disp").innerHTML = "Welcome " + value + " to the system";
            var queryString = "?userid=" + userid + "&username=" + username;
            localStorage.setItem("storageName",email);
            window.location.href = "student_dashboard.html" + queryString;
          });
        } else {
          document.getElementById("disp").innerHTML = "Please Check Your Credentials: Authentication Failed";
        }
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
  

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
