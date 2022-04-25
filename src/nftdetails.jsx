import React, {useState, useEffect} from 'react';
import { TextStyle, Heading, Stack, Link } from '@shopify/polaris';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';

function Nftdetails() {
  const [metadata, setMetadata] = useState(null);

  // Grabs the address and token ID from the URL
  // These are needed to use the getNftMetadata endpoint
  const url = window.location.href;
  const address = url.slice(url.indexOf('nft/') + 4, url.lastIndexOf('/'));
  const id = url.split("/").pop();

  useEffect(() => {
    // Taken from getNftMetadata documentation
    const web3 = createAlchemyWeb3(
      "https://eth-mainnet.alchemyapi.io/v2/demo",
    );

    // Fetches the metadata
    const getMetadata = async () => {
      // Passes in the address and id values from the URL
      const result = await web3.alchemy.getNftMetadata({
        contractAddress: address,
        tokenId: id,
      });
      console.log(result);
      // Sets the metadata to use for displaying
      setMetadata(result);
    };

    getMetadata();
  },[])

  // Returns no results if no metadata is found
  // This should never happen
  if (!metadata){
    return(
      <>
        <TextStyle>No results</TextStyle>
      </>
    );
  }

  // Stores the metadata attributes into an attributes variable for easier use later on
  const attributes = metadata.metadata.attributes

  return (
    <div className="layoutWrapper">
      {/* NFT image  */}
      <div className="imageWrapper">
        <img src={metadata.media[0].gateway} />
      </div>
      <div className="metadataWrapper">
        {/* Title, address, token ID, and token type  */}
        <div className="topWrapper">
          <Heading>{metadata.title}</Heading>

          <Stack distribution="fill">
            <Link url={`https://etherscan.io/token/${metadata.contract.address}`}>{`${metadata.contract.address.slice(0, 4)}...${metadata.contract.address.slice(metadata.contract.address.length - 4)}`}</Link>
            <TextStyle>&nbsp;&nbsp;#{metadata.id.tokenId}</TextStyle>
            <TextStyle>{metadata.id.tokenMetadata.tokenType}</TextStyle>
          </Stack>

          <TextStyle>{metadata.metadata.description}</TextStyle>
          <br></br>
          <br></br>
        </div>

        {/* Loops through the attributes to display them  */}
        <div className='attributesWrapper'>
          {attributes?.length > 0 && attributes.map(attribute => {
            return (
              <Stack vertical spacing='extraTight'>
                <TextStyle variation="strong">{attribute.trait_type}</TextStyle>
                <TextStyle>{attribute.value}</TextStyle>
              </Stack>
            )
          })}
        </div>
      </div>
    </div>
  );
};


export default Nftdetails;