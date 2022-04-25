import React, {useState} from 'react';
import NftCard from './nftcard';
import {fetchNFTs} from './fetchNFTs';
import {Button, Form, FormLayout, TextField} from '@shopify/polaris';
import {Masonry} from '@mui/lab';

function Home() {
  const [owner, setOwner] = useState("")
  const [contractAddress, setContractAddress] = useState("")
  const [NFTs, setNFTs] = useState([])

  const getNFTs = async () => {
    fetchNFTs(owner, contractAddress, setNFTs)
  }

	return (
    <>
      {/* Fetches NFTs upon submitting  */}
      <Form onSubmit={getNFTs}>
        <FormLayout>
          {/* Fetches owner's wallet address  */}
          <TextField
            value={owner}
            onChange={setOwner}
            label="Wallet address"
            type="text"
          />
          <Button submit>Submit</Button>
          <br />
        </FormLayout>
      </Form>

      {/* Material UI (React component library) is used here for a Pinterest-esque layout  */}
      <Masonry columns={4} spacing={3}>
        {NFTs ? NFTs.map(NFT =>(
          // Pass in NFT metadata to display
          <NftCard
            key={NFT.value.id + NFT.value.contractAddress}
            image={NFT.value.image}
            id={NFT.value.id}
            title={NFT.value.title}
            address={NFT.value.contractAddress}
           />
        )) : null}
      </Masonry>
    </>
	);
};

export default Home;