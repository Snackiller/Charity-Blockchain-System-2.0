import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.main`
  margin: 40px 0;
  text-align: center;
  width: 80%; /* Set the width of the content area */
  max-width: 1200px; /* Set a maximum width if needed */
  margin: auto; /* Center the content */
`;

const DonationSection = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ByteCoinHeading = styled.h1`
  margin-top: 0;
  margin-bottom: 20px;
`;


const TotalRaised = styled.h2`
  color: #4CAF50;
  margin-bottom: 10px;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 20px;
  background-color: #282c34;
  color: white;
  text-align: center;
`;

const TableContainer = styled.div`
  width: 600%;
  max-width: 1200px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: center;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 15px;
  background-color: ${(props) => (props.isHeader ? '#282c34' : 'white')};
  color: ${(props) => (props.isHeader ? 'white' : 'inherit')};
  font-weight: ${(props) => (props.isHeader ? 'bold' : 'normal')};
`;

const TableCell = styled.div`
  width: 5000%;
  text-align: center;
`;

function Home() {
  const navigate = useNavigate();

  const charityData = JSON.parse(localStorage.getItem('charities')) || [];

  const handleRowClick = (row) => {
    // Adjust based on how row data is structured
    navigate(`/donation/${row.name}`);
  };

  return (
    <AppContainer>
      <MainContent>
        <ByteCoinHeading>Charity Funds</ByteCoinHeading>
        <DonationSection>
          <TableContainer>
            <TableRow isHeader>
              <TableCell>Charity Name</TableCell>
              <TableCell>Money Raised</TableCell>
            </TableRow>
            {charityData.map((charity, index) => (
              <TableRow key={index} onClick={() => handleRowClick(charity)}>
                <TableCell>{charity.name}</TableCell>
                <TableCell>${charity.number}</TableCell>
              </TableRow>
            ))}
          </TableContainer>
        </DonationSection>
      </MainContent>
      <Footer>
        <p>&copy; 2023 Donate for a Cause. All rights reserved.</p>
      </Footer>
    </AppContainer>
  );
}

export default Home;
