import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/DonationPage.css';
import { initWeb3, donateToFund, contractABI, contractAddress } from '../../services/Web3Client.js';

function DonationPage() {
  const { charityName } = useParams(); // Getting the charity name from URL
  const [charityInfo, setCharityInfo] = useState({ name: '', description: '', targetAmount: 0 });
  const [donations, setDonations] = useState([]);
  const [donationInfo, setDonationInfo] = useState({ account: '', amount: 0 });

  useEffect(() => {
    initWeb3(); // Initialize Web3

    // Fetch charity information from LocalStorage
    const allCharities = JSON.parse(localStorage.getItem('charities')) || [];
    const foundCharity = allCharities.find(charity => charity.name === charityName);
    
    const donationKey = `donations_${charityName}`;
    const savedDonations = JSON.parse(localStorage.getItem(donationKey)) || [];
    setDonations(savedDonations);


    if (foundCharity) {
      // Assuming that the charity's description and targetAmount are stored as well
      setCharityInfo({
        name: foundCharity.name,
        description: foundCharity.description,
        targetAmount: foundCharity.number
      });
    }
    const fetchDonations = async () => {
      const response = await fetch('/api/donations');
      const data = await response.json();
      // Set state with fetched data
  };
  fetchDonations();
  }, [charityName]);
  const [accountName, setAccountName] = useState('');
  const [donationAmount, setDonationAmount] = useState('');


  const handleDonate = async () => {
    if (parseFloat(donationAmount) > 0) {
      if (totalAmount + Number(donationAmount) <= charityInfo.targetAmount) {
        try{
          const fundIndex = 0;
          const result = await donateToFund(fundIndex, donationAmount);

          if (result.success) {
            console.log("Donation made by account:", result.account);
            console.log("Donation amount:", result.amount);
            
            const newDonation = { name: result.account, amount: result.amount };
            const updatedDonations = [...donations, newDonation];
            setDonations(updatedDonations);

            // Define a unique key for the charity's donations
            const donationKey = `donations_${charityName}`;

            // Save to localStorage under the specific charity's key
            localStorage.setItem(donationKey, JSON.stringify(updatedDonations));


          } else {
            console.log("Donation failed");
          }
        } catch (error) {
          console.error("Transaction failed:", error);
        }
  
      } else {
        alert('Please adjust the amount, you cannot make more donation than required.');
        return;
      }
    }
  };

  const totalAmount = donations.reduce((sum, donation) => sum + Number(donation.amount), 0);

  const handleAmountChange = (e) => {
    setDonationAmount(e.target.value);
  };

  return (
    <div className="donation-page">
      <div className="left-section">
        <section className="charity-info">
          <h2>{charityInfo.name || 'Charity Name'}</h2>
          <div className="media-container"></div>
          <textarea 
            className="textarea" 
            placeholder="Charity description"
            value={charityInfo.description || ''}
            readOnly
          ></textarea>
        </section>
      </div>

      <div className="right-section">
        <section className="donation-info">
          <p>Current amount: ${totalAmount}</p>
          <p>Amount required: ${charityInfo.targetAmount}</p>
          <p>Number donations: {donations.length}</p>
          <label htmlFor="donationAmount">Enter your donation amount:</label>
          <input 
            type="number" 
            id="donationAmount"
            value={donationAmount}
            onChange={handleAmountChange}
            placeholder="Amount"
            className="donation-amount-input" 
          />
          <button onClick={handleDonate}>Donate Here</button>
          <table className="donation-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index}>
                  <td>{donation.name}</td>
                  <td>${donation.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default DonationPage;