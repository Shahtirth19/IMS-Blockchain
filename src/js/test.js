App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("student.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      return App.render();
    });
    $.getJSON("department.json", function(department) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.department = TruffleContract(department);
      // Connect provider to interact with contract
      App.contracts.department.setProvider(App.web3Provider);

      return App.submit();
    });
  },

  render: function() {
    var electionInstance;
  
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.getCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.getStudent(i).then(function(candidate) {
          var name = candidate[0];
          var dob = candidate[1];
          var dept = candidate[2];
          var address = candidate[3];
          var email = candidate[4];
          var phone = candidate[5];
          
          // Render candidate Result
          var candidateTemplate = "<tr><td>" + name + "</td><td>" + dob + "</td><td>" + deptname + "</td><td>"+address+"</td><td>"+email+"</td><td>"+phone+"</td></tr>"
          candidatesResults.append(candidateTemplate);
                  });
                 
                  
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
  submit: function() {
    var electionInstance;
  
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
       
      }
    });

    // Load contract data
    App.contracts.de.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.getCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.getStudent(i).then(function(candidate) {
          var name = candidate[0];
          var dob = candidate[1];
          var dept = candidate[2];
          var address = candidate[3];
          var email = candidate[4];
          var phone = candidate[5];
          
          // Render candidate Result
          var candidateTemplate = "<tr><td>" + name + "</td><td>" + dob + "</td><td>" + deptname + "</td><td>"+address+"</td><td>"+email+"</td><td>"+phone+"</td></tr>"
          candidatesResults.append(candidateTemplate);
                  });
                 
                  
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});