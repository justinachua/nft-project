import React from 'react';
import {AppProvider, Page} from '@shopify/polaris';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Nftdetails from './nftdetails';
import Home from './home';

// Dame's
// 0x3B3525F60eeea4a1eF554df5425912c2a532875D
// Mine
// 0xE2FE20e03663D9f710Bf881A2774A1d447bDae2a
// Random
// 0xb89c2f6bb674bd6aace2a1e274d40e6dc4775b15


function App() {

  return (
    <AppProvider colorScheme="light">
      <Page
        title="Justina's React NFT App"
        subtitle="Find NFTs within a wallet address here!"
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nft/:contract/:token" element={<Nftdetails />} />
          </Routes>
        </Router>
      </Page>
    </AppProvider>
  )
}

export default App;
