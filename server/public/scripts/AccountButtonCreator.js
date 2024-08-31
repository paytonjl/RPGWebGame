class AccountButtonCreator {
  constructor(element) {
    this.accountButton = null;
  }

    createAccountButton() {
      const accountButtons = document.getElementsByClassName('AccountButton');
      
      if(accountButtons.length > 0 && accountButtons[0])
      {
        this.accountButton = accountButtons[0];
        this.createAndInsertButton();
      } else {
        
        console.log("No account button to create");
        return;
      }
    }

    createAndInsertButton() {
      const newButton = document.createElement('button');
      newButton.textContent = 'Account';

      
      // Add any desired styles or attributes to the new button
      newButton.style.backgroundColor = '#007bff'; // Example color
      newButton.style.color = 'white';
      newButton.style.padding = '5px 10px';
      newButton.style.borderRadius = '5px';

      this.accountButton.innerHTML = '';
      this.accountButton.appendChild(newButton);
    }
}